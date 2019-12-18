import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MailService } from '../../mail.service'
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  public recieverMail: String;
  public content: String;
  public title: String;
  public subject: String;
  public senderMail: String;
  public name: String;
  public done: Boolean = false;
  public file: any;
  public id: String
  constructor(public toastr: ToastrService, public service: MailService, public router: Router, public route: ActivatedRoute) {
  }



  ngOnInit() {
    this.senderMail = Cookie.get('mail')
    this.name = Cookie.get('userName')
    this.recieverMail = this.route.snapshot.paramMap.get('mail')
    this.id = this.route.snapshot.paramMap.get('id')
  }



  Selected(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file)
  }

  public sentMail = () => {

    this.done = true
    if (!this.subject) {

      this.toastr.warning('subject missing')

    } else {
      let data = {
        senderName: this.name,
        senderMail: this.senderMail,
        recieverMail: this.recieverMail,
        subject: this.subject,
        content: this.content,
        image: this.file,
        name: this.file.name,
        id: this.id
      }
      this.service.reply(data)
        .subscribe((apiResponse) => {
          this.toastr.success('Login success')
          this.router.navigate([`/view/${this.id}`])
        })
    }
  }



}
