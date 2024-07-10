import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MessageData } from '../interface/imessage-data';
import { SubscriberData } from '../interface/isubscriber-data';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {


  statusChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

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


  handleErrors(errObject: HttpErrorResponse, any: any) {

    if (errObject.status === 0) {
      return errObject.error; 
    }

    return errObject;

  }


}
