import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, delay, map, mergeMap, tap } from "rxjs/operators";
import * as CanvasActions from "../actions/canvas-list.actions";
import { Canvas, CanvasService } from "src/app/core/services/api-client";
import { parseISO } from "date-fns";

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

  constructor(
    private actions$: Actions,
    private canvasService: CanvasService
  ) {}
}
