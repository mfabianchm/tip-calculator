import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  bill: null | number = null;
  number_people: null | number = null;
  percentage: null | number = null;
  custom_percentage: null | number = null;
  final_percentage: null | number = null;
  isZero: boolean = false;

  tips_percentages = [
    {
      text: '5%',
      custom: false,
    },
    {
      text: '10%',
      custom: false,
    },
    {
      text: '15%',
      custom: false,
    },
    {
      text: '25%',
      custom: false,
    },
    {
      text: '50%',
      custom: false,
    },
  ];

  tip_amount = '0.00';
  total_amount = '0.00';

  getValue(index: number) {
    this.custom_percentage = null;
    switch (index) {
      case 0:
        this.final_percentage = 5;
        break;
      case 1:
        this.final_percentage = 10;
        break;
      case 2:
        this.final_percentage = 15;
        break;
      case 3:
        this.final_percentage = 25;
        break;
      case 4:
        this.final_percentage = 50;
        break;
    }
    this.doCalculation();
  }

  getCustomValue(value: number) {
    this.custom_percentage = value;
    this.final_percentage = value;
    this.doCalculation();
  }
  updateBillValue(value: number) {
    this.bill = value;
    this.doCalculation();
  }
  updatePeopleValue(value: number) {
    this.number_people = value;
    this.doCalculation();
  }
  doCalculation() {
    if (
      this.bill == null ||
      this.number_people == null ||
      this.final_percentage == null
    ) {
      return;
    }

    if (
      this.bill == 0 ||
      this.number_people == 0 ||
      this.final_percentage == 0
    ) {
      this.isZero = true;
    } else {
      var amountPerPerson = (this.bill * this.final_percentage) / 100;
      var totalTips = amountPerPerson * Math.floor(this.number_people);
      if (amountPerPerson > 1000000) {
        this.tip_amount = Math.trunc(amountPerPerson).toString();
      } else {
        this.tip_amount = amountPerPerson.toFixed(4).toString();
      }
      if (totalTips > 1000000) {
        this.total_amount = Math.trunc(totalTips).toString();
      } else {
        this.total_amount = totalTips.toFixed(4).toString();
      }
    }
  }
  resetValues() {
    this.bill = null;
    this.final_percentage = null;
    this.number_people = null;
    this.tip_amount = '0.00';
    this.total_amount = '0.00';
  }
}
