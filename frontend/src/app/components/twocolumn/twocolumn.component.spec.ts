import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwocolumnComponent } from './twocolumn.component';

describe('TwocolumnComponent', () => {
  let component: TwocolumnComponent;
  let fixture: ComponentFixture<TwocolumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwocolumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwocolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
