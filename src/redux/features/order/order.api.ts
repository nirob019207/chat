import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/global.type";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Order"],
    }),
  }),
});

export const {useGetAllOrderQuery} = orderApi;
