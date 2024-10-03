import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  QA = 'http://172.16.100.111:8089';
  headers = { 'content-type': 'application/json-patch+json' };

  constructor(private http: HttpClient) {}

  // signUpApi = 'http://172.16.100.111:8089/Doctor/PostDoctor';
  postSignUp(data: any): Observable<any> {
    return this.http.post(`${this.QA}/Doctor/PostDoctor`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }

  // loginApi = 'http://172.16.100.111:8089/Login';
  login(data: any): Observable<any> {
    return this.http.post(`${this.QA}/Login`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }

  postPateint(data: any): Observable<any> {
    return this.http.post(`${this.QA}/Patient/PostPatient`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }

  postPatientOtp(number: any) {
    return this.http.post(`${this.QA}/Patient/GetOTP?PhoneNumber=${number}`, {
      headers: this.headers,
      responseType: 'text',
    });
  }

  patientLogin(data: any): Observable<any> {
    return this.http.post(`${this.QA}/Patient/LoginPatient`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }
}
