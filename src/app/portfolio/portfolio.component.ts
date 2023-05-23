import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as AOS from 'aos';
import { Project } from '../models/project.class';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  projects: Project[] = [];
  url: string = '../../assets/jsons/projects.json';

  constructor(private http: HttpClient) {}


  /**
   * The function initialises the AOS library, which provides animations for certain elements. It also sets the applications variable
   * by subscribing to a json at a given location.
   */
  ngOnInit() {
    AOS.init();
    this.http.get<any>(this.url).subscribe(res => {
      this.projects = res;
    });
  }  
}

