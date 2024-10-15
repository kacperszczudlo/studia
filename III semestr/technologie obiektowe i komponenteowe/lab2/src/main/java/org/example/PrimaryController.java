package org.example;

import java.io.IOException;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

public class PrimaryController {
    //Kalendarz kal = new Kalendarz(); //data biezaca systemowa
    //Kalendarz kal; //blokowanie reczne
    // 3 pola dzien misiac rok
    @FXML
    private Label primaryLabel;
    @FXML
    private void switchToSecondary() throws IOException {
        // App.setRoot("secondary");

        //tu jest przycisk podaj date
        //kal = new Kalendarz(1,12,2024);
        System.out.println("wcisnieto przycisk");
        primaryLabel.setText("wcisnieto przycisk");
    }
}
