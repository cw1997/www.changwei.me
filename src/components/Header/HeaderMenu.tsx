"use client"

import {Link, usePathname} from "@/i18n/navigation"
import {useTranslations} from "next-intl"
import React from "react"
import {Menu} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface IPropsHeader {}

export const HeaderMenu: React.FunctionComponent<IPropsHeader> = () => {
  const t = useTranslations("nav")

  const items = [
    {
      label: (<>{t("home")}<br />{t("homeSubtitle")}</>),
      url: "/" as const,
    },
    {
      label: (<>{t("portfolio")}<br />{t("portfolioSubtitle")}</>),
      url: "/portfolio" as const,
    },
    {
      label: (<>{t("guestbook")}<br />{t("guestbookSubtitle")}</>),
      url: "/guestbook" as const,
    },
    {
      label: (<>{t("friendlyLink")}<br />{t("friendlyLinkSubtitle")}</>),
      url: "/friendly-link" as const,
    },
    {
      label: (<>{t("resume")}<br />{t("resumeSubtitle")}</>),
      url: "/resume" as const,
    },
    {
      label: (<>{t("statistic")}<br />{t("statisticSubtitle")}</>),
      url: "/statistic" as const,
    },
  ]

  return (
    <>
      <HeaderMenuDesktop items={items} />
      <HeaderMenuMobile items={items} />
    </>
  )
}

type MenuItem = {
  label: React.ReactNode
  url: string
}

const HeaderMenuDesktop: React.FunctionComponent<{items: MenuItem[]}> = ({items}) => {
  const pathname = usePathname()
  return (
    <nav className="hidden items-center gap-4 lg:flex">
      {items.map((item) => {
        const is_current = item.url === "/" ? pathname === "/" : pathname?.startsWith(item.url)
        return (
          <Link
            key={item.url}
            href={item.url}
            className={`text-sm font-medium transition ${
              is_current ? "text-slate-900 underline" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

const HeaderMenuMobile: React.FunctionComponent<{items: MenuItem[]}> = ({items}) => {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {items.map((item) => (
            <DropdownMenuItem key={item.url} asChild>
              <Link href={item.url} className="flex w-full flex-col text-sm">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
