import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-spotify-search-music',
  templateUrl: './spotify-search-music.component.html',
  styleUrls: ['./spotify-search-music.component.css']
})
export class SpotifySearchMusicComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    //function to load the plalist at startup
    function reloadPlaylist(){
      var local = JSON.parse(localStorage.getItem("playList")+"");
      if (local != null && local != "null" && local != "[]")
        local.forEach(function(value:string){
          $('#playlist').append(`<div class='song'><iframe height="80" width="95%" src=${value} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`);
        })
    }

    $(document).ready(function() {
        reloadPlaylist();
        // Helper Function to Extract Access Token for URL
        function getUrlParameter (sParam: string){
            let sPageURL = window.location.search.substring(1), ////substring will take everything after the https link and split the #/&
                sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
                sParameterName,
                i;
            let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
            sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
            return;
        };

        // Get Access Token if we are in the popup window
        var accessToken: string = "" + getUrlParameter('access_token');
        var refreshToken: string = "" + getUrlParameter('refresh_token');

        // AUTHORIZE with Spotify (if needed)
        // *************** REPLACE THESE VALUES! *************************
        let client_id = '4fd4c2be1ee84fa2b3fe6683510614ab';
        let client_secret = '3350507c25d7442cbe4f1d22112cc5e7'
        // Use the following site to convert your regular url to the encoded version:
        // https://www.url-encode-decode.com/
        let redirect_uri = 'https://congelo.entre-potes.eu/'; // GitHub Pages URL or whatever your public url to this app is
        // *************** END *************************
        //variables for requesting refresh token
        const auth = client_id+':'+client_secret
        const authString = btoa(auth);
        const authHeader = `Basic ${authString}`;

        //redirect uri for the popup window, to get the access and refresh token
        const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;


        //if acces token is not defined, we are in the real website, not in the popup window
        // -> we try to get the access token from localStorage
        // -> if not in localstorage, we open the popup window to get the access token
        // and register it
        if (accessToken == null || accessToken == "" || accessToken == "undefined") {
            console.log("accesstoken is null");
            //if not in localstorage
            if (localStorage.getItem("sp-accessToken") === null) {
                console.log("localstorage does not contain token, opening window");
                //opening popup window
                var spotifyLoginWindow = window.open(redirect,
                    'Login with Spotify',
                    'width=400,height=500');
                //getting access token from popup window by adding event to the popup window
                if (spotifyLoginWindow != null){
                    console.log("event added");
                    spotifyLoginWindow.onbeforeunload = function() {
                      console.log("access token defined (" + accessToken + ")");
                      //on window close -> register access token
                        accessToken = "" + localStorage.getItem('sp-accessToken');
                        refreshToken = "" + localStorage.getItem('sp-refreshToken');
                    };
                }
              //if token is in localstorage, let's just take it and use it
            } else {

                console.log("access token found");
                accessToken = "" + localStorage.getItem("sp-accessToken");
                refreshToken = "" + localStorage.getItem('sp-refreshToken');
            }
            //if we find token in url, let's set it in localstorage,
            // just in case the event set on the window doesn't works
        } else {
            console.log("access token defined (" + accessToken + ")");
            localStorage.setItem("sp-accessToken", accessToken);
            localStorage.setItem("sp-refreshToken", refreshToken);
            window.close();
        }

        // Search button has been clicked
        $("#search_button").click(function() {
            //Get the value of the search box
            let raw_search_query = $('#search-text').val();
            let search_query = encodeURI("" + raw_search_query);

            //sometimes the event of popup window doesn't seems to work,
            //but the popup window still correctly register access token
            //so this is in case the event didn't work
            if (accessToken == null || accessToken == "" || accessToken == "undefined") {
              accessToken = "" + localStorage.getItem("sp-accessToken");
              if (accessToken != null && accessToken != "" && accessToken != "undefined") console.log("access token found");
            }

            // Make Spotify API call
            // Note: We are using the track API endpoint.
            $.ajax({
                url: `https://api.spotify.com/v1/search?q=${search_query}&type=track`,
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: {
                  'unevariable' : "exemple"
                },
                success: function(data) {
                    // Load our songs from Spotify into our page
                    let num_of_tracks = data.tracks.items.length;
                    let count = 0;
                    // Max number of songs is 12
                    const max_songs = 10;

                    while (count < max_songs && count < num_of_tracks) {
                        // Extract the id of the FIRST song from the data object
                        let id = data.tracks.items[count].id;
                        // Constructing two different iframes to embed the song
                        let src_str = `https://open.spotify.com/embed/track/${id}`;
                        //we put the track in an iframe then we show the button under the track.
                        let iframe = `<div class='song'><iframe height="80" width="95%" src=${src_str} id='iframe_`+count+`' frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
                        $('#bouton_'+count).css("display","block");
                        $('#bouton_'+count).addClass("btn");

                        //if we did a search before, we need to remove the event from the button
                        //before adding a new event.
                        //we make the button adding the to the playlist
                        $('#bouton_'+count).off("click");
                        $('#bouton_'+count).click(function(){
                          var local = localStorage.getItem("playList") +"";
                          if(local == null || local == "null"){
                            localStorage.setItem("playList", JSON.stringify([]));
                            local = localStorage.getItem("playList") +"";
                          }
                          var allEntries = JSON.parse(localStorage.getItem("playList") +"");
                          allEntries.push(src_str);
                          localStorage.setItem("playList", JSON.stringify(allEntries));
                          $('#playlist').append(`<div class='song'><iframe height="80" width="95%" src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`);

                        });

                        //this adds the iframe into the div of id "song_0" for example
                        let parent_div = $('#song_' + count);
                        parent_div.html(iframe);
                        count++;
                    }
                },
                //try to refresh the token. the request isn't good for the moment. gives error 400
                //We would have to do this every hour. For the moment, to refresh access token, we have
                //to remove cookies and refresh page, it isn't good
                error : function(httpObj, textStatus) {
                    if(httpObj.status==401){
                        console.log("access token épuisé, utilisation du refresh token pour générer un nouvel access token");
                        $.ajax({
                            url: "https://accounts.spotify.com/api/token",
                            type: 'POST',
                            headers: {
                              'Authorization': authHeader,
                              'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data:{
                              grant_type: 'refresh_token',
                              refresh_token: ''
                            },
                            success: function(data){
                              console.log("data: " + data);
                            },
                            error : function(httpObj, textStatus){
                              console.log("erreur: " + httpObj);
                              console.log(textStatus);
                            }
                        });
                    }
                    else
                        console.log("Une erreur est survenue pendant le contact de l'API spotify\n"+textStatus);
                }
            }); // End of Spotify ajax call


        }); // End of search button
    }); // End of document.ready
  }

}
