import { Directive, ElementRef, HostListener, Input, OnInit, Output, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements OnInit {

  // @Input() color: string = "yellow";

  @Input() something(value: boolean) {

  }

  constructor(
    private _elementRef: ElementRef,
    private _renderer2: Renderer2,
  ) {

  }

  @HostListener("mouseenter", ['$event']) onMouseOver(event) {
    console.log(event);
    // this._renderer2.setStyle(this._elementRef.nativeElement, 'backgroundColor', this.color);
  }

  @HostListener("mouseleave", ['$event']) onMouseLeave(event) {
    console.log(event);
    this._renderer2.setStyle(this._elementRef.nativeElement, 'backgroundColor', 'white');
  }


  ngOnInit(): void {
    // this._elementRef.nativeElement.addEventListener
  }

}
