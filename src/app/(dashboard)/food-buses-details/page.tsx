import FoodBusesDetailsTable from "@/components/tables/FoodBusesDetailsTable";
import FoodBusesMetaDetails from "@/components/tables/FoodBusesMetaDetails";

export default function FoodBusesDetails() {
  return (
    <div className="p-6 space-y-8">
      <FoodBusesMetaDetails />

      <FoodBusesDetailsTable />
    </div>
  );
}
