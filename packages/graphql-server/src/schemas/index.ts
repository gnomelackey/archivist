import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const sources = loadFilesSync('./**/*.graphql');
export const typeDefs = mergeTypeDefs(sources);