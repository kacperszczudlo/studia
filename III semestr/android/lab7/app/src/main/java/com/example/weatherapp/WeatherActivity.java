package com.example.weatherapp;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class WeatherActivity extends AppCompatActivity {

    private TextView cityName;
    private TextView currentTime;
    private TextView weatherInfo;
    private TextView humidityValue;
    private TextView tempMin;
    private TextView tempMax;
    private TextView pressureValue;
    private ImageView weatherIcon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weather);

        cityName = findViewById(R.id.cityName);
        currentTime = findViewById(R.id.currentTime);
        weatherInfo = findViewById(R.id.weatherInfo);
        humidityValue = findViewById(R.id.humidityValue);
        tempMin = findViewById(R.id.tempMin);
        tempMax = findViewById(R.id.tempMax);
        pressureValue = findViewById(R.id.pressureValue);
        weatherIcon = findViewById(R.id.weatherIcon);

        // Ustaw nazwę miasta
        String cityNameStr = getIntent().getStringExtra("cityName");
        cityName.setText(cityNameStr);

        // Ustaw aktualną godzinę
        String currentTimeStr = new SimpleDateFormat("HH:mm", Locale.getDefault()).format(new Date());
        currentTime.setText(currentTimeStr);

        String weatherData = getIntent().getStringExtra("weatherData");
        try {
            JSONObject jsonObject = new JSONObject(weatherData);
            String temp = jsonObject.getJSONObject("main").getString("temp");
            String humidity = jsonObject.getJSONObject("main").getString("humidity");
            String pressure = jsonObject.getJSONObject("main").getString("pressure");
            String tempMinStr = jsonObject.getJSONObject("main").getString("temp_min");
            String tempMaxStr = jsonObject.getJSONObject("main").getString("temp_max");

            weatherInfo.setText(temp + "°C");
            humidityValue.setText(humidity + "%");
            tempMin.setText(tempMinStr + "°C");
            tempMax.setText(tempMaxStr + "°C");
            pressureValue.setText(pressure + " hPa");

            // Pobierz i ustaw ikonę pogodową
            String icon = jsonObject.getJSONArray("weather").getJSONObject(0).getString("icon");
            String iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            new DownloadImageTask(weatherIcon).execute(iconUrl);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private static class DownloadImageTask extends AsyncTask<String, Void, Bitmap> {
        ImageView bmImage;

        public DownloadImageTask(ImageView bmImage) {
            this.bmImage = bmImage;
        }

        protected Bitmap doInBackground(String... urls) {
            String urlDisplay = urls[0];
            Bitmap bitmap = null;
            try {
                URL url = new URL(urlDisplay);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setDoInput(true);
                connection.connect();
                InputStream input = connection.getInputStream();
                bitmap = BitmapFactory.decodeStream(input);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return bitmap;
        }

        protected void onPostExecute(Bitmap result) {
            if (result != null) {
                bmImage.setImageBitmap(result);
            }
        }
    }
}
