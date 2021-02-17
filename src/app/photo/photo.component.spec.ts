import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IPhoto } from '../interfaces/photo';

import { PhotoComponent } from './photo.component';

const photoDataMock: IPhoto = {
  id: 1,
  url: "URLPHOTO",
  text: "TEXT PHOTO",
};

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    component.photo = photoDataMock;
    fixture.detectChanges();
  }));

  it('should create my component', () => {
    expect(component).toBeTruthy();
  });

});
