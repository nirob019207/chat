"use client";
import Image from "next/image";
import GetHeaderTitle from "./GetHeaderTitle";
// import { IoIosNotificationsOutline } from "react-icons/io";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { FaRegUser } from "react-icons/fa6";

function Header() {
  const { data } = useGetMeQuery(undefined);

  return (
    <header className="sticky top-0 z-40  bg-[#ffffff] px-4 h-16 flex items-center justify-between">
      {/* <div className="md:hidden w-6" /> */}
      {/* Spacer for mobile */}
      <div className="flex items-center gap-2 pl-12 lg:pl-0">
        <h1 className="text-lg font-semibold">
          <GetHeaderTitle />
        </h1>
      </div>
      <div className="flex items-center">
        <div className="flex gap-3 items-center ">
          {/* <div className="relative">
            <IoIosNotificationsOutline className="h-10 w-10 text-[#817f9b]" />
            <span className="absolute top-1.5 right-1.5 bg-primary text-white rounded-full w-3 h-3 flex items-center justify-center text-xs"></span>
          </div> */}

          <div className="text-sm text-right">
            <div className="font-medium">{data?.data?.fullName}</div>
            <div className="text-muted-foreground text-xs">
              {data?.data?.role}
            </div>
          </div>

          {data?.data?.profileImage ? (
            <Image
              height={50}
              width={50}
              src={data?.data?.profileImage}
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="h-8 w-8 rounded-full">
              <FaRegUser className="text-3xl text-primary " />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
