import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-canvas-area',
  templateUrl: './canvas-area.component.html',
  styleUrls: ['./canvas-area.component.scss'],
  standalone: true,
  imports: [CardModule],
})
export class CanvasAreaComponent {
  @Input()
  name: string = '';
}
