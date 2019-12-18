import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    },
    ),
    BrowserAnimationsModule,
    RouterModule.forChild
      ([
        { path: "log", component: LogInComponent },
        { path: "", redirectTo: "log", pathMatch: "full" }
      ])

  ]
})
export class UserModule { }
