module org.example {
    requires javafx.controls;
    requires javafx.fxml;

    opens calendar to javafx.fxml;
    exports calendar;
}
