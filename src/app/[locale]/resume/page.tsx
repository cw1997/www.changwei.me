import {OutsideLink} from "@/components/OutsideLink"
import {url_resume_pdf_mirror, url_resume_pdf_release, url_resume_pdf_source} from "@/data"
import {getTranslations} from "next-intl/server"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {Download, Eye, GitBranch} from "lucide-react"

export interface IPropsResumePage {}

export default async function ResumePage() {
  const t = await getTranslations("resume")

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">{t("title")}</h2>
      <Separator />
      <div className="flex flex-wrap gap-3">
        <OutsideLink href={url_resume_pdf_mirror}>
          <Button>
            <Download className="h-4 w-4" />
            {t("download")}
          </Button>
        </OutsideLink>
        <OutsideLink href={url_resume_pdf_release}>
          <Button variant="secondary">
            <GitBranch className="h-4 w-4" />
            {t("downloadGithub")}
          </Button>
        </OutsideLink>
        <OutsideLink href={url_resume_pdf_source}>
          <Button variant="outline">
            <Eye className="h-4 w-4" />
            {t("viewSource")}
          </Button>
        </OutsideLink>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <iframe
          className="h-[800px] w-full"
          src={url_resume_pdf_mirror}
          title={t("title")}
          loading="lazy"
        />
      </div>
    </main>
  )
}
