import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
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
    RouterOutlet,
    NgIf,
    TimeOfDayComponent
],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  providers: [MessageService]
})
export class PaginationComponent implements OnInit {
  title = 'messages';
  displayedColumns: string[] = ['id', 'sender', 'email', 'phone', 'message', 'status', 'createdAt'];
  dataSource: MatTableDataSource<MessageData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private messageService: MessageService) {
    this.dataSource = new MatTableDataSource<MessageData>([]);
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.fetchMessages();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.messageService.getPagedMessages(0, 5).subscribe({
      next: (data: MessageData[]) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Failed to fetch messages', err)
    });
  }
}
