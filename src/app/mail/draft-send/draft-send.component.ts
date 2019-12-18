import { Component, OnInit, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MailService } from '../../mail.service'
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-draft-send',
  templateUrl: './draft-send.component.html',
  styleUrls: ['./draft-send.component.css']
})
export class DraftSendComponent implements OnInit {

  public data: any;
  public id: String;

  public recieverEmail: String;
  public content: String;
  public title: String;
  public subject: String;
  public senderMail: String;
  public name: String;
  public done: Boolean = false;
  constructor(public toastr: ToastrService, public service: MailService, public router: Router, public route: ActivatedRoute) {
  }



  ngOnInit() {
    this.senderMail = Cookie.get('mail')
    this.name = Cookie.get('userName')
    this.id = this.route.snapshot.paramMap.get('id')
    let id = {
      id: this.id
    }
    this.service.viewDraft(id).subscribe((response) => {
      this.data = response.data
    })
  }



  public sentMail = () => {
    if (!this.data.recieverMail) {
      this.toastr.warning('enter reciever mail id')

    } else if (!this.data.subject) {

      this.toastr.warning('enter subject')

    } else {

      this.service.send(this.data)
        .subscribe((apiResponse) => {
          this.service.deleteDraft(this.data.id).subscribe((Response) => {
            this.toastr.success('Mail sent')
            this.router.navigate(['/inbox'])
          })

        })
    }
  }


}
