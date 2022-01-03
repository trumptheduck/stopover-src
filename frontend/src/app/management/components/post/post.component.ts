import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostEditComponent implements OnInit {
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

  ngOnInit(): void {
  }

}
