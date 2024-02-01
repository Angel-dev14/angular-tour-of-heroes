import {Component, createComponent, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-element-ref',
  templateUrl: './element-ref.component.html',
  styleUrls: ['./element-ref.component.css']
})
export class ElementRefComponent implements OnInit {

  @ViewChild("paragraphElement", {static: true}) p: ElementRef;
  @ViewChild("conditional", {static: true}) ref: TemplateRef<any>;

  constructor(
    private _elementRef: ElementRef,
    private _viewContainer: ViewContainerRef
  ) {

  }

  ngOnInit(): void {
    console.log(this._elementRef.nativeElement.childNodes);
    this._viewContainer.createEmbeddedView(
      this.ref
    )
  }


}
