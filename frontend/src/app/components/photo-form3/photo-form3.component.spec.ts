import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoForm3Component } from './photo-form3.component';

describe('PhotoForm3Component', () => {
  let component: PhotoForm3Component;
  let fixture: ComponentFixture<PhotoForm3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoForm3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoForm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
