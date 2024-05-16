import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.css',
})
export class Step1Component {
  selectedFiles: FileList;
  filesArray: File[] = [];
  @Output() next = new EventEmitter<FormData>();

  onFileChanged(event: any) {
    this.selectedFiles = event.target.files;
    // Convert FileList to array
    this.filesArray = Array.from(this.selectedFiles);
  }

  goNext() {
    const formData = new FormData();
    if (this.filesArray.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }
    } else {
      alert('Please select at least one file');
    }
    this.next.emit(formData);
  }
}
