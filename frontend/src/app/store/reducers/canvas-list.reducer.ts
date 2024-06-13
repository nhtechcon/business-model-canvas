import { createReducer, on } from "@ngrx/store";
import {
  addCanvas,
  removeCanvas,
  loadCanvases,
} from "../actions/canvas-list.actions";
import { BasicBmcCanvasInfo } from "src/app/core/models/bmc-canvas.model";

/**
 * Describes the state of the list of business model canvases.
 */
export interface CanvasListState {
  canvases: BasicBmcCanvasInfo[];
}

export const initialState: CanvasListState = {
  canvases: [],
};

export const canvasListReducer = createReducer(
  initialState,
  on(addCanvas, (state, { canvas }) => ({
    ...state,
    canvases: [...state.canvases, canvas],
  })),
  on(removeCanvas, (state, { id }) => ({
    ...state,
    canvases: state.canvases.filter(canvas => canvas.id !== id),
  })),
  on(loadCanvases, (state, { canvases }) => ({
    ...state,
    canvases: [...canvases],
  }))
);
