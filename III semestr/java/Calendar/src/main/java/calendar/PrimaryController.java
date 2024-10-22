package calendar;

import javafx.fxml.FXML;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.scene.control.Button;
import javafx.scene.text.Text;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class PrimaryController {

    @FXML
    private TextField dateField;

    @FXML
    private GridPane calendarGrid;

    private Button selectedDayButton;

    @FXML
    public void handleShowCalendar() {
        String inputDate = dateField.getText();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        try {
            LocalDate date = LocalDate.parse(inputDate, formatter);
            YearMonth yearMonth = YearMonth.from(date);
            int daysInMonth = yearMonth.lengthOfMonth();

            showCalendar(yearMonth, daysInMonth, date.getDayOfMonth());
        } catch (DateTimeParseException e) {
            clearCalendar();
            Text errorText = new Text("Błędny format daty. Użyj formatu RRRR-MM-DD.");
            calendarGrid.add(errorText, 0, 0);
        }
    }

    private void showCalendar(YearMonth yearMonth, int daysInMonth, int selectedDay) {
        clearCalendar();

        String[] daysOfWeek = {"Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"};
        for (int i = 0; i < daysOfWeek.length; i++) {
            Text day = new Text(daysOfWeek[i]);
            calendarGrid.add(day, i, 0);
        }

        LocalDate firstOfMonth = yearMonth.atDay(1);
        int firstDayOfWeek = firstOfMonth.getDayOfWeek().getValue();

        for (int day = 1; day <= daysInMonth; day++) {
            Button dayButton = new Button(String.valueOf(day));
            dayButton.setOnAction(event -> {
                if (selectedDayButton != null) {
                    selectedDayButton.setStyle("");
                }
                dayButton.setStyle("-fx-background-color: lightblue; -fx-border-color: blue;");
                selectedDayButton = dayButton;
            });

            int column = (firstDayOfWeek + day - 2) % 7;
            int row = (firstDayOfWeek + day - 2) / 7 + 1;
            calendarGrid.add(dayButton, column, row);

            if (day == selectedDay) {
                dayButton.setStyle("-fx-background-color: lightblue; -fx-border-color: blue;");
                selectedDayButton = dayButton;
            }
        }
    }

    private void clearCalendar() {
        calendarGrid.getChildren().clear();
        selectedDayButton = null;
    }
}
