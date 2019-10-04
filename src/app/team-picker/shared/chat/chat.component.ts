import { ChatMessage } from './../../../shared/models/chat.model';
import { Component, OnInit, Input, ViewChild, NgZone, ElementRef } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ChatService } from 'src/app/shared/services/chat.service';
import { Observable } from 'rxjs';
import { orderBy } from 'lodash';

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
      this.chatService.saveMessage(this.chatInput, this.team).subscribe(() => {
        this.chatInput = '';
        this.isMessageSending = false;
      });
    }
  }

  scrollToBottom() {
    this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
   }
}
