import AddSubscriptioniForm from "@/components/dashboard/modules/subscriptionOffer/AddSubscriptioniForm";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <Link href={"/subscription-Offer"}>
        <button className="rounded-[8px] bg-[#0D834A] text-white px-8 py-2 mb-8">
          Back
        </button>
      </Link>
      <AddSubscriptioniForm />
    </div>
  );
};

export default page;
