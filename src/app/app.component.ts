import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  constructor(private meta: Meta, public translate: TranslateService) {
    this.meta.addTag({ 
      name: 'description', 
      content: `I am a front-end developer based in Tübingen, Germany with experience in building web apps using JavaScript & Angular. You are welcome to visit my public portfolio, which includes responsive websites, business apps and games.`
     })
  }
}
