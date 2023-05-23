import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class NavigationComponent {
  selectedMenuItem: string = '';
  public selectedLanguage: string = 'en';
  public menuOpen: boolean = false;


  /**
   * The constructor checks for a route change. When the route changes, it is checked if the user is at the impressum to disselect
   * the section at the navigation by removing any specific value of the selectedMenuItem variable. If the user is moving to the
   * main page the function scrolls to the selected section. It also checks for the currently selected language.
   * 
   * @param router - The router of the page
   * @param translate - Sets translate as TranslateService
   */
  constructor(private router: Router, public translate: TranslateService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.router.url === '/impressum') {
          this.selectedMenuItem = '';
        }
        if (this.router.url === '/') {
          this.scrollToSelectedSection();
          this.checkLanguage();
        }
      }
    });
  }


  /**
   * The function scrolls to the selected section when moving back to the main page from the imprint page. This is achieved by
   * setting the selectedMenuItem variable as id of the section that is to be scrolled into view. A timeout is set to avoid the
   * bug of not scrolling after route change.
   */
  scrollToSelectedSection() {
    setTimeout(() => {
      if (document.getElementById(this.selectedMenuItem)) {
        document.getElementById(this.selectedMenuItem)!.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      }
    }, 100);
  }


  /**
   * The function checks the selectedLanguage variable to translate the page to the currently selected language.
   */
  checkLanguage() {
    if (this.selectedLanguage === 'de') {
      this.translateSite('de');
    }
    if (this.selectedLanguage === 'en') {
      this.translateSite('en');
    }
  }


  /**
   * The function translates the page into the selected language. This is achieved by using the ngx translate library.
   * The placeholder of the Input fields of the contact form and the submit button are changed manually.
   * 
   * @param language 
   */
  translateSite(language: any) {
    this.selectedLanguage = language;
    this.translate.use(language);

    let name = (document.getElementById('name') as HTMLInputElement);
    let mail = (document.getElementById('mail') as HTMLInputElement);
    let message = (document.getElementById('message') as HTMLInputElement);
    let sendButton = (document.getElementById('sendButton') as HTMLButtonElement);

    if (language == 'en') {
      name.placeholder = 'Your name';
      mail.placeholder = 'Your email';
      message.placeholder = 'Your message';
      sendButton.innerHTML = 'Send message :)';
    }
    if (language == 'de') {
      name.placeholder = 'Dein Name';
      mail.placeholder = 'Deine Email Adresse';
      message.placeholder = 'Deine Nachricht an mich';
      sendButton.innerHTML = 'Nachricht senden :)';
    }
  }


  @HostListener('window:scroll', ['$event'])


  /**
   * The function defines 4 sections with a value of YOffset which defines where the section begins. It the checks on which section the user is currently located.
   */
  scroll() {
    let startScreen: any = document.getElementById('start-screen')?.offsetTop;
    let aboutMe: any = document.getElementById('about-me')?.offsetTop;
    let mySkills: any = document.getElementById('my-skills')?.offsetTop;
    let portfolio: any = document.getElementById('portfolio')?.offsetTop;

    let section1: number = startScreen + window.innerHeight / 2;
    let section2: number = startScreen + aboutMe + window.innerHeight / 2;
    let section3: number = startScreen + aboutMe + mySkills - window.innerHeight / 2;
    let section4: number = startScreen + aboutMe + mySkills + portfolio - window.innerHeight;

    this.checkSection(section1, section2, section3, section4);
  }


  /**
   * The function checks on which section the user is currently located.
   */
  checkSection(section1: number, section2: number, section3: number, section4: number) {
    if (window.pageYOffset < section1) {
      this.selectedMenuItem = '';
    }
    if (window.pageYOffset > section1) {
      this.selectedMenuItem = 'about-me';
    }
    if (window.pageYOffset > section2) {
      this.selectedMenuItem = 'my-skills';
    }
    if (window.pageYOffset > section3) {
      this.selectedMenuItem = 'portfolio';
    }
    if (window.pageYOffset > section4) {
      this.selectedMenuItem = '';
    }
  }


  /**
   * The function scrolls to the demanded section.
   * 
   * @param id - The variable defines the selected section.
   */
  async scrollToSection(id: string) {
    if (this.menuOpen == true) {
      this.menuOpen = false;
    }
    await this.router.navigate(['']);
    setTimeout(() => {
      this.selectedMenuItem = id;
    }, 90);
    document.getElementById(id)!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }


  openMenu() {
    this.menuOpen = true;
  }


  closeMenu() {
    this.menuOpen = false;
  }
}

