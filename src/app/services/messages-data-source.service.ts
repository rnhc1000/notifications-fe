import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { MessageData } from '../interface/imessage-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from './message.service';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class MessagesDataSourceService  extends DataSource<MessageData>{

  messages$ = new BehaviorSubject<MessageData[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private messageService: MessageService) {
    super();
  }


  override connect(): Observable<MessageData[]> {
    return this.messages$.asObservable();
  }
  override disconnect(): void {
    this.messages$.complete();
  } 

  loadMessages(): void {
    this.isLoading$.next(true);
    this.messageService.getPagedMessages(1, 5).subscribe(messages => {
      this.messages$.next(messages);
      this.isLoading$.next(false);
    })
  }

  loadSortedMessages(sort: Sort): void {
    this.isLoading$.next(true);
    this.messageService.getSortedMessages(sort).subscribe(messages => {
      this.messages$.next(messages);
      this.isLoading$.next(false);
    })

  }

}
