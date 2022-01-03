import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnsavedService {
  isChanged:boolean = true;
  constructor() {
    window.addEventListener("beforeunload", (e) => {
      if (this.isChanged) {
          return undefined;
      }

      var confirmationMessage = 'It looks like you have been editing something. '
                              + 'If you leave before saving, your changes will be lost.';
      
      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
  });
  }
}
