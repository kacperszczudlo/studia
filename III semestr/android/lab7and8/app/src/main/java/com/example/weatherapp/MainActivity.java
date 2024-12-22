package com.example.weatherapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    EditText cityInput;
    Button checkWeatherButton;
    TextView noInternetBanner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        cityInput = findViewById(R.id.cityInput);
        checkWeatherButton = findViewById(R.id.checkWeatherButton);
        noInternetBanner = findViewById(R.id.noInternetBanner);

        SharedPreferences sharedPreferences = getSharedPreferences("WeatherAppPrefs", MODE_PRIVATE);
        String lastCity = sharedPreferences.getString("LAST_CITY", "");
        if (!lastCity.isEmpty()) {
            cityInput.setText(lastCity);
        }

        updateUIBasedOnInternet();

        checkWeatherButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!isNetworkAvailable()) {
                    // Gdy nie ma internetu, możesz również wyświetlić komunikat Toast
                    Toast.makeText(MainActivity.this, "No internet connection. Cannot check the weather.", Toast.LENGTH_SHORT).show();
                    updateUIBasedOnInternet();
                    return;
                }

                String city = cityInput.getText().toString().trim();
                if (city.isEmpty()) {
                    Toast.makeText(MainActivity.this, "Please enter a city name", Toast.LENGTH_SHORT).show();
                } else {
                    SharedPreferences.Editor editor = sharedPreferences.edit();
                    editor.putString("LAST_CITY", city);
                    editor.apply();

                    Intent intent = new Intent(MainActivity.this, WeatherActivity.class);
                    intent.putExtra("CITY_NAME", city);
                    startActivity(intent);
                }
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        updateUIBasedOnInternet();
    }

    private void updateUIBasedOnInternet() {
        boolean hasInternet = isNetworkAvailable();
        checkWeatherButton.setEnabled(hasInternet);
        noInternetBanner.setVisibility(hasInternet ? View.GONE : View.VISIBLE);
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

