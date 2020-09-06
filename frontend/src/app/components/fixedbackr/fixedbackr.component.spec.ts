import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedbackrComponent } from './fixedbackr.component';

describe('FixedbackrComponent', () => {
  let component: FixedbackrComponent;
  let fixture: ComponentFixture<FixedbackrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedbackrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedbackrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
