import * as env from "../env.js";

export const gqlQuery = {
  getDashboardOptimizedJobByIdNB: {
    endPoint: env.GQL_INTERNAL_REQUEST_URL,
    operationName: "getDashboardOptimizedJobByIdNB",
    query:
      "query getDashboardOptimizedJobByIdNB($id: ID!, $before: String, $filters: JobFilterInput, $first: Int, $after: String) {\n  jobById(id: $id) {\n    id\n    meta\n    status\n    output\n    childJobs(first: $first, before: $before, filters: $filters, after: $after) {\n      progress {\n        total\n        completed\n        failed\n        __typename\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n        __typename\n      }\n      edges {\n        node {\n          id\n          output\n          status\n          meta\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
  },
  exportCustomImagePlaceholder: {
    endPoint: env.GQL_INTERNAL_REQUEST_URL,
    operationName: "exportCustomImagePlaceholder",
    query:
      "mutation exportCustomImagePlaceholder($input: ExportCustomImagePlaceholderInput!) {\n  exportCustomImagePlaceholder(input: $input) {\n    jobId\n    __typename\n  }\n}\n",
  },
};
