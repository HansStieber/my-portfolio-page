import { Component, Input, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() explanation: any;
  @Input() img: any;
  @Input() title: any;
  @Input() language: any;
  @Input() web: any;
  @Input() git: any;
  @Input() indexImpair = false;


  /**
   * The function initialises the AOS library, which provides animations for certain elements.
   */
  ngOnInit() {
    AOS.init();
  }
}
