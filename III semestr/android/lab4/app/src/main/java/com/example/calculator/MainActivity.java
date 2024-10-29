package com.example.calculator;

import androidx.appcompat.app.AppCompatActivity;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    private EditText display;
    private double firstValue = 0;
    private String currentOperator = "";
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
                findViewById(R.id.button0),
                findViewById(R.id.button1),
                findViewById(R.id.button2),
                findViewById(R.id.button3),
                findViewById(R.id.button4),
                findViewById(R.id.button5),
                findViewById(R.id.button6),
                findViewById(R.id.button7),
                findViewById(R.id.button8),
                findViewById(R.id.button9)
        };

        for (Button btn : numberButtons) {
            btn.setOnClickListener(this::onNumberClick);
        }

        findViewById(R.id.buttonAdd).setOnClickListener(this::onOperatorClick);
        findViewById(R.id.buttonSubtract).setOnClickListener(this::onOperatorClick);
        findViewById(R.id.buttonMultiply).setOnClickListener(this::onOperatorClick);
        findViewById(R.id.buttonDivide).setOnClickListener(this::onOperatorClick);
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

    private void onNumberClick(View v) {
        Button button = (Button) v;
        if (isNewOp) display.setText("");
        isNewOp = false;
        String value = display.getText().toString() + button.getText().toString();
        display.setText(value);
    }

    private void onOperatorClick(View v) {
        Button button = (Button) v;
        firstValue = Double.parseDouble(display.getText().toString());
        currentOperator = button.getText().toString();
        isNewOp = true;
    }

    private void onEqualClick(View v) {
        double secondValue = Double.parseDouble(display.getText().toString());
        double result = 0;
        switch (currentOperator) {
            case "+": result = firstValue + secondValue; break;
            case "-": result = firstValue - secondValue; break;
            case "x": result = firstValue * secondValue; break;
            case "/": result = firstValue / secondValue; break;
        }
        display.setText(String.valueOf(result));
        isNewOp = true;
    }

    private void onPercentClick() {
        double value = Double.parseDouble(display.getText().toString()) / 100;
        display.setText(String.valueOf(value));
    }

    private void onNegateClick() {
        double value = Double.parseDouble(display.getText().toString()) * -1;
        display.setText(String.valueOf(value));
    }

    private void onDeleteClick() {
        String current = display.getText().toString();
        if (!current.equals("0") && current.length() > 1) {
            display.setText(current.substring(0, current.length() - 1));
        } else {
            display.setText("0");
        }
    }

    private void onLog10Click() {
        double value = Double.parseDouble(display.getText().toString());
        display.setText(String.valueOf(Math.log10(value)));
    }

    private void onFactorialClick() {
        int value = Integer.parseInt(display.getText().toString());
        int result = 1;
        for (int i = 2; i <= value; i++) {
            result *= i;
        }
        display.setText(String.valueOf(result));
    }

    private void onSquareRootClick() {
        double value = Double.parseDouble(display.getText().toString());
        display.setText(String.valueOf(Math.sqrt(value)));
    }

    private void onPower3Click() {
        double value = Double.parseDouble(display.getText().toString());
        display.setText(String.valueOf(Math.pow(value, 3)));
    }

    private void onPower2Click() {
        double value = Double.parseDouble(display.getText().toString());
        display.setText(String.valueOf(Math.pow(value, 2)));
    }
}
