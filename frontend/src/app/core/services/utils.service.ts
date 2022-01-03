import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private router: Router
  ) { }
  lerp(v0:number, v1:number, t:number):number {
    return v0*(1-t)+v1*t
  }
  navigateToPost(id:string|undefined) {
    if (id === undefined) return;
    this.router.navigate(["home/viewpost"],{ queryParams: {id: id}})
  }
  editPost(id:string|undefined) {
    if (id === undefined) return;
    this.router.navigate(["dashboard/editor"],{ queryParams: {id: id}})
  }
  navigateAndReload(path:string) {
    this.router.navigate([path]).then(() => {
      window.location.reload();
    })
  }
}
