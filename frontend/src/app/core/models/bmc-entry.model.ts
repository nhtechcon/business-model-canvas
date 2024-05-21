/**
 * Defines the available entities in a BMC canvas.
 */
export enum BmcEntity {
  PARTNERS = "PARTNERS",
  ACTIVITIES = "ACTIVITIES",
  RESOURCES = "RESOURCES",
  PROPOSITIONS = "PROPOSITIONS",
  RELATIONSHIPS = "RELATIONSHIPS",
  CHANNELS = "CHANNELS",
  CUSTOMERSEGMENTS = "CUSTOMERSEGMENTS",
  COSTSTRUCTURE = "COSTSTRUCTURE",
  REVENUESTREAMS = "REVENUESTREAMS",
}

/**
 * Represents the minimum basic information a business model canvas entry
 * must have.
 */
export interface BmcEntry {
  id: string;
  text: string;
  date: Date;
  entity: BmcEntity;
}
