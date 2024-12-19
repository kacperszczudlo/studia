package com.example.shoutboxapp.network;

import com.example.shoutboxapp.Message;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface ApiService {
    @GET("messages")
    Call<List<Message>> getMessages(@Query("last") int last);
}
