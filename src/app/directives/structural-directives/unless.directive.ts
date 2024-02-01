import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { throwIfEmpty } from 'rxjs';

@Directive({
  selector: '[unless]'
})
export class UnlessDirective {

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef,
  ) {}

  @Input() set unless(value: boolean) {
    if (value) {
      // return the view
      this._viewContainerRef.clear();
    } else {
      // SHOULD DISPLAY
      console.log(this._templateRef);
      this._viewContainerRef.createEmbeddedView(this._templateRef);
      // setTimeout(() => {
      //   this._viewContainerRef.clear();
      // }, 1000)
    }
    // return ng tempalate wrapped from viewa
  }


}
