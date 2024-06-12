import { BmcEntry } from "./bmc-entry.model";

export interface BmcCanvas {
  name: string;
  creationDate: Date;
  lastEditDate: Date;

  entries: BmcEntry[];
}
