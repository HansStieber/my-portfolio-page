import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {


  /**
   * The function initialises the AOS library, which provides animations for certain elements.
   */
  ngOnInit(): void {
    AOS.init();
  }


  /**
   * The function scrolls to the contact section of the portfolio-page.
   */
  scrollToContact() {
    document.getElementById('contact')!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
}
