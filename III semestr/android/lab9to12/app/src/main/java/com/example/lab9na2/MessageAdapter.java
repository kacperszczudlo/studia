package com.example.lab9na2;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class MessageAdapter extends RecyclerView.Adapter<MessageAdapter.MessageViewHolder> {

    private List<Message> messageList;
    private OnItemClickListener listener;

    // Interfejs obsługujący kliknięcie elementu
    public interface OnItemClickListener {
        void onItemClick(Message message);
    }

    // Konstruktor z callbackiem
    public MessageAdapter(List<Message> messageList, OnItemClickListener listener) {
        this.messageList = messageList;
        this.listener = listener;
    }

    @NonNull
    @Override
    public MessageViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_message, parent, false);
        return new MessageViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MessageViewHolder holder, int position) {
        Message message = messageList.get(position);

        // Ustawianie danych w widoku
        holder.textViewNick.setText(message.getLogin());
        holder.textViewDate.setText(message.getDate().split("T")[0]); // Wyświetla tylko datę
        holder.textViewTime.setText(message.getTime());
        holder.textViewContent.setText(message.getContent());

        // Obsługa kliknięcia na element listy
        holder.itemView.setOnClickListener(v -> {
            SharedPreferences sharedPreferences = v.getContext()
                    .getSharedPreferences("AppPrefs", Context.MODE_PRIVATE);
            String currentUser = sharedPreferences.getString("user_login", "Anonymous");

            // Sprawdzenie, czy użytkownik jest autorem komentarza
            if (currentUser.equals(message.getLogin())) {
                // Przejście do ekranu edycji komentarza
                Intent intent = new Intent(v.getContext(), EditCommentActivity.class);
                intent.putExtra("commentId", message.getId());
                intent.putExtra("commentLogin", message.getLogin());
                intent.putExtra("commentContent", message.getContent());
                v.getContext().startActivity(intent);
            } else {
                // Informacja dla użytkownika, że nie ma uprawnień
                Toast.makeText(v.getContext(),
                        "You can only edit your own comments.", Toast.LENGTH_SHORT).show();
            }
        });

        // Dodatkowa obsługa kliknięcia (np. callback)
        holder.itemView.setOnLongClickListener(v -> {
            if (listener != null) {
                listener.onItemClick(message);
            }
            return true;
        });
    }

    @Override
    public int getItemCount() {
        return messageList.size();
    }

    static class MessageViewHolder extends RecyclerView.ViewHolder {
        TextView textViewNick, textViewDate, textViewTime, textViewContent;

        public MessageViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewNick = itemView.findViewById(R.id.textViewNick);
            textViewDate = itemView.findViewById(R.id.textViewDate);
            textViewTime = itemView.findViewById(R.id.textViewTime);
            textViewContent = itemView.findViewById(R.id.textViewContent);
        }
    }
}
