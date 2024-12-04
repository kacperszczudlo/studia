package com.example.weatherapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.content.Context;
import android.content.SharedPreferences;

import androidx.appcompat.app.AppCompatActivity;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends AppCompatActivity {

    private EditText cityInput;
    private Button btnGetWeather;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        cityInput = findViewById(R.id.cityInput);
        btnGetWeather = findViewById(R.id.btnGetWeather);

        // Wczytaj ostatnie zapisane miasto
        SharedPreferences sharedPref = getSharedPreferences("WeatherAppPreferences", Context.MODE_PRIVATE);
        String lastCity = sharedPref.getString("lastCity", "");
        if (!lastCity.isEmpty()) {
            cityInput.setText(lastCity);
        }

        btnGetWeather.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String cityName = cityInput.getText().toString();
                fetchWeatherData(cityName);
            }
        });
    }

    private void fetchWeatherData(String cityName) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    String apiKey = "749561a315b14523a8f5f1ef95e45864";
                    String urlStr = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric";
                    URL url = new URL(urlStr);
                    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                    urlConnection.setRequestMethod("GET");

                    int responseCode = urlConnection.getResponseCode();
                    if (responseCode == 200) {
                        BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                        String inputLine;
                        StringBuilder content = new StringBuilder();

                        while ((inputLine = in.readLine()) != null) {
                            content.append(inputLine);
                        }

                        in.close();
                        urlConnection.disconnect();

                        runOnUiThread(() -> {
                            saveCityName(cityName);
                            Intent intent = new Intent(MainActivity.this, WeatherActivity.class);
                            intent.putExtra("weatherData", content.toString());
                            intent.putExtra("cityName", cityName);
                            startActivity(intent);
                        });
                    } else {
                        runOnUiThread(() -> {
                            Toast.makeText(MainActivity.this, "Invalid city name. Please try again.", Toast.LENGTH_SHORT).show();
                        });
                    }
                } catch (Exception e) {
                    runOnUiThread(() -> Toast.makeText(MainActivity.this, "Error: " + e.getMessage(), Toast.LENGTH_SHORT).show());
                }
            }
        }).start();
    }

    private void saveCityName(String cityName) {
        SharedPreferences sharedPref = getSharedPreferences("WeatherAppPreferences", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("lastCity", cityName);
        editor.apply();
    }
}
