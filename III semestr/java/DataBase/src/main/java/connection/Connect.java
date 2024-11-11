package connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Connect {

    private String driver = "org.postgresql.Driver";
    private String url = "jdbc:postgresql://195.150.230.208:5432/2024_szczudlo_kacper";
    private String user = "2024_szczudlo_kacper";
    private String pass = "KacSzczud2115**";
    private Connection connection;

    public Connect() {
        connection = makeConnection();
    }

    public Connection getConnection() {
        return connection;
    }

    public void close() {
        try {
            connection.close();
        } catch (SQLException sqle) {
            System.err.println("Błąd przy zamykaniu połączenia: " + sqle);
        }
    }

    public Connection makeConnection() {
        try {
            Class.forName(driver);
            return DriverManager.getConnection(url, user, pass);
        } catch (ClassNotFoundException cnfe) {
            System.err.println("Błąd ładowania sterownika: " + cnfe);
            return null;
        } catch (SQLException sqle) {
            System.err.println("Błąd przy nawiązywaniu połączenia: " + sqle);
            return null;
        }
    }
}
