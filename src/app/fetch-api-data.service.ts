import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-movies1980.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {

  }

  // Making the api call for the user registration endpoint

  /**
   * @service POST to the respective endpoint of apiUrl to register a new user
   * @param {any} userDetails 
   * @returns a new user object in JSON format
   * @function userRegistration
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login endpoint

  /**
   * @service POST to the respective endpoint of apiUrl to login an existing user
   * @param {any} userDetails 
   * @returns an existing user object in JSON format
   * @function userLogin
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies endpoint

  /**
   * @service GET to the respective endpoint of apiUrl to get all movies
   * @returns an array of all movies in JSON format
   * @function getAllMovies
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get one movie endpoint

  /**
   * @service GET to the respective endpoint of apiUrl to get a movie by title
   * @param {string} Title 
   * @returns an array of movie objects in JSON format
   * @function getOneMovie
   */

  getOneMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/${Title}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get director endpoint

  /**
   * @service GET to the respective endpoint of apiUrl to get info about director
   * @param {string} directorName 
   * @returns an array of movie objects in JSON format
   * @function getDirector
   */

  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/director/${directorName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get genre endpoint

  /**
   * @service GET to the respective endpoint of apiUrl to get info about genre
   * @param {string} genreName 
   * @returns an array of movie objects in JSON format
   * @function getGenre
   */

  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/genre/${genreName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get user endpoint

  /**
   * @service GET to the respective endpoint of apiUrl to get a specific user
   * @returns a user object in JSON format
   * @function getUser
   */

  getUser(): Observable<any> {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get favourite movies for a user endpoint

  /**
   * @service GET to the respective endpoint of apiUrl to get favorite movies of user
   * @param {string} MovieID 
   * @returns a user object in JSON format
   * @function getFavoriteMovies
   */

  getFavoriteMovies(MovieID: string): Observable<any> {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}users/${username}/movies/${MovieID}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Add a movie to favourite movies endpoint

  /**
   * @service POST to the respective endpoint of apiUrl to add movie to user's favorites
   * @param {string} MovieID 
   * @returns a user object in JSON format
   * @function addFavoriteMovie
   */
  addFavoriteMovie(MovieID: string): Observable<any> {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}users/${username}/movies/${MovieID}`,
      { FavoriteMovie: MovieID },
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }),
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Edit user endpoint

  /**
   * @service PUT to the respective endpoint of apiUrl to update user's details
   * @param {any} updatedUser 
   * @returns a user object in JSON format
   * @function editUser
   */

  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}users/${username}`, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Delete user endpoint

  /**
   * @service DELETE to the respective endpoint of apiUrl to delete a user
   * @returns success message
   * @function deleteUser
   */

  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Delete movie from favourite movies endpoint

  /**
   * @service DELETE to the respective endpoint of apiUrl to delete a movie from user's favorites
   * @param {string} MovieID 
   * @returns a user object in JSON format
   * @function deleteFavoriteMovie
   */

  deleteFavoriteMovie(MovieID: string): Observable<any> {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${username}/movies/${MovieID}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction

  /**
   * Extracts response data from HTTP response
   * @param res 
   * @returns response body or empty object
   */

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Error handler

  /**
   * Error handler
   * @param error 
   * @returns error message
   */


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
