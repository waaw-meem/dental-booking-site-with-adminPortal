import { Component, OnInit } from '@angular/core';
import { BookAppointmentServiceService } from '../book-appointment-service.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [DatePipe],
})
export class ScheduleComponent implements OnInit {
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

  Number: any;
  drList: any;
  drFirstName: any;
  drLastName: any;
  drInitialName: any;
  spinner: boolean = false;
  drVendorId: number;
  userName: any;
  drId: number;
  doctorName: string;
  constructor(
    private service: BookAppointmentServiceService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.spinner = true;
    this.activatedRoute.params.subscribe((param) => {
      // let id = param['id'];
      this.getAllDatesOfCurrentMonth();
      // this.drVendorId = param['vendor'];

      // this.service.getDrName(id).subscribe((res) => {
      //   this.spinner = false;
      //   this.drList = res;
      //   this.drInitialName = this.drList.InitialName;
      //   this.drFirstName = this.drList.FirstName;
      //   this.drLastName = this.drList.LastName;
      // });
    });

    this.userName = localStorage.getItem('userName');
    this.drVendorId = +localStorage.getItem('drVendorId')!;
    this.doctorName = localStorage.getItem('doctorName')!;
  }

  ngOnInit(): void {
    // this.getAllDatesOfCurrentMonth();

    this.getCurrentDateSlots();
  }
  dateArr: any = [];
  getAllDatesOfCurrentMonth() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let day = currentDate.getDate(); day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const formattedDate = this.datePipe.transform(date, 'dd, MMMM');
      this.dateArr.push(formattedDate);
    }

    console.log('Dates of Current Month:', this.dateArr[0]);
  }
  slotList: any = [];
  slotListFilterMorning: any = [];
  slotListFilterEvening: any = [];
  slotListFilterNight: any = [];

  getCurrentDateSlots() {
    var currentDate = this.dateArr[0];
    const currentYear = new Date().getFullYear();
    const date = new Date(currentDate);
    date.setFullYear(currentYear);
    const formattedDate = this.datePipe.transform(date, 'yyyy/MM/dd');

    this.service
      .getSlots(this.drVendorId, formattedDate)
      .subscribe((res: any) => {
        this.slotList = res?.Result;
        // this.doctorName = res?.Result[0]?.Doctor;
        console.log(res);
        //
        this.spinner = false;
        //
        this.slotList.map((x: any) => {
          if (x.ShiftId === 1) {
            this.slotListFilterMorning.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              // type: x.Shifts[0].Type,
            });
            // console.log(this.slotListFilterMorning);
          } else if (x.ShiftId === 2) {
            this.slotListFilterEvening.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              // type: x.Shifts[0].Type,
            });
          } else if (x.ShiftId === 3) {
            this.slotListFilterNight.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              // type: x.Shifts[0].Type,
            });
          }
        });
      });
  }
  activeIndex: number = 0;
  loader: boolean = false;

  getDate(data: any) {
    this.slotListFilterMorning = [];
    this.slotListFilterEvening = [];
    this.slotListFilterNight = [];
    this.loader = true;
    var getdate = data?.originalEvent?.target?.innerText;
    // console.log(getdate);

    const currentYear = new Date().getFullYear();
    const date = new Date(getdate);
    date.setFullYear(currentYear);
    const formattedDate = this.datePipe.transform(date, 'yyyy/MM/dd');
    console.log(formattedDate);

    this.service
      .getSlots(this.drVendorId, formattedDate)
      .subscribe((res: any) => {
        this.slotList = res?.Result;
        console.log(this.slotList);
        //
        this.spinner = false;
        //
        this.loader = false;
        this.slotList.map((x: any) => {
          if (x.ShiftId === 1) {
            this.slotListFilterMorning.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              // type: x.Shifts[0].Type,
            });
          } else if (x.ShiftId === 2) {
            this.slotListFilterEvening.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              // type: x.Shifts[0].Type,
            });
          } else if (x.ShiftId === 3) {
            this.slotListFilterNight.push({
              ShiftId: x.ShiftId,
              time: x.Appointment,
              shift: x.Shift,
              // type: x.Shifts[0].Type,
            });
          }
        });
      });
  }

  display: boolean = false;
  showDialog(data: any) {
    if (this.userName === null || this.userName === undefined) {
      // this.display = true;
      this.service.setPatientModal$.next((this.display = true));
    } else {
      // var slotId = data.slotId;
      console.log(data);
      localStorage.setItem('slotTime', data.time);

      // console.log(slotId);
      // localStorage.setItem('slotId', slotId);
      // localStorage.setItem('doctorName', this.doctorName);
      // var patientId = localStorage.getItem('patientId');
      // const obj = {
      //   id: 0,
      //   slotId: slotId,
      //   paymentId: 0,
      //   patientId: patientId,
      //   statusId: 0,
      //   visitStatus: 0,
      // };

      this.router.navigate(['/appointment/doctors/enterDetails']);
    }
  }
}
