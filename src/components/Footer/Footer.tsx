"use client"

import React from "react"
import Image from "next/image"
import {Code, GitBranch} from "lucide-react"

import {OutsideLink} from "@/components/OutsideLink"
import next_logo from "@/assets/images/logo/frontend/next.svg"
import vercel_logo from "@/assets/images/logo/frontend/vercel.svg"
import cloudflare_logo from "@/assets/images/logo/Cloudflare_Logo.svg"
import tidb_cloud_logo from "@/assets/images/logo/database/TiDBCloud_Logo.png"
import {useTranslations} from "next-intl"

import {Separator} from "@/components/ui/separator"

export interface IPropsFooter {}

export const Footer: React.FunctionComponent<IPropsFooter> = () => {
  const year = new Date().getFullYear()
  const t = useTranslations("footer")

  return (
    <footer className="mt-16 w-full border-t border-slate-200 bg-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-slate-600">
        <div>
          <p className="text-slate-700">{t("copyright", {year})}</p>
          <div className="mt-3 space-y-2">
            <p className="flex flex-wrap items-center gap-2">
              <Code className="h-4 w-4" /> {t("sourceCode")} [
              <OutsideLink href={"https://github.com/cw1997/www.changwei.me"}>
                cw1997/www.changwei.me
              </OutsideLink>
              ] {t("isUnder")} {" "}
              <OutsideLink href={"https://www.apache.org/licenses/LICENSE-2.0"}>
                Apache License, Version 2.0 (Apache 2.0)
              </OutsideLink>
            </p>
            <p className="flex flex-wrap items-center gap-2">
              <GitBranch className="h-4 w-4" /> {t("githubRepo")} {" "}
              <OutsideLink href={"https://github.com/cw1997/www.changwei.me"} />
            </p>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/cw1997/www.changwei.me" loading="lazy" decoding="async" />
                <img alt="GitHub Repo watchers" src="https://img.shields.io/github/watchers/cw1997/www.changwei.me" loading="lazy" decoding="async" />
                <img alt="GitHub Repo forks" src="https://img.shields.io/github/forks/cw1997/www.changwei.me" loading="lazy" decoding="async" />
                <img alt="GitHub branch status" src="https://img.shields.io/github/checks-status/cw1997/www.changwei.me/main" loading="lazy" decoding="async" />
                <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/cw1997/www.changwei.me?style=flat" loading="lazy" decoding="async" />
                <img alt="GitHub Created At" src="https://img.shields.io/github/created-at/cw1997/www.changwei.me" loading="lazy" decoding="async" />
                <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/cw1997/www.changwei.me" loading="lazy" decoding="async" />
              </div>
              <div className="flex flex-wrap gap-2">
                <img alt="GitHub followers" src="https://img.shields.io/github/followers/cw1997" loading="lazy" decoding="async" />
                <img alt="GitHub User's stars" src="https://img.shields.io/github/stars/cw1997" loading="lazy" decoding="async" />
                <img alt="X (formerly Twitter) Follow" src="https://img.shields.io/twitter/follow/changwei1006" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            {t("poweredBy")}
            <OutsideLink
              className="rounded-lg border border-transparent px-2 py-1 transition hover:border-slate-200"
              href={"https://nextjs.org/"}
            >
              <Image src={next_logo} alt="NextJS Logo" width={64} height={16} />
            </OutsideLink>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            {t("hostedOn")}
            <OutsideLink
              className="rounded-lg border border-transparent px-2 py-1 transition hover:border-slate-200"
              href={"https://vercel.com"}
            >
              <Image src={vercel_logo} alt="Vercel Logo" width={64} height={16} />
            </OutsideLink>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            {t("cdn")}
            <OutsideLink
              className="rounded-lg border border-transparent px-2 py-1 transition hover:border-slate-200"
              href={"https://cloudflare.com"}
            >
              <Image src={cloudflare_logo} alt="CloudFlare Logo" width={96} height={32} />
            </OutsideLink>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-2">
            {t("database")}
            <OutsideLink
              className="rounded-lg border border-transparent px-2 py-1 transition hover:border-slate-200"
              href={"https://tidbcloud.com"}
            >
              <Image src={tidb_cloud_logo} alt="TiDB Cloud Logo" width={96} height={32} />
            </OutsideLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
