import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvierComponent } from './convier.component';

describe('ConvierComponent', () => {
  let component: ConvierComponent;
  let fixture: ComponentFixture<ConvierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
