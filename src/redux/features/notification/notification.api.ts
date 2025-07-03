import baseApi from "@/redux/api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.mutation({
      query: (data) => ({
        url: `/notifications/send-group`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useSendNotificationMutation} = notificationApi;
