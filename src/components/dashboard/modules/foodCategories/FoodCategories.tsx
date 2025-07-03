/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import Loading from "@/components/shared/Loading";
import {
  useCreateCAtegoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/features/foodCategories/foodCategories.api";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import DeleteModal from "../../common/DeleteModal";

const FoodCategories = () => {
  const { data, isFetching } = useGetAllCategoriesQuery(undefined);

  const [createCategory] = useCreateCAtegoryMutation();

  console.log(data?.data);

  // handle add category
  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Adding...");

    try {
      const res: any = await createCategory(data);
      if (res?.data?.success) {
        toast.success("Added Successfully", { id: toastId });
      } else {
        toast.error(res?.error?.data?.message || "Failed to Added", {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Added");
    }
  };

  if (isFetching) {
    return <Loading />;
  }
  return (
    <div className="bg-white p-7">
      <div className="md:w-1/2 space-y-5">
        <h3 className="md:text-2xl text-xl font-semibold">Add Food Category</h3>
        <MyFormWrapper onSubmit={handleSubmit}>
          <div className="flex gap-5 w-full">
            <div className="">
              <button className="bg-primary px-8 py-2 text-white rounded-lg">
                Add
              </button>
            </div>
            <MyFormInput name="title" className="w-full" />
          </div>
        </MyFormWrapper>
      </div>

      <div className=" md:mt-12 mt-7">
        <h3 className="md:text-2xl text-xl font-semibold mb-4">All Categoris</h3>
        <div className="md:w-1/2 flex gap-7 flex-wrap">
          {data?.data?.map((item: any) => (
            <div key={item.id} className="relative">
              <div className="flex gap-1 items-center text-black  px-5 py-2  rounded-lg bg-primary/20">
                {item.title}
              </div>

              <div className="absolute -top-3 -right-3">
                <DeleteModal id={item.id} type="category" btn="icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodCategories;
