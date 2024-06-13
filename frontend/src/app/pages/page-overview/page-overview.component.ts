import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { BasicBmcCanvasInfo } from "src/app/core/models/bmc-canvas.model";
import { selectAllCanvases } from "src/app/store/selectors/canvas-list.selectors";

@Component({
  selector: "app-page-overview",
  templateUrl: "./page-overview.component.html",
  styleUrls: ["./page-overview.component.scss"],
})
export class PageOverviewComponent {
  canvasList$: Observable<BasicBmcCanvasInfo[]>;

  constructor(private store: Store) {
    this.canvasList$ = this.store.select(selectAllCanvases);
  }
}
