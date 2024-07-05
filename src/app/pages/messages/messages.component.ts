import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterLink,
    FooterComponent,
    NavbarComponent,
    MatGridListModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})

export class MessagesComponent {

}
