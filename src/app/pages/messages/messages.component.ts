import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MessageData } from '../../interface/imessage-data';
import { MessageService } from '../../services/message.service';
import { TimeOfDayComponent } from "../../components/time-of-day/time-of-day.component";
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  imports: [
    FooterComponent,
    NavbarComponent,
    TimeOfDayComponent,
    CommonModule,
    NgFor,
    NgxPaginationModule,
  ],
  changeDetection: ChangeDetectionStrategy.Default

})


export class MessagesComponent implements OnInit, OnDestroy {


  @Input('data') messages: MessageData[] = [];


  page: number = 1;
  totalItems!: number;
  totalPages!: number;
  size!: number;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = false

  public config: PaginationInstance = {
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: this.totalItems
  };

  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
}

  onPageChange(number: number) {
    this.logEvent(`pageChange(${number})`);
    this.config.currentPage = number;
  }

  private logEvent(message: string) {
    this.eventLog.unshift(`${new Date().toISOString()}: ${message}`)
  }

  public eventLog: string[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.fetchPagedMessages(this.page);
  }

  fetchMessages(): void {
    this.messageService.getMessages()
      .subscribe((response: any) => {
        this.messages = response;

      });
  }

  fetchPagedMessages(page: number) {
    this.messageService.getPagedMessages()
      .subscribe((response: any) => {

        this.messages = response;
        console.log(this.page);
        console.log(this.size);
        console.log(this.totalItems);
        console.log(this.totalPages);
        console.log(response);
      })
  }

  ngOnDestroy(): void {
  }
}
