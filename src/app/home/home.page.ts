import { Component } from '@angular/core';
import { IPhoto } from '../interfaces/photo';
import { PhotoService } from '../photo.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public photoList: any[] = [];
  public photoListFinal: IPhoto[] = [];
  public filteredPhotos: IPhoto[] = [];
  public id: number;
  public photo: IPhoto;
  public searchTerm = '';
  destroy$: Subject<boolean> = new Subject<boolean>();

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

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.photoService.getPhotos().pipe(takeUntil(this.destroy$)).subscribe((data)=>{
      this.photoList = data;
      this.setDataInPhotoElement();
    });
  }

  setDataInPhotoElement() {
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
    this.filteredPhotos = this.photoListFinal;
  }

  setFilteredPhotos(searchTerm) {
    const searchText = searchTerm.toLowerCase();
    this.filteredPhotos = this.photoListFinal.filter(photo => {
      return photo.text.toLowerCase().indexOf(searchText) > -1 || photo.id.toString().indexOf(searchText) > -1;
    });
  }

  private getRandomLipsum() {
    const rdm = this.getRandomInt(0, this.randomLipsums.length);
    return this.randomLipsums[rdm];
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
