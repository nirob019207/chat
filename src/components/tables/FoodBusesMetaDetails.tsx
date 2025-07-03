"use client";
import { useGetAllOrderQuery } from "@/redux/features/order/order.api";
import Loading from "../shared/Loading";
import { useAppSelector } from "@/redux/hooks";
import { seletLanguage } from "@/redux/features/dashboard/dashboardSlice";

// Define language type to fix TypeScript error
type Language = "Eng" | "Spa";

// Translation mapping for all text in the component
const translations = {
  labels: {
    totalOrder: {
      Eng: "Total Order",
      Spa: "Pedidos Totales",
    },
    totalSales: {
      Eng: "Total Sales",
      Spa: "Ventas Totales",
    },
    cancelOrder: {
      Eng: "Cancel order",
      Spa: "Pedidos Cancelados",
    },
  },
  loading: {
    Eng: "Loading...",
    Spa: "Cargando...",
  },
};

const FoodBusesMetaDetails = () => {
  const { data, isFetching } = useGetAllOrderQuery(undefined);
  const reduxLanguage = useAppSelector(seletLanguage);

  const language = (reduxLanguage || "Eng") as Language;

  const details = data?.data?.metaData;
console.log(details);
  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col p-[20px] justify-center pl-10 gap-2 rounded-[8px] bg-white shadow-[4px_10px_10px_0px_rgba(13,131,74,0.03)] flex-1">
        <p className="text-[#817F9B] text-[16px] font-medium leading-[24px]">
          {translations.labels.totalOrder[language]} 
        </p>
        <p className="text-[#1C1A3C] text-[32px] font-extrabold leading-normal">
          {details?.totalOrders} 
        </p>
      </div>
      <div className="flex flex-col p-[20px] justify-center pl-10 gap-2 rounded-[8px] bg-white shadow-[4px_10px_10px_0px_rgba(13,131,74,0.03)] flex-1">
        <p className="text-[#817F9B] text-[16px] font-medium leading-[24px]">
          {translations.labels.totalSales[language]}
        </p>
        <p className="text-[#1C1A3C] text-[32px] font-extrabold leading-normal">
          {details?.totalPrice}
        </p>
      </div>
      <div className="flex flex-col p-[20px] justify-center pl-10 gap-2 rounded-[8px] bg-white shadow-[4px_10px_10px_0px_rgba(13,131,74,0.03)] flex-1">
        <p className="text-[#ED0027] text-[16px] font-medium leading-[24px]">
          {translations.labels.cancelOrder[language]}
        </p>
        <p className="text-[#ED0027] text-[32px] font-extrabold leading-normal">
          {details?.totalCancelledOrders}
        </p>
      </div>
    </div>
  );
};

export default FoodBusesMetaDetails;
