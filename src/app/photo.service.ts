import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPhoto } from './interfaces/photo';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  api_url = 'https://picsum.photos/v2/list?limit=100';
  public photoList: object = {};
  public photoListFinal: IPhoto[] = [];
  private randomLipsums: string[] = [
    "Vestibulum ornare lectus a tincidunt.",
    "Sed a sodales justo. Ut.",
    "Mauris cursus purus ornare, mattis.",
    "Nam in diam tellus. Curabitur.",
    "Vestibulum neque lacus, interdum a.",
    "Integer mollis neque hendrerit urna.",
    "Vestibulum pretium ex felis, sodales.",
    "Praesent venenatis pulvinar ex sit.",
    "Quisque semper semper lacus, eget.",
    "Maecenas at libero condimentum, iaculis.",
    "Quisque in leo non mauris.",
    "Suspendisse venenatis iaculis urna interdum.",
    "Quisque ut tempor odio, sed.",
    "Ut id luctus erat. In.",
    "Duis quam nibh, placerat at.",
    "Morbi finibus rutrum nibh. Nam.",
    "Cras id libero non quam.",
    "Fusce varius, eros eu lacinia.",
    "Sed tempus massa ante, vel.",
    "Nunc sit amet pulvinar dui.",
  ];

  constructor(private httpClient: HttpClient) { }

  public getPhotos(): Observable<any>{
    return this.httpClient.get<IPhoto>(this.api_url).pipe(
      map((data: object) => {
        this.photoList = data;
        this.setDataInPhotoElement();
      })
    );
  }

  setDataInPhotoElement(): void {
    for(let i = 0; i < 4000; i++) {
      const photoIndex = `${Math.round( Math.random() * 99)}`;
      const photoObject = this.photoList[photoIndex];
      const newphoto: IPhoto = {
        id: i,
        url: photoObject.download_url,
        text: this.getRandomLipsum()
      }
      this.photoListFinal.push(newphoto);
    }
  }

  private getRandomLipsum(): string {
    const rdm = this.getRandomInt(0, this.randomLipsums.length);
    return this.randomLipsums[rdm];
  }

  private getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
