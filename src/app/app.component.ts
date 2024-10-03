import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DentistWeb';

  constructor(public router: Router) {
    this.getTimeZone();
  }

  loader: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 3500);
  }


  countryCode: any;
  timeZoneInHours: any;
  notAvailRegion: boolean = false;
  getTimeZone() {
    const timeZone = new Date().getTimezoneOffset();
    this.timeZoneInHours = (timeZone / 60) * -1;
    localStorage.setItem('timezone', this.timeZoneInHours);
    if (this.timeZoneInHours === -3) {
      this.countryCode = 'CA';
    } else {
      this.notAvailRegion = true;
      console.log(this.notAvailRegion);
    }
    console.log('TimeZone', this.countryCode);
  }


}
