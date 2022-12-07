import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AnimTextComponent } from './anim-text/anim-text.component';
import { MultiboxComponent } from './multibox/multibox.component';
import { SpotifySearchMusicComponent } from './spotify-search-music/spotify-search-music.component';
import { environment } from 'src/environments/environment';
import { ConvierComponent } from './convier/convier.component';
import { TmdbComponent } from './tmdb/tmdb.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    NavbarComponent,
    AnimTextComponent,
    MultiboxComponent,
    SpotifySearchMusicComponent,
    ConvierComponent,
    TmdbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
