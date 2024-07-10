import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MessageData } from '../../interface/imessage-data';
import { MessageService } from '../../services/message.service';
import { TimeOfDayComponent } from "../../components/time-of-day/time-of-day.component";
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  imports: [
    RouterLink,
    FooterComponent,
    NavbarComponent,
    TimeOfDayComponent,
    DataTablesModule,
    CommonModule,
    NgFor
  ]
})
export class MessagesComponent implements OnInit, OnDestroy {
  public messages: MessageData[] = [];

  dtOptions: Config = {};

  dtTrigger: Subject<any> = new Subject<any>



  constructor(private messageService: MessageService,
    
  ) {

  }

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.messageService.getMessages()
    .subscribe((response: any) => {
      this.messages = response;
      this.dtTrigger.next;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

  }
}
