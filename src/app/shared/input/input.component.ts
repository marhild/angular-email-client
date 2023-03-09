import { Component, OnInit, Input } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() label: string;
  @Input() control: AbstractControl | any;
  @Input() inputType: string; 
  

  constructor() {}

  ngOnInit() {

  }

  showErrors() {
    const {dirty, touched, errors} = this.control;
    return dirty && touched && errors;
  }
}
