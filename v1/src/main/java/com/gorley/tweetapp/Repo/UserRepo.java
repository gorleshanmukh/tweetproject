package com.gorley.tweetapp.Repo;

import com.gorley.tweetapp.model.JwtRequest;
import com.gorley.tweetapp.model.TweetUser;

import java.util.List;
import java.util.Optional;

public interface UserRepo {

    Optional<TweetUser> findByLoginId(final String loginId);

    Optional<TweetUser> findByEmailId(final String emailId);

    Optional<TweetUser> findByContactNumber(final String contactNumber);

    void saveUser(final TweetUser userInfoBean);

    void updatePassword(final JwtRequest userInfo);

    List<TweetUser> getAllUser();
}
