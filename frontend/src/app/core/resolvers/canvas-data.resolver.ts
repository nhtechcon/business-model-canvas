import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";

import { CanvasService } from "../services/api-client";
import { catchError, of } from "rxjs";
import { ToastService } from "../services/toast.service";

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

  return inject(CanvasService)
    .getCanvasApiCanvasCanvasIdGet(canvasId)
    .pipe(
      catchError(err => {
        console.log(err);
        toast.showToast({
          severity: "error",
          summary: "Oh no :/",
          detail: "Could not load the requested canvas.",
        });
        return router.navigate(["/main"]);
      })
    );
};
