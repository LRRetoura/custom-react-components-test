import { gql } from "@apollo/client";

gql`
  query PrinterList {
  PrinterList {
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

