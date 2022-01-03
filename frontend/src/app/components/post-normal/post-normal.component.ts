import { Component, Input, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Post } from 'src/app/core/models/post.model';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-post-normal',
  templateUrl: './post-normal.component.html',
  styleUrls: ['./post-normal.component.scss']
})
export class PostNormalComponent implements OnInit {
  liked:boolean = false;
  @Input('post') post: Post = {
    title: "Lorem Ipsum",
    subtitle: "Lorem Ipsum",
    content: "Lorem ipsum dolomet",
    likes: [],
    views: 10,
    comments: [],
    timestamp: "4th Nov",
    thumbnail: "https://picsum.photos/900/500",
    isPublished: true,
    author: ""
  };
  constructor(public utils: UtilsService) { }
  options: AnimationOptions = {
    path: '../../../assets/lottie/animation.json',
    loop: false
  };
  toggleLikePost() {
    this.liked = !this.liked;
  }
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  ngOnInit(): void {
  }

}
