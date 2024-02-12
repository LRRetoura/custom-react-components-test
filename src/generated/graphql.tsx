import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Article = {
  __typename?: 'Article';
  ArticleNumber: Scalars['String']['output'];
  ExternalArticleNumber?: Maybe<Scalars['String']['output']>;
  Height?: Maybe<Scalars['Float']['output']>;
  IsEbayPlus?: Maybe<Scalars['Boolean']['output']>;
  Length?: Maybe<Scalars['Float']['output']>;
  ListingPrice?: Maybe<Scalars['Float']['output']>;
  Notes?: Maybe<Array<Scalars['String']['output']>>;
  SalePrice: Scalars['Float']['output'];
  ShippingCategory?: Maybe<Scalars['String']['output']>;
  ShippingType?: Maybe<Scalars['String']['output']>;
  SpareParts?: Maybe<Array<Maybe<SparePart>>>;
  Title?: Maybe<Scalars['String']['output']>;
  Weight?: Maybe<Scalars['Float']['output']>;
  Width?: Maybe<Scalars['Float']['output']>;
};

export type ArticleHint = {
  __typename?: 'ArticleHint';
  ArticleNumber: Scalars['String']['output'];
  HintDE?: Maybe<Scalars['String']['output']>;
  HintEN?: Maybe<Scalars['String']['output']>;
  HintPL?: Maybe<Scalars['String']['output']>;
};

export type Condition = {
  __typename?: 'Condition';
  Description?: Maybe<Scalars['String']['output']>;
  ID: Scalars['String']['output'];
  IsBasicCondition?: Maybe<Scalars['Boolean']['output']>;
  Name?: Maybe<Scalars['String']['output']>;
  PriceFactor?: Maybe<Scalars['Float']['output']>;
  Sorting?: Maybe<Scalars['Int']['output']>;
};

export type ConditionUnion = Condition | VirtualCondition;

export type Employes = {
  __typename?: 'Employes';
  ID: Scalars['Int']['output'];
  Name: Scalars['String']['output'];
};

export type JtlMissing = {
  __typename?: 'JtlMissing';
  Count: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  JtlMissing: JtlMissing;
  TestDataDelete?: Maybe<Array<Maybe<TestData>>>;
  TestDataInsert: Array<TestData>;
  TestDataUpdate?: Maybe<Array<Maybe<TestData>>>;
};


export type MutationTestDataDeleteArgs = {
  serialNumbers: Array<Scalars['Int']['input']>;
};


export type MutationTestDataInsertArgs = {
  IDTester: Scalars['Int']['input'];
  articleName: Scalars['String']['input'];
  articleNumber: Scalars['String']['input'];
  numberOfArticles: Scalars['Int']['input'];
  printerName: Scalars['String']['input'];
  printerServer: Scalars['String']['input'];
  scannedCondition: Scalars['String']['input'];
  singleLabel: Scalars['Boolean']['input'];
};


export type MutationTestDataUpdateArgs = {
  IDTester: Scalars['Int']['input'];
  articleName: Scalars['String']['input'];
  articleNumber: Scalars['String']['input'];
  printerName: Scalars['String']['input'];
  printerServer: Scalars['String']['input'];
  scannedCondition: Scalars['String']['input'];
  serialNumbers: Array<Scalars['Int']['input']>;
  singleLabel: Scalars['Boolean']['input'];
};

export type Printer = {
  __typename?: 'Printer';
  DisplayName: Scalars['String']['output'];
  Name: Scalars['String']['output'];
  Server: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  AllConditions: Array<ConditionUnion>;
  ArticleData: Article;
  ArticleHint?: Maybe<ArticleHint>;
  Employee?: Maybe<Employes>;
  PrinterList: Array<Printer>;
};


export type QueryArticleDataArgs = {
  scan: Scalars['String']['input'];
};


export type QueryArticleHintArgs = {
  scan: Scalars['String']['input'];
};


export type QueryEmployeeArgs = {
  loginID: Scalars['Int']['input'];
};

