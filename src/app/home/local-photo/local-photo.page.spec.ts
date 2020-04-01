import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalPhotoPage } from './local-photo.page';

describe('LocalPhotoPage', () => {
  let component: LocalPhotoPage;
  let fixture: ComponentFixture<LocalPhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalPhotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
