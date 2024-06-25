import { createAction, props } from "@ngrx/store";
import { BasicBmcCanvasInfo } from "src/app/core/models/bmc-canvas.model";

export const createCanvas = createAction(
  "[Canvas List] Create a new canvas",
  props<{ name: string }>()
);

export const createCanvasFailure = createAction(
  "[Canvas List] Creating new canvas failed",
  props<{ error: any }>()
);

export const addCanvas = createAction(
  "[Canvas List] Add Canvas to list",
  props<{ canvas: BasicBmcCanvasInfo }>()
);

export const removeCanvas = createAction(
  "[Canvas List] Remove Canvas from list",
  props<{ id: string }>()
);

export const startLoadCanvases = createAction("[Canvas List] Load Canvases");

export const loadCanvasesSuccess = createAction(
  "[Canvas List] Load Canvases Success",
  props<{ canvases: BasicBmcCanvasInfo[] }>()
);

export const loadCanvasesFailure = createAction(
  "[Canvas List] Load Canvases Failure",
  props<{ error: any }>()
);
