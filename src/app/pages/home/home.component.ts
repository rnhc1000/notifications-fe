import { Component, ViewChild } from '@angular/core';
import { RouterLink , Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NgForm, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChild('myForm', { static: true }) messageForm!: NgForm;
  email!: string;
  phoneNumber!: string;
  name!: string;
  message!: string;
  maxChars = 160;
  formMode = false; // true == register
  hasError = null;
  submitted = false;

 
  
  constructor(
    private router: Router) {

  }

  toggleMode() {
    this.formMode = !this.formMode;
  }
  
  submitHandler() {

    this.submitted = true; 

  }

  
}
