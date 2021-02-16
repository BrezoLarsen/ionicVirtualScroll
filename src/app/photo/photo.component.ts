import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent  {

  @Input() photo;
  public photoId;
  public photoUrl;
  public photoText;

  constructor() { }

  ionViewWillEnter() {
    this.photoId = this.photo.id;
    this.photoUrl = this.photo.url;
    this.photoText = this.photo.texto;
  }

}
