import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/global.type";

const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/userSubscriptions/admin",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["subscriptions"],
    }),

    deleteSubscriptions: builder.mutation({
      query: (id) => ({
        url: `/userSubscriptions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subscriptions"],
    }),

    getAllOfferedSubscriptions: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/subscriptionOffers",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["subscriptionOffer"],
    }),

    createSubscriptionOffer: builder.mutation({
      query: (data) => ({
        url: "/subscriptionOffers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subscriptionOffer"],
    }),

    deleteSubscriptionOffer: builder.mutation({
      query: (id) => ({
        url: `/subscriptionOffers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subscriptionOffer"],
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useDeleteSubscriptionsMutation,
  useCreateSubscriptionOfferMutation,
  useGetAllOfferedSubscriptionsQuery,
  useDeleteSubscriptionOfferMutation,
} = subscriptionsApi;
