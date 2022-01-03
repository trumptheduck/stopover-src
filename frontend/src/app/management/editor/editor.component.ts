import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/models/post.model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

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
