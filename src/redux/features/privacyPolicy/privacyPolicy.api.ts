import baseApi from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/terms",
        method: "GET",
      }),
      providesTags: ["PrivacyPolicy"],
    }),

    createPrivacyPolicy: builder.mutation({
      query: (args) => ({
        url: `/terms`,
        method: "POST",
        body:args.data,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),

    updatePrivacyPolicy: builder.mutation({
      query: (args) => ({
        url: `/terms/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useCreatePrivacyPolicyMutation,
  useUpdatePrivacyPolicyMutation,
} = orderApi;
