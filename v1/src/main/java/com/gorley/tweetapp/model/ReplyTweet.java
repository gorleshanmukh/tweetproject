package com.gorley.tweetapp.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(value="reply")
@Data
public class ReplyTweet {

    private String message;

    private ObjectId tweetId;

    private String userID;

    private LocalDateTime timeStamp = LocalDateTime.now();
}
