import { createReducer, on } from "@ngrx/store";
import * as CanvasActions from "../actions/canvas-list.actions";
import { BasicBmcCanvasInfo } from "src/app/core/models/bmc-canvas.model";
import { LoadingState } from "../common";

/**
 * Describes the state of the list of business model canvases.
 */
export interface CanvasListState {
  canvases: BasicBmcCanvasInfo[];
  loadingState: LoadingState;
}

export const initialState: CanvasListState = {
  loadingState: "ready",
  canvases: [],
};

export const canvasListReducer = createReducer(
  initialState,
  on(CanvasActions.addCanvas, (state, { canvas }) => ({
    ...state,
    canvases: [...state.canvases, canvas],
  })),
  on(CanvasActions.removeCanvas, (state, { id }) => ({
    ...state,
    canvases: state.canvases.filter(canvas => canvas.id !== id),
  })),
  on(CanvasActions.startLoadCanvases, state => ({
    ...state,
    loadingState: "loading" as LoadingState,
  })),
  on(CanvasActions.loadCanvasesSuccess, (state, { canvases }) => ({
    ...state,
    canvases: [...canvases],
    loadingState: "ready" as LoadingState,
  })),
  on(CanvasActions.loadCanvasesFailure, state => ({
    ...state,
    loadingState: "failed" as LoadingState,
  }))
);
