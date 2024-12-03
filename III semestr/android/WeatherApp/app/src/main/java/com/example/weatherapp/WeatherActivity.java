package com.example.weatherapp;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class WeatherActivity extends AppCompatActivity {

    private TextView weatherInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weather);

        weatherInfo = findViewById(R.id.weatherInfo);

        Intent intent = getIntent();
        String cityName = intent.getStringExtra("CITY_NAME");

        new FetchWeatherTask().execute(cityName);
    }

    private class FetchWeatherTask extends AsyncTask<String, Void, String> {

        @Override
        protected String doInBackground(String... params) {
            String cityName = params[0];
            String apiKey = "749561a315b14523a8f5f1ef95e45864";
            String urlString = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",pl&appid=" + apiKey + "&units=metric";

            try {
                URL url = new URL(urlString);
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setRequestMethod("GET");

                BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                String inputLine;
                StringBuilder content = new StringBuilder();
                while ((inputLine = in.readLine()) != null) {
                    content.append(inputLine);
                }

                in.close();
                urlConnection.disconnect();
                return content.toString();

            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        @Override
        protected void onPostExecute(String result) {
            if (result != null) {
                try {
                    JSONObject jsonObject = new JSONObject(result);
                    JSONObject main = jsonObject.getJSONObject("main");
                    String temperature = main.getString("temp");
                    JSONArray weatherArray = jsonObject.getJSONArray("weather");
                    String description = weatherArray.getJSONObject(0).getString("description");

                    String weatherInfoText = "Temperature: " + temperature + "°C\n" + "Description: " + description;
                    weatherInfo.setText(weatherInfoText);

                } catch (JSONException e) {
                    e.printStackTrace();
                    weatherInfo.setText("Error parsing data.");
                }
            } else {
                weatherInfo.setText("Error retrieving data. Please check the city name.");
                Intent intent = new Intent(WeatherActivity.this, MainActivity.class);
                startActivity(intent);
            }
        }
    }
}
