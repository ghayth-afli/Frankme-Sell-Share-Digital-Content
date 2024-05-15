import { Component } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  zipppedFile: File;
  steps = {
    step1: true,
    step2: false,
    step3: false,
  };

  constructor(private assetService: AssetService) {}

  nextStep(formData: FormData) {
    this.assetService.uploadFiles(formData).subscribe({
      next: (response) => {
        console.log('Upload response', response);
        this.zipppedFile = response;
        this.steps.step1 = false;
        this.steps.step2 = true;
      },
      error: (uploadError) => {
        console.error('Error during lupload', uploadError);
      },
    });
  }

  OnSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
