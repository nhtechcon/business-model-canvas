import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CanvasListState } from "../reducers/canvas-list.reducer";

export const featureKey = "canvasList";

export const selectCanvasListState =
  createFeatureSelector<CanvasListState>(featureKey);

export const selectAllCanvases = createSelector(
  selectCanvasListState,
  (state: CanvasListState) => state.canvases
);

export const selectLoadingState = createSelector(
  selectCanvasListState,
  (state: CanvasListState) => state.loadingState
);
