"use client"

import logo_image from "@/assets/images/changwei-logo.svg"
import {HeaderMenu} from "@/components/Header/HeaderMenu"
import {LanguageSwitcher} from "@/components/Header/LanguageSwitcher"
import Image from "next/image"
import {Link} from "@/i18n/navigation"
import {useLocale, useTranslations} from "next-intl"
import React from "react"

export interface IPropsHeader {}

export const Header: React.FunctionComponent<IPropsHeader> = () => {
  const t = useTranslations("header")
  const locale = useLocale()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="rounded-lg border border-transparent p-1 transition hover:border-slate-200"
          >
            <Image src={logo_image} width={48} height={48} alt={t("logoAlt")} />
          </Link>
          <div className="hidden h-10 w-px bg-slate-200 sm:block" aria-hidden />
          <Link href="/" className="min-w-0">
            <div className="min-w-0 text-sm font-medium text-slate-900 sm:text-base">
              {t("siteTitleLine1")}
              <br />
              {locale === "en-US" ? null : (
                <>
                  Chang Wei's website
                  <br />
                </>
              )}
              <span className="text-xs font-normal text-slate-500 sm:text-sm">
                {t("siteSubtitle")}
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <HeaderMenu />
          <div className="hidden h-8 w-px bg-slate-200 lg:block" aria-hidden />
          <div className="min-w-[120px] max-w-[180px]">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
