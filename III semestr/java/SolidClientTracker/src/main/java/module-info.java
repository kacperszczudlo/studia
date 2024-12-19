module SolidClientTracker {
    requires javafx.controls;
    requires javafx.fxml;
    requires spring.context;
    requires spring.beans;
    requires spring.core;

    opens spring.dao.csv to javafx.fxml, spring.core;
    opens spring.model to javafx.fxml, spring.core;
    opens spring.service to javafx.fxml, spring.core;
    opens spring.app to javafx.fxml, spring.core;

    exports spring.dao;
    exports spring.dao.csv;
    exports spring.model;
    exports spring.service;
    exports spring.app;
}
