import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifySearchMusicComponent } from './spotify-search-music.component';

describe('SpotifySearchMusicComponent', () => {
  let component: SpotifySearchMusicComponent;
  let fixture: ComponentFixture<SpotifySearchMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifySearchMusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifySearchMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
