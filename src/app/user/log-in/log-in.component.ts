import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MailService } from '../../mail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public email: String;
  public password: any;

  public userList: any = [];
  public disconnectedSocket: boolean;
  public authToken: String = Cookie.get('authToken')

  constructor(public appService: MailService,
    public router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  // Log-in function
  public signinFunction: any = () => {

    if (!this.email) {
      this.toastr.warning('enter email')

    } else if (!this.password) {

      this.toastr.warning('enter password')

    } else {
      let data = {
        email: this.email,
        password: this.password
      }
      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {
          this.toastr.success('Login success')
          if (apiResponse.status === 200) {


            Cookie.set('authToken', apiResponse.data.authToken);

            Cookie.set('userId', apiResponse.data.userDetails.userId);

            Cookie.set('userName', apiResponse.data.userDetails.name);

            Cookie.set('mail', apiResponse.data.userDetails.email);


            this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)


            this.router.navigate([`/inbox`])


          } else {

            this.toastr.error(apiResponse.message)


          }

        }, (err) => {

          this.toastr.warning(err.error.message)

        });

    } // end condition

  } // end Log-inFunction

}
