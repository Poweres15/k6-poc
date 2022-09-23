export default function requestFactory(token, shopId, queryBody, variables) {
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
    "x-brikl-shop-id": shopId,
  };
  let { operationName, query, endPoint } = queryBody;
  const body = {
    operationName,
    query,
    variables,
  };

  return { headers, body: JSON.stringify(body), endPoint };
}
