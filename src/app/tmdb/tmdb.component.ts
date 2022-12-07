
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-tmdb',
  templateUrl: './tmdb.component.html',
  styleUrls: ['./tmdb.component.css']
})
export class TmdbComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var apiKey = 'k_t601enkc';

    $("#btn_tmdb_Titre").click(function() {
      var searchBarTitle = $('#searchBarTitle').val();
      alert("search field " + searchBarTitle + "okok");
      var requestTitle = $.ajax({
        url: `https://imdb-api.com/fr/API/SearchMovie/` + apiKey + '/' + searchBarTitle,
        type: 'GET',
        success: function(data) {
          console.log(data);
          var film_poster = data.results[0].image;
          var film_id = data.results[0].id;
          var film_titre = data.results[0].title;
        }
      });
    });

    $("#btn_tmdb_Kw").click(function(){
      var searchBarKw = $('#searchBarKeyWord').val()?.toLocaleString();

      //alert("search KW : " +searchBarKw?.toLowerCase()+ " okok");
      var requestKw = $.ajax({
        url: `https://imdb-api.com/fr/API/Keyword/` + apiKey + '/' + searchBarKw?.toLowerCase(),
        type: 'GET',
        success: function(data){
          let nbFilms = data.items;
          let num_of_film = nbFilms.length;
          let count = 0;
          
          console.log(num_of_film);

        
          // Max number of Film is 10
          const max_film = 10;
          
          while (count < max_film && count < num_of_film) {
            // Extract the image of the FIRST film from the data object
            let film_poster = data.items[count].image;
            let film_name = data.items[count].title;
            // Constructing two different iframes to embed the song
            let myDiv = `<div class='insideBox' style='background: url("`+film_poster+`"); background-size: cover;
            width: 100%;
            height: 100%;' frameborder="0" ><div class='insideName' style='background-color: #474747; width: 100%; height:10%; position:absolute; bottom:0%; color:white;'>`+film_name+`</div></div>'`;
            
            let parent_div = $('#film_'+count);

            parent_div.html(myDiv);

            $('#film_'+count).css('display','inline-block');
            $('#name_'+count).css({"position":"absolute","width":"100%","height":"10%","bottom":"0%"});
            count++;
          }
        },
      }); // FIn de l'appel ajax

    }); // Fin de la fonction bouton
  }
}
