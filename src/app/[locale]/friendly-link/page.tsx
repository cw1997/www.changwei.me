import {ExternalLink} from "lucide-react"

import {OutsideLink} from "@/components/OutsideLink"
import {getLocale, getTranslations} from "next-intl/server"

import {getFriendlyLinkItems} from "./data"
import {Separator} from "@/components/ui/separator"

export interface IPropsFriendlyLinkPage {}

export default async function FriendlyLinkPage() {
  const t = await getTranslations("friendlyLink")
  const locale = await getLocale()
  const items = getFriendlyLinkItems(locale)

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">{t("title")}</h2>
      <Separator />
      <ul className="space-y-3 pl-6 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item.name} className="flex flex-wrap items-center gap-2">
            <img
              className="h-4 w-4 object-contain"
              src={typeof item.icon === "string" ? item.icon : (item.icon?.src ?? `https://s2.googleusercontent.com/s2/favicons?domain_url=${item.url}`)}
              alt={item.name}
              width={16}
              height={16}
              loading="lazy"
              decoding="async"
            />
            <span className="font-medium text-slate-900">{item.name}</span>
            <span className="text-slate-400">-</span>
            <span className="inline-flex items-center gap-1">
              <OutsideLink href={item.url} />
              <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}
