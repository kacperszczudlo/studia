package org.example;

import connection.Connect;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.beans.property.SimpleBooleanProperty;
import javafx.beans.property.SimpleObjectProperty;
import javafx.scene.control.cell.CheckBoxTableCell;

import javax.mail.*;
import javax.mail.internet.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class DatabaseController {

    @FXML
    private ComboBox<String> schemaComboBox;
    @FXML
    private ComboBox<String> tableComboBox;
    @FXML
    private TableView<ObservableList<Object>> tableView;
    @FXML
    private Button sendEmailButton;

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

            // Dodawanie kolumn do TableView
            for (int i = 1; i <= numberOfColumns; i++) {
                final int colIndex = i - 1;
                TableColumn<ObservableList<Object>, Object> column = new TableColumn<>(rsmd.getColumnName(i));
                column.setCellValueFactory(cellData -> new SimpleObjectProperty<>(cellData.getValue().get(colIndex)));
                tableView.getColumns().add(column);
            }

            // Dodawanie kolumny checkboxów
            TableColumn<ObservableList<Object>, Boolean> checkBoxColumn = new TableColumn<>("Zaznacz");
            checkBoxColumn.setCellValueFactory(cellData -> {
                ObservableList<Object> row = cellData.getValue();
                if (row.size() == numberOfColumns) {
                    SimpleBooleanProperty checkBoxProperty = new SimpleBooleanProperty(false);
                    row.add(checkBoxProperty);
                    return checkBoxProperty;
                } else {
                    return (SimpleBooleanProperty) row.get(numberOfColumns);
                }
            });
            checkBoxColumn.setCellFactory(CheckBoxTableCell.forTableColumn(checkBoxColumn));
            tableView.getColumns().add(checkBoxColumn);

            // Dodawanie danych do TableView
            while (rs.next()) {
                ObservableList<Object> row = FXCollections.observableArrayList();
                for (int i = 1; i <= numberOfColumns; i++) {
                    row.add(rs.getObject(i));
                }
                row.add(new SimpleBooleanProperty(false)); // Domyślny checkbox niezaznaczony
                data.add(row);
            }

            tableView.setItems(data);

        } catch (SQLException e) {
            System.err.println("Błąd podczas ładowania danych tabeli: " + e.getMessage());
        }
    }

    @FXML
    private void sendEmails() {
        List<String> emailAddresses = new ArrayList<>();

        for (ObservableList<Object> row : tableView.getItems()) {
            Object emailObject = row.get(0); // Zakładamy, że pierwsza kolumna to e-mail
            Object checkBoxObject = row.get(row.size() - 1); // Ostatnia kolumna to checkbox

            if (emailObject instanceof String && checkBoxObject instanceof SimpleBooleanProperty) {
                String email = (String) emailObject;
                boolean isChecked = ((SimpleBooleanProperty) checkBoxObject).get();
                if (isChecked) {
                    emailAddresses.add(email);
                }
            }
        }

        if (!emailAddresses.isEmpty()) {
            sendEmailBatch(emailAddresses);
        } else {
            System.out.println("Nie zaznaczono żadnych adresów e-mail.");
        }
    }

    private void sendEmailBatch(List<String> emailAddresses) {
        String from = "twoje@gmail.com";
        String host = "smtp.gmail.com";

        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("kacperstudenciak@gmail.com", "wpde khkz ofyq kknu");
            }
        });

        try {
            for (String to : emailAddresses) {
                MimeMessage message = new MimeMessage(session);
                message.setFrom(new InternetAddress(from));
                message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
                message.setSubject("Testowy e-mail");
                message.setText("To jest testowa wiadomość e-mail.");

                Transport.send(message);
                System.out.println("Wysłano wiadomość do: " + to);
            }
        } catch (MessagingException e) {
            System.err.println("Błąd podczas wysyłania wiadomości: " + e.getMessage());
        }
    }
}
