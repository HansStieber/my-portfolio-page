import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent implements OnInit {


  /**
   * The function initialises the AOS library, which provides animations for certain elements.
   */
  ngOnInit(): void {
    AOS.init();
  }


  /**
   * The function scrolls a given section into view.
   * 
   * @param id - The id of the section that is being scrolled into view.
   */
  async scrollToSection(id: string) {
    document.getElementById(id)!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }
}
