import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('myForm') myForm!: ElementRef;
  @ViewChild('nameField') nameField!: ElementRef;
  @ViewChild('mailField') mailField!: ElementRef;
  @ViewChild('messageField') messageField!: ElementRef;
  @ViewChild('sendButton') sendButton!: ElementRef;
  @ViewChild('arrowUp') arrowUp!: ElementRef;
  messageSent!: boolean;


  /**
 * The function initialises the AOS library, which provides animations for certain elements.
 */
  ngOnInit() {
    AOS.init();
  }


  /**
   * The function submits the contact form.
   */
  async sendMail() {
    this.disableInputFields();

    let fd = new FormData();
    fd.append('name', this.nameField.nativeElement.value);
    fd.append('mail', this.mailField.nativeElement.value);
    fd.append('message', this.messageField.nativeElement.value);

    await fetch('https://hans-stieber.com/send_mail.php',
      {
        method: 'POST',
        body: fd
      }
    );

    this.confirmAndClear();
  }


  /**
   * The function shows a confirmation for the user that the mail has been sent and clears all input fields.
   */
  confirmAndClear() {
    this.showConfirmation();

    setTimeout(() => {
      this.enableInputFields();
      this.clearInputFields();
      this.hideConfirmation();
    }, 2000);
  }


  /**
   * The function disables all input field and the submit button.
   */
  disableInputFields() {
    this.nameField.nativeElement.disabled = true;
    this.mailField.nativeElement.disabled = true;
    this.messageField.nativeElement.disabled = true;
    this.sendButton.nativeElement.disabled = true;
  }


  /**
   * The function enables all input fields and the submit button.
   */
  enableInputFields() {
    this.nameField.nativeElement.disabled = false;
    this.mailField.nativeElement.disabled = false;
    this.messageField.nativeElement.disabled = false;
    this.sendButton.nativeElement.disabled = false;
  }


  /**
   * The function clears all input fields.
   */
  clearInputFields() {
    this.nameField.nativeElement.value = '';
    this.mailField.nativeElement.value = '';
    this.messageField.nativeElement.value = '';
    this.sendButton.nativeElement.value = '';
  }


  /**
   * The function changes the the src of the image file for the scroll-up symbol.
   * 
   * @param newSrc 
   */
  changeImgSrc(newSrc: string) {
    this.arrowUp.nativeElement.src = newSrc;
  }


  /**
   * The function scrolls to the start-screen section of the page.
   */
  scrollToStart() {
    document.getElementById('start-screen')!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }


  /**
   * The function shows the confirmation that the mail was sent. It therefore checks the html of the button to select the correct
   * language.
   */
  showConfirmation() {
    this.messageSent = true;
    let sendButton = (document.getElementById('sendButton') as HTMLButtonElement);
    if (sendButton.innerHTML == 'Send message :)') {
      sendButton.innerHTML = 'Message sent!';
    }
    if (sendButton.innerHTML == 'Nachricht senden :)') {
      sendButton.innerHTML = 'Nachricht gesendet!';
    }
  }


  /**
   * The function hides the confirmation that the mail was sent. It therefore checks the html of the button to select the correct
   * language.
   */
  hideConfirmation() {
    this.messageSent = false;
    let sendButton = (document.getElementById('sendButton') as HTMLButtonElement);
    if (sendButton.innerHTML == 'Message sent!') {
      sendButton.innerHTML = 'Send message :)';
    }
    if (sendButton.innerHTML == 'Nachricht gesendet!') {
      sendButton.innerHTML = 'Nachricht senden :)';
    }
  }
}
