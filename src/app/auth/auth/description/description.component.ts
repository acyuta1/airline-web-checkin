import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  constructor() { }
  descriptions: {title: string, url: string}[] = [
    {title: 'Online Check-In', url: 'https://media.nomadicmatt.com/2021/flighthub3.jpg'},
    {title: 'Add Meals for your flight', url: 'https://loveincorporated.blob.core.windows.net/contentimages/main/64d4c1bb-2462-42a7-99e9-337324f3babd-plane-food-on-a-tray.jpg'},
    {title: 'Interactive Seat-Map', url: 'https://www.springwise.com/wp-content/uploads/2016/01/SeatSwappr-P2P-plane-seat-exchange-US.jpg'},
  ];

  ngOnInit(): void {
  }

}
