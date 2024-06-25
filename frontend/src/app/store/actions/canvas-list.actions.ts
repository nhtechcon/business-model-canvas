import { createAction, props } from "@ngrx/store";
import { BasicBmcCanvasInfo } from "src/app/core/models/bmc-canvas.model";

export const createCanvas = createAction(
  "[canvas-list] createCanvas",
  props<{ name: string }>()
);

export const createCanvasFailure = createAction(
  "[canvas-list] createCanvasFailure",
  props<{ error: any }>()
);

export const addCanvas = createAction(
  "[canvas-list] addCanvas",
  props<{ canvas: BasicBmcCanvasInfo }>()
);

export const removeCanvas = createAction(
  "[canvas-list] removeCanvas",
  props<{ id: string }>()
);

export const startLoadCanvases = createAction(
  "[canvas-list] startLoadCanvases"
);

export const loadCanvasesSuccess = createAction(
  "[canvas-list] loadCanvasesSuccess",
  props<{ canvases: BasicBmcCanvasInfo[] }>()
);

export const loadCanvasesFailure = createAction(
  "[canvas-list] loadCanvasesFailure",
  props<{ error: any }>()
);
