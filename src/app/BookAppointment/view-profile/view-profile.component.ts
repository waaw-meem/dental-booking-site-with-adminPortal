import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  OrderSummaryFixed:boolean = false;
  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 100){
      this.OrderSummaryFixed =true;
      if(window.scrollY > 2500){
        this.OrderSummaryFixed= false;
      }
      else{
        this.OrderSummaryFixed= true;
      }
    }else{
      this.OrderSummaryFixed= false;
    }
  } 

  value: number = 20;
  constructor() { }

  ngOnInit(): void {
  }

  items = [
    {label: 'Home'},
    {label: 'Notebook'},
    {label: 'Accessories'},
    {label: 'Backpacks'},
    {label: 'Item'}
];

serviceList =[
  {
    id: 1,
    service: 'Antenatal Care'
  },
  {
    id: 2,
    service: 'Caesarean (C-Section)'
  },
  {
    id: 3,
    service: 'Diagnostic Laparascopy'
  },
  {
    id: 4,
    service: 'Antenatal Checkup'
  },  
  {
    id: 5,
    service: 'Caesarean (C-Section)'
  },
  {
    id: 6,
    service: 'Diagnostic Laparascopy'
  },
  {
    id: 7,
    service: 'Antenatal Care'
  },
  {
    id: 8,
    service: 'Diagnostic Laparascopy'
  },
  {
    id: 9,
    service: 'Antenatal Care'
  }
]

viewTimings = false
viewAllTimgs(){
  this.viewTimings =! this.viewTimings
}
// serviceView = false
// serviceViewAll(){
//   this.serviceView =! this.serviceView
// }


}
