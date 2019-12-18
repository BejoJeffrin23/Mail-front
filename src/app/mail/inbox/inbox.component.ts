import { Component, OnInit } from '@angular/core';
import { MailService } from '../../mail.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
declare var require: any
const sortOn = require('sort-on');


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})

export class InboxComponent implements OnInit {
  public details: []
  public userName: string;
  public mail: String;
  public content: string;
  constructor(public toastr: ToastrService, private service: MailService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.mail = Cookie.get('mail')
    this.service.getMails(this.mail).subscribe((data) => {
      this.details = data["data"]
      this.details = sortOn(this.details, ['-time']);
    })
    this.userName = Cookie.get('userName')
  }

  public setColor(read) {
    switch (read) {
      case true:
        return "#CCFFCC";
      case false:
        return "LightSkyBlue";
    }
  }

  view = (id) => {
    this.router.navigate([`/view/${id}`])
  }

  public create = () => {
    this.router.navigate(['/create'])
  }

  public logout = () => {

    this.service.logout().subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        Cookie.delete('authToken');
        Cookie.delete('userName');
        Cookie.delete('userId')
        this.router.navigate(['/log']);

      } else {
        this.toastr.error(apiResponse.message)
      } // end condition

    }, (err) => {
      this.toastr.error('Internal Server Error occured')

    });

  }
  // end of log-out function

}

