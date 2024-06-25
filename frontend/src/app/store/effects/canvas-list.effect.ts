import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
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
                ...row,
                creationDate: parseISO(row.creationDate),
                lastEditDate: parseISO(row.lastEditDate),
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
                ...canvas,
                creationDate: parseISO(canvas.creationDate),
                lastEditDate: parseISO(canvas.lastEditDate),
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
