"use client"

import {OutsideLink} from "@/components/OutsideLink"
import type {Locale} from "@/i18n/routing"
import {
  Clock,
  Link,
  MapPin,
  Tags,
} from "lucide-react"
import {useLocale, useTranslations} from "next-intl"
import React from "react"

import {getExperienceData} from "./buildExperienceData"
import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"

export interface IPropsExperienceSection {}

export const ExperienceSection: React.FunctionComponent<
  IPropsExperienceSection
> = () => {
  const locale = useLocale() as Locale
  const t = useTranslations("sections")
  const tExperience = useTranslations("experience")
  const data = getExperienceData(locale, tExperience)

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">{t("experience")}</h2>
      <div className="space-y-8">
        {data.map((category) => (
          <div key={category.category_key} className="space-y-4">
            <h3 className="text-lg font-medium text-slate-600">{t(category.category_key)}</h3>
            <div className="space-y-6">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row"
                >
                  <div className="shrink-0">
                    <img
                      className="h-16 w-auto transition hover:scale-105"
                      src={item.icon.src}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="text-lg font-semibold text-slate-900">
                      {item.organization}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-slate-700">
                      <div>{item.name}</div>
                      <Separator orientation="vertical" className="h-4" />
                      <div>
                        {item.department_url ? (
                          <OutsideLink href={item.department_url}>
                            {item.department}
                          </OutsideLink>
                        ) : (
                          item.department
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Link className="h-3.5 w-3.5" />
                      <OutsideLink href={item.organization_url} />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {item.time_range.start} ~ {item.time_range.end}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {item.location}
                      </span>
                    </div>
                    {item.note && (
                      <div className="text-sm text-slate-600">{item.note}</div>
                    )}
                    {(item.tags?.length ?? 0) > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                        <Tags className="h-3.5 w-3.5 text-slate-500" />
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
