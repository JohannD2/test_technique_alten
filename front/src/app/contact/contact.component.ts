import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactService } from './data-access/contact.service';

//primeng imports

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InputTextModule, InputTextareaModule, CardModule, ButtonModule, ToastModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  
})
export class ContactComponent implements OnInit {
  
  contactForm!: FormGroup
  emailControl!: FormControl;
  messageControl!: FormControl;

  isSubmitting = false;

  constructor(private fb: FormBuilder, private contactService: ContactService, private messageService: MessageService) {}

  ngOnInit(): void {
  // Initialize form with controls and validators
       this.contactForm = this.fb.group({
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        message: ['', Validators.required],
       })

       // Assign controls to form fields
       this.emailControl = this.contactForm.get('email') as FormControl; 
       this.messageControl = this.contactForm.get('message') as FormControl;
  }

//toasts
     showSuccess(details: string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: details });
    }

    showError(details: string) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: details });
  }

// submit to service
  onSubmit(): void {
    if(this.contactForm.valid){
    this.isSubmitting = true; 
    const payload = this.contactForm.value;

     console.log(this.contactForm.value)

    this.contactService.sendContact(payload).subscribe({
      next: response => {
        // Show success message
        this.showSuccess(response?.response);
        this.contactForm.reset();
      
      },
      error: (err) => {
        // Show error message
        this.showError(err.error?.message);
      },
      complete: () => {
        this.isSubmitting = false; 
      },
    });
  }

}
  
}


