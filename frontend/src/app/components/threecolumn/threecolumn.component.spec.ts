import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreecolumnComponent } from './threecolumn.component';

describe('ThreecolumnComponent', () => {
  let component: ThreecolumnComponent;
  let fixture: ComponentFixture<ThreecolumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreecolumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreecolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
