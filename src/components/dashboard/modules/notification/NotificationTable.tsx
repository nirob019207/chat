"use client";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

interface FoodTruck {
  id: string;
  fullName: string;
  profileImage: string;
  email: string;
  createdAt: string;
  status: "Online" | "Offline";
}

interface FoodTruckTableProps {
  trucks: FoodTruck[];
  onDelete?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onTrack?: (id: string) => void;
  onChat?: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export default function NotificationTable({
  trucks,
  onSelectionChange,
}: FoodTruckTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Handle individual truck selection
  const handleSelectTruck = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((truckId) => truckId !== id));
    }
  };

  // Handle "select all" functionality
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      const allIds = trucks.map((truck) => truck.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const areAllSelected =
    trucks?.length > 0 && selectedIds.length === trucks.length;

  useEffect(() => {
    onSelectionChange?.(selectedIds);
  }, [selectedIds, onSelectionChange]);

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <div className="flex items-center">
                <Checkbox
                  id="select-all"
                  checked={areAllSelected}
                  onCheckedChange={(checked) =>
                    handleSelectAll(checked === true)
                  }
                />
              </div>
            </TableHead>
            <TableHead> All User</TableHead>
            <TableHead>Email</TableHead>
            {/* <TableHead className="w-[100px]">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {trucks?.map((truck) => (
            <TableRow key={truck.id} className="hover:bg-primary/15">
              <TableCell>
                <Checkbox
                  id={`select-${truck.id}`}
                  checked={selectedIds.includes(truck.id)}
                  onCheckedChange={(checked) =>
                    handleSelectTruck(truck.id, checked === true)
                  }
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2 text-[#131D26] text-[12px] font-medium leading-[19.2px]">
                  <Image
                    src={truck.profileImage || "/placeholder.svg"}
                    alt={truck.fullName}
                    width={32}
                    height={32}
                    className="rounded-full h-8 w-8"
                  />
                  {truck.fullName}
                </div>
              </TableCell>
              <TableCell>{truck.email}</TableCell>
              {/* <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
