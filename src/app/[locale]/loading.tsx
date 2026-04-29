import {Loader2} from "lucide-react"

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-600">
      <Loader2 className="h-12 w-12 animate-spin" />
      <div className="text-lg">Loading...</div>
    </div>
  )
}