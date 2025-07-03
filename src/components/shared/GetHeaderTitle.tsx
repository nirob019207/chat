"use client"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/redux/hooks"
import { seletLanguage } from "@/redux/features/dashboard/dashboardSlice"

// Define language type to fix TypeScript error
type Language = "Eng" | "Spa"

// Translation mapping for all page titles
const translations = {
  titles: {
    dashboard: {
      Eng: "Dashboard",
      Spa: "Panel de control",
    },
    foodProvider: {
      Eng: "Food Provider",
      Spa: "Proveedor de comida",
    },
    subscriberList: {
      Eng: "Subscriber list",
      Spa: "Lista de suscriptores",
    },
    subscriptionOffer: {
      Eng: "Subscription Offer",
      Spa: "Oferta de suscripción",
    },
    message: {
      Eng: "Message",
      Spa: "Mensaje",
    },
    notification: {
      Eng: "Notification",
      Spa: "Notificación",
    },
  },
}

const GetHeaderTitle = () => {
  const [title, setTitle] = useState("")
  const pathname = usePathname()
  const reduxLanguage = useAppSelector(seletLanguage)

  // Safely get the language with type assertion
  const language = (reduxLanguage || "Eng") as Language

  // Set the title based on the current route and selected language
  useEffect(() => {
    switch (pathname) {
      case "/":
        setTitle(translations.titles.dashboard[language])
        break
      case "/food-buses":
        setTitle(translations.titles.foodProvider[language])
        break
      case "/food-buses-details":
        setTitle(translations.titles.foodProvider[language])
        break
      case "/subscription-list":
        setTitle(translations.titles.subscriberList[language])
        break
      case "/subscription-Offer":
        setTitle(translations.titles.subscriptionOffer[language])
        break
      case "/message":
        setTitle(translations.titles.message[language])
        break
      case "/notification":
        setTitle(translations.titles.notification[language])
        break
      default:
        setTitle('')
        break
    }
  }, [pathname, language]) // Added language as a dependency to update when language changes

  return <div className="text-[#1C1A3C] lg:text-[22px] font-semibold leading-normal">{title}</div>
}

export default GetHeaderTitle

