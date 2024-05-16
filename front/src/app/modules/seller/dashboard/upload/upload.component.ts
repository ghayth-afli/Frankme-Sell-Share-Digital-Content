import { Component } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { FormGroup } from '@angular/forms';
import { Link } from '../../../../shared/models/link';
import { API_BASE_URL, MyBASE_URL } from '../../../../config/config';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  zipppedFile: { fileName: string };
  linkUniqueId: string;
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
    let infosData: Link = {
      title: form.value.title,
      price: form.value.price,
      expirationDate: form.value.expirationDate,
      maxDownloadCount: form.value.maxDownloadCount,
      files: [this.zipppedFile.fileName], // Change the type from Array<string> to string[]
    };
    this.assetService.postAsset(infosData).subscribe({
      next: (response) => {
        console.log('Asset response', response.linkUniqueId);
        this.linkUniqueId = MyBASE_URL + '/#/download/' + response.linkUniqueId;
        this.steps.step2 = false;
        this.steps.step3 = true;
      },
    });
  }
}
