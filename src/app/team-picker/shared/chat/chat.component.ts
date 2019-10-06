import { ChatMessage } from './../../../shared/models/chat.model';
import { Component, OnInit, Input, ViewChild, NgZone, ElementRef } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ChatService } from 'src/app/shared/services/chat.service';
import { Observable } from 'rxjs';
import { orderBy } from 'lodash';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'efl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() team: string;
  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;
  @ViewChild('chatBox', {static: false}) chatBox: ElementRef;

  chat$: Observable<ChatMessage[]>;
  chatInput: string;
  isMessageSending: boolean = false;

  constructor(private chatService: ChatService, private ngZone: NgZone) {}

  ngOnInit() {
    this.chat$ = this.chatService.getMessages()
      .pipe(
        map(data => orderBy(data, ['timestamp'], ['asc']))
      );
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSubmit() {
    if (!this.isMessageSending) {
      this.isMessageSending = true;
      this.sendMessage(this.team, this.chatInput).subscribe(() => {
        this.chatInput = '';
        this.isMessageSending = false;
      });
    }
  }

  sendMessage(team: string, chatMsg: string): Observable<DocumentReference> {
    return this.chatService.saveMessage(team, chatMsg);
  }

  scrollToBottom() {
    this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
   }
}
