import { Component } from '@angular/core';
import { GlobalUiStateService } from 'src/app/core/services/global-ui-state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private uiStateService: GlobalUiStateService) {}

  toggleInfoText() {
    this.uiStateService.toggleInfoTextVisibility();
  }
}
