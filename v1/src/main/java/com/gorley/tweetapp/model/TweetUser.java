package com.gorley.tweetapp.model;

import lombok.*;

import java.io.Serializable;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TweetUser implements Serializable {

    private static final long serialVersionUID = 2771413367966271864L;

    private String firstName;

    private String lastName;

    private String loginId;

    private String emailId;

    private String contactNumber;

    private String password;

}