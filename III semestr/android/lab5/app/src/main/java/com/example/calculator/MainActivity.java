package com.example.calculator;

import androidx.appcompat.app.AppCompatActivity;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import org.mariuszgromada.math.mxparser.Expression;
import java.text.DecimalFormat;

public class MainActivity extends AppCompatActivity {

    private EditText display;
    private boolean isNewOp = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
            setContentView(R.layout.landscape_activity);
        } else {
            setContentView(R.layout.portrait_activity);
        }

        display = findViewById(R.id.editTextDisplay);

        Button[] numberButtons = {
                findViewById(R.id.button0), findViewById(R.id.button1),
                findViewById(R.id.button2), findViewById(R.id.button3),
                findViewById(R.id.button4), findViewById(R.id.button5),
                findViewById(R.id.button6), findViewById(R.id.button7),
                findViewById(R.id.button8), findViewById(R.id.button9)
        };

        for (Button btn : numberButtons) {
            btn.setOnClickListener(this::onNumberClick);
        }

        findViewById(R.id.buttonAdd).setOnClickListener(v -> onOperatorClick("+"));
        findViewById(R.id.buttonSubtract).setOnClickListener(v -> onOperatorClick("-"));
        findViewById(R.id.buttonMultiply).setOnClickListener(v -> onOperatorClick("*"));
        findViewById(R.id.buttonDivide).setOnClickListener(v -> onOperatorClick("/"));
        findViewById(R.id.buttonEqual).setOnClickListener(this::onEqualClick);
        findViewById(R.id.buttonClear).setOnClickListener(v -> display.setText("0"));
        findViewById(R.id.buttonDelete).setOnClickListener(v -> onDeleteClick());
        findViewById(R.id.buttonPercent).setOnClickListener(v -> onPercentClick());
        findViewById(R.id.buttonNegate).setOnClickListener(v -> onNegateClick());

        if (getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
            findViewById(R.id.buttonLog10).setOnClickListener(v -> onLog10Click());
            findViewById(R.id.buttonFactorial).setOnClickListener(v -> onFactorialClick());
            findViewById(R.id.buttonSquareRoot).setOnClickListener(v -> onSquareRootClick());
            findViewById(R.id.buttonPower3).setOnClickListener(v -> onPower3Click());
            findViewById(R.id.buttonPower2).setOnClickListener(v -> onPower2Click());
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        // zapisanie stanu wyswietlacza i operacji
        super.onSaveInstanceState(outState);
        outState.putString("displayText", display.getText().toString());
        outState.putBoolean("isNewOp", isNewOp);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        // przywracanie aktualnego stanu wyswietlacza i operacji
        super.onRestoreInstanceState(savedInstanceState);
        display.setText(savedInstanceState.getString("displayText", "0"));
        isNewOp = savedInstanceState.getBoolean("isNewOp", true);
    }

    private void onNumberClick(View v) {
        // dodanie kliknietej cycfry do wyswietlacza
        Button button = (Button) v;
        if (isNewOp) display.setText("");
        isNewOp = false;
        String value = display.getText().toString() + button.getText().toString();
        display.setText(value);
    }

    private void onOperatorClick(String operator) {
        // dodanie operatora do wyswietlacza
        if (isNewOp) return;
        String currentText = display.getText().toString();
        display.setText(currentText + operator);
        isNewOp = false;
    }

    private void onEqualClick(View v) {
        // wynik i wyswietlanie
        String expressionText = display.getText().toString();
        Expression expression = new Expression(expressionText);
        double result = expression.calculate();
        DecimalFormat decimalFormat = new DecimalFormat("#.########");
        display.setText(Double.isNaN(result) ? "Error" : decimalFormat.format(result));
        isNewOp = true;
    }

    private void onPercentClick() {
        // przelicza na procent
        double value = Double.parseDouble(display.getText().toString()) / 100;
        display.setText(String.valueOf(value));
    }

    private void onNegateClick() {
        // negacja
        double value = Double.parseDouble(display.getText().toString()) * -1;
        display.setText(String.valueOf(value));
    }

    private void onDeleteClick() {
        // usuwanie
        String current = display.getText().toString();
        if (!current.equals("0") && current.length() > 1) {
            display.setText(current.substring(0, current.length() - 1));
        } else {
            display.setText("0");
        }
    }

    private void onLog10Click() {
        // log10
        double value = Double.parseDouble(display.getText().toString());
        display.setText(String.valueOf(Math.log10(value)));
    }

    private void onFactorialClick() {
        // silnia
        double value = Double.parseDouble(display.getText().toString());
        if (value != (int) value || value < 0) {
            display.setText("Error");
            return;
        }
        int result = 1;
        for (int i = 2; i <= (int) value; i++) {
            result *= i;
        }
        display.setText(String.valueOf(result));
    }

    private void onSquareRootClick() {
        // sqrt
        double value = Double.parseDouble(display.getText().toString());
        display.setText(String.valueOf(Math.sqrt(value)));
    }

    private void onPower3Click() {
        // x^3
        double value = Double.parseDouble(display.getText().toString());
        display.setText(String.valueOf(Math.pow(value, 3)));
    }

    private void onPower2Click() {
        // x^2
        double value = Double.parseDouble(display.getText().toString());
        display.setText(String.valueOf(Math.pow(value, 2)));
    }
}
