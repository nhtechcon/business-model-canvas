/**
 * Represents the minimum basic information a business model canvas entry
 * must have.
 */
export interface BmcEntry {
  id: string;
  text: string;
  date: Date;
}

export interface CustomerSegment extends BmcEntry {}
export interface ValueProposition extends BmcEntry {}
export interface Channel extends BmcEntry {}
export interface CustomerRelationship extends BmcEntry {}
export interface RevenueStream extends BmcEntry {}
export interface KeyResource extends BmcEntry {}
export interface KeyActivity extends BmcEntry {}
export interface KeyPartnership extends BmcEntry {}
export interface CostStructure extends BmcEntry {}
