import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailService } from '../../mail.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public datas: [];
  public name: String;
  constructor(public route: ActivatedRoute, public router: Router, public service: MailService, public toastr: ToastrService) { }

  ngOnInit() {
    this.name = Cookie.get('userName')

    let id = this.route.snapshot.paramMap.get('id')
    this.service.viewInboxMail(id).subscribe((response => {
      this.datas = response.data

    }))
  }

  delete(id) {
    this.service.delete(id).subscribe((Response) => {
      if (Response.status === 200) {
        this.toastr.success('Mail moved to trashbox')
        this.router.navigate(['/inbox'])
      }
    })
  }


  reply(data) {
    this.router.navigate([`/reply/${data.id}/${data.senderMail}`])
  }
}
