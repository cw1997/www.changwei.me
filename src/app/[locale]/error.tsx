"use client"

import * as Sentry from "@sentry/nextjs"
import {Link} from "@/i18n/navigation"
import {useTranslations} from "next-intl"
import {useEffect} from "react"
import {Button, buttonVariants} from "@/components/ui/button"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  const t = useTranslations("error")

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <main className="relative mx-auto flex min-h-[60vh] w-full max-w-5xl items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_8%_10%,rgba(255,214,102,0.28)_0%,rgba(255,214,102,0)_42%),radial-gradient(circle_at_88%_16%,rgba(64,169,255,0.2)_0%,rgba(64,169,255,0)_40%),radial-gradient(circle_at_75%_88%,rgba(115,209,61,0.18)_0%,rgba(115,209,61,0)_36%),linear-gradient(145deg,rgba(255,255,255,0.85),rgba(245,250,255,0.92))]"
      />
      <section className="relative w-full max-w-2xl rounded-3xl border border-white/80 bg-white/90 p-6 shadow-2xl backdrop-blur">
        <p className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold tracking-wide text-amber-900">
          {t("badge")}
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">
          {t("title")}
        </h1>
        <p className="mt-3 text-base text-slate-600">{t("description")}</p>

        <div className="mt-5 rounded-2xl border border-blue-200/70 bg-gradient-to-br from-blue-50 to-lime-50 p-4">
          <p className="text-sm font-semibold text-blue-900">{t("memeTitle")}</p>
          <p className="mt-2 text-sm text-slate-700">
            {t("memeLine1")}
            <br />
            {t("memeLine2")}
          </p>
          <p className="mt-2 text-base text-slate-600">{t("memeFace")}</p>
        </div>

        {error.digest ? (
          <p className="mt-3 text-xs text-slate-500">
            {t("digestLabel")} {error.digest}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => reset()} type="button">
            {t("retry")}
          </Button>
          <Link className={buttonVariants({variant: "outline"})} href="/">
            {t("goHome")}
          </Link>
        </div>
      </section>
    </main>
  )
}
