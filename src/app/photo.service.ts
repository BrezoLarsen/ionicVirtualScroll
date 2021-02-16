import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { IPhoto } from './interfaces/photo';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  api_url = 'https://picsum.photos/v2/list?limit=100';

  constructor(private httpClient: HttpClient) { }

  public getPhotos(): Observable<any>{
    return this.httpClient.get<IPhoto>(this.api_url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

}
