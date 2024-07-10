import { Component, ViewChild, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NgForm, FormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MessageService } from '../../services/message.service';
import { MessageData } from '../../interface/imessage-data';
import { TimeOfDayComponent } from "../../components/time-of-day/time-of-day.component";
import { merge } from 'rxjs';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        RouterLink,
        NavbarComponent,
        FooterComponent,
        FormsModule,
        CommonModule,
        TimeOfDayComponent,
        MatFormFieldModule,
        MatInputModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
        changeDetection: ChangeDetectionStrategy.OnPush
  
    
})

export class HomeComponent implements OnInit {

  @ViewChild('myForm', { static: true }) messageForm!: NgForm;
  phoneNumber!: string;
  sender!: string;
  message!: string;
  maxChars = 160;
  formMode = false;
  hasError = null;
  submitted = false;
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  readonly email = new FormControl('', [Validators.required, Validators.email]);


  constructor(
    private router: Router,
    private messageService: MessageService) {
      merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.messageForm.form.setValue({
    //     phone: '+0013121234567',
    //     email: 'ricardo@ferreiras.dev.br',
    //     sender: 'Ricardo Ferreira',
    //     message: 'The quick brown fox dog jumps over the lazy dog....'
    //   });
    // }, 1000);

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

    const timeStampSent = new Date(data.createdAt);
    
    const dateAndTime: string  = timeStampSent.toLocaleString();

    Swal.fire({
      titleText: 'Message Sent at!',
      text: dateAndTime,
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true

    }).then((result) => {
      
          setTimeout(() => {
            this.messageForm.form.setValue({
              phone: '+0013121234567',
              email: 'ricardo@ferreiras.dev.br',
              sender: 'Ricardo Ferreira',
              message: 'The quick brown fox dog jumps over the lazy dog....'
            });
          }, 1000);
      
        }
      )
  }

  errorMessage = signal('');
  handleErrors(error: HttpErrorResponse) {

    console.error('An error ocurred...');
    console.log(error.error);
    if (error) {
      Swal.fire({
        title: 'Message Notifications Services Not Available!!!',
        text: 'Check your network connectivity!',
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

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}




function takeUntilDestroyed(): import("rxjs").OperatorFunction<unknown, unknown> {
  throw new Error('Function not implemented.');
}

