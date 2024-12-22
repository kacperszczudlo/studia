package com.example.weatherapp;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;

public class WeatherActivity extends AppCompatActivity {

    TextView cityName, currentTimeTextView, temperature, pressure, humidity, tempMin, tempMax;
    ImageView weatherIcon;
    private SwipeRefreshLayout swipeRefreshLayout;
    private String city;

    private Handler handler = new Handler(Looper.getMainLooper());
    private Runnable refreshRunnable;
    private static final long REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minut

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_weather);

        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout);

        cityName = findViewById(R.id.cityName);
        currentTimeTextView = findViewById(R.id.currentTime);
        temperature = findViewById(R.id.temperature);
        pressure = findViewById(R.id.pressure);
        humidity = findViewById(R.id.humidity);
        tempMin = findViewById(R.id.tempMin);
        tempMax = findViewById(R.id.tempMax);
        weatherIcon = findViewById(R.id.weatherIcon);

        city = getIntent().getStringExtra("CITY_NAME");

        // Sprawdzamy dostęp do Internetu
        if (!isNetworkAvailable()) {
            Toast.makeText(this, "No internet connection. Cannot fetch weather data.", Toast.LENGTH_SHORT).show();
            swipeRefreshLayout.setEnabled(false);
            return;
        } else {
            fetchWeatherData(city);
        }

        swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                if (!isNetworkAvailable()) {
                    Toast.makeText(WeatherActivity.this, "No internet connection. Cannot refresh.", Toast.LENGTH_SHORT).show();
                    swipeRefreshLayout.setRefreshing(false);
                } else {
                    fetchWeatherData(city);
                }
            }
        });

        refreshRunnable = new Runnable() {
            @Override
            public void run() {
                if (isNetworkAvailable()) {
                    fetchWeatherData(city);
                    handler.postDelayed(this, REFRESH_INTERVAL);
                } else {
                    // Brak sieci, nie odświeżaj dalej
                    Toast.makeText(WeatherActivity.this, "No internet connection. Stopping automatic refresh.", Toast.LENGTH_SHORT).show();
                }
            }
        };
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Jeśli jest internet, uruchamiamy automatyczne odświeżanie
        if (isNetworkAvailable()) {
            handler.postDelayed(refreshRunnable, REFRESH_INTERVAL);
        } else {
            swipeRefreshLayout.setEnabled(false);
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        handler.removeCallbacks(refreshRunnable);
    }

    private void fetchWeatherData(String city) {
        if (!isNetworkAvailable()) {
            Toast.makeText(this, "No internet connection.", Toast.LENGTH_SHORT).show();
            swipeRefreshLayout.setRefreshing(false);
            return;
        }

        try {
            String encodedCity = java.net.URLEncoder.encode(city, "UTF-8");
            String url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodedCity + "&units=metric&appid=749561a315b14523a8f5f1ef95e45864";

            RequestQueue requestQueue = Volley.newRequestQueue(this);
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(
                    Request.Method.GET, url, null,
                    new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            try {
                                String name = response.getString("name");
                                JSONObject main = response.getJSONObject("main");
                                double temp = main.getDouble("temp");
                                int press = main.getInt("pressure");
                                int hum = main.getInt("humidity");
                                double minTemp = main.getDouble("temp_min");
                                double maxTemp = main.getDouble("temp_max");

                                JSONObject weatherObject = response.getJSONArray("weather").getJSONObject(0);
                                String icon = weatherObject.getString("icon");

                                String currentTime = new java.text.SimpleDateFormat("HH:mm", java.util.Locale.getDefault()).format(new java.util.Date());

                                cityName.setText(name);
                                currentTimeTextView.setText(currentTime);
                                temperature.setText(String.format("%.2f °C", temp));
                                pressure.setText(String.format("%d hPa", press));
                                humidity.setText(String.format("%d %%", hum));
                                tempMin.setText(String.format("%.2f °C", minTemp));
                                tempMax.setText(String.format("%.2f °C", maxTemp));

                                String iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                                Picasso.get().load(iconUrl).into(weatherIcon);

                            } catch (JSONException e) {
                                e.printStackTrace();
                                Toast.makeText(WeatherActivity.this, "Error parsing data", Toast.LENGTH_SHORT).show();
                            } finally {
                                swipeRefreshLayout.setRefreshing(false);
                            }
                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            String errorMessage = "Error fetching data";
                            if (error.networkResponse != null && error.networkResponse.statusCode == 404) {
                                errorMessage = "City not found";
                            }
                            Toast.makeText(WeatherActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
                            swipeRefreshLayout.setRefreshing(false);
                            finish();
                        }
                    }
            );

            requestQueue.add(jsonObjectRequest);

        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(this, "Invalid city name", Toast.LENGTH_SHORT).show();
            swipeRefreshLayout.setRefreshing(false);
            finish();
        }
    }

    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager != null) {
            Network activeNetwork = connectivityManager.getActiveNetwork();
            NetworkCapabilities networkCapabilities = connectivityManager.getNetworkCapabilities(activeNetwork);
            return networkCapabilities != null &&
                    networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET);
        }
        return false;
    }
}
