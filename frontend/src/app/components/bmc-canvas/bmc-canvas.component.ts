import { Component } from '@angular/core';
import { CanvasAreaComponent } from './components/canvas-area/canvas-area.component';

@Component({
  selector: 'app-bmc-canvas',
  templateUrl: './bmc-canvas.component.html',
  styleUrls: ['./bmc-canvas.component.scss'],
  standalone: true,
  imports: [CanvasAreaComponent],
})
export class BmcCanvasComponent {}
