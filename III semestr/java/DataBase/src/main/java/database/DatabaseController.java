package database;

import connection.Connect;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;

import java.sql.*;

public class DatabaseController {

    @FXML
    private TextField tableNameField;
    @FXML
    private TableView<ObservableList<Object>> tableView;

    private Connect connect = new Connect();

    @FXML
    public void fetchData() {
        String tableName = tableNameField.getText();
        if (tableName.isEmpty()) {
            System.err.println("Proszę wprowadzić nazwę tabeli.");
            return;
        }

        try (Connection conn = connect.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM " + tableName)) {

            ResultSetMetaData rsmd = rs.getMetaData();
            int numberOfColumns = rsmd.getColumnCount();

            tableView.getColumns().clear();
            ObservableList<ObservableList<Object>> data = FXCollections.observableArrayList();

            for (int i = 1; i <= numberOfColumns; i++) {
                final int colIndex = i - 1;
                TableColumn<ObservableList<Object>, Object> column = new TableColumn<>(rsmd.getColumnName(i));
                column.setCellValueFactory(cellData -> new javafx.beans.property.SimpleObjectProperty<>(cellData.getValue().get(colIndex)));
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
            System.err.println("Błąd podczas pobierania danych: " + e.getMessage());
        }
    }
}
