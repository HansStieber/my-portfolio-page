import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {


  /**
   * The function initialises the AOS library, which provides animations for certain elements.
   */
  ngOnInit(): void {
    AOS.init();
  }
}