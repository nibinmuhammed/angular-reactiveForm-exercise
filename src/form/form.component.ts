import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Valid from '../validater';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Output() onSubmitForm = new EventEmitter<any>();
  listData: any;
  reactiveForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.listData = [];
  }

  submit = false;

  ngOnInit() {
    this.initialForm();
  }

  initialForm() {
    this.reactiveForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
        password: [
          '',
          [
            Validators.required,
            Valid?.lowerCase ? Valid?.lowerCase : null,
            Valid?.upperCase ? Valid?.upperCase : null,
            Valid?.specialContains ? Valid?.specialContains : null,
            Valid?.minChar ? Valid?.minChar : null,
            Valid?.numberCase ? Valid?.numberCase : null,
          ],
        ],
        confirm: ['', Validators.required],
        gender: ['male'],
        dob: ['', [Validators.required, Valid?.dobValidate]],
        acceptTerms: [false, Validators.requiredTrue],
      },

      {
        validators: this.MustMatch('password', 'confirm'),
      }
    );
  }

  get f() {
    return this.reactiveForm.controls;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (FormGroup: FormGroup) => {
      const control = FormGroup.controls[controlName];
      const matchingControl = FormGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.MustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  public addItem(): void {
    this.listData.push(this.reactiveForm.value);
    this.reactiveForm.reset();
    this.submit = false;
    this.initialForm();
    this.onSubmitForm.emit(this.listData);
  }

  onSubmit() {
    this.submit = true;
    console.log('clicked');
    console.log('f', this.f);
    console.log(this.reactiveForm.valid, this.listData);
    if (this.reactiveForm.valid) {
      console.log('inside');
      this.addItem();
    }
  }
}
