import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HEROES} from './mock-heroes';
import {iterator} from 'rxjs/internal/symbol/iterator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit, AfterViewInit {

  screen: number | undefined;

  @ViewChild("screen1", {read: ElementRef, static: true}) screenRef: ElementRef

  ngOnInit(): void {
    console.log('ON INTI',this.screenRef);
    this.screen = 2; // some permission evaluates to 2
    console.log(document)
  }

  ngAfterViewInit(): void {
    console.log(this.screenRef);
  }
}
