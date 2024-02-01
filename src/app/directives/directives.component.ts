import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent implements OnInit {


  constructor(
    private _elementRef: ElementRef
  ) {

  }

  ngOnInit(): void {
    console.log(this._elementRef, 'COMPONENT')
  }


}
