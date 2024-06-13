import { createReducer, on } from "@ngrx/store";
import { v4 as uuidv4 } from "uuid";
import * as CurrentCanvasActions from "../actions/current-canvas.actions";
import { BmcCanvas } from "src/app/core/models/bmc-canvas.model";

/**
 * Describes the state of the currently loaded business model canvas.
 */
export interface CurrentCanvasState extends BmcCanvas {}

export const initialState: CurrentCanvasState = {
  id: uuidv4(),
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
  }),
  on(CurrentCanvasActions.updateEntryText, (state, { id, text }) => {
    const newState: CurrentCanvasState = JSON.parse(JSON.stringify(state));
    newState.entries = newState.entries.map(entry =>
      entry.id === id ? { ...entry, text } : entry
    );
    return newState;
  })
);
