import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CanvasListState } from "../reducers/canvas-list.reducer";

export const selectCanvasListState =
  createFeatureSelector<CanvasListState>("canvasList");

export const selectAllCanvases = createSelector(
  selectCanvasListState,
  (state: CanvasListState) => state.canvases
);
