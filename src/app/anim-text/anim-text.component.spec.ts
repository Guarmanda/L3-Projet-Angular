import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimTextComponent } from './anim-text.component';

describe('AnimTextComponent', () => {
  let component: AnimTextComponent;
  let fixture: ComponentFixture<AnimTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
