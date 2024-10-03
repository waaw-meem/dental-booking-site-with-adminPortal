import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarService } from '../navbar.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn, zoomOut } from 'ng-animate';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BookAppointmentServiceService } from 'src/app/BookAppointment/book-appointment-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('zoomIn', [
      transition(
        ':enter',
        useAnimation(zoomIn, { params: { timing: 0.2, delay: 0 } })
      ),
      transition(
        ':leave',
        useAnimation(zoomOut, { params: { timing: 0.2, delay: 0 } })
      ),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  navbarFixed: boolean = false;
  navLinks: boolean = false;
  navImg: boolean = false;
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 0) {
      this.navbarFixed = true;
      this.navLinks = true;
      this.navImg = true;
    } else {
      this.navbarFixed = false;
      this.navLinks = false;
      this.navImg = false;
    }
  }

  items = [
    {
      id: '1',
      title: 'Home',
      active: true,
    },
    {
      id: '2',
      title: 'Hospitals',
      active: true,
    },
    {
      id: '3',
      title: 'Labs & Diagnostics',
      active: true,
    },
    {
      id: '4',
      title: 'Health Blog',
      active: true,
    },
  ];
  payload: any = [];
  patientRelation: any;
  constructor(
    public service: NavbarService,
    public router: Router,
    private bookAppointmentService: BookAppointmentServiceService
  ) {
    this.userName = localStorage.getItem('userName');
    this.getPatientNumber = localStorage.getItem('patientNumber');
    this.patientRelation = localStorage.getItem('relation');
    // console.log(this.getPatientNumber);
    this.bookAppointmentService.setPatientModal().subscribe((res) => {
      // console.log(res);
      this.modalVisible = res;
      this.displayPatient = res
    });
  }

  ngOnInit(): void {}

  navLinkActive = false;
  navSectionActive = false;
  navCollapse: boolean = false;
  navLinkImg: boolean = false;
  navLink() {
    this.navLinkActive = !this.navLinkActive;
    this.navLinkImg = !this.navLinkImg;
    this.navSectionActive = !this.navSectionActive;
    this.navCollapse = !this.navCollapse;
  }

  // ------------------Login Section-----------------------------------------------------------------------------------------
  modalVisible: boolean = false;
  modalButtons: boolean;
  modal() {
    this.modalVisible = true;
    this.modalButtons = true;
    this.loginSection = false;
    this.displayPatient = false;
    this.signUpSection = false;
    this.drStepsActive = false;
  }
  modalBack() {
    this.modalButtons = true;
    this.displayPatient = false;
    this.loginSection = false;
  }
  displayPatient: boolean = false;
  loginAsPatient(data: boolean) {
    // console.log(data);
    this.modalButtons = data;
    // this.modalButtons = false;
    this.displayPatient = true;
  }
  loginSection: boolean = false;
  loginAsDoctor(data: boolean) {
    this.modalButtons = data;
    // this.modalButtons = false;
    this.loginSection = true;
  }
  modalBackSignUp() {
    this.loginSection = true;
    this.signUpSection = false;
  }
  signUpSection = false;
  signup() {
    this.loginSection = false;
    this.signUpSection = true;
  }
  patientForm = new FormGroup({
    patienName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    relation: new FormControl('', [Validators.required]),
  });
  get PatienName(): FormControl {
    return this.patientForm.get('patienName') as FormControl;
  }
  get PhoneNumber(): FormControl {
    return this.patientForm.get('phoneNumber') as FormControl;
  }
  get Relation(): FormControl {
    return this.patientForm.get('relation') as FormControl;
  }
  patientLogin: boolean = false;
  patientSpinner: boolean = false;
  resPhoneNo: any;
  responsePatient: any;
  getPatientNumber: any;
  resRelation: any;
  timer = 30;
  resPatiendId: any;
  submitPatientForm(data: any) {
    if (this.patientForm.invalid) {
      this.toastwarning = true;
      setTimeout(() => {
        this.toastwarning = false;
      }, 3000);
    } else {
      this.patientSpinner = true;
      const obj = {
        id: 0,
        name: data.patienName,
        phoneNumber: data.phoneNumber,
        gender: 0,
        relation: data.relation,
        parentId: 0,
      };
      // console.log(obj);
      this.service.postPateint(obj).subscribe((res) => {
        this.responsePatient = JSON.parse(res);
        console.log('2', res);
        this.resPhoneNo = this.responsePatient.PhoneNumber;
        this.resRelation = this.responsePatient.Relation;
        this.resPatiendId = this.responsePatient.Id;
        console.log(this.resPatiendId);
        console.log(this.resRelation);

        if (this.resPhoneNo === undefined || this.resPhoneNo === null) {
          localStorage.setItem('patientNumber', data.phoneNumber);
          localStorage.setItem('relation', data.relation);
          this.service.postPatientOtp(data.phoneNumber).subscribe((res) => {
            console.log(res);
            this.patientLogin = true;
            this.patientSpinner = false;
          });
          this.getPatientNumber = localStorage.getItem('patientNumber');
          this.patientForm.reset();
          setInterval(() => {
            if (this.timer > 0) {
              this.timer--;
            }
          }, 1000);
        } else {
          localStorage.setItem('patientNumber', this.resPhoneNo);
          localStorage.setItem('relation', this.resRelation);
          localStorage.setItem('patientId', this.resPatiendId);

          // var patientNo = localStorage.getItem('patientNumber')
          // console.log(patientNo);

          this.service.postPatientOtp(this.resPhoneNo).subscribe((res) => {
            console.log(res);
            this.patientLogin = true;
            this.patientSpinner = false;
          });
          this.getPatientNumber = localStorage.getItem('patientNumber');
          this.patientForm.reset();
          setInterval(() => {
            if (this.timer > 0) {
              this.timer--;
            }
          }, 1000);
        }
      });
    }
  }
  resendOtpToast: boolean = false;
  resendOtp() {
    this.resendOtpToast = true;
    setTimeout(() => {
      this.resendOtpToast = false;
      this.timer = 30;
    }, 2000);
    var resendNumber = localStorage.getItem('patientNumber');
    this.service.postPatientOtp(resendNumber).subscribe((res) => {
      console.log(res);
    });
    this.getPatientNumber = localStorage.getItem('patientNumber');
    // console.log(this.getPatientNumber);
  }

  patientLoginForm = new FormGroup({
    patientNo: new FormControl(['this.getPatientNumber']),
    otp: new FormControl('', [Validators.required]),
  });
  get PatientNo(): FormControl {
    return this.patientLoginForm.get('patientNo') as FormControl;
  }
  get OTP(): FormControl {
    return this.patientLoginForm.get('otp') as FormControl;
  }
  submitPatientLogin(data: any) {
    // console.log(data);
    if (this.patientLoginForm.invalid) {
      this.toastwarning = true;
      setTimeout(() => {
        this.toastwarning = false;
      }, 3000);
    } else {
      this.patientSpinner = true;
      const obj = {
        email: data.patientNo,
        password: data.otp,
      };
      this.service.patientLogin(obj).subscribe((res) => {
        this.storeToken = res;
        // console.log('3', res);
        // localStorage.setItem('token', this.storeToken);
        // this.decodeToken = localStorage.getItem('token');
        const jwtHelper = new JwtHelperService();
        const token = jwtHelper.decodeToken(this.storeToken);
        // console.log(token);
        this.payload = token.unique_name;
        // console.log(this.payload);

        localStorage.setItem('userName', this.payload);
        this.userName = localStorage.getItem('userName');
        this.modalVisible = false;
        this.patientSpinner = false;
        window.location.reload();
      });
    }
  }
  sidebarVisibleRight: boolean = false;
  // sideBarName: any;
  // sideBarPhone: any;
  // sideBarRelation: any;
  sidebarRight() {
    this.sidebarVisibleRight = true;
    // this.sideBarName = localStorage.getItem('userName');
    // this.sideBarPhone = localStorage.getItem('patientNumber');
    // this.sideBarRelation = localStorage.getItem('relation');
  }

  signUp = new FormGroup({
    initialNAme: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    generalFees: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
  });
  get InitialNAme(): FormControl {
    return this.signUp.get('initialNAme') as FormControl;
  }
  get FirstName(): FormControl {
    return this.signUp.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.signUp.get('lastName') as FormControl;
  }
  get GeneralFees(): FormControl {
    return this.signUp.get('generalFees') as FormControl;
  }
  get PhoneNo(): FormControl {
    return this.signUp.get('phoneNo') as FormControl;
  }
  get Email(): FormControl {
    return this.signUp.get('email') as FormControl;
  }
  get Gender(): FormControl {
    return this.signUp.get('gender') as FormControl;
  }

  toastwarning = false;
  toastSuccess = false;
  signUpResponse: any;
  drStepsActive: boolean = false;
  submitSignUpForm(data: any) {
    if (this.signUp.invalid) {
      this.toastwarning = true;
      setTimeout(() => {
        this.toastwarning = false;
      }, 3000);
    } else {
      const obj = {
        id: '0',
        firstName: data.firstName,
        lastName: data.lastName,
        initialName: data.initialNAme,
        fees: data.generalFees,
        number: data.phoneNo,
        gender: data.gender,
        email: data.email,
        contact1: '02323232',
        contact2: '02323232',
        status: '1',
      };
      this.service.postSignUp(obj).subscribe((res) => {
        this.signUpResponse = res;
        console.log('signUp', res);
        this.toastSuccess = true;
        setTimeout(() => {
          this.toastSuccess = false;
        }, 2500);
      });
      // this.signUp.reset();
      // setTimeout(() => {
      //   this.loginSection = true;
      //   this.signUpSection = false;
      // }, 3000);
    }
    // this.signUpSection = false;
    // this.drStepsActive = true;
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  get loginEmail(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  loginErr: any;
  error = false;
  storeToken: string;
  decodeToken: any;
  userName: any;
  submitLoginForm(data: any) {
    if (this.loginForm.invalid) {
      this.toastwarning = true;
      setTimeout(() => {
        this.toastwarning = false;
      }, 3000);
    } else {
      const obj = {
        email: data.email,
        password: data.password,
      };
      this.service.login(obj).subscribe(
        (res: any) => {
          // console.log(res);

          this.storeToken = res;
          setTimeout(() => {
            this.modalVisible = false;
          }, 2000);
          localStorage.setItem('token', this.storeToken);
          this.decodeToken = localStorage.getItem('token');
          const jwtHelper = new JwtHelperService();
          const token = jwtHelper.decodeToken(this.decodeToken);
          this.payload = token.unique_name;
          localStorage.setItem('userName', this.payload);
          this.userName = localStorage.getItem('userName');
        },
        (err: any) => {
          this.loginErr = err.error;
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 3000);
        }
      );
      this.loginForm.reset();
    }
  }

  date: Date;
  activeStep = 0;

  steps = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
    // ... add labels for other steps
  ];
  previousStep() {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }
  nextStep() {
    if (this.activeStep < 2) {
      // Adjust the number based on the total number of steps
      this.activeStep++;
    }
  }

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('patientNumber');
    localStorage.removeItem('relation');
    localStorage.removeItem('token');
    window.location.reload();
  }

  // ------------------Login Section-----------------------------------------------------------------------------------------
}
