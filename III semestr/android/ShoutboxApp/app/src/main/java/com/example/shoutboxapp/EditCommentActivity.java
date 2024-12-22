package com.example.shoutboxapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class EditCommentActivity extends AppCompatActivity {

    private EditText editTextContent;
    private Button buttonSave;
    private String commentId, commentLogin, commentContent;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_comment);

        // Pobieranie danych z Intent
        Intent intent = getIntent();
        commentId = intent.getStringExtra("commentId");
        commentLogin = intent.getStringExtra("commentLogin");
        commentContent = intent.getStringExtra("commentContent");

        // Inicjalizacja widoków
        editTextContent = findViewById(R.id.editTextContent);
        buttonSave = findViewById(R.id.buttonSave);

        editTextContent.setText(commentContent);

        // Pobranie loginu użytkownika
        SharedPreferences sharedPreferences = getSharedPreferences("AppPrefs", Context.MODE_PRIVATE);
        String currentUserLogin = sharedPreferences.getString("user_login", "Anonymous");

        // Sprawdzanie uprawnień
        if (!currentUserLogin.equals(commentLogin)) {
            Toast.makeText(this, "You are not authorized to edit this comment.", Toast.LENGTH_SHORT).show();
            finish(); // Zamknięcie aktywności
        }

        // Obsługa zapisywania zmian
        buttonSave.setOnClickListener(v -> {
            String newContent = editTextContent.getText().toString().trim();
            if (!newContent.isEmpty()) {
                saveEditedComment(newContent);
            } else {
                Toast.makeText(this, "Content cannot be empty.", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void saveEditedComment(String newContent) {
        new Thread(() -> {
            try {
                // Endpoint API do edycji komentarza
                URL url = new URL("https://tgryl.pl/shoutbox/message/" + commentId);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("PUT");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                // Tworzenie JSON payload
                String jsonPayload = "{ \"content\": \"" + newContent + "\", \"login\": \"" + commentLogin + "\" }";

                // Wysyłanie danych
                OutputStream os = connection.getOutputStream();
                os.write(jsonPayload.getBytes());
                os.flush();
                os.close();

                // Sprawdzenie odpowiedzi serwera
                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    runOnUiThread(() -> {
                        Toast.makeText(EditCommentActivity.this, "Comment updated!", Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(EditCommentActivity.this, MainActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
                        startActivity(intent); // Restartuje MainActivity
                        finish(); // Zamknięcie EditCommentActivity
                    });
                } else {
                    Log.e("API_ERROR", "Response code: " + responseCode);
                    runOnUiThread(() -> Toast.makeText(EditCommentActivity.this, "Failed to update comment.", Toast.LENGTH_SHORT).show());
                }

                connection.disconnect();
            } catch (Exception e) {
                e.printStackTrace();
                Log.e("API_ERROR", "Exception: " + e.getMessage());
                runOnUiThread(() -> Toast.makeText(EditCommentActivity.this, "An error occurred.", Toast.LENGTH_SHORT).show());
            }
        }).start();
    }
}
