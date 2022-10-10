// init context: importing modules
import { sleep, check, fail } from "k6";
import { gqlQuery } from "../testData/gqlQuery.js";
import * as variables from "../testData/queryVariable.js";
import RequestClass from "../utility/RequestClass.js";

// init context: define k6 options
export const options = {
  thresholds: {
    "checks{scenario:embellish_one_image}": ["rate > 0.99"],
    "iteration_duration{scenario:embellish_one_image}": [`max<15000`],
    "checks{scenario:embellish_two_image}": ["rate > 0.99"],
    "iteration_duration{scenario:embellish_two_image}": [`max<15000`],
    "checks{scenario:embellish_three_image}": ["rate > 0.99"],
    "iteration_duration{scenario:embellish_three_image}": [`max<15000`],
  },
  scenarios: {
    embellish_one_image: {
      executor: "per-vu-iterations",
      vus: 1,
      env: { IMAGEVARIABLE: JSON.stringify(variables.embellishOne) },
      maxDuration: "15s",
    },
    embellish_two_image: {
      executor: "per-vu-iterations",
      vus: 1,
      env: { IMAGEVARIABLE: JSON.stringify(variables.embellishTwo) },
      startTime: "15s",
      maxDuration: "15s",
    },
    embellish_three_image: {
      executor: "per-vu-iterations",
      vus: 1,
      env: { IMAGEVARIABLE: JSON.stringify(variables.embellishThree) },
      startTime: "30s",
      maxDuration: "15s",
    },
  },
};

const testNBEId = `3ddd1f77-23b5-4bc7-9059-c32cc1338723`;
const NBEshop = new RequestClass(testNBEId);

function exitTestIfFail(result, failMessage) {
  if (result === false) {
    fail(failMessage);
  }
}

export default function () {
  let startEmbellishResponse = NBEshop.requestWithOperationName(
    gqlQuery.exportCustomImagePlaceholder.operationName,
    JSON.parse(__ENV.IMAGEVARIABLE)
  );

  exitTestIfFail(
    check(startEmbellishResponse, {
      "is status 200": (r) => r.status === 200,
      "response have data": (r) => r.json().data !== null,
    }),
    "start embellishment is failed"
  );

  const jobId =
    startEmbellishResponse.json().data.exportCustomImagePlaceholder.jobId;

  let status = "PENDING";
  while (status !== "COMPLETED") {
    sleep(1);

    let jobStatusResponse = NBEshop.requestWithOperationName(
      gqlQuery.getDashboardOptimizedJobByIdNB.operationName,
      { id: jobId, first: 999 }
    );

    exitTestIfFail(
      check(jobStatusResponse, {
        "is status 200": (r) => r.status === 200,
        "response have data": (r) => r.json().data !== null,
      }),
      "get Embellish job status is fail"
    );

    status = jobStatusResponse.json().data.jobById.status;
  }
}
