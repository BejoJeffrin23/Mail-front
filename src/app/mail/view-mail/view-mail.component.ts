import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailService } from '../../mail.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-mail',
  templateUrl: './view-mail.component.html',
  styleUrls: ['./view-mail.component.css']
})
export class ViewMailComponent implements OnInit {
  public data: Object;
  constructor(public route: ActivatedRoute, public router: Router, public service: MailService, public toastr: ToastrService) { }

  ngOnInit() {


    let id = this.route.snapshot.paramMap.get('id')
    this.service.viewMail(id).subscribe((response => {
      this.data = response.data

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
}