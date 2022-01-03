import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(
    private Api: ApiService
  ) { }
  createPostTemplate():Post {
    return {
      title: "",
      subtitle: "",
      content: "",
      likes: [],
      views: 0,
      comments: [],
      timestamp: "",
      thumbnail: "https://picsum.photos/900/500",
      isPublished: false,
      _id: "",
      author: ""
    };
  }
  getHtml(string:string) {
    var htmlDoc: Document = (new DOMParser).parseFromString(string, 'text/html');
    return htmlDoc;
  }
  getAllImageSrcFromDocument(document:string) {
    var htmlDoc: Document = this.getHtml(document)
    var images = htmlDoc.getElementsByTagName('img');
    var imageSrcs =[].slice.call(images).map((data:HTMLImageElement) => data.src);
    return imageSrcs;
  }
  getUploadableImage(cache:any[],images:any[]) {
    var filtered: any[] = [];
    for (let i = 0; i < images.length; i++) {
      var src = images[i];
      for (let j = 0; j < cache.length; j++) {
        var data = cache[j]
        if (src === data.url) {
          filtered.push(data);
          break;
        }
      }
    }
    return filtered;
  }
  createImageUploadFormData(imageData:any[]) {
    var form = new FormData();
    imageData.forEach((data:any) => {
      form.append('upload',data.file);
    })
    return form;
  }
  uploadContentImages(formData:FormData,callback: (data: any[])=>any) {
    if (formData.getAll('upload').length> 0) {
      this.Api.uploadImage(formData).subscribe(
        (res) => callback(res.data),
        (err) => console.error(err)
      );
    } else {
      callback([]);
    }
  }
  uploadThumbnail(oldThumbnail:any, newThumbnail: any, isDirty: boolean, callback: any) {
    if (!isDirty) {
      callback(oldThumbnail);
    } else {
      var thumbnailForm = new FormData()
        thumbnailForm.append('upload',newThumbnail);
        this.Api.uploadImage(thumbnailForm).subscribe(
        (res) => callback(environment.api_url+ "/static/images/"+ res.data[0]),
        (err) => console.error(err)
      );
    }
  }
  replaceObjectUrlWithStaticUrl(images: HTMLImageElement[],srcs: string[]) {
    for (let i = 0; i< srcs.length; i++) {
      for (let j = 0; j < images.length; j++) {
        if (images[j].src.search("blob")!==-1) {
          images[j].src = environment.api_url + "/static/images/" + srcs[i];
          break;
        }
        images[j].style.maxWidth = "100%";
      }
    }
  }
  createPost(originalPost:Post ,imageSrcs:any, thumbnail:any) {
    var htmlDoc: Document = this.getHtml(originalPost.content);
      var images: HTMLImageElement[] = [].slice.call(htmlDoc.getElementsByTagName('img'));
      this.replaceObjectUrlWithStaticUrl(images,imageSrcs);
      var postImages:string[] = [].slice.call(images).map((data:HTMLImageElement) => data.src)
      .filter((src:string)=>src.search(environment.api_url+"/static") > -1)
      .map(src => src.split("/static/images/")[src.split("/static/images/").length-1]);

      if (originalPost.images == undefined) {
        originalPost.images = [];
      }
    var newPostData: Post = {
      _id: originalPost._id,
      content: htmlDoc.body.innerHTML,
      title: originalPost.title,
      subtitle: originalPost.subtitle,
      images: postImages,
      thumbnail: thumbnail,
      comments: [],
      likes: [],
      timestamp: new Date().toLocaleString(),
      views: 0,
      isPublished: originalPost.isPublished,
      author: originalPost.author
    }
    return newPostData;
  }
  savePost(postData: Post,callback: any) {
    this.Api.patch("/api/post",postData).subscribe(
      {
        next: (res) => callback(res),
        error: (err) => console.error(err)
      }
    )
  }
  deletePost(postData:Post, callback:any) {
    this.Api.post("/api/post/remove",{_id: postData._id}).subscribe({
      next: (res)=>{
          callback(res);
        },
      error: (err)=>{ console.error(err) }
    });
  }
}
