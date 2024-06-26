import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";

import { CanvasService } from "../services/api-client";
import { catchError, of, tap } from "rxjs";
import { ToastService } from "../services/toast.service";
import { Store } from "@ngrx/store";
import { setCanvasData } from "src/app/store/actions/current-canvas.actions";
import { parseISO } from "date-fns";

/**
 * This resolver is responsible for retrieving full data of a business model
 * canvas, if a route is called with its id.
 */
export const canvasResolver: ResolveFn<Object> = (
  route: ActivatedRouteSnapshot,
  state
) => {
  const canvasId = route.paramMap.get("id") as string;

  if (!canvasId) {
    return of(undefined);
  }

  const router = inject(Router);
  const toast = inject(ToastService);
  const store = inject(Store);

  return inject(CanvasService)
    .getCanvasApiCanvasCanvasIdGet(canvasId)
    .pipe(
      tap(data =>
        store.dispatch(
          setCanvasData({
            data: {
              id: data.id,
              name: data.name,
              creationDate: parseISO(data.creationDate),
              lastEditDate: parseISO(data.lastEditDate),
              entries: data.entries.map(entry => ({
                ...entry,
                date: parseISO(entry.date),
                lastUpdated: parseISO(entry.lastUpdated),
              })),
            },
          })
        )
      ),
      catchError(err => {
        toast.showToast({
          severity: "error",
          summary: "Oh no :/",
          detail: "Could not load the requested canvas.",
        });
        return router.navigate(["/main"]);
      })
    );
};
