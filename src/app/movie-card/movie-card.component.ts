import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
 

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) 
    {}
   

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

getDirector(name: string, bio: string): void {
  this.dialog.open(MovieInfoComponent, {
    data: {
      title: 'Director',
      content: bio
    },
  })
}

getGenre(name: string, description: string): void {
  this.dialog.open(MovieInfoComponent, {
    data: {
      title: name,
      content: description
    },
  })
}

getDescription(description: string): void {
  this.dialog.open(MovieInfoComponent, {
    data: {
      title: 'Description',
      content: description
    },
  })
}

addFavoriteMovie(MovieID: string): void {
  this.fetchApiData.addFavoriteMovie(MovieID).subscribe((result) => {
    this.snackBar.open('Movie has been added to favorites', 'OK', {
      duration: 2000
    })
  })
}

isFavoriteMovie(MovieID: string ): boolean {
  return this.fetchApiData.isFavoriteMovie(MovieID);

}

deleteFavoriteMovie(MovieID: string): void {
  this.fetchApiData.deleteFavoriteMovie(MovieID).subscribe((result) => {
    this.snackBar.open('Movie has been removed from favorites', 'OK', {
      duration: 2000
    })
  })
}


}
