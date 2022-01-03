import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../core/animations/fade.anim';
import { Post } from '../core/models/post.model';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featuredPost: Post = {
    title: "Back to Fiction: What I'm Reading This Summer",
    subtitle: "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....",
    content: "Lorem ipsum dolomet",
    likes: [],
    views: 20,
    comments: [],
    timestamp: "4th Nov",
    thumbnail: "https://picsum.photos/900/500",
    isPublished: true,
    author: ""
  };
  posts: Post[] = [];
  constructor(private dataService: DataService) {
    dataService.getPosts((data:Post[])=> this.posts = data);
  }

  ngOnInit(): void {
  }

}
