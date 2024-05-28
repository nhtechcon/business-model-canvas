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
  name: "Unnamed Canvas",
  creationDate: new Date(),
  lastEditDate: new Date(),

  entries: [],
};

export const currentCanvasReducer = createReducer(
  initialState,
  on(CurrentCanvasActions.setCanvasData, (state, { data }) =>
    JSON.parse(JSON.stringify(data))
  ),
  on(CurrentCanvasActions.setCanvasName, (state, { name }) => ({
    ...state,
    name,
  })),
  on(CurrentCanvasActions.deleteEntry, (state, { id }) => ({
    ...state,
    entries: state.entries.filter(entry => entry.id !== id),
  })),
  on(CurrentCanvasActions.addEntry, (state, { entry }) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.entries.push(entry);
    return newState;
  })
);
