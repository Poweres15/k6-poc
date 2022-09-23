export const getDashboardOptimizedJobByIdNB = {
  operationName: "getDashboardOptimizedJobByIdNB",
  variables: {
    id: "bd581806-30da-47e4-bad8-41b4efecc6d3",
    first: 999,
  },
  query:
    "query getDashboardOptimizedJobByIdNB($id: ID!, $before: String, $filters: JobFilterInput, $first: Int, $after: String) {\n  jobById(id: $id) {\n    id\n    meta\n    status\n    output\n    childJobs(first: $first, before: $before, filters: $filters, after: $after) {\n      progress {\n        total\n        completed\n        failed\n        __typename\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n        __typename\n      }\n      edges {\n        node {\n          id\n          output\n          status\n          meta\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
};

export const embellishData = {
  embellishOneImage: {
    operationName: "exportCustomImagePlaceholder",
    variables: {
      input: {
        salesChannelId: "6c2ae51a-a386-4896-a635-fa312d862ada",
        canvasHeight: 298,
        canvasWidth: 298,
        customProductImagePlaceholders: [
          {
            itemValue:
              "https://dev.cdn.mybrikl.com/3ddd1f77-23b5-4bc7-9059-c32cc1338723/userdata/logo/3ddd1f77-23b5-4bc7-9059-c32cc1338723-ADMIN/print-librarypng-SrPl7nElD.png",
            top: 2.33203125,
            left: 109,
            angle: 0,
            width: 82.66796875,
            height: 82.66796875,
            placeholderId: "614f2239-fabb-4c55-9e36-76fe1bba454d",
            products: [
              {
                id: "34c9fcfc-7653-4c63-99a4-ca27f756c86f",
                images: [
                  {
                    id: "a1aaaf1b-c307-4368-9c85-b718ffa1538a",
                    source:
                      "https://dev-cdn-media-brikl.imgix.net/3ddd1f77-23b5-4bc7-9059-c32cc1338723/media/34c9fcfc-7653-4c63-99a4-ca27f756c86f/placeholder-before-re-load-actual-1png-2gvmpw-29.png",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    query:
      "mutation exportCustomImagePlaceholder($input: ExportCustomImagePlaceholderInput!) {\n  exportCustomImagePlaceholder(input: $input) {\n    jobId\n    __typename\n  }\n}\n",
  },
};
