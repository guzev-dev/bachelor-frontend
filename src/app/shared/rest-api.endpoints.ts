
const apiBaseUrl = "http://localhost:8080/charity/api";

const authentication = `${apiBaseUrl}/auth`;
const account = `${apiBaseUrl}/user`;
const charity = `${apiBaseUrl}/charity`;
const payments = `${apiBaseUrl}/payments`;
const fund = `${apiBaseUrl}/funds`;

export const RestApiEndpoints = {

  AUTH: {
    LOGIN: `${authentication}/login`,
    REGISTER: `${authentication}/register`,
    CONFIRM_REGISTER: `${authentication}/confirm`,
    LOGOUT: `${authentication}/logout`
  },

  ACCOUNT: {
    FETCH: `${account}`,
    CHANGE_PASS: `${account}/change-password`,
    VOTE_AVAILABLE: `${account}/vote-available`
  },

  CHARITY: {
    CATEGORIES: `${charity}/categories`,
    STATUSES: `${charity}/statuses`,
    ORDERS: `${charity}/orders`,
    CHARITIES: `${charity}`,
    SINGLE_CHARITY: `${charity}/`,
    DOCUMENT_BODY: `${charity}/documents/`,
    VOTE: (id: number) => `${charity}/${id}/vote`,
    FUND_CHARITY: (id: number) => `${charity}/fund/${id}`
  },

  PAYMENTS: {
    USER: `${payments}/user`,
    CHARITY: `${payments}/charity/`
  },

  FUNDS: {
    FUNDS: `${fund}`,
    SINGLE_FUND: (id: number) => `${fund}/${id}`,
    ORDERS: `${fund}/order`,
    LOCATIONS: `${fund}/locations`,
    DOCUMENT_BODY: (documentId: number) => `${fund}/documents/${documentId}`,
  }

}
