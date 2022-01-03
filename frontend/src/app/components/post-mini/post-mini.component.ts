import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post-mini',
  templateUrl: './post-mini.component.html',
  styleUrls: ['./post-mini.component.scss']
})
export class PostMiniComponent implements OnInit {
  @Input('post') post: Post = {
    title: "Back to Fiction: What I'm Reading This Summer",
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
