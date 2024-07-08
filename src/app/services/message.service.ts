import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MessageData } from '../interface/imessage-data';
import { SubscriberData } from '../interface/isubscriber-data';
import { catchError, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {


  statusChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
  ) { }

  register(data: SubscriberData) {
    return this.http.post<MessageData>('http://192.168.15.11:8095/messages', {
      sender: data.sender,
      email: data.email,
      phone: data.phone,
      message: data.message
    }
    ).pipe(
      catchError(this.handleErrors),
      tap((response: any) => {
        this.statusChange.emit(response);
        console.log(response);
      }),

    );

  }

  getMessages(data: MessageData) {
    return this.http.get<MessageData[]>('http://192.168.15.11:8095/messages')
      .pipe(
        retry(2),
        catchError(this.handleErrors)
      )
  }

  handleErrors(errObject: HttpErrorResponse) {

    if (errObject.status === 0) {
      return throwError('Sorry! Message Services not Available! Try again later!!!')
    }

    return throwError(errObject.error);

  }


}
