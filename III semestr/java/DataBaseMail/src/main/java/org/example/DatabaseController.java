package org.example;

import connection.Connect;
import mail.Mail;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.property.SimpleObjectProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.cell.CheckBoxTableCell;
import javafx.scene.input.MouseEvent;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseController {

    @FXML
    private ComboBox<String> schemaComboBox;
    @FXML
    private ComboBox<String> tableComboBox;
    @FXML
    private TableView<ObservableList<Object>> tableView;
    @FXML
    private Button sendEmailButton;
    @FXML
    private TextField emailSubjectField;
    @FXML
    private TextArea emailBodyArea;

    private final Connect connect = new Connect();

    @FXML
    public void initialize() {
        loadSchemas();
        schemaComboBox.setOnAction(event -> {
            String selectedSchema = schemaComboBox.getValue();
            if (selectedSchema != null) {
                loadTablesForSchema(selectedSchema);
            }
        });
        tableComboBox.setOnAction(event -> loadTableData());
    }

    private void loadSchemas() {
        ObservableList<String> schemas = FXCollections.observableArrayList();
        try (Connection conn = connect.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT schema_name FROM information_schema.schemata")) {
            while (rs.next()) {
                schemas.add(rs.getString("schema_name"));
            }
        } catch (SQLException e) {
            System.err.println("Błąd podczas ładowania schematów: " + e.getMessage());
        }
        schemaComboBox.setItems(schemas);
    }

    private void loadTablesForSchema(String schema) {
        ObservableList<String> tables = FXCollections.observableArrayList();
        try (Connection conn = connect.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(
                     "SELECT table_name FROM information_schema.tables WHERE table_schema = ?")) {
            pstmt.setString(1, schema);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                tables.add(rs.getString("table_name"));
            }
        } catch (SQLException e) {
            System.err.println("Błąd podczas ładowania tabel: " + e.getMessage());
        }
        tableComboBox.setItems(tables);
    }

    private void loadTableData() {
        String selectedSchema = schemaComboBox.getValue();
        String selectedTable = tableComboBox.getValue();
        if (selectedSchema == null || selectedTable == null || selectedSchema.isEmpty() || selectedTable.isEmpty()) {
            System.out.println("Nie wybrano schematu lub tabeli.");
            return;
        }
        ObservableList<ObservableList<Object>> data = FXCollections.observableArrayList();
        String query = "SELECT * FROM \"" + selectedSchema + "\".\"" + selectedTable + "\"";
        try (Connection conn = connect.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            ResultSetMetaData rsmd = rs.getMetaData();
            int numberOfColumns = rsmd.getColumnCount();
            tableView.getColumns().clear();
            for (int i = 1; i <= numberOfColumns; i++) {
                final int colIndex = i - 1;
                TableColumn<ObservableList<Object>, Object> column = new TableColumn<>(rsmd.getColumnName(i));
                column.setCellValueFactory(cellData -> new SimpleObjectProperty<>(cellData.getValue().get(colIndex)));
                tableView.getColumns().add(column);
            }
            TableColumn<ObservableList<Object>, Boolean> checkBoxColumn = new TableColumn<>("Zaznacz");
            checkBoxColumn.setCellValueFactory(cellData -> {
                ObservableList<Object> rowData = cellData.getValue();
                SimpleBooleanProperty checkBoxProperty;
                if (rowData.size() <= numberOfColumns) {
                    checkBoxProperty = new SimpleBooleanProperty(false);
                    rowData.add(checkBoxProperty);
                } else {
                    checkBoxProperty = (SimpleBooleanProperty) rowData.get(numberOfColumns);
                }
                return checkBoxProperty;
            });
            checkBoxColumn.setCellFactory(column -> {
                CheckBoxTableCell<ObservableList<Object>, Boolean> cell = new CheckBoxTableCell<>();
                cell.setEditable(true);
                cell.addEventFilter(MouseEvent.MOUSE_PRESSED, event -> {
                    event.consume();
                    TableRow<?> row = cell.getTableRow();
                    if (row != null) {
                        ObservableList<Object> rowData = tableView.getItems().get(row.getIndex());
                        SimpleBooleanProperty checkBoxProperty = (SimpleBooleanProperty) rowData.get(numberOfColumns);
                        checkBoxProperty.set(!checkBoxProperty.get());
                    }
                });
                return cell;
            });
            tableView.getColumns().add(checkBoxColumn);
            while (rs.next()) {
                ObservableList<Object> row = FXCollections.observableArrayList();
                for (int i = 1; i <= numberOfColumns; i++) {
                    row.add(rs.getObject(i));
                }
                row.add(new SimpleBooleanProperty(false));
                data.add(row);
            }
            tableView.setItems(data);
            tableView.getSelectionModel().setCellSelectionEnabled(false);
            tableView.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE);
        } catch (SQLException e) {
            System.err.println("Błąd podczas ładowania danych tabeli: " + e.getMessage());
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
        return email != null && email.matches(emailRegex);
    }

    @FXML
    private void sendEmails() {
        List<String> emailAddresses = new ArrayList<>();
        // linijka do testowania czy wysyła rjedryka@gmail.com
        //List<String> emailAddresses = List.of("kacper.szczudlo@gmail.com");
        for (ObservableList<Object> row : tableView.getItems()) {
            Object emailObject = row.get(0);
            Object checkBoxObject = row.get(row.size() - 1);
            if (checkBoxObject instanceof SimpleBooleanProperty && ((SimpleBooleanProperty) checkBoxObject).get()) {
                if (emailObject == null || !(emailObject instanceof String) || ((String) emailObject).isEmpty()) {
                    System.out.println("Pominięto niepoprawny lub pusty adres e-mail: " + emailObject);
                    continue;
                }
                String email = (String) emailObject;
                if (!isValidEmail(email)) {
                    System.out.println("Pominięto niepoprawny adres e-mail: " + email);
                    continue;
                }
                emailAddresses.add(email);
            }
        }
        if (emailAddresses.isEmpty()) {
            System.out.println("Nie zaznaczono żadnych poprawnych adresów e-mail.");
            return;
        }

        String subject = emailSubjectField.getText();
        String body = emailBodyArea.getText();
        if (subject == null || subject.isEmpty()) {
            System.out.println("Temat wiadomości jest pusty.");
            return;
        }
        if (body == null || body.isEmpty()) {
            System.out.println("Treść wiadomości jest pusta.");
            return;
        }

        Mail mailService = new Mail("kacperstudenciak@gmail.com", "wpde khkz ofyq kknu");
        for (String email : emailAddresses) {
            mailService.sendEmail(email, subject, body);
        }
    }
}