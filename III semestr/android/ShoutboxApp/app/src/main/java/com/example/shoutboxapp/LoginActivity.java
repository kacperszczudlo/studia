package com.example.shoutboxapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

public class LoginActivity extends AppCompatActivity {
    private static final String TAG = "LoginActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate called");
        setContentView(R.layout.activity_login);

        ImageView imageView = findViewById(R.id.imageView);
        TextView textView = findViewById(R.id.textView);
        EditText editTextLogin = findViewById(R.id.editTextLogin);
        Button buttonSetLogin = findViewById(R.id.buttonSetLogin);

        // Sprawdzenie, czy login już istnieje w SharedPreferences
        SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(this);
        String existingLogin = prefs.getString("user_login", null);
        if (existingLogin != null) {
            Log.d(TAG, "Login already set, launching MainActivity");
            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
            startActivity(intent);
            finish();
            return;
        }

        buttonSetLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    String login = editTextLogin.getText().toString();
                    if (login.isEmpty()) {
                        editTextLogin.setError("Login is required");
                        return;
                    }
                    Log.d(TAG, "Login: " + login);
                    SharedPreferences.Editor editor = prefs.edit();
                    editor.putString("user_login", login);
                    editor.apply();

                    Log.d(TAG, "Login saved, launching MainActivity");
                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                } catch (Exception e) {
                    Log.e(TAG, "Error setting login: ", e);
                }
            }
        });
    }
}
