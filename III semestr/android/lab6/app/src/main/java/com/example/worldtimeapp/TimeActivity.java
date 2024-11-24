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

        tvLocalTime = findViewById(R.id.tvLocalTime);
        tvNewYorkTime = findViewById(R.id.tvNewYorkTime);
        tvLondonTime = findViewById(R.id.tvLondonTime);
        tvTokyoTime = findViewById(R.id.tvTokyoTime);

        startUpdatingTime();
    }

    private void startUpdatingTime() {
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                updateTimes();
                handler.postDelayed(this, 1000);
            }
        }, 0);
    }

    private void updateTimes() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss", Locale.getDefault());
        ZonedDateTime warsawTime = ZonedDateTime.now(ZoneId.of("Europe/Warsaw"));
        tvLocalTime.setText(warsawTime.format(formatter));
        ZonedDateTime newYorkTime = ZonedDateTime.now(ZoneId.of("America/New_York"));
        tvNewYorkTime.setText(newYorkTime.format(formatter));
        ZonedDateTime londonTime = ZonedDateTime.now(ZoneId.of("Europe/London"));
        tvLondonTime.setText(londonTime.format(formatter));
        ZonedDateTime tokyoTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
        tvTokyoTime.setText(tokyoTime.format(formatter));
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        handler.removeCallbacksAndMessages(null);
    }
}