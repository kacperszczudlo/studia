package kalendarz;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Main extends Application {

    @Override
    public void start(Stage primaryStage) {
        CalendarView calendarView = new CalendarView();
        Scene scene = new Scene(calendarView.getView(), 800, 600);

        primaryStage.setTitle("Kalendarz");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
