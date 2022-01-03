import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
