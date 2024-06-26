import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, concatMap, map, switchMap, tap } from "rxjs/operators";
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
        concatMap(([{ entry }, currentCanvas]) =>
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

  deleteEntry$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CurrentCanvasActions.deleteEntry),
        concatLatestFrom(_ => this.store.select(selectCurrentCanvas)),
        concatMap(([action, currentCanvas]) =>
          this.canvasService
            .deleteCanvasEntryApiCanvasCanvasIdEntriesEntryIdDelete(
              currentCanvas.id,
              action.id
            )
            .pipe(
              tap(() =>
                this.toast.showToast({
                  severity: "success",
                  summary: "Success",
                  detail: "Note has been deleted.",
                })
              ),
              catchError(_ => {
                this.toast.showToast({
                  severity: "error",
                  summary: "Could not delete the note :(",
                  detail: "Please try again.",
                });
                return EMPTY;
              })
            )
        )
      ),
    { dispatch: false }
  );

  updateEntry$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CurrentCanvasActions.updateEntryText),
        concatLatestFrom(_ => this.store.select(selectCurrentCanvas)),
        concatMap(([action, currentCanvas]) =>
          this.canvasService
            .putCanvasEntryApiCanvasCanvasIdEntriesPut(currentCanvas.id, {
              id: action.id,
              text: action.text,
            })
            .pipe(
              catchError(_ => {
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
