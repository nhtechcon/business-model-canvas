import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import { GlobalUiStateService } from "src/app/core/services/global-ui-state.service";
import { setCanvasName } from "src/app/store/actions/current-canvas.actions";
import { selectName } from "src/app/store/selectors/current-canvas.selectors";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent {
  name$: Observable<string>;

  enteredName: string = "";

  constructor(
    private uiStateService: GlobalUiStateService,
    private store: Store
  ) {
    this.name$ = this.store
      .select(selectName)
      .pipe(tap(val => (this.enteredName = val)));
  }

  onRename() {
    this.store.dispatch(setCanvasName({ name: this.enteredName }));
  }

  toggleInfoText() {
    this.uiStateService.toggleInfoTextVisibility();
  }
}
