package com.gorley.tweetapp.model;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class TweetDTO {

    public String _id;

    private String message;

    private String userID;

    private TweetUser user;

    private Date timeStamp;

    private List<String> replies;

    private List<String> likes;

}
