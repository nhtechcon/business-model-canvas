import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CurrentCanvasState } from "../reducers/current-canvas.reducer";
import { BmcEntity } from "src/app/core/models/bmc-entry.model";

export const featureKey = "currentCanvas";

export const selectCurrentCanvas =
  createFeatureSelector<CurrentCanvasState>(featureKey);

export const selectEntityEntries = (entity: BmcEntity) =>
  createSelector(selectCurrentCanvas, (state: CurrentCanvasState) =>
    state.entries.filter(entry => entry.entity === entity)
  );

export const selectName = createSelector(
  selectCurrentCanvas,
  (state: CurrentCanvasState) => state.name
);
