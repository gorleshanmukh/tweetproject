import {Component, Input, OnInit} from '@angular/core';
import {TweetService} from "../../../service/tweet.service";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-tweettile',
  templateUrl: './tweettile.component.html',
  styleUrls: ['./tweettile.component.css']
})
export class TweettileComponent implements OnInit {

  @Input() tweetId: string | undefined;
  @Input() name: string | undefined;
  @Input() handle: string | undefined;
  @Input() time: string | undefined;
  @Input() message: string | undefined;
  @Input() replies: any | undefined;
  @Input() likes: any | undefined;
  @Input() sendMessage: ((args: any) => void) | undefined;
  imageSrc : string | undefined;
  public liked: boolean = false;
  public userName: string = "";
  public loginId: string = "";

  private dialogRef: MatDialogRef<DialogComponent> | undefined;
  constructor(private tweetService: TweetService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    const loginId = localStorage.getItem("loginId");
    const userName = localStorage.getItem("userName");
    this.userName = userName ? userName : "";
    this.loginId = loginId ? loginId : "";
    this.imageSrc = "assets/images/"+this.handle+".jpg";
    for (let i = 0; i < this.likes.length; i++) {
      let like = this.likes[i];
      if (like.likeBy == this.loginId) {
        this.liked = true;
      }
    }
  }

  likeTweet() {
    if (this.tweetId) {
      this.tweetService.likeTweet(this.tweetId).subscribe(
        response => {
          // @ts-ignore
          this.sendMessage("tweet liked");
        }, error => {
          console.log(error)
        }
      )
    }
  }

  openDialog(event: any) {
    let data: any;
    let width: string = "250px";
    if (event.target.id == "like") {
      data = {
        like: true,
        data: this.likes,
      }
    } else {
      width = "700px";
      data = {
        like: false,
        data: this.replies,
        id: this.tweetId,
        userId: this.handle,
        sendMessage: this.sendMessage
      }
    }
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      data: data
    });
  }
}
