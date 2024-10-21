package com.example.suchar;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import java.util.Random;

public class MainActivity extends AppCompatActivity {

    private TextView jokeTextView;
    private Button generateButton;
    private String[] jokes;
    private int lastJokeIndex = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        jokeTextView = findViewById(R.id.jokeTextView);
        generateButton = findViewById(R.id.generateButton);

        jokes = new String[] {
                getString(R.string.joke1),
                getString(R.string.joke2),
                getString(R.string.joke3)
        };

        generateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int newJokeIndex;

                do {
                    Random random = new Random();
                    newJokeIndex = random.nextInt(jokes.length);
                } while (newJokeIndex == lastJokeIndex);

                jokeTextView.setText(jokes[newJokeIndex]);

                lastJokeIndex = newJokeIndex;
            }
        });
    }
}
