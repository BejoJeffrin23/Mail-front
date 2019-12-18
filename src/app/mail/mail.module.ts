import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentComponent } from './sent/sent.component';
import { TrashComponent } from './trash/trash.component';
import { InboxComponent } from './inbox/inbox.component';
import { RouterModule } from '@angular/router';
import { SentMailComponent } from './sent-mail/sent-mail.component';
import { DraftComponent } from './draft/draft.component';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';
import { ViewMailComponent } from './view-mail/view-mail.component';
import { TrashViewComponent } from './trash-view/trash-view.component';
import { DraftSendComponent } from './draft-send/draft-send.component';
import { ReplyComponent } from './reply/reply.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [SentComponent, TrashComponent, InboxComponent, SentMailComponent, DraftComponent, ViewComponent, ViewMailComponent, TrashViewComponent, DraftSendComponent, ReplyComponent],
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    RouterModule.forChild([
      { path: "inbox", component: InboxComponent },
      { path: "create", component: SentMailComponent },
      { path: "drafts", component: DraftComponent },
      { path: 'trash', component: TrashComponent },
      { path: 'sent', component: SentComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: 'viewOther/:id', component: ViewMailComponent },
      { path: 'viewTrash/:id', component: TrashViewComponent },
      { path: "draftView/:id", component: DraftSendComponent },
      { path: 'reply/:id/:mail', component: ReplyComponent }


    ])
  ]
})
export class MailModule { }
