import { createAction, props } from "@ngrx/store";
import { BmcEntry } from "src/app/core/models/bmc-entry.model";
import { BmcCanvas } from "src/app/core/models/bmc-canvas.model";
import { LoadingState } from "../common";

export const loadFullCanvas = createAction(
  "[current-canvas] loadFullCanvas",
  props<{ canvasId: string }>()
);

export const setCanvasData = createAction(
  "[current-canvas] setCanvasData",
  props<{ data: BmcCanvas }>()
);

export const setCanvasName = createAction(
  "[current-canvas] setCanvasName",
  props<{ name: string }>()
);

export const deleteEntry = createAction(
  "[current-canvas] deleteEntry",
  props<{ id: number }>()
);

export const addEntry = createAction(
  "[current-canvas] addEntry",
  props<{ entry: BmcEntry }>()
);

export const updateEntryText = createAction(
  "[current-canvas] updateEntryText",
  props<{ id: number; text: string }>()
);

export const updateEntryId = createAction(
  "[current-canvas] updateEntryId",
  props<{ oldId: number; newId: number }>()
);

export const setInitialLoadState = createAction(
  "[current-canvas] setInitialLoadState",
  props<{ value: LoadingState }>()
);
