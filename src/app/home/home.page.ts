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

  public filteredPhotos: IPhoto[] = [];
  public id: number;
  public photo: IPhoto;
  public searchTerm: string = '';
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.photoService.getPhotos().pipe(takeUntil(this.destroy$)).subscribe((data)=>{
      this.filteredPhotos = this.photoService.photoListFinal;
    });
  }

  setFilteredPhotos(searchTerm): void {
    const searchText = searchTerm.toLowerCase();
    this.filteredPhotos = this.photoService.photoListFinal.filter(photo => {
      return photo.text.toLowerCase().indexOf(searchText) > -1 || photo.id.toString().indexOf(searchText) > -1;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
