import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeServiceService {
  QA = 'http://172.16.100.111:8089';

  constructor(private http: HttpClient) {}

  public drList$ = new Subject<number>();
  getCity() {
    return this.http.get(`${this.QA}/City/GetCities`);
  }

  getServices() {
    return this.http.get(`${this.QA}/api/Services/GetServices`);
  }
  getDrList() {
    return this.http.get(`${this.QA}/Doctor/GetDoctors`);
  }

  getdrList$() {
    return this.drList$.asObservable();
  }
  getDoctorsByLocation(data: any) {
    var lat = data.latitude;
    var long = data.longitude;
    return this.http.get(
      `${this.QA}/api/Doctor/GetDoctorsByLocation?latitude=${lat}&longitude=${long}`
    );
  }

  getGoogleApi(code: string) {
    return this.http.get(
      `https://api.m-rides.com/api/MRide/SearchLocation?SearchValue=canada&CountryCode=${code}
      `
    );
  }
}
