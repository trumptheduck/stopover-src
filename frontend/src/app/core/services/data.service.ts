import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _posts: Post[] = [];
  getPosts(callback:any):void {
    if (this._posts.length > 0) {
      callback(this._posts);
    } else {
      this.Api.get("/api/posts").subscribe({
        next: (res)=>{
          this._posts = res;
          callback(this._posts);
        }
      });
    }
  }
  getMyPosts(callback:any) {
    this.Api.get("/api/myposts").subscribe({
      next: (res)=>{
        callback(res);
      }
    });
  }
  
  constructor(private Api:ApiService) { 
    
  }
}
