import { Component, OnInit } from '@angular/core';
import { Post } from '../core/models/post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor() { }
  
  posts: Post[] = [
  ]

  getCol(isAfter: boolean): Post[] {
    var result:Post[] = []
    for (let i = 0; i< this.posts.length; i++) {
      if (isAfter) {
        if (i%2 === 0) {
          result.push(this.posts[i]);
        }
      } else {
        if (i%2 !== 0) {
          result.push(this.posts[i]);
        }
      }
    }
    return result;
  }

  ngOnInit(): void {
  }

}
