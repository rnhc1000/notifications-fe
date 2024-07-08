import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MessageService } from '../../services/message.service';
import { MessageData } from '../../interface/imessage-data';


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

export class HomeComponent implements OnInit {

  @ViewChild('myForm', { static: true }) messageForm!: NgForm;
  email!: string;
  phoneNumber!: string;
  sender!: string;
  message!: string;
  maxChars = 160;
  formMode = false;
  hasError = null;
  submitted = false;


  constructor(
    private router: Router,
    private messageService: MessageService) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.messageForm.form.setValue({
        phone: '+0013121234567',
        email: 'ricardo@ferreiras.dev.br',
        sender: 'Ricardo Ferreira',
        message: 'The quick brown fox dog jumps over the lazy dog....'
      });
    }, 1000);

  }

  toggleMode() {
    this.formMode = !this.formMode;
  }

  submitHandler() {

    const formValues = this.messageForm.value;
    if (this.messageForm.valid) {

      if (this.formMode) {

        this.messageService.register(formValues).subscribe(
          data => this.handleSuccess(data),
          error => console.log(error)
        );

      } else {

        console.log('message');
        this.messageService.register(formValues).subscribe(
          data => this.handleSuccess(data),
          error => this.handleErrors(error)
        );
      }

      console.log(this.messageForm.value);
      this.messageForm.form.reset();
    }

  }


  handleSuccess(data: MessageData) {

    this.router.navigate(['./messages']);

  }

  handleErrors(error: HttpErrorResponse) {

    console.error('An error ocurred, error.error');
    if (error.status === 0) {
      Swal.fire({
        title: 'Check your network connectivity!',
        text: 'Try again!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: `
     OK!
    `,

      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['./home'])
        }
      })

    } else {
      Swal.fire({
        title: 'Message Notifications Services Not Available!!!',
        text: 'Check Database availability!',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: `
     OK!
    `,

      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['./home'])
        }
      })

    }
  }

  
}




