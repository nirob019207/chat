import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/global.type";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getdashboardData: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/users/admin/dashboard",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["User"],
    }),

    salesChart: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/users/admin/salesReport",
          method: "GET",
          params: params,
        };
      },
    }),

    customerChart: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/users/admin/customersReport",
          method: "GET",
          params: params,
        };
      },
    }),


  }),
});

export const { useGetdashboardDataQuery, useSalesChartQuery, useCustomerChartQuery } = dashboardApi;
