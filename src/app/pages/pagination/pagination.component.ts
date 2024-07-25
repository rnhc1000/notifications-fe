import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { TimeOfDayComponent } from "../../components/time-of-day/time-of-day.component";
import { RouterOutlet } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { MessagesDataSourceService } from '../../services/messages-data-source.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterOutlet,
    TimeOfDayComponent,
    NgIf
  ],
  providers: [
    MessagesDataSourceService,
    MessageService,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})

export class PaginationComponent implements OnInit {
  sortMessages(sort: Sort): void {
    this.dataSource.loadMessages();
  }

  title = 'messages';


  displayedColumns: string[] = ['id', 'email', 'phone', 'message', 'status', 'createdAt'];
  dataSource = new MessagesDataSourceService(this.messageService);

  @ViewChild(MatPaginator) paginator!: MatPaginator
  // @ViewChild(MatSort) sort!: MatSort;
  // messages: any;

  // fetchMessages() {
  //   return this.messageService.getMessages()
  //   .subscribe((response: any) => {
  //     this.messages = response;

  //   })
  // }


  constructor(private messageService: MessageService) {

  }


  ngOnInit(): void {
    // this.dataSource.loadSortedMessages({active: 'messageId', direction: 'asc'});
    this.dataSource.loadMessages();

  }


}


function fetchMessages() {
  throw new Error('Function not implemented.');
}

function applyFilter(event: Event | undefined, Event: { new(type: string, eventInitDict?: EventInit): Event; prototype: Event; readonly NONE: 0; readonly CAPTURING_PHASE: 1; readonly AT_TARGET: 2; readonly BUBBLING_PHASE: 3; }) {
  throw new Error('Function not implemented.');
}

