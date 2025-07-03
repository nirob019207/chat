"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { Button } from "../ui/button";
import NavLink from "./NavLink";
import logo from "@/assets/logo.png";
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlinePolicy,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { IoBusSharp, IoNotifications } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  seletLanguage,
  setLanguage,
} from "@/redux/features/dashboard/dashboardSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/utils/cookies";
// Define language type to fix TypeScript error
type Language = "Eng" | "Spa";

// Translation mapping for all text in the sidebar
const translations = {
  management: {
    Eng: "MANAGEMENT",
    Spa: "ADMINISTRACIÓN",
  },
  navLinks: [
    {
      icon: <MdOutlineDashboard />,
      href: "/",
      label: {
        Eng: "Dashboard",
        Spa: "Panel de control",
      },
    },
    {
      icon: <IoBusSharp />,
      href: "/food-buses",
      label: {
        Eng: "Food Buses",
        Spa: "Autobuses de comida",
      },
    },
    {
      icon: <IoBusSharp />,
      href: "/food-buses-details",
      label: {
        Eng: "Food Buses Details",
        Spa: "Detalles de autobuses de comida",
      },
    },
    {
      icon: <MdOutlineCategory />,
      href: "/food-categories",
      label: {
        Eng: "Food Categories",
        Spa: "Categorías de alimentos",
      },
    },
    {
      icon: <HiUserGroup />,
      href: "/subscription-list",
      label: {
        Eng: "Subscription List",
        Spa: "Lista de suscripciones",
      },
    },
    {
      icon: <MdOutlineWorkspacePremium />,
      href: "/subscription-Offer",
      label: {
        Eng: "Subscription Offer",
        Spa: "Oferta de suscripción",
      },
    },
    {
      icon: <LuMessageCircleMore />,
      href: "/message",
      label: {
        Eng: "Message",
        Spa: "Mensaje",
      },
    },
    {
      icon: <IoNotifications />,
      href: "/notification",
      label: {
        Eng: "Notification",
        Spa: "Notificación",
      },
    },
    {
      icon: <MdOutlinePolicy />,
      href: "/privacy-policy",
      label: {
        Eng: "Privacy Policy",
        Spa: "Política de privacidad",
      },
    },
  ],
  language: {
    Eng: "English",
    Spa: "Español",
  },
  logout: {
    Eng: "Logout",
    Spa: "Cerrar sesión",
  },
};

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const reduxLanguage = useAppSelector(seletLanguage);
  const router = useRouter();
  // Get language from localStorage or use default
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;

      // If there's a saved language and it's different from Redux state
      if (savedLanguage && savedLanguage !== reduxLanguage) {
        dispatch(setLanguage(savedLanguage));
      }
      // If no saved language but Redux has a value, save it
      else if (!savedLanguage && reduxLanguage) {
        localStorage.setItem("language", reduxLanguage);
      }
      // If neither exists, set default
      else if (!savedLanguage && !reduxLanguage) {
        localStorage.setItem("language", "Eng");
        dispatch(setLanguage("Eng"));
      }
    }
  }, [dispatch, reduxLanguage]);

  // Safely get the language with type assertion
  const language = (reduxLanguage || "Eng") as Language;

  // Handle language change
  const handleLanguageChange = (value: string) => {
    const newLanguage = value as Language;
    localStorage.setItem("language", newLanguage);
    dispatch(setLanguage(newLanguage));
  };
  const handleLogout = () => {
    dispatch(logout());
    removeCookie("token");
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full bg-white px-5">
      <div className="pr-6 pb-6 pt-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            height={40}
            width={200}
            src={logo || "/placeholder.svg"}
            alt="Logo"
            className="h-auto w-auto"
          />
        </Link>
      </div>
      <nav className="flex flex-col justify-between h-full mb-10">
        <div className="flex-1 flex flex-col gap-4 pb-4">
          <h4 className="text-[#817F9B] text-[16px] mb-3 font-normal leading-[15px]">
            {translations.management[language]}
          </h4>
          <div className="flex flex-col gap-1">
            {translations.navLinks.map((link, index) => (
              <NavLink key={index} icon={link.icon} href={link.href}>
                <span>{link.label[language]}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Select
            onValueChange={handleLanguageChange}
            defaultValue={language}
            value={language}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Eng">{translations.language.Eng}</SelectItem>
                <SelectItem value="Spa">{translations.language.Spa}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            onClick={handleLogout}
            className="flex items-center justify-start text-[#D00E11] w-[216px] p-[14px_16px] gap-2 rounded-[8px] dark:bg-[#fbe7e8] bg-[#fbe7e8]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M8.33325 2.5L4.25456 4.53934C3.68992 4.82167 3.33325 5.39877 3.33325 6.03006V13.9699C3.33325 14.6013 3.68992 15.1783 4.25456 15.4607L8.33325 17.5"
                stroke="#D00E11"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.5833 7.91699L16.6666 10.0003L14.5833 12.0837M8.33325 10.0003H16.1593"
                stroke="#D00E11"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[#D00E11]">{translations.logout[language]}</p>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
