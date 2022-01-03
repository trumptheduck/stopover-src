import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as ClassicEditor from '@editor/ckeditor5-31.1.0-iqlt6bpbt0ir';
import { Post } from 'src/app/core/models/post.model';
import { EditorService } from 'src/app/core/services/editor.service';
import { UnsavedService } from 'src/app/core/services/unsaved.service';

var imageCache: any[] = [];

@Component({
  selector: 'app-post-editor',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Input('postData') postData: Post = this.editorService.createPostTemplate();
  private thumbnailData: File = new File([],"any");
  public tempThumb: SafeUrl = this.postData.thumbnail;
  public Editor = ClassicEditor;
  private isThumbnailDirty: boolean = false;
  public editorConfig = {
    extraPlugins: [ MyCustomUploadAdapterPlugin ],
    fontFamily: {
      options: [
        'Conqueror',
        'SF'
      ]
    },
    fontSize: {
      options: [
         10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25
      ]
  },
};
  constructor(
    private dom: DomSanitizer,
    private router: Router,
    private unsavedService: UnsavedService,
    private editorService: EditorService) {
  }

  ngOnInit(): void {
    this.unsavedService.isChanged = true;
  }
  openThumbnailSelector() {
    document.getElementById('thumbnail')?.click();
  }
  onThumbnailSelect() {
    this.isThumbnailDirty = true;
    this.thumbnailData = ((document.getElementById('thumbnail') as HTMLInputElement).files as FileList)[0];
    this.postData.thumbnail = (this.dom.bypassSecurityTrustUrl(URL.createObjectURL(this.thumbnailData)) as string);
  }
  onTitleChange(src:any) {
    this.postData.title = src.textContent;
  }
  onSubtitleChange(src:any) {
    this.postData.subtitle = src.textContent;
  }
  onPostingComplete(res:any) {
    this.postData = res;
    console.log(res);
    window.alert("Bài đăng đã được lưu!");
  }
  reload() {
    window.location.reload();
  }
  submit() {
    var editor = this.editorService;
    editor.uploadContentImages(
      editor.createImageUploadFormData(
        editor.getUploadableImage(
          imageCache, editor.getAllImageSrcFromDocument(this.postData.content)
        )
      ), (imageSrcs) => {
        editor.uploadThumbnail(this.postData.thumbnail,this.thumbnailData, this.isThumbnailDirty, (thumbnail:any) => {
          editor.savePost(editor.createPost(this.postData,imageSrcs,thumbnail),
            (res:any) => {
              this.onPostingComplete(res);
            })
        })
      }
      )
  }
  deletePost() {
    if (confirm("Bạn có chắc chắn muốn xóa? Tất cả thay đổi không thể hoàn lại! Hãy suy nghĩ thật kỹ...")) {
        this.editorService.deletePost(this.postData,(res:any)=>{
          alert("Xóa post thành công!");
          this.router.navigate(["dashboard"])
        })
    }
  }
  publishPost() {
    this.postData.isPublished = true;
    this.submit()
  }
  unpublishPost() {
    this.postData.isPublished = false;
    this.submit()
  }
  goBackHome() {
    if (confirm('Bạn có thực sự muốn rời khỏi? Những thay đổi sẽ không được lưu!')) {
      this.router.navigate(["/dashboard"])
    }
  }
}
//Custom upload adapter for CKEditor Image
class MyUploadAdapter {
  loader:any;
  constructor( loader:any ) {
      this.loader = loader;
  }
  upload() {
      return this.loader.file
      .then( (file:File) => new Promise( ( resolve, reject ) => {
        try {
          var objectURL = URL.createObjectURL(file);
          imageCache.push({
            url: objectURL,
            file: file
          })
          resolve({
            default: objectURL
          })
        } catch (err) {
          reject(err);
        }
      
    } ) );
  }
  abort() {
  }
}
function MyCustomUploadAdapterPlugin( editor:any ) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader:any ) => {
      return new MyUploadAdapter( loader );
  };
}