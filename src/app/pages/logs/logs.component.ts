import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TimeOfDayComponent } from "../../components/time-of-day/time-of-day.component";
@Component({
    selector: 'app-logs',
    standalone: true,
    templateUrl: './logs.component.html',
    styleUrl: './logs.component.scss',
    imports: [
        RouterLink,
        NavbarComponent,
        FooterComponent,
        TimeOfDayComponent
    ]
})
export class LogsComponent {

}
