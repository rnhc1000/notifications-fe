import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MessageData } from '../../interface/imessage-data';
import { TimeOfDayComponent } from "../../components/time-of-day/time-of-day.component";
import { MessageService } from '../../services/message.service';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-messages',
    standalone: true,
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.scss',
    imports: [
        RouterLink,
        FooterComponent,
        NavbarComponent,
        MatGridListModule,
        TimeOfDayComponent
    ]
})
export class MessagesComponent extends DataSource<MessageData>{
messages: any;

  override connect(collectionViewer: CollectionViewer): Observable<readonly MessageData[]> {
    throw new Error('Method not implemented.');
  }
  override disconnect(collectionViewer: CollectionViewer): void {
    throw new Error('Method not implemented.');
  }

  constructor(private messageService: MessageService)  {
    super();
  }



}
