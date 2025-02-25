package com.example.lab9na2;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
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
import androidx.recyclerview.widget.ItemTouchHelper;
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
    private String currentUserLogin; // Login aktualnego użytkownika

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Pobierz login aktualnego użytkownika
        SharedPreferences sharedPreferences = getSharedPreferences("AppPrefs", Context.MODE_PRIVATE);
        currentUserLogin = sharedPreferences.getString("user_login", "Anonymous");

        // Toolbar
        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("Shoutbox");

        // Sprawdzenie połączenia przy starcie aplikacji
        if (!isNetworkAvailable()) {
            Toast.makeText(this, "No Internet connection. Some features may not work.", Toast.LENGTH_LONG).show();
        }

        // Navigation Drawer
        drawerLayout = findViewById(R.id.drawer_layout);
        navigationView = findViewById(R.id.nav_view);

        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawerLayout, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        navigationView.setNavigationItemSelectedListener(item -> {
            int id = item.getItemId();
            if (id == R.id.nav_settings) {
                Intent intent = new Intent(MainActivity.this, SettingsActivity.class);
                startActivity(intent);
            }
            drawerLayout.closeDrawers();
            return true;
        });

        // RecyclerView
        recyclerView = findViewById(R.id.recyclerViewComments);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new MessageAdapter(messageList, this::openEditCommentActivity);
        recyclerView.setAdapter(adapter);

        // Dodanie swipe-to-delete
        ItemTouchHelper itemTouchHelper = new ItemTouchHelper(new ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT | ItemTouchHelper.RIGHT) {
            @Override
            public boolean onMove(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder, @NonNull RecyclerView.ViewHolder target) {
                return false;
            }

            @Override
            public void onSwiped(@NonNull RecyclerView.ViewHolder viewHolder, int direction) {
                int position = viewHolder.getAdapterPosition();
                Message message = messageList.get(position);

                // Sprawdzenie, czy użytkownik ma uprawnienia do usunięcia komentarza
                if (message.getLogin().equals(currentUserLogin)) {
                    deleteMessage(message.getId(), position);
                } else {
                    adapter.notifyItemChanged(position); // Przywróć element, jeśli brak uprawnień
                    Toast.makeText(MainActivity.this, "You can only delete your own comments!", Toast.LENGTH_SHORT).show();
                }
            }
        });
        itemTouchHelper.attachToRecyclerView(recyclerView);

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

    // Sprawdzenie dostępności sieci
    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager =
                (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnected();
    }

    private void fetchComments() {
        if (!isNetworkAvailable()) {
            runOnUiThread(() -> Toast.makeText(this, "No Internet connection. Unable to fetch comments.", Toast.LENGTH_SHORT).show());
            swipeRefreshLayout.setRefreshing(false);
            return;
        }

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
                        String id = jsonObject.getString("id");
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

    private void sendMessage(String content) {
        if (!isNetworkAvailable()) {
            runOnUiThread(() -> Toast.makeText(this, "No Internet connection. Unable to send message.", Toast.LENGTH_SHORT).show());
            return;
        }

        new Thread(() -> {
            try {
                URL url = new URL("https://tgryl.pl/shoutbox/message");
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);

                String jsonPayload = "{ \"content\": \"" + content + "\", \"login\": \"" + currentUserLogin + "\" }";

                OutputStream os = connection.getOutputStream();
                os.write(jsonPayload.getBytes());
                os.flush();
                os.close();

                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK || responseCode == HttpURLConnection.HTTP_CREATED) {
                    runOnUiThread(() -> {
                        Toast.makeText(MainActivity.this, "Message sent!", Toast.LENGTH_SHORT).show();
                        fetchComments();
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

    private void deleteMessage(String messageId, int position) {
        if (!isNetworkAvailable()) {
            runOnUiThread(() -> Toast.makeText(this, "No Internet connection. Unable to delete message.", Toast.LENGTH_SHORT).show());
            adapter.notifyItemChanged(position);
            return;
        }

        new Thread(() -> {
            try {
                URL url = new URL("https://tgryl.pl/shoutbox/message/" + messageId);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("DELETE");

                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    runOnUiThread(() -> {
                        messageList.remove(position);
                        adapter.notifyItemRemoved(position);
                        Toast.makeText(MainActivity.this, "Message deleted!", Toast.LENGTH_SHORT).show();
                    });
                } else {
                    Log.e("API_ERROR", "Failed to delete message. Response code: " + responseCode);
                    runOnUiThread(() -> Toast.makeText(MainActivity.this, "Failed to delete message.", Toast.LENGTH_SHORT).show());
                }
            } catch (Exception e) {
                e.printStackTrace();
                Log.e("API_ERROR", "Exception while deleting message: " + e.getMessage());
            }
        }).start();
    }

    private void openEditCommentActivity(Message message) {
        Intent intent = new Intent(this, EditCommentActivity.class);
        intent.putExtra("commentId", message.getId());
        intent.putExtra("commentLogin", message.getLogin());
        intent.putExtra("commentContent", message.getContent());
        startActivityForResult(intent, 1);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == 1 && resultCode == RESULT_OK) {
            fetchComments();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (timer != null) {
            timer.cancel();
        }
    }
}
