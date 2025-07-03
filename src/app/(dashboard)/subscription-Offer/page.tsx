import SubscriptionOfferCard from "@/components/dashboard/modules/subscriptionOffer/SubscriptionOfferCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

function SubscriptionOffer() {
  return (
    <div className="p-4 sm:p-6 md:p-8 mb-10 lg:p-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:pb-10">

        <Link href={"/subscription-Offer/add-subscription-offer"}>
          <Button className="rounded-[8px] bg-[#0D834A] w-full md:w-fit flex items-center justify-center gap-[12px] p-[12px_16px]">
            <FaPlus /> Add New
          </Button>
        </Link>
      </div>

      <SubscriptionOfferCard />
    </div>
  );
}

export default SubscriptionOffer;
