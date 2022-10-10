import getToken from "./getToken.js";
import requestFactory from "./requestFactory.js";
import { gqlQuery } from "../testData/gqlQuery.js";
import http from "k6/http";

export default class RequestClass {
  constructor(shopId) {
    this.shopId = shopId;
    this.token = null;
  }

  generateToken() {
    this.token = getToken();
  }

  requestWithOperationName(operationName, variable) {
    if (!this.token) this.generateToken();

    const queryBody = requestFactory(
      this.token,
      this.shopId,
      gqlQuery[operationName],
      variable
    );

    return http.post(queryBody.endPoint, queryBody.body, {
      headers: queryBody.headers,
    });
  }
}
