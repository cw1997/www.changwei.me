import type {StaticImageData} from "next/image"

export const data: {
  items: {
    id: "mooc" | "mubiao" | "jiawei" | "imuslab"
    icon?: StaticImageData | string
    url: string
  }[]
} = {
  items: [
    {
      id: "mooc",
      icon: undefined,
      url: "https://www.mooc.edu.rs/",
    },
    {
      id: "mubiao",
      icon: undefined,
      url: "https://www.mubiao.org/",
    },
    {
      id: "jiawei",
      icon: undefined,
      url: "https://www.jiaweidu.top/",
    },
    {
      id: "imuslab",
      icon: "https://imuslab.com/favicon.png",
      url: "https://imuslab.com/",
    },
  ],
} as const
