import { GraphQLClient } from "graphql-request";

interface IRequest {
  query: any,
  variables: any,
  includeDrafts?: any,
  excludeInvalid?: any
}

export function request(requestParams: IRequest) {
  const {
    query,
    variables,
    includeDrafts,
    excludeInvalid
  } = requestParams

  const headers: any = {
    authorization: `Bearer 7f5c6f38de8d239df8c2209a6ea0ac`,
  };

  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true';
  }
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true';
  }
  const client = new GraphQLClient('https://graphql.datocms.com', { headers });
  return client.request(query, variables);
}