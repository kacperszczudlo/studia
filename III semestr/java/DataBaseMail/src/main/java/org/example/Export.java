package org.example;

import connection.Connect;
import javafx.collections.ObservableList;

import javax.swing.*;
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

                JFileChooser fileChooser = new JFileChooser();
                fileChooser.setDialogTitle("Wybierz miejsce do zapisania pliku");
                fileChooser.setSelectedFile(new File(tableName + "_selected.csv"));

                int userSelection = fileChooser.showSaveDialog(null);

                if (userSelection == JFileChooser.APPROVE_OPTION) {
                    File fileToSave = fileChooser.getSelectedFile();

                    try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileToSave))) {
                        int columnCount = metaData.getColumnCount();
                        for (int i = 1; i <= columnCount; i++) {
                            writer.write(metaData.getColumnName(i));
                            if (i < columnCount) {
                                writer.write(",");
                            }
                        }
                        writer.newLine();

                        // Zapisz tylko zaznaczone wiersze
                        for (ObservableList<Object> row : selectedRows) {
                            for (int i = 0; i < columnCount; i++) {
                                writer.write(row.get(i).toString());
                                if (i < columnCount - 1) {
                                    writer.write(",");
                                }
                            }
                            writer.newLine();
                        }
                        JOptionPane.showMessageDialog(null, "Eksport zakończony!");
                    } catch (IOException e) {
                        e.printStackTrace();
                        JOptionPane.showMessageDialog(null, "Błąd zapisu pliku.");
                    }
                }
            } catch (SQLException e) {
                e.printStackTrace();
                JOptionPane.showMessageDialog(null, "Błąd zapytania do bazy danych.");
            } finally {
                connect.close();
            }
        } else {
            JOptionPane.showMessageDialog(null, "Nie udało się połączyć z bazą danych.");
        }
    }
}
