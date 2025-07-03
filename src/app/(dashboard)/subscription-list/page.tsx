/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { MoreVertical, MessageCircle } from "lucide-react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/tables/Pagination";
import { useDeleteSubscriptionsMutation, useGetAllSubscriptionsQuery } from "@/redux/features/subscriptions/subscriptions.api";
import Loading from "@/components/shared/Loading";
import { format } from "date-fns";
import { toast } from "sonner";
import Link from "next/link";

interface IUser {
  fullName: string;
  email: string;
  profileImage: string;
}
interface ISubscripTionList {
  id: string;
  createdAt: string;
  user: IUser;
}

const ITEMS_PER_PAGE = 15;

export default function FoodTruckList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching } = useGetAllSubscriptionsQuery(undefined);
  const [deleteSubscriptions] = useDeleteSubscriptionsMutation()

  const handleDelete = async (id : string)=>{
    const toastId = toast.loading("deleting...");

    try {
      const res: any = await deleteSubscriptions(id);
      if (res?.data?.success) {
        toast.success("Deleted Successfully", { id: toastId });
      } else {
        toast.error(res?.error?.data?.message || "Failed to delete", {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to delete");
    }
  }

  const SubscripTionList: ISubscripTionList[] = data?.data;

  const totalPages = Math.ceil(SubscripTionList?.length / ITEMS_PER_PAGE);

  const currentItems = SubscripTionList?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isFetching) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Food Truck Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Chat</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems?.map((truck) => (
            <TableRow key={truck.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-8">
                    <Image
                      src={truck.user.profileImage || "/placeholder.svg"}
                      alt={truck.user.fullName}
                      className="rounded-full object-cover"
                      fill
                      sizes="32px"
                    />
                  </div>
                  {truck.user.fullName}
                </div>
              </TableCell>
              <TableCell>{truck.user.email}</TableCell>
              <TableCell>
                {format(new Date(truck.createdAt), "MMMM d, yyyy")}
              </TableCell>
              <TableCell>
                <Link href={'/message'}>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MessageCircle className="h-4 w-4" />
                  <span className="sr-only">Open chat</span>
                </Button>
                </Link>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <button onClick={()=> handleDelete(truck.id)}>
                        Delete
                      </button>
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
        onPageChange={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
