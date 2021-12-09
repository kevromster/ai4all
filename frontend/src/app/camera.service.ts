import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Camera } from './camera';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CameraService {

  private camerasUrl = '/api/submit-camera-items';

  constructor(private http: HttpClient) {}

  /** GET cameras from the server */
  getCameras(tgChatId: number): Observable<Camera[]> {
    const url = `${this.camerasUrl}/?tgChatId=${tgChatId}`
    return this.http.get<Camera[]>(url)
      .pipe(
        tap(_ => this.log('fetched cameras')),
        catchError(this.handleError('getCameras', []))
      );
  }

  /** GET camera by id. Will 404 if id not found */
  getCamera(id: number): Observable<Camera> {
    const url = `${this.camerasUrl}/${id}`;
    return this.http.get<Camera>(url).pipe(
      tap(_ => this.log(`fetched camera id=${id}`)),
      catchError(this.handleError<Camera>(`getCamera id=${id}`))
    );
  }

  /** POST: add a new camera to the server */
  addCamera(camera: Camera): Observable<Camera> {
    this.log(`adding camera with tg_chat_id = ${camera.tg_chat_id}`);
    return this.http.post<Camera>(`${this.camerasUrl}/`, camera, httpOptions).pipe(
      tap((camera: Camera) => this.log(`added camera with id=${camera.id}`)),
      catchError(this.handleError<Camera>('addCamera'))
    );
  }

  /** DELETE: delete the camera from the server */
  deleteCamera(camera: Camera | number): Observable<Camera> {
    const id = typeof camera === 'number' ? camera : camera.id;
    const url = `${this.camerasUrl}/${id}/`;

    return this.http.delete<Camera>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted camera id=${id}`)),
      catchError(this.handleError<Camera>('deleteCamera'))
    );
  }

  /** PUT: update the camera on the server */
  updateCamera(camera: Camera): Observable<any> {
    const url = `${this.camerasUrl}/${camera.id}/`;
    return this.http.put(`${url}`, camera, httpOptions).pipe(
      tap(_ => this.log(`updated camera id=${camera.id}`)),
      catchError(this.handleError<any>('updateCamera'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`CameraService: ${message}`);
  }
}
