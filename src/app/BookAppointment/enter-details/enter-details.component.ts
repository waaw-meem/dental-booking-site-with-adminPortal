import { Component, OnInit } from '@angular/core';
import { BookAppointmentServiceService } from '../book-appointment-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enter-details',
  templateUrl: './enter-details.component.html',
  styleUrls: ['./enter-details.component.css'],
})
export class EnterDetailsComponent implements OnInit {
  getPatientNumber: any;
  patientRelation: any;
  doctorName: string;
  patientName: string;
  slotTime: any;
  constructor(
    private service: BookAppointmentServiceService,
    private route: Router,
    private datePipe: DatePipe
  ) {
    this.getPatientNumber = localStorage.getItem('patientNumber');
    this.patientRelation = localStorage.getItem('relation');
    this.patientName = localStorage.getItem('userName')!;
    this.doctorName = localStorage.getItem('doctorName')!;
  }

  ngOnInit(): void {
    this.formatDate();
  }

  bookSlotTIme: any;
  formatDate(): void {
    this.slotTime = localStorage.getItem('slotTime')!;
    console.log(this.slotTime);

    const parsedDate = new Date(this.slotTime);
    this.bookSlotTIme = this.datePipe.transform(parsedDate, 'MMMdd, hh:mm a');
  }

  showModalSomeOne: boolean = false;
  someoneElse() {
    this.showModalSomeOne = true;
  }
  spinner: boolean = false;
  confirmPopup: boolean = false;
  confirmBooking() {
    this.spinner = true;
    var patientId = localStorage.getItem('patientId');
    // var slotId = localStorage.getItem('slotId');
    var drVendorId = localStorage.getItem('drVendorId');
    const obj = {
      id: 0,
      doctorVendorId: drVendorId,
      paymentId: 0,
      patientId: patientId,
      statusId: 0,
      visitStatus: 0,
      appointment: this.slotTime,
    };
    this.service.bookSlot(obj).subscribe((res) => {
      console.log(res);
      this.confirmPopup = true;
      setTimeout(() => {
        this.confirmPopup = false;
        this.route.navigate(['']);
      }, 2000);
      // this.route.navigate(['appointment/doctors/booked']);
    });
  }
}
