import { createAction, props } from "@ngrx/store";
import { CurrentCanvasState } from "../reducers/current-canvas.reducer";
import { BmcEntry } from "src/app/core/models/bmc-entry.model";

export const setCanvasData = createAction(
  "[current-canvas] setCanvasData",
  props<{ data: CurrentCanvasState }>()
);

export const setCanvasName = createAction(
  "[current-canvas] setCanvasName",
  props<{ name: string }>()
);
