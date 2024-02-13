import { gql } from "@apollo/client";

gql`
query PrinterQuery($displayName: String!) {
  PrinterQuery(DisplayName: $displayName) {
    Server
    Name
    DisplayName
  }
}
`;

gql`
query Employee($loginId: Int!) {
  Employee(loginID: $loginId) {
    ID
    Name
  }
}
`;

