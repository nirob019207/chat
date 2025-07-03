/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useGetAllOfferedSubscriptionsQuery } from "@/redux/features/subscriptions/subscriptions.api";
import Loading from "@/components/shared/Loading";
import DeleteModal from "../../common/DeleteModal";

const SubscriptionOfferCard = () => {
  const { data, isFetching } = useGetAllOfferedSubscriptionsQuery(undefined);

  if (isFetching) {
    return <Loading />;
  }
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 md:gap-20 gap-3 ">
      {data?.data.map((item: any) => (
        <div
          key={item.id}
          className="w-full  p-6 bg-white rounded-2xl shadow-sm md:mx-0 mx-auto"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-xl text-black text-center text-[24px] font-bold leading-[150%]">
                  {item.title}
                </h2>
              </div>
            </div>
            <div className="py-4 px-6 rounded-[12px] border border-[#EEE] bg-[#FAFAFA] flex flex-col items-start gap-[16px] p-[20px_8px] self-stretch">
              <div className="flex items-center w-full justify-center gap-2">
                <span className="text-lg font-medium">CRAVEIT</span>
                <div className="text-white px-2 py-1 rounded-xl bg-primary hover:bg-primatext-primary/90">
                  Premium
                </div>
              </div>
              <div className="text-center w-full">
                <span className="text-4xl font-bold">${item?.price}</span>
                <span className="text-gray-500">/ {item?.duration === 7 ? 'week' : item?.duration === 30 ? 'month' : 'year'}</span>
              </div>

              <div className="space-y-4 w-full">
                {item?.description.map((tag: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <span className="text-[#212121] text-[15px] font-semibold leading-[160%] tracking-[0.2px]">
                       {tag}
                      </span>
                    </div>
                  </div>
                ))}

                <Separator className="" />
                <div className="space-y-3">
                  <Button className="w-full bg-primary text-white hover:bg-primatext-primary/90">
                    Get Premium
                  </Button>
                  <Button variant="outline" className="w-full">
                    I&apos;ll do it later
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full">

              <DeleteModal id={item.id} type="subscriptionOffer"/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionOfferCard;
