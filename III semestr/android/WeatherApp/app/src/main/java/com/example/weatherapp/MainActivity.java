package com.example.weatherapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private EditText inputCity;
    private Button buttonGetWeather;
    private SharedPreferences sharedPreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        inputCity = findViewById(R.id.inputCity);
        buttonGetWeather = findViewById(R.id.buttonGetWeather);

        sharedPreferences = getSharedPreferences("WeatherApp", MODE_PRIVATE);
        String lastCity = sharedPreferences.getString("LAST_CITY", "");
        if (!lastCity.isEmpty()) {
            inputCity.setText(lastCity);
        }

        buttonGetWeather.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String cityName = inputCity.getText().toString();
                SharedPreferences.Editor editor = sharedPreferences.edit();
                editor.putString("LAST_CITY", cityName);
                editor.apply();

                Intent intent = new Intent(MainActivity.this, WeatherActivity.class);
                intent.putExtra("CITY_NAME", cityName);
                startActivity(intent);
            }
        });
    }
}
