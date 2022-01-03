import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../core/models/post.model';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.scss'],
})
export class ViewpostComponent implements OnInit {
  post: Post;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Api: ApiService
  ) {
    this.post = {
      comments: [],
      content: "",
      likes: [],
      subtitle: "",
      thumbnail: "",
      timestamp: "",
      title: "",
      views: 0,
      isPublished: false,
      author: ""
    }
    this.route.queryParams
      .subscribe(params => {
        if (params.id === undefined) {
          this.router.navigate(['home']);
        }
        this.Api.get("/api/post/"+params.id).subscribe({
          next: (res)=>{
            this.post = res;
            console.log(this.post);
          }
        })
      }
    );
  }

  ngOnInit(): void {
  }

}
