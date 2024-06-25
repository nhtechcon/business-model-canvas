import { BmcEntity } from "../services/api-client";

export { BmcEntity };

/**
 * Represents the minimum basic information a business model canvas entry
 * must have.
 */
export interface BmcEntry {
  id: number;
  text: string;
  date: Date;
  lastUpdated: Date;
  entity: BmcEntity;
}
