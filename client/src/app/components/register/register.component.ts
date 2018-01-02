import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form : FormGroup;

  createForm(){
    this.form = this.formBuilder.group({
      email : ['',Validators.required],
      username : '',
      password: '',
      confirm : ''
    })
  }

  onRegisterSubmit(){
    console.log(this.form);
  }

  constructor(
    private formBuilder : FormBuilder 
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

}
