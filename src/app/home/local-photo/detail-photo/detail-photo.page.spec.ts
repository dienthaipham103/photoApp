import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPhotoPage } from './detail-photo.page';

describe('DetailPhotoPage', () => {
  let component: DetailPhotoPage;
  let fixture: ComponentFixture<DetailPhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPhotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
