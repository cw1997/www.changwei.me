import type {StaticImageData} from "next/image"

export type FriendlyLinkItem = {
  icon?: StaticImageData | string
  name: string
  url: string
}

export function getFriendlyLinkItems(locale: string): FriendlyLinkItem[] {
  const isEn = locale === "en-US"
  const isHant = locale === "zh-Hant"

  return [
    {
      icon: undefined,
      name: isEn
        ? "www.mooc.edu.rs (Massive Open Online Courses)"
        : isHant
          ? "www.mooc.edu.rs（大規模開放線上課程）"
          : "www.mooc.edu.rs（大规模开放式在线课程）",
      url: "https://www.mooc.edu.rs/",
    },
    {
      icon: undefined,
      name: isEn ? "Mubiao.org" : isHant ? "目標網" : "目标网",
      url: "https://www.mubiao.org/",
    },
    {
      icon: undefined,
      name: "Jiawei Du",
      url: "https://www.jiaweidu.top/",
    },
    {
      icon: "https://imuslab.com/favicon.png",
      name: isEn
        ? "imuslab — Toby's maker lab"
        : isHant
          ? "imuslab - 托比的創客實驗室"
          : "imuslab - 托比的创客实验室",
      url: "https://imuslab.com/",
    },
  ]
}
