import type {StaticImageData} from "next/image"

export const data: {
  items: {
    icon?: StaticImageData|string
    name: string
    url: string
  }[]
} = {
  items: [
    {
      icon: undefined,
      name: "www. M(assive) O(pen) O(nline) C(ourses) .edu.rs",
      url: "https://www.mooc.edu.rs/",
    },
    {
      icon: undefined,
      name: "目标网",
      url: "https://www.mubiao.org/",
    },
    {
      icon: undefined,
      name: "Jiawei Du",
      url: "https://www.jiaweidu.top/",
    },
    {
      icon: "https://imuslab.com/favicon.png",
      name: "imuslab - 托比的創客實驗室",
      url: "https://imuslab.com/",
    },
  ],
} as const
