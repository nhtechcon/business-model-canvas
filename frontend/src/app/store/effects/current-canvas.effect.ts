import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as CurrentCanvasActions from "../actions/current-canvas.actions";
import { CanvasService } from "src/app/core/services/api-client";
import { ToastService } from "src/app/core/services/toast.service";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { selectCurrentCanvas } from "../selectors/current-canvas.selectors";

@Injectable()
export class CurrentCanvasEffects {
  createEntry$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CurrentCanvasActions.addEntry),
        concatLatestFrom(_ => this.store.select(selectCurrentCanvas)),
        switchMap(([{ entry }, currentCanvas]) =>
          this.canvasService
            .postCanvasEntryApiCanvasCanvasIdEntriesPost(currentCanvas.id, {
              entity: entry.entity,
            })
            .pipe(
              tap(entryNew =>
                this.store.dispatch(
                  CurrentCanvasActions.updateEntryId({
                    oldId: entry.id,
                    newId: entryNew.id,
                  })
                )
              ),
              catchError(_ => {
                this.toast.showToast({
                  severity: "error",
                  summary: "Could not create the note :(",
                  detail: "Please try again.",
                });
                return EMPTY;
              })
            )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private canvasService: CanvasService,
    private toast: ToastService,
    private store: Store
  ) {}
}
