package com.example.shoutboxapp;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.navigation.NavigationView;

import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.OutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private MessageAdapter adapter;
    private List<Message> messageList = new ArrayList<>();

    private DrawerLayout drawerLayout;
    private NavigationView navigationView;
    private Toolbar toolbar;

    private EditText editTextMessage;
    private Button buttonSend;

    private SwipeRefreshLayout swipeRefreshLayout; // Pull-to-refresh
    private Timer timer; // Automatyczne odświeżanie

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Toolbar
        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Shoutbox");

        // Navigation Drawer
        drawerLayout = findViewById(R.id.drawer_layout);
        navigationView = findViewById(R.id.nav_view);

        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawerLayout, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                int id = item.getItemId();
                if (id == R.id.nav_settings) {
                    Intent intent = new Intent(MainActivity.this, SettingsActivity.class);
                    startActivity(intent);
                }
                drawerLayout.closeDrawers();
                return true;
            }
        });

        // RecyclerView
        recyclerView = findViewById(R.id.recyclerViewComments);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new MessageAdapter(messageList, this::openEditCommentActivity);
        recyclerView.setAdapter(adapter);

        // SwipeRefreshLayout
        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout);
        swipeRefreshLayout.setOnRefreshListener(this::fetchComments);

        // Pole i przycisk do wysyłania wiadomości
        editTextMessage = findViewById(R.id.editTextMessage);
        buttonSend = findViewById(R.id.buttonSend);

        buttonSend.setOnClickListener(v -> {
            String messageContent = editTextMessage.getText().toString().trim();
            if (!messageContent.isEmpty()) {
                sendMessage(messageContent);
                editTextMessage.setText("");
            } else {
                Toast.makeText(MainActivity.this, "Message cannot be empty!", Toast.LENGTH_SHORT).show();
            }
        });

        // Wczytaj komentarze
        fetchComments();

        // Automatyczne odświeżanie co 60 sekund
        timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                fetchComments();
            }
        }, 60000, 60000); // Co 60 sekund
    }

    // Metoda wczytująca komentarze z API
    private void fetchComments() {
        new Thread(() -> {
            try {
                URL url = new URL("https://tgryl.pl/shoutbox/messages?last=10");
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");

                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    StringBuilder response = new StringBuilder();
                    String line;

                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                    reader.close();

                    JSONArray jsonArray = new JSONArray(response.toString());
                    messageList.clear();
                    for (int i = 0; i < jsonArray.length(); i++) {
                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                        String id = jsonObject.getString("id"); // Pobranie ID
                        String login = jsonObject.getString("login");
                        String content = jsonObject.getString("content");
                        String date = jsonObject.getString("date");
                        messageList.add(new Message(id, login, content, date));
                    }

                    runOnUiThread(() -> {
                        adapter.notifyDataSetChanged();
                        swipeRefreshLayout.setRefreshing(false);
                    });
                } else {
                    Log.e("API_ERROR", "Kod odpowiedzi: " + responseCode);
                    runOnUiThread(() -> swipeRefreshLayout.setRefreshing(false));
                }
            } catch (Exception e) {
                e.printStackTrace();
                Log.e("API_ERROR", "Błąd: " + e.getMessage());
                runOnUiThread(() -> swipeRefreshLayout.setRefreshing(false));
            }
        }).start();
    }

    // Metoda wysyłająca nową wiadomość
    private void sendMessage(String content) {
        new Thread(() -> {
            try {
                URL url = new URL("https://tgryl.pl/shoutbox/message");
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                SharedPreferences sharedPreferences = getSharedPreferences("AppPrefs", Context.MODE_PRIVATE);
                String userLogin = sharedPreferences.getString("user_login", "Anonymous");

                String jsonPayload = "{ \"content\": \"" + content + "\", \"login\": \"" + userLogin + "\" }";

                OutputStream os = connection.getOutputStream();
                os.write(jsonPayload.getBytes());
                os.flush();
                os.close();

                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK || responseCode == HttpURLConnection.HTTP_CREATED) {
                    runOnUiThread(() -> {
                        Toast.makeText(MainActivity.this, "Message sent!", Toast.LENGTH_SHORT).show();
                        fetchComments(); // Odświeżenie listy komentarzy
                        Log.d("UPDATE_LIST", "Lista komentarzy została odświeżona po dodaniu nowego komentarza.");
                    });
                } else {
                    Log.e("API_ERROR", "Error: " + responseCode);
                    runOnUiThread(() -> Toast.makeText(MainActivity.this, "Failed to send message.", Toast.LENGTH_SHORT).show());
                }

                connection.disconnect();

            } catch (Exception e) {
                e.printStackTrace();
                Log.e("API_ERROR", "Exception: " + e.getMessage());
                runOnUiThread(() -> Toast.makeText(MainActivity.this, "An error occurred.", Toast.LENGTH_SHORT).show());
            }
        }).start();
    }

    // Metoda otwierająca EditCommentActivity
    private void openEditCommentActivity(Message message) {
        Intent intent = new Intent(this, EditCommentActivity.class);
        intent.putExtra("commentId", message.getId());
        intent.putExtra("commentLogin", message.getLogin());
        intent.putExtra("commentContent", message.getContent());
        startActivityForResult(intent, 1);
    }

    // Obsługa wyniku po edycji komentarza
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        Log.d("ON_ACTIVITY_RESULT", "requestCode: " + requestCode + ", resultCode: " + resultCode);

        if (requestCode == 1 && resultCode == RESULT_OK) {
            Log.d("ON_ACTIVITY_RESULT", "Odświeżam listę komentarzy...");
            fetchComments(); // Wymuszenie pobrania komentarzy z API
        }
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (timer != null) {
            timer.cancel(); // Zatrzymanie automatycznego odświeżania
        }
    }
}
