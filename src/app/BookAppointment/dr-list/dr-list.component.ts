import { Component, HostListener, OnInit } from '@angular/core';
import { BookAppointmentServiceService } from '../book-appointment-service.service';
import { HomeServiceService } from 'src/app/Home/home-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dr-list',
  templateUrl: './dr-list.component.html',
  styleUrls: ['./dr-list.component.css'],
})
export class DrListComponent implements OnInit {
  searchText = '';

  items: any = [];

  spinner = false;
  DrListResponse: any;
  drListData!: any;
  cityId: number | any;
  serviceId: number | any;
  length: number;
  constructor(
    private service: BookAppointmentServiceService,
    private homeService: HomeServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.spinner = true;
    this.activatedRoute.queryParams.subscribe((params) => {
      const obj = { latitude: params['lat'], longitude: params['long'] };
      this.homeService.getDoctorsByLocation(obj).subscribe((res) => {
        this.DrListResponse = res;
        this.length = this.DrListResponse.length;
        this.loadMore();
        this.spinner = false;
      });
    });
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Home' },
      { label: 'Notebook' },
      { label: 'Accessories' },
      { label: 'Backpacks' },
      { label: 'Item' },
    ];
  }

  displayRecords: any[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  totalLoaded = 0;
  isLoading = false;
  searchQuery: string = '';

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const windowScroll = window.innerHeight + window.pageYOffset;
    const totalRecords = this.displayRecords.length;
    const totalAvailableRecords = this.DrListResponse.length;

    if (
      windowScroll >= document.body.offsetHeight &&
      totalRecords < totalAvailableRecords
    ) {
      this.loadMore();
    }
  }

  loadMore() {
    if (this.isLoading) {
      return; 
    }

    const startIndex = this.totalLoaded;
    const endIndex = startIndex + this.itemsPerPage;
    const totalAvailableRecords = this.DrListResponse.length;

    this.isLoading = true; 

    setTimeout(() => {
      this.displayRecords = [
        ...this.displayRecords,
        ...this.DrListResponse.slice(startIndex, endIndex),
      ];
      this.totalLoaded = endIndex;

      if (this.totalLoaded >= totalAvailableRecords) {
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    }, 1000); 
  }

  handleSearch() {
    const searchQuery = this.searchQuery.toLowerCase();
    const filteredRecords = this.DrListResponse.filter(
      (record: any) => 
      record.FirstName.toLowerCase().includes(searchQuery)||
      record.LastName.toLowerCase().includes(searchQuery) ||
      record.InitialName.toLowerCase().includes(searchQuery)
      );

    this.displayRecords = filteredRecords.slice(0, this.itemsPerPage); 
    this.totalLoaded = this.displayRecords.length;
  }

  bookAppointment(data: any) {
    console.log(data);

    var doctorName =
      data.InitialName + ' ' + data.FirstName + ' ' + data.LastName;
    localStorage.setItem('doctorName', doctorName);

    // var drId = data?.Id;
    var drVendor = data?.DoctorVendorId;
    console.log(drVendor);
    localStorage.setItem('drVendorId', drVendor);
    this.router.navigate(['appointment/doctors/schedule', drVendor]);
  }
}
