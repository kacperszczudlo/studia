package org.example;

import connection.Connect;
import javafx.collections.ObservableList;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.*;
import java.sql.*;
import java.util.List;

public class Export {

    public void exportSelectedRowsToCSV(String schema, String tableName, List<ObservableList<Object>> selectedRows) {
        Connect connect = new Connect();
        Connection connection = connect.getConnection();

        if (connection != null) {
            try {
                String query = "SELECT * FROM \"" + schema + "\".\"" + tableName + "\"";
                Statement stmt = connection.createStatement();
                ResultSet rs = stmt.executeQuery(query);
                ResultSetMetaData metaData = rs.getMetaData();

                FileChooser fileChooser = new FileChooser();
                fileChooser.setTitle("Wybierz miejsce do zapisania pliku");
                fileChooser.setInitialFileName(tableName + ".csv");
                fileChooser.getExtensionFilters().add(new FileChooser.ExtensionFilter("CSV Files", "*.csv"));

                File fileToSave = fileChooser.showSaveDialog(new Stage());

                if (fileToSave != null) {
                    try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileToSave))) {
                        int columnCount = metaData.getColumnCount();
                        for (int i = 1; i <= columnCount; i++) {
                            writer.write(metaData.getColumnName(i));
                            if (i < columnCount) {
                                writer.write(",");
                            }
                        }
                        writer.newLine();

                        for (ObservableList<Object> row : selectedRows) {
                            for (int i = 0; i < columnCount; i++) {
                                Object value = row.get(i);
                                writer.write(value != null ? value.toString() : "");
                                if (i < columnCount - 1) {
                                    writer.write(",");
                                }
                            }
                            writer.newLine();

                    }
                        System.out.println("Eksport zakończony!");
                    } catch (IOException e) {
                        e.printStackTrace();
                        System.err.println("Błąd zapisu pliku.");
                    }
                }
            } catch (SQLException e) {
                e.printStackTrace();
                System.err.println("Błąd zapytania do bazy danych.");
            } finally {
                connect.close();
            }
        } else {
            System.err.println("Nie udało się połączyć z bazą danych.");
        }
    }
}
