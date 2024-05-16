import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.css',
})
export class Step2Component implements OnInit {
  public infoForm: FormGroup;
  @Output() submit = new EventEmitter<FormGroup>();

  // Initialize the form
  ngOnInit() {
    this.infoForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.required]),
      price: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
      maxDownloadCount: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    this.submit.emit(this.infoForm);
  }
}
