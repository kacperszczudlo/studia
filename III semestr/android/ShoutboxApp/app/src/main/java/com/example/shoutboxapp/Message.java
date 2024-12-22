package com.example.shoutboxapp;

public class Message {
    private String id;
    private String login;
    private String content;
    private String date; // Format pełny np. "2024-12-16T14:36:36.360Z"

    public Message(String id, String login, String content, String date) {
        this.id = id;
        this.login = login;
        this.content = content;
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public String getContent() {
        return content;
    }

    public String getDate() {
        return date;
    }

    // Dodanie metody do pobierania samej godziny
    public String getTime() {
        if (date != null && date.contains("T")) {
            return date.split("T")[1].split("\\.")[0]; // Pobiera tylko HH:MM:SS z daty
        }
        return "";
    }

}


