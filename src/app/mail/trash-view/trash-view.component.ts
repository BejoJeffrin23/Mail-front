import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailService } from '../../mail.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trash-view',
  templateUrl: './trash-view.component.html',
  styleUrls: ['./trash-view.component.css']
})
export class TrashViewComponent implements OnInit {
  public data: Object;
  constructor(public route: ActivatedRoute, public router: Router, public service: MailService, public toastr: ToastrService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.service.viewTrashMail(id).subscribe((response => {
      this.data = response.data

    }))
  }


  delete(id) {
    this.service.deletePermanent(id).subscribe((Response) => {
      if (Response) {
        this.toastr.success('Mail deleted')
        this.router.navigate(['/trash'])
      }
    })
  }

}
