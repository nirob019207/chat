"use client";

import { useState } from "react";
import NotificationTable from "./NotificationTable";
import { useGetAllUserQuery } from "@/redux/features/user/user.api";
import Loading from "@/components/shared/Loading";
import SendNotificationModal from "./SendNotificationModal";

export default function NotificationIdx() {
  const [selectedTruckIds, setSelectedTruckIds] = useState<string[]>([]);
  const { data, isFetching } = useGetAllUserQuery([
    { name: "role", value: "DRIVER" },
  ]);

  // Example data
  const trucks = data?.data?.data;

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedTruckIds(selectedIds);
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 p-2 flex justify-end">
        <SendNotificationModal userId={selectedTruckIds} />
      </div>

      <NotificationTable
        trucks={trucks}
        currentPage={1}
        totalPages={1}
        onPageChange={(page) => console.log("Page changed to:", page)}
        onViewDetails={(id) => console.log("View details for:", id)}
        onTrack={(id) => console.log("Track:", id)}
        onChat={(id) => console.log("Chat with:", id)}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
}
