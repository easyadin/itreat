import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CirclePage } from './circle.page';

describe('CirclePage', () => {
  let component: CirclePage;
  let fixture: ComponentFixture<CirclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirclePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CirclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
