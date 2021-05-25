package com.gorley.tweetapp.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value="like")
@Data
public class LikeTweet {

    private String likeBy;

    private ObjectId tweetId;
}
