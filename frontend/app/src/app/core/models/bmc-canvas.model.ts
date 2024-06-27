import { BmcEntry } from "./bmc-entry.model";

export interface BasicBmcCanvasInfo {
  id: string;
  name: string;
  creationDate: Date;
  lastEditDate: Date;
}

export interface BmcCanvas extends BasicBmcCanvasInfo {
  entries: BmcEntry[];
}
