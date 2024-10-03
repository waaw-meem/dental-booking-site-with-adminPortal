import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookAppointmentServiceService {
  QA = 'http://172.16.100.111:8089';
  headers = { 'content-type': 'application/json-patch+json' };

  constructor(private http: HttpClient) {}

  public setPatientModal$ = new Subject<any>();

  setPatientModal() {
    return this.setPatientModal$.asObservable();
  }

  getDrList(cityId: any, serviceId: any) {
    // debugger
    return this.http.get(
      `${this.QA}/api/Doctor/GetDoctors?CityId=${cityId}&ServiceId=${serviceId}`
    );
  }

  getDrName(id: number) {
    return this.http.get(`${this.QA}/api/Doctor/GetDoctor?id=${id}`);
  }

  getSlots(vendorId: any, date: any) {
    return this.http.get(
      `${this.QA}/api/DoctorSlot/GetDoctorAvailableSlots?DoctorVendorId=${vendorId}&Date=${date}`
    );
  }

  bookSlot(data: any): Observable<any> {
    return this.http.post(
      `${this.QA}/api/BookAppointment/createAppointment`,
      data,
      {
        headers: this.headers,
        responseType: 'text',
      }
    );
  }
}
