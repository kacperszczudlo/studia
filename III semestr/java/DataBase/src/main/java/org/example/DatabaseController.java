package org.example;

import connection.Connect;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.beans.property.SimpleObjectProperty;

import java.sql.*;

public class DatabaseController {

    @FXML
    private ComboBox<String> schemaComboBox;
    @FXML
    private ComboBox<String> tableComboBox;
    @FXML
    private TableView<ObservableList<Object>> tableView;

    private final Connect connect = new Connect();

    @FXML
    public void initialize() {
        loadSchemas();
        schemaComboBox.setOnAction(event -> loadTables());
    }

    private void loadSchemas() {
        try (Connection conn = connect.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT schema_name FROM information_schema.schemata")) {

            ObservableList<String> schemas = FXCollections.observableArrayList();
            while (rs.next()) {
                schemas.add(rs.getString("schema_name"));
            }
            schemaComboBox.setItems(schemas);

        } catch (SQLException e) {
            System.err.println("Błąd podczas ładowania schematów: " + e.getMessage());
        }
    }

    private void loadTables() {
        String selectedSchema = schemaComboBox.getValue();
        if (selectedSchema == null || selectedSchema.isEmpty()) {
            return;
        }

        try (Connection conn = connect.getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                     "SELECT table_name FROM information_schema.tables WHERE table_schema = ?")) {

            stmt.setString(1, selectedSchema);
            ResultSet rs = stmt.executeQuery();

            ObservableList<String> tables = FXCollections.observableArrayList();
            while (rs.next()) {
                tables.add(rs.getString("table_name"));
            }
            tableComboBox.setItems(tables);

        } catch (SQLException e) {
            System.err.println("Błąd podczas ładowania tabel: " + e.getMessage());
        }
    }

    @FXML
    private void fetchData() {
        String selectedSchema = schemaComboBox.getValue();
        String selectedTable = tableComboBox.getValue();

        if (selectedSchema == null || selectedSchema.isEmpty() || selectedTable == null || selectedTable.isEmpty()) {
            return;
        }

        try (Connection conn = connect.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(
                     "SELECT * FROM \"" + selectedSchema + "\".\"" + selectedTable + "\"")) {

            ResultSetMetaData rsmd = rs.getMetaData();
            int numberOfColumns = rsmd.getColumnCount();

            tableView.getColumns().clear();
            ObservableList<ObservableList<Object>> data = FXCollections.observableArrayList();

            for (int i = 1; i <= numberOfColumns; i++) {
                final int colIndex = i - 1;
                TableColumn<ObservableList<Object>, Object> column = new TableColumn<>(rsmd.getColumnName(i));
                column.setCellValueFactory(cellData -> new SimpleObjectProperty<>(cellData.getValue().get(colIndex)));
                tableView.getColumns().add(column);
            }

            while (rs.next()) {
                ObservableList<Object> row = FXCollections.observableArrayList();
                for (int i = 1; i <= numberOfColumns; i++) {
                    row.add(rs.getObject(i));
                }
                data.add(row);
            }

            tableView.setItems(data);

        } catch (SQLException e) {
            System.err.println("Błąd podczas pobierania danych z tabeli: " + e.getMessage());
        }
    }
}
