import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ofType } from "@ngrx/effects";
import { ActionsSubject, Store } from "@ngrx/store";
import { Observable, Subject, filter, takeUntil } from "rxjs";
import { BasicBmcCanvasInfo } from "src/app/core/models/bmc-canvas.model";
import { AuthService } from "src/app/core/services/auth.service";
import * as CanvasListActions from "src/app/store/actions/canvas-list.actions";
import * as CurrentCanvasActions from "src/app/store/actions/current-canvas.actions";
import { LoadingState } from "src/app/store/common";
import {
  selectAllCanvasesSorted,
  selectLoadingState,
} from "src/app/store/selectors/canvas-list.selectors";

@Component({
  selector: "app-page-overview",
  templateUrl: "./page-overview.component.html",
  styleUrls: ["./page-overview.component.scss"],
})
export class PageOverviewComponent implements OnDestroy {
  destroy$ = new Subject();

  canvasLoadingState$: Observable<LoadingState>;
  canvasList$: Observable<BasicBmcCanvasInfo[]>;

  newCanvasDialogVisible = false;

  constructor(
    private store: Store,
    private auth: AuthService,
    private router: Router,
    private actions$: ActionsSubject
  ) {
    this.canvasLoadingState$ = this.store.select(selectLoadingState);
    this.canvasList$ = this.store.select(selectAllCanvasesSorted);
    this.store.dispatch(CanvasListActions.startLoadCanvases());
  }

  protected logoutClick() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  protected createNewCanvas(name: string) {
    this.newCanvasDialogVisible = false;
    this.store.dispatch(CanvasListActions.createCanvas({ name }));
    // Wait for canvas to be added
    this.actions$
      .pipe(
        takeUntil(this.destroy$),
        ofType(CanvasListActions.addCanvas),
        filter(({ canvas }) => canvas.name === name)
      )
      .subscribe(({ canvas }) => {
        this.store.dispatch(
          CurrentCanvasActions.setCanvasData({
            data: {
              ...canvas,
              entries: [],
            },
          })
        );
        this.router.navigate(["/main/canvas/" + canvas.id]);
      });
  }

  protected deleteCanvas(id: string) {
    this.store.dispatch(CanvasListActions.deleteCanvas({ id }));
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
