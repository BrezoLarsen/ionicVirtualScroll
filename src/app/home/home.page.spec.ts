import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { PhotoService } from '../photo.service';


describe('HomePage', () => {
  let service: PhotoService;
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ]
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(PhotoService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can test HttpClient.getPhotos', () => {
    expect(service.getPhotos).toBeDefined();
  });


  it('should return photo', () => {
    service.getPhotos().subscribe(photo => {
      component.setFilteredPhotos(1);
      expect(photo.id).toContain(1);
    })
  });

});