export type SparePart = {
  __typename?: 'SparePart';
  Name?: Maybe<Scalars['String']['output']>;
  SparePartNumber?: Maybe<Scalars['String']['output']>;
};

export type TestData = {
  __typename?: 'TestData';
  ArticleNumber?: Maybe<Scalars['String']['output']>;
  Comment?: Maybe<Scalars['String']['output']>;
  Date?: Maybe<Scalars['DateTime']['output']>;
  ID: Scalars['Int']['output'];
  IDCondition?: Maybe<Scalars['String']['output']>;
  IDTester: Scalars['Int']['output'];
  Price?: Maybe<Scalars['String']['output']>;
  Sale?: Maybe<Scalars['String']['output']>;
  ScannedCondition?: Maybe<Scalars['String']['output']>;
  Timestamp?: Maybe<Scalars['DateTime']['output']>;
};

export type VirtualCondition = {
  __typename?: 'VirtualCondition';
  BaseCondition?: Maybe<Scalars['String']['output']>;
  ID: Scalars['String']['output'];
  Logic?: Maybe<Scalars['String']['output']>;
};

export type PrinterListQueryVariables = Exact<{ [key: string]: never; }>;


export type PrinterListQuery = { __typename?: 'Query', PrinterList: Array<{ __typename?: 'Printer', Server: string, Name: string, DisplayName: string }> };

export type EmployeeQueryVariables = Exact<{
  loginId: Scalars['Int']['input'];
}>;


export type EmployeeQuery = { __typename?: 'Query', Employee?: { __typename?: 'Employes', ID: number, Name: string } | null };


export const PrinterListDocument = gql`
    query PrinterList {
  PrinterList {
    Server
    Name
    DisplayName
  }
}
    `;

/**
 * __usePrinterListQuery__
 *
 * To run a query within a React component, call `usePrinterListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrinterListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrinterListQuery({
 *   variables: {
 *   },
 * });
 */
export function usePrinterListQuery(baseOptions?: Apollo.QueryHookOptions<PrinterListQuery, PrinterListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrinterListQuery, PrinterListQueryVariables>(PrinterListDocument, options);
      }
export function usePrinterListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrinterListQuery, PrinterListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrinterListQuery, PrinterListQueryVariables>(PrinterListDocument, options);
        }
export function usePrinterListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PrinterListQuery, PrinterListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PrinterListQuery, PrinterListQueryVariables>(PrinterListDocument, options);
        }
export type PrinterListQueryHookResult = ReturnType<typeof usePrinterListQuery>;
export type PrinterListLazyQueryHookResult = ReturnType<typeof usePrinterListLazyQuery>;
export type PrinterListSuspenseQueryHookResult = ReturnType<typeof usePrinterListSuspenseQuery>;
export type PrinterListQueryResult = Apollo.QueryResult<PrinterListQuery, PrinterListQueryVariables>;
export const EmployeeDocument = gql`
    query Employee($loginId: Int!) {
  Employee(loginID: $loginId) {
    ID
    Name
  }
}
    `;

/**
 * __useEmployeeQuery__
 *
 * To run a query within a React component, call `useEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmployeeQuery({
 *   variables: {
 *      loginId: // value for 'loginId'
 *   },
 * });
 */
export function useEmployeeQuery(baseOptions: Apollo.QueryHookOptions<EmployeeQuery, EmployeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmployeeQuery, EmployeeQueryVariables>(EmployeeDocument, options);
      }
export function useEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmployeeQuery, EmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmployeeQuery, EmployeeQueryVariables>(EmployeeDocument, options);
        }
export function useEmployeeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EmployeeQuery, EmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EmployeeQuery, EmployeeQueryVariables>(EmployeeDocument, options);
        }
export type EmployeeQueryHookResult = ReturnType<typeof useEmployeeQuery>;
export type EmployeeLazyQueryHookResult = ReturnType<typeof useEmployeeLazyQuery>;
export type EmployeeSuspenseQueryHookResult = ReturnType<typeof useEmployeeSuspenseQuery>;
export type EmployeeQueryResult = Apollo.QueryResult<EmployeeQuery, EmployeeQueryVariables>;