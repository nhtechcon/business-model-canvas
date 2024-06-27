import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { loadFullCanvas } from "src/app/store/actions/current-canvas.actions";
import { LoadingState } from "src/app/store/common";
import { selectInitialLoad } from "src/app/store/selectors/current-canvas.selectors";

@Component({
  selector: "app-page-editor",
  templateUrl: "./page-editor.component.html",
  styleUrls: ["./page-editor.component.scss"],
})
export class PageEditorComponent implements OnInit {
  private canvasId = "";
  protected initialLoad$: Observable<LoadingState>;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialLoad$ = store.select(selectInitialLoad);
  }

  ngOnInit(): void {
    this.canvasId = this.activatedRoute.snapshot.paramMap.get("id") as string;
    this.loadCanvas();
  }

  loadCanvas() {
    this.store.dispatch(loadFullCanvas({ canvasId: this.canvasId }));
  }
}
