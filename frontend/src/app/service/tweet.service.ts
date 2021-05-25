import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVICE_URI} from "../../environments/service.uri";

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private httpClient: HttpClient) { }

  getAllTweets() {
    return this.httpClient.get(SERVICE_URI.getAllTweets);
  }

  addTweet(tweet:any) {
    return this.httpClient.post(SERVICE_URI.addTweet,tweet);
  }

  likeTweet(tweet:any) {
    return this.httpClient.post(SERVICE_URI.likeTweet + "/" + tweet, null);
  }

  getReplies(id:any) {
    return this.httpClient.get(SERVICE_URI.getReplies + "/" + id);
  }

  replyTweet(tweet:any) {
    return this.httpClient.post(SERVICE_URI.replyTweet+ "/" + tweet.tweetId,tweet);
  }
}
