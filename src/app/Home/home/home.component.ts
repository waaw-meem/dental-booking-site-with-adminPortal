import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeServiceService } from '../home-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  value: number = 5;
  list = [
    '25000+ Dentists',
    '1million+ Patient Reviews',
    '15million+ User Served',
  ];

  items = [
    {
      title: 'Item 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 2',
      description:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 3',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 4',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 5',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'https://via.placeholder.com/300x200',
    },
  ];
  DrListResponse = [
    {
      InitialName: 'Dr',
      FirstName: 'Abdul',
      LastName: 'Qayyum',
    },
    {
      InitialName: 'Dr',
      FirstName: 'Shuja',
      LastName: 'Haider',
    },
    {
      InitialName: 'Dr',
      FirstName: 'Muhammad',
      LastName: 'Shayan',
    },
    {
      InitialName: 'Dr',
      FirstName: 'Ali',
      LastName: 'Abbas',
    },
  ];

  specialityResponse: any;
  // cityResponse: any;
  // DrListResponse: any;
  locRes: any;
  locResult: any;
  locations: any;
  constructor(private service: HomeServiceService, private router: Router) {
    this.getTimeZone();
    this.service.getGoogleApi(this.countryCode).subscribe((res) => {
      this.locRes = res;
      this.locResult = JSON.parse(this.locRes.Result.Data);
      this.locations = this.locResult.Locations;
      // console.log(this.locations);
    });
    this.service.getServices().subscribe((res: any) => {
      var result = res.Result;

      this.specialityResponse = result;
      // console.log('hello', result);
    });
    // this.service.getCity().subscribe((res) => {
    //   this.cityResponse = res;
    //   console.log(this.cityResponse);
    // });
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
      // console.log(this.notAvailRegion);
    }
    // console.log('TimeZone', this.countryCode);
  }

  ngOnInit(): void {}
  coordinates: any;

  searchSpinner: boolean = false;
  onChangeLocation(data: any) {
    this.searchSpinner = true;
    this.coordinates = data?.Coordinates;
    setTimeout(() => {
      this.SearchDrList();
    }, 1500);
    // console.log(data.Coordinates);
  }

  dataList: any;

  lat: any;
  long: any;
  taost: boolean = false;
  SearchDrList() {
    if (this.coordinates === null || this.coordinates === undefined) {
      this.taost = true;
      setTimeout(() => {
        this.taost = false;
      }, 3000);
    } else {
      const coordinates = this.coordinates.split(',');
      this.lat = coordinates[0];
      this.long = coordinates[1];
      console.log(coordinates);

      // const obj = {
      //   lat: '43.64553484781675',
      //   long: '-79.38088563735975',
      // };
      this.router.navigate(['appointment/doctors'], {
        queryParams: { lat: this.lat, long: this.long },
      });
    }
  }
}
