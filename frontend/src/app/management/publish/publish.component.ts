import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  constructor(private dataService: DataService, private Api: ApiService, private authService: AuthService, private utils: UtilsService) {
    dataService.getMyPosts((res:Post[])=>{
      this.posts = res;
    })
  }
  postTemplate =  {
    title: "Một chiếc tiêu đề vừa mắt",
    subtitle: "Phần giới thiệu, sẽ hiển thị trên bài đăng",
    content: "Đây là phần content chính! Viết nào",
    likes: [],
    views: 0,
    comments: [],
    timestamp: new Date().toLocaleString(),
    thumbnail: "",
    isPublished: false,
    _id: "",
    author: ""
  }
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
  createNewPost() {
    this.Api.post("/api/post",this.postTemplate).subscribe({
      next:(res)=>{
        this.utils.editPost(res._id);
      },
      error: (err) => {
        alert(err.msg)
      }
    })
  }


}
