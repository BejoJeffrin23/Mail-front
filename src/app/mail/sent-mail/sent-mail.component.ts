import { Component, OnInit, HostListener, OnDestroy, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MailService } from '../../mail.service'
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-sent-mail',
  templateUrl: './sent-mail.component.html',
  styleUrls: ['./sent-mail.component.css'],

})
export class SentMailComponent implements OnInit, OnDestroy {


  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    if (this.done == false) {
      if (this.recieverEmail || this.subject || this.content) {
        let data = {
          senderName: this.name,
          senderMail: this.senderMail,
          recieverMail: this.recieverEmail,
          subject: this.subject,
          content: this.content,
        }
        this.service.draft(data)

          .subscribe((apiResponse) => {
            this.toastr.success('Saved to draft')
          })
      }
    }
  }

  public recieverEmail: String;
  public content: String;
  public title: String;
  public subject: String;
  public senderMail: String;
  public name: String;
  public done: Boolean = false;
  public file: any
  constructor(public toastr: ToastrService, public service: MailService, public router: Router) {
  }



  ngOnInit() {
    this.senderMail = Cookie.get('mail')
    this.name = Cookie.get('userName')
  }



  Selected(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file)
  }

  public sentMail = () => {

    this.done = true
    if (!this.recieverEmail) {
      this.toastr.warning('enter reciever mail id')

    } else if (!this.subject) {

      this.toastr.warning('enter password')

    } else {
      let data = {
        senderName: this.name,
        senderMail: this.senderMail,
        recieverMail: this.recieverEmail,
        subject: this.subject,
        content: this.content,
        image: this.file,
        name: this.file.name
      }
      this.service.send(data)
        .subscribe((apiResponse) => {
          this.toastr.success('Login success')
          this.router.navigate(['/inbox'])
        })
    }
  }

  ngOnDestroy() {
    if (this.done == false) {
      if (this.recieverEmail || this.subject || this.content) {
        let data = {
          senderName: this.name,
          senderMail: this.senderMail,
          recieverMail: this.recieverEmail,
          subject: this.subject,
          content: this.content,
        }
        this.service.draft(data)
          .subscribe((apiResponse) => {
            this.toastr.success('Saved to draft')
          })
      }
    }
  }

}
