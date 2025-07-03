import baseApi from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/global.type";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/categories",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Category"],
    }),

    createCAtegory: builder.mutation({
      query: (data) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useCreateCAtegoryMutation,useDeleteCategoryMutation } = userApi;
