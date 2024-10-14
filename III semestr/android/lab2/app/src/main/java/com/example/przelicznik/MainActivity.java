package com.example.przelicznik;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    private EditText inputMeters;
    private RadioGroup radioGroupUnits;
    private TextView textViewResult;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        inputMeters = findViewById(R.id.inputMeters);
        radioGroupUnits = findViewById(R.id.radioGroupUnits);
        textViewResult = findViewById(R.id.textViewResult);
    }

    public void convertMeters(View view) {
        String metersText = inputMeters.getText().toString();

        if (!metersText.isEmpty()) {
            double meters = Double.parseDouble(metersText);
            double result = 0;
            String unit = "";

            int selectedUnitId = radioGroupUnits.getCheckedRadioButtonId();
            if (selectedUnitId == R.id.radioButtonCm) {
                result = meters * 100;
                unit = getString(R.string.unit_cm);
            } else if (selectedUnitId == R.id.radioButtonKm) {
                result = meters / 1000;
                unit = getString(R.string.unit_km);
            } else if (selectedUnitId == R.id.radioButtonMile) {
                result = meters / 1609.34;
                unit = getString(R.string.unit_mile);
            } else if (selectedUnitId == R.id.radioButtonLy) {
                result = meters / 9.461e+15;
                unit = getString(R.string.unit_ly);
            }

            textViewResult.setText("Wynik: " + result + " " + unit);
        } else {
            textViewResult.setText(getString(R.string.input_error));
        }
    }
}
