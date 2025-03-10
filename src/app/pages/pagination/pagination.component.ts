import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MessageService } from '../../services/message.service';
import { MessageData } from '../../interface/imessage-data';
import { TimeOfDayComponent } from "../../components/time-of-day/time-of-day.component";

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

    TimeOfDayComponent
],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PaginationComponent implements AfterViewInit {
  title = 'messages';

  displayedColumns: string[] = ['messageId', 'sender', 'email', 'phone', 'message',  'createdAt', 'status'];
  dataSource: MatTableDataSource<MessageData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private messageService: MessageService) {
    this.dataSource = new MatTableDataSource<MessageData>([]);
  }


  ngAfterViewInit() {
    this.fetchMessages();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchMessages(): void {
    this.messageService.getPagedMessages(0, 5).subscribe({
      next: (data: MessageData[]) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Failed to fetch messages', err)
    });
  }

  // fetchMessages(): void {
  //   this.dataSource.data = [];
  //   console.log("Fetching messages...");
  //   this.messageService.getPagedMessages(0, 5).subscribe((data: MessageData[]) => {
  //     console.log("::: Data received: :::", data);
  //     this.dataSource.data =data;
  //   }, error => {
  //     console.error('Failed to fetch messages', error);
  //   });
  // }
}
