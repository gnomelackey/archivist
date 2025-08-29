import { gql } from "@apollo/client";
import { FACTION_RELATIONS_FRAGMENT } from "../../fragments";

export const CREATE_FACTION_TRADE_MUTATION = gql`
  mutation CreateFactionTrade($campaign: ID!, $input: FactionTradeInput!) {
    createFactionTrade(campaign: $campaign, input: $input) {
      ...FactionRelationsFragment
    }
  }

  ${FACTION_RELATIONS_FRAGMENT}
`;
