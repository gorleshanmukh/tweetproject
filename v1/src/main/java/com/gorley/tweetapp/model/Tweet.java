package com.gorley.tweetapp.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(value="tweet")
@Data
public class Tweet {

    private String message;

    private String userID;

    private LocalDateTime timeStamp = LocalDateTime.now();
}
