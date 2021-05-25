import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {TweettileComponent} from "../tweettile/tweettile.component";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TweetService} from "../../../service/tweet.service";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public tweetMessage: string = "";
  public replies: any[] = [];
  public likes : any[] = [];

  constructor(public dialogRef: MatDialogRef<TweettileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private tweetService: TweetService) {
    console.log("1",data)
  }

  ngOnInit(): void {
    console.log(this.data)
    this.likes = this.data.data;
    this.replies = this.data.data;
  }

  replyTweet() {
    if (this.tweetMessage.length > 0 && this.tweetMessage.length <= 144) {
      let replyTweet = {
        userId : this.data.userId,
        message : this.tweetMessage,
        tweetId : this.data.id,
      }
      this.tweetMessage="";
      this.tweetService.replyTweet(replyTweet).subscribe(
        (response : any) => {
          this.data.sendMessage("Reply Tweet");
        }, error => {
          console.log(error)
        }
      )
    }
  }
}
