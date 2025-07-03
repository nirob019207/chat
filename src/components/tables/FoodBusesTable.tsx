"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageCircle, MoreVertical } from "lucide-react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Pagination from "./Pagination";
import { format } from "date-fns";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/redux/features/user/user.api";
import { toast } from "sonner";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RiSendPlaneFill } from "react-icons/ri";
import { cn } from "@/lib/utils";

interface FoodTruck {
  id: string;
  fullName: string;
  profileImage: string;
  email: string;
  createdAt: string;
  isOnline: boolean;
  lon: number;
  lat: number;
  isAllowed: boolean;
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
}

export default function FoodTruckTable({
  trucks,
  currentPage,
  totalPages,
  onPageChange,
}: FoodTruckTableProps) {
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("deleting...");

    try {
      const res: any = await deleteUser(id);
      if (res?.data?.success) {
        toast.success("Deleted Successfully", { id: toastId });

        setTimeout(() => {
          window.location.reload();
        }, 0);
      } else {
        toast.error(res?.error?.data?.message || "Failed to delete", {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to delete");
    }
  };

  const handleSubcription = async (data: any) => {
    const toastId = toast.loading("Updating...");

    let booleanData;

    if (data.value === "true") {
      booleanData = true;
    } else if (data.value === "false") {
      booleanData = false;
    }

    const isAllowedData = {
      isAllowed: booleanData,
    };

    const updatableData = {
      id: data.id,
      data: isAllowedData,
    };

    console.log(updatableData);

    try {
      const res: any = await updateUser(updatableData);
      if (res?.data?.success) {
        toast.success("Updated Successfully", { id: toastId });

        setTimeout(() => {
          window.location.reload();
        }, 0);
      } else {
        toast.error(res?.error?.data?.message || "Failed to Updated", {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Updated");
    }
  };

  // console.log(trucks);
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Food Truck Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Join date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Free Subscription</TableHead>
            <TableHead>Track</TableHead>
            <TableHead>Chat</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trucks?.map((truck) => (
            <TableRow key={truck.id} className=" hover:bg-primary/15">
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
              <TableCell>
                {format(new Date(truck.createdAt), "MMMM d, yyyy")}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    truck.isOnline === true
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {truck.isOnline === true ? "● Online" : "● Offline"}
                </span>
              </TableCell>
              <TableCell>
                <Select
                  value={truck.isAllowed ? "true" : "false"}
                  onValueChange={(value) =>
                    handleSubcription({ value, id: truck.id })
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "w-[130px]",
                      truck.isAllowed
                        ? "border-green-200 bg-green-100"
                        : "border-red-200 bg-red-100"
                    )}
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Activate</SelectItem>
                    <SelectItem value="false">Deactivate</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Link
                  href={`https://www.google.com/maps?q=${truck.lat},${truck.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon">
                    <RiSendPlaneFill className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={"/message"}>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(truck.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
