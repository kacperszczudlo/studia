package org.example;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class App extends Application {

    @Override
    public void start(Stage primaryStage) throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("database_view.fxml"));
        Parent root = loader.load();

        Scene scene = new Scene(root,1000, 500);

        primaryStage.setTitle("Przeglądarka baz danych");
        primaryStage.setScene(scene);
        primaryStage.sizeToScene(); // Dopasowanie rozmiaru do zawartości
        primaryStage.setResizable(true); // Pozwala użytkownikowi zmieniać rozmiar
        primaryStage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
