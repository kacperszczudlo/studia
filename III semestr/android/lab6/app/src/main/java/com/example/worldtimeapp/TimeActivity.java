package com.example.worldtimeapp;

import android.os.Bundle;
import android.os.Handler;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.util.Locale;

public class TimeActivity extends AppCompatActivity {
    private TextView tvLocalTime, tvNewYorkTime, tvLondonTime, tvTokyoTime;
    private Handler handler = new Handler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_time);

        // Inicjalizacja TextView dla każdej strefy czasowej
        tvLocalTime = findViewById(R.id.tvLocalTime);
        tvNewYorkTime = findViewById(R.id.tvNewYorkTime);
        tvLondonTime = findViewById(R.id.tvLondonTime);
        tvTokyoTime = findViewById(R.id.tvTokyoTime);

        // Rozpocznij dynamiczne odświeżanie czasu
        startUpdatingTime();
    }

    private void startUpdatingTime() {
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                updateTimes();
                handler.postDelayed(this, 1000); // Odświeżanie co 1 sekundę
            }
        }, 0);
    }

    private void updateTimes() {
        // Ustawienie formatu czasu (HH:mm:ss)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss", Locale.getDefault());

        // Lokalny czas (automatycznie obsługuje zmianę czasu)
        ZonedDateTime localTime = ZonedDateTime.now();
        tvLocalTime.setText("Mobile time\n" + localTime.format(formatter));

        // Czas w Nowym Jorku (automatycznie obsługuje zmianę czasu)
        ZonedDateTime newYorkTime = ZonedDateTime.now(ZoneId.of("America/New_York"));
        tvNewYorkTime.setText("New York\n" + newYorkTime.format(formatter));

        // Czas w Londynie (automatycznie obsługuje zmianę czasu)
        ZonedDateTime londonTime = ZonedDateTime.now(ZoneId.of("Europe/London"));
        tvLondonTime.setText("London\n" + londonTime.format(formatter));

        // Czas w Tokio (zawsze standardowy czas, brak zmiany czasu)
        ZonedDateTime tokyoTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
        tvTokyoTime.setText("Tokyo\n" + tokyoTime.format(formatter));
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // Zatrzymanie odświeżania, aby uniknąć wycieków pamięci
        handler.removeCallbacksAndMessages(null);
    }
}
