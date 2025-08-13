"use client";

import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "@repo/clients";

import type { GlobalProvidersProps } from "./types";

export const GlobalProviders = ({ children }: GlobalProvidersProps) => {
  return <ApolloProvider client={graphqlClient}>{children}</ApolloProvider>;
};
