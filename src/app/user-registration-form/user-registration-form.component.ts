// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
//closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
//displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

//sends the form inputs to the backend
registerUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe({
    next: (response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // closes the modal on success
      console.log(response);
      this.snackBar.open('User registration has been successful!', 'OK', {
        duration: 2000,
      });
    },
    error: (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000,
      });
    },
  });
}


  }