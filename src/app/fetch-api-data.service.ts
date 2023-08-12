import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for client app
const apiUrl = 'https://desolate-sierra-27780.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 //api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
 
//api call for user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

//api call for get all movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', { 
      headers: new HttpHeaders(
        {
        Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  

//api call for one movie endpoint
getOneMovie(Title: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/' + Title, { 
    headers: new HttpHeaders(
      {
      Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//api call for director endpoint
getDirector(directorName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/directors' + directorName, { 
    headers: new HttpHeaders(
      {
      Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//api call for genre endpoint
getGenre(genreName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/genre' + genreName, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//api call for user endpoint
getUser(username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users' + username, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//api call for fav movie list endpoint
getFavoriteMovies(Username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'user' + Username, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//api call for adding fav movie to list endpoint
addFavoriteMovie(Username: string, movies: any, MovieID: number): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.post(apiUrl + 'users/' + Username + movies + MovieID, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//api call for editing user endpoint
editUser(Username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + Username, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//api call for deleting movie endpoint
deleteUser(Username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + Username, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//api call for deleting fav from list endpoint
deleteFavoriteMovie(Username: any, MovieID: number): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + Username + '/movies/' + MovieID, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Non-typed response extraction
private extractResponseData(res: Response): any {
  const body = res;
  return body || { };
}

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something is not right! Please try again later.');
  }
}
