import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  favoriteMovies: any[] = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    // public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
    this.user = response;
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;

    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.favoriteMovies = response.filter((m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0)

   })
    
  })
}

  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));

      this.snackBar.open('User successfully updated', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  deleteUser(): void {
    if (confirm("Are you sure you want to delete this account?")){
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          "You have successfully deleted your account", "OK",
          {
            duration: 2000,
          }
        );
    });
    this.fetchApiData.deleteUser().subscribe((result) => {
      localStorage.clear();
    });
      }
    }
  }

