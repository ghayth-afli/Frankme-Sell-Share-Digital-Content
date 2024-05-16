import { Component, Input } from '@angular/core';
import { API_BASE_URL } from '../../../../../config/config';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.css',
})
export class Step3Component {
  @Input() linkUniqueId: string;
}
