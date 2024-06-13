import { createAction, props } from "@ngrx/store";
import { BasicBmcCanvasInfo } from "src/app/core/models/bmc-canvas.model";

export const addCanvas = createAction(
  "[Canvas List] Add Canvas to list",
  props<{ canvas: BasicBmcCanvasInfo }>()
);

export const removeCanvas = createAction(
  "[Canvas List] Remove Canvas from list",
  props<{ id: string }>()
);

export const loadCanvases = createAction(
  "[Canvas List] Load Canvases",
  props<{ canvases: BasicBmcCanvasInfo[] }>()
);
