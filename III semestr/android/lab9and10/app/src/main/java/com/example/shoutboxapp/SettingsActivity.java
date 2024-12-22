package com.example.shoutboxapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AppCompatActivity;

public class SettingsActivity extends AppCompatActivity {

    private EditText editTextLogin;
    private Button buttonSetLogin;
    private SharedPreferences sharedPreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        // Inicjalizacja widoków
        editTextLogin = findViewById(R.id.editTextLogin);
        buttonSetLogin = findViewById(R.id.buttonSetLogin);

        // SharedPreferences do zapisu loginu
        sharedPreferences = getSharedPreferences("AppPrefs", Context.MODE_PRIVATE);

        // Obsługa przycisku zapisu loginu
        buttonSetLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String login = editTextLogin.getText().toString().trim();
                if (!login.isEmpty()) {
                    // Zapis loginu do SharedPreferences
                    sharedPreferences.edit().putString("user_login", login).apply();

                    // Przejście do głównej aktywności
                    Intent intent = new Intent(SettingsActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                }
            }
        });
    }
}