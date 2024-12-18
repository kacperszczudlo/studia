package com.example.navigationdraweractivity

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import android.widget.EditText
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.example.navigationdraweractivity.MessagesAdapter
import com.example.navigationdraweractivity.R

class MainActivity : AppCompatActivity() {
    private lateinit var sharedPreferences: SharedPreferences
    private lateinit var requestQueue: RequestQueue
    private lateinit var recyclerView: RecyclerView
    private lateinit var messagesAdapter: MessagesAdapter
    private val messages = mutableListOf<Message>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        sharedPreferences = getSharedPreferences("MyAppPrefs", Context.MODE_PRIVATE)
        val login = sharedPreferences.getString("LOGIN", null)

        if (login == null) {
            showLoginDialog()
        }

        requestQueue = Volley.newRequestQueue(this)
        recyclerView = findViewById(R.id.recyclerView)
        messagesAdapter = MessagesAdapter(messages)
        recyclerView.adapter = messagesAdapter
        recyclerView.layoutManager = LinearLayoutManager(this)

        fetchMessages()
    }

    private fun showLoginDialog() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Enter your login")

        val input = EditText(this)
        builder.setView(input)

        builder.setPositiveButton("OK") { _, _ ->
            val login = input.text.toString()
            sharedPreferences.edit().putString("LOGIN", login).apply()
        }
        builder.setNegativeButton("Cancel", null)

        builder.show()
    }

    private fun fetchMessages() {
        val url = "https://tgryl.pl/shoutbox/messages?last=10"
        val jsonArrayRequest = JsonArrayRequest(Request.Method.GET, url, null,
            Response.Listener { response ->
                for (i in 0 until response.length()) {
                    val jsonObject = response.getJSONObject(i)
                    val message = Message(
                        jsonObject.getString("id"),
                        jsonObject.getString("content"),
                        jsonObject.getString("login")
                    )
                    messages.add(message)
                }
                messagesAdapter.notifyDataSetChanged()
            },
            Response.ErrorListener { error ->
                error.printStackTrace()
            }
        )

        requestQueue.add(jsonArrayRequest)
    }
}
