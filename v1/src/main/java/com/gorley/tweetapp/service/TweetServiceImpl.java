package com.gorley.tweetapp.service;

import com.gorley.tweetapp.Repo.TweetRepo;
import com.gorley.tweetapp.Repo.impl.UserRepoImpl;
import com.gorley.tweetapp.model.*;
import com.gorley.tweetapp.util.UserUtil;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TweetServiceImpl {

    @Autowired
    private TweetRepo tweetRepository;

    @Autowired
    private UserRepoImpl userRepo;

    public Tweet saveTweet(Tweet tweet) throws Exception {
        tweet.setUserID(UserUtil.getUserName());
        Optional<Tweet> tweetData = tweetRepository.saveTweet(tweet);
        if (tweetData.isPresent()) {
            return tweetData.get();
        }
        throw new Exception("Something went wrong while posting tweet");
    }

    public List<TweetDTO> getAllTweets() {
        List<TweetDTO> tweets = tweetRepository.getAllTweets();
        for (TweetDTO tweet : tweets) {
            Optional<TweetUser> tweetUser = userRepo.findByLoginId(tweet.getUserID());
            tweetUser.get().setPassword("");
            tweet.setUser(tweetUser.get());
        }
        return tweets;
    }

    public ReplyTweet postReply(ReplyTweet tweetReply, String tweetId) {
        tweetReply.setTweetId(new ObjectId(tweetId));
        return tweetRepository.saveReply(tweetReply);
    }

    public List<ReplyTweet> getAllReplyByTweets(String tweetId) {
        return tweetRepository.getAllReply(tweetId);
    }

    public LikeTweet likeTweet(String tweetId) {
        LikeTweet like = new LikeTweet();
        like.setTweetId(new ObjectId(tweetId));
        like.setLikeBy(UserUtil.getUserName());
        return tweetRepository.saveLike(like);
    }

    public List<LikeTweet> getAllLikesByUser(String userId) {
        return tweetRepository.getAllLikesByUser(userId);
    }

}
