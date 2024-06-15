"""Some common or shared models"""

import enum


class BmcEntity(enum.Enum):
    """An enum of all the different entities a canvas contains."""

    PARTNERS = "PARTNERS"
    ACTIVITIES = "ACTIVITIES"
    RESOURCES = "RESOURCES"
    PROPOSITIONS = "PROPOSITIONS"
    RELATIONSHIPS = "RELATIONSHIPS"
    CHANNELS = "CHANNELS"
    CUSTOMERSEGMENTS = "CUSTOMERSEGMENTS"
    COSTSTRUCTURE = "COSTSTRUCTURE"
    REVENUESTREAMS = "REVENUESTREAMS"
