package com.example.shoutboxapp;

public class Message {
    private String content;
    private String login;

    public Message(String content, String login) {
        this.content = content;
        this.login = login;
    }

    public String getContent() {
        return content;
    }

    public String getLogin() {
        return login;
    }
}
