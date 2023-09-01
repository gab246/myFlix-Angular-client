import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


/**
 * Declaring the api url that will provide data for client app
 * add changes to CORS orign through Heroku
 */
const apiUrl = 'https://desolate-sierra-27780.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

 
 /**
  *  api call for user registration endpoint
  * @param userDetails 
  * @returns user registration confirmation
  * displayed on welcome page
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }


 /**
  * api call to user login endpoint
  * @param userDetails 
  * @returns user login confirmation 
  * displayed on welcome page
  */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

 /**
  * api call to get all movies endpoint
  * @returns all movies 
  */
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
  
  
 /**
  * api call for one movie endpoint
  * @param Title 
  * @returns one specific movie
  */
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



 /**
  * @param directorName 
  * @returns information about specific director
  * displayed in movie card after clicking director button
  */
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


 /**
  * api call for genre endpoint
  * @param genreName 
  * @returns information about specific genre
  * displayed after clicking genre button on movie card
  */
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

 /**
  * api call for user endpoint
  * @returns 
  */
getUser(): Observable<any> {
  const username = localStorage.getItem('Username')
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


 /**
  * api call for fav movie list endpoint
  * @returns favorite movies
  */
getFavoriteMovies(): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'user' + user.Username, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}


 /**
  * api call for adding fav movie to list endpoint
  * @param MovieID 
  * @returns added movie to favorite movies
  * displayed on movie card
  */
addFavoriteMovie(MovieID: string): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  user.FavoriteMovies.push(MovieID);
  return this.http.post(apiUrl + 'users/' + user.Username + /movies/ + MovieID, {}, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

isFavoriteMovie(MovieID: string): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.FavoriteMovies.indexOf(MovieID) >= 0;
}

 /**
  * 
  * @param updatedUser 
  * @returns updated user information (username, password, email, DOB)
  * displayed in profile view
  */
editUser(updatedUser: any): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}



/**
 * api call to delete user account
 * @returns confirmation to deleted user account
 * displyed in profile view
 */
deleteUser(): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + user.Username,  {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/**
 * 
 * @param MovieID 
 * @returns deletes movie from favorite movies 
 * displayed on movie card
 */
deleteFavoriteMovie(MovieID: string): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  const index = user.FavoriteMovies.indexOf(MovieID);
  if (index > -1) {
    user.FavoriteMovies.splice(index, 1);
  }
  localStorage.setItem('user', JSON.stringify(user));
  return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + MovieID, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Non-typed response extraction
private extractResponseData(res: any): any {
  const body = res;
  return body || {};
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
  'Something bad happened; please try again later.');
}
}