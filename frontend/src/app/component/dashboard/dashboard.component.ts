import { Component, OnInit } from '@angular/core';
import {GetAllUserService} from "../../service/get-all-user.service";
import {TweetService} from "../../service/tweet.service";
import {Tweet} from "../model/tweetmodel";

// @ts-ignore
import * as Stomp from 'stompjs';
// @ts-ignore
import * as SockJS from 'sockjs-client';
import {SERVICE_URI} from "../../../environments/service.uri";
import { ImageuploadService } from "../../service/imageupload.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private serverUrl = SERVICE_URI.tweetAgent + '/socket';
  private stompClient : any;
  public filter = {
    all: true,
    my: false,
    others: false
  }
  public allTweets : Tweet[] = [];
  public filteredTweets : Tweet[] = [];
  public tweetMessage : string = "";
  userInfo = {
    username : "",
    loginId : ""
  }
  public userName : string = "";
  public loginId : string = "";

  selectedFiles: FileList | undefined;

  constructor(private tweetService : TweetService
              , private uploadService : ImageuploadService
  ) {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
    const loginId = localStorage.getItem("loginId");
    const userName = localStorage.getItem("userName");
    this.userName = userName ? userName : "";
    this.loginId = loginId ? loginId : "";
    this.getAllTweets();
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, (frame: any) => {
      that.stompClient.subscribe("/chat", (message : any) => {
        // console.log(message);
        this.getAllTweets();
      });
    });
  }

  sendMessage = (message: any) => {
    // console.log(message)
    this.stompClient.send("/app/send/message" , {}, message);
  }

  getAllTweets() {
    this.allTweets = [];
    this.tweetService.getAllTweets().subscribe(
      (response :any) => {
        for (let i=0; i<response.length; i++){
          this.allTweets.push({
            message : response[i].message,
            timestamp : response[i].timeStamp,
            userName : response[i].user.firstName + " " + response[i].user.lastName,
            handle : response[i].userID,
            likes : this.correctData(response[i].likes),
            replies : this.correctData(response[i].replies),
            tweetId : response[i]._id
          });
        }
        // console.log(this.allTweets)
        this.allTweets.sort((x, y) => {
          return (+new Date(y.timestamp) - +new Date(x.timestamp));
        });
        this.filteredTweets = this.allTweets;
        this.filterTweets();
      }, error => {
        console.log(error);
      }
    )
  }

  postUserTweet() {
    if (this.tweetMessage.length > 0 && this.tweetMessage.length<144) {
      let tweet = {
        message:this.tweetMessage,
        userID : this.loginId
      }
      this.tweetService.addTweet(tweet).subscribe(
        (response : any) => {
          this.sendMessage("tweet posted");
          // this.getAllTweets();
          this.tweetMessage = ""
        }, error => {
          console.log("error")
        }
      )
    }
  }

  filterTweets() {
    if (this.filter.all) {
      this.filteredTweets = this.allTweets;
    }
    if(this.filter.my) {
      this.filteredTweets = this.allTweets.filter(
        tweet => tweet.handle == this.loginId
      )
    }
    if(this.filter.others) {
      this.filteredTweets = this.allTweets.filter(
        tweet => tweet.handle != this.loginId
      )
    }
  }

  filterChange(event : any) {
    this.filter = {
      all: event.target.id == "all" ? true : false,
      my: event.target.id == "my" ? true : false,
      others: event.target.id == "others" ? true : false
    }
    this.filterTweets();
  }

  correctData(data : any) {
    let correctedData = [];
    for (let i=0;i<data.length;i++) {
      correctedData.push(JSON.parse(data[i]));
    }
    return correctedData;
  }

  uploadImage() {
    // this.progress.percentage = 0;
    // this.currentFileUpload = this.selectedFiles.item(0);
    if (this.selectedFiles) {
      let file : File | null = this.selectedFiles.item(0);
      if (file) {
        this.uploadService.uploadFile(file).subscribe(
          (response : any) => {
            console.log(response)
          }, error => {
            console.log(error)
          }
        );
      }
    }
  }
  selectFile(event : any){
    this.selectedFiles = event.target.files;
  }
}
