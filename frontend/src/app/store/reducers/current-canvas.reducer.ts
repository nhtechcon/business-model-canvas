import { createReducer, on } from "@ngrx/store";
import * as CurrentCanvasActions from "../actions/current-canvas.actions";
import { BmcEntry } from "src/app/core/models/bmc-entry.model";

/**
 * Describes the state of the currently loaded business model canvas.
 */
export interface CurrentCanvasState {
  name: string;
  creationDate: Date;
  lastEditDate: Date;

  entries: BmcEntry[];
}

export const initialState: CurrentCanvasState = {
  name: "",
  creationDate: new Date(),
  lastEditDate: new Date(),

  entries: [],
};

export const currentCanvasReducer = createReducer(
  initialState,
  on(CurrentCanvasActions.setCanvasData, (state, { data }) =>
    JSON.parse(JSON.stringify(data))
  )
);
