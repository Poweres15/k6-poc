// init context: importing modules
import { sleep, check, fail } from "k6";
import http from "k6/http";
import * as gqlQuery from "../testData/gqlQuery.js";
import * as variables from "../testData/queryVariable.js";
import getToken from "../utility/getToken.js";
import requestFactory from "../utility/requestFactory.js";

// init context: define k6 options
export const options = {
  thresholds: {
    "checks{scenario:embellish_one_image}": ["rate > 0.99"],
    "iteration_duration{scenario:embellish_one_image}": [`max<10000`],
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
    },
    embellish_two_image: {
      executor: "per-vu-iterations",
      vus: 1,
      env: { IMAGEVARIABLE: JSON.stringify(variables.embellishTwo) },
      startTime: "15s",
    },
    embellish_three_image: {
      executor: "per-vu-iterations",
      vus: 1,
      env: { IMAGEVARIABLE: JSON.stringify(variables.embellishThree) },
      startTime: "30s",
    },
  },
};

export function setup() {
  return getToken();
}

const testNBEId = `3ddd1f77-23b5-4bc7-9059-c32cc1338723`;

function exitTestIfFail(result, failMessage) {
  if (result === false) {
    fail(failMessage);
  }
}

export default function (access_token) {
  const startEmbellish = requestFactory(
    access_token,
    testNBEId,
    gqlQuery.exportCustomImagePlaceholder,
    JSON.parse(__ENV.IMAGEVARIABLE)
  );

  let startEmbellishResponse = http.post(
    startEmbellish.endPoint,
    startEmbellish.body,
    {
      headers: startEmbellish.headers,
    }
  );

  exitTestIfFail(
    check(startEmbellishResponse, {
      "is status 200": (r) => r.status === 200,
    }),
    "start embellishment is failed"
  );

  const getStatusVariable = {
    id: startEmbellishResponse.json().data.exportCustomImagePlaceholder.jobId,
    first: 999,
  };

  console.log(
    "jobId",
    startEmbellishResponse.json().data.exportCustomImagePlaceholder.jobId
  );

  const getEmbellishJob = requestFactory(
    access_token,
    testNBEId,
    gqlQuery.getDashboardOptimizedJobByIdNB,
    getStatusVariable
  );

  let status = "PROCESSING";
  while (status !== "COMPLETED") {
    sleep(1);
    const jobStatusResponse = http.post(
      getEmbellishJob.endPoint,
      getEmbellishJob.body,
      {
        headers: getEmbellishJob.headers,
      }
    );

    exitTestIfFail(
      check(jobStatusResponse, {
        "is status 200": (r) => r.status === 200,
      }),
      "get Embellish job status is fail"
    );

    status = jobStatusResponse.json().data.jobById.status;
  }
}
