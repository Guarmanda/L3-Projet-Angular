import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-multibox',
  templateUrl: './multibox.component.html',
  styleUrls: ['./multibox.component.css'],

})
export class MultiboxComponent implements OnInit {

  tab1 = ["first", "Choisis ta musique", "Spotify", "#services"];
  tab2 = ["second", "Choisis ta date", "Convier", "#team"];
  tab3 = ["third", "Choisis ton film", "IMDB", "#pricing"];
  boxes= [this.tab1, this.tab2, this.tab3];
  constructor() {
  }

  ngOnInit(): void {

  }

}
