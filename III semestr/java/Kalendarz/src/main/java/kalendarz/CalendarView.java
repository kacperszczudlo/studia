package kalendarz;

import javafx.geometry.Insets;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.control.Button;
import javafx.scene.text.Text;

public class CalendarView {

    private BorderPane view;

    public CalendarView() {
        view = new BorderPane();

        // Górny panel z miesiącem i przyciskami do zmiany miesiąca
        Button prevMonth = new Button("<");
        Button nextMonth = new Button(">");
        Text monthText = new Text("Październik 2024");

        GridPane topPanel = new GridPane();
        topPanel.setPadding(new Insets(10));
        topPanel.setHgap(10);
        topPanel.add(prevMonth, 0, 0);
        topPanel.add(monthText, 1, 0);
        topPanel.add(nextMonth, 2, 0);

        // Siatka kalendarza
        GridPane calendarGrid = new GridPane();
        calendarGrid.setPadding(new Insets(10));
        calendarGrid.setHgap(10);
        calendarGrid.setVgap(10);

        // Tworzenie dni tygodnia i pól dni
        String[] daysOfWeek = {"Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"};
        for (int i = 0; i < daysOfWeek.length; i++) {
            Text day = new Text(daysOfWeek[i]);
            calendarGrid.add(day, i, 0);
        }

        // Przykład dodania przycisków dni (liczby dni dodasz w późniejszej implementacji)
        for (int i = 1; i <= 31; i++) {
            Button dayButton = new Button(String.valueOf(i));
            calendarGrid.add(dayButton, (i - 1) % 7, (i - 1) / 7 + 1);
        }

        // Dodanie paneli do głównego widoku
        view.setTop(topPanel);
        view.setCenter(calendarGrid);
    }

    public BorderPane getView() {
        return view;
    }
}
