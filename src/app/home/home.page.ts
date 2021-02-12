import { Component } from '@angular/core';
import { IPhoto } from '../interfaces/photo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public photoList: IPhoto[] = [];
  public photo: IPhoto;
  public filteredPhotos: IPhoto[] = [];
  public searchTerm = '';

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

  constructor() {
    this.loadPhotos();
  }

  loadPhotos() {
    for(let i = 0; i < 4000; i++) {
      this.photoList.push(this.photo = {
        id: i,
        url: `https://picsum.photos/id/${Math.round( Math.random() * 80)}/500/500`,
        text: this.getRandomLipsum()
      });
    }
    this.filteredPhotos = this.photoList;
  }

  async setFilteredPhotos(searchTerm) {
    const searchText = searchTerm.toLowerCase();
    this.filteredPhotos = await this.photoList.filter(photo => {
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

}
