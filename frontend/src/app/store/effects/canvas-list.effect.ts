import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, delay, map, mergeMap, tap } from "rxjs/operators";
import * as CanvasActions from "../actions/canvas-list.actions";
import { Canvas, CanvasService } from "src/app/core/services/api-client";
import { parseISO } from "date-fns";
import { ToastService } from "src/app/core/services/toast.service";

@Injectable()
export class CanvasListEffects {
  loadCanvases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CanvasActions.startLoadCanvases),
      mergeMap(() =>
        this.canvasService.getUserCanvasesApiUserCanvasesGet().pipe(
          map((canvases: Canvas[]) =>
            CanvasActions.loadCanvasesSuccess({
              canvases: canvases.map(row => ({
                id: row.id,
                name: row.name,
                creationDate: parseISO(row.creation_date),
                lastEditDate: parseISO(row.last_edit_date),
              })),
            })
          ),
          catchError(error => of(CanvasActions.loadCanvasesFailure({ error })))
        )
      )
    )
  );

  createCanvas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CanvasActions.createCanvas),
      mergeMap(({ name }) =>
        this.canvasService.createCanvasApiCanvasPost({ name }).pipe(
          map((canvas: Canvas) =>
            CanvasActions.addCanvas({
              canvas: {
                id: canvas.id,
                name: canvas.name,
                creationDate: parseISO(canvas.creation_date),
                lastEditDate: parseISO(canvas.last_edit_date),
              },
            })
          ),
          catchError(error => {
            this.toast.showToast({
              severity: "error",
              summary: "Creating your new canvas failed :(",
              detail: "Please try again.",
            });
            return of(CanvasActions.createCanvasFailure({ error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private canvasService: CanvasService,
    private toast: ToastService
  ) {}
}
