import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-convier',
  templateUrl: './convier.component.html',
  styleUrls: ['./convier.component.css']
})
export class ConvierComponent implements OnInit {

  constructor() { }

  ngOnInit(): void 
  {
    var apiKey = '22|fOV9N9rdVebTu08SknHsNR5Sb9uExqeheYE4B4pz';
    var email = 'lafaylouis@gmail.com';

    var request = $.ajax({
      url: 'https://convier.me/api/event -H \'Authorization: Bearer '+apiKey+'\' -d \'event[start][date]=05/26/2019 08:00 PM\' -d \'event[end][date]=05/26/2019 11:00 PM\' -d \'event[organizer][name]=Tony Stark\' -d \'event[organizer][email]=ironman@avengers.com\' -d \'event[summary][text]=Endgame premiere\' -d \'event[description][text]=Bring the popcorn.\' -d \'event[attendees][0][email]='+email+'\'',
      type: 'GET',
    })
  }

}
