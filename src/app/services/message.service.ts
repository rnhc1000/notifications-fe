import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MessageData } from '../interface/imessage-data';
import { SubscriberData } from '../interface/isubscriber-data';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})

export class MessageService {


  statusChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {

  }
  currentPage: number = 1;
  totalPages!: number;
  totalItems!: number;
  size!: number;

  register(data: SubscriberData) {

    return this.http.post<SubscriberData>('http://192.168.15.11:8095/messages', {
      sender: data.sender,
      email: data.email,
      phone: data.phone,
      message: data.message
    })
      .pipe(
        catchError(this.handleErrors),
        tap((response: any) => {
          this.statusChange.emit(response);
          console.log(response);
        }),
      );

  }

  getMessages(): Observable<MessageData[]> {

    return this.http.get<MessageData[]>('http://192.168.15.11:8095/messages')
      .pipe(
        tap((response: any) => {
          this.statusChange.emit(response);
          console.log(response);
        }),
      )
  }

  getSortedMessages(sort: Sort): Observable<MessageData[]> {
    const params = new HttpParams()
    .set('_sort', sort.active)
    .set('_order', sort.direction);
    

    return this.http.get<MessageData[]>('http://192.168.15.11:8095/messages', {
      params,
    })
      .pipe(
        tap((response: any) => {
          this.statusChange.emit(response);
          console.log(response);
        }),
      )
  }

  getPagedMessages(page: number, size: number): Observable<MessageData[]> {


    return this.http.get<MessageData[]>('http://192.168.15.11:8095/pagedMessages')
      .pipe(
        tap((response: any) => {
          this.statusChange.emit(response);
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
          console.log("---");
          console.log(response);
          console.log(response.totalItems);
          console.log(response.totalPages);
          console.log(response.currentPage);
          console.log("---");

        }),
        map((response: any) => response.messages),
        
      )

  }
  /*
  
  */

  handleErrors(errObject: HttpErrorResponse, any: any) {

    if (errObject.status === 0) {
      return errObject.error;
    }

    return errObject;

  }


}
