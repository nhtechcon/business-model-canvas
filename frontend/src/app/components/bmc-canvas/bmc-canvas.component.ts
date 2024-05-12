import { Component } from '@angular/core';
import { CanvasAreaComponent } from './components/canvas-area/canvas-area.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-bmc-canvas',
  templateUrl: './bmc-canvas.component.html',
  styleUrls: ['./bmc-canvas.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, CanvasAreaComponent],
})
export class BmcCanvasComponent {
  protected areas = [
    'area-partners',
    'area-activities',
    'area-resources',
    'area-propositions',
    'area-relationships',
    'area-channels',
    'area-customersegments',
    'area-coststructure',
    'area-revenuestreams',
  ];
}
