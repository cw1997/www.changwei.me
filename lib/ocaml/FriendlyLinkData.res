type item = {
  icon: option<string>,
  name: string,
  url: string,
}

type t = {items: array<item>}

let data: t = {
  items: [
    {
      icon: None,
      name: "www. M(assive) O(pen) O(nline) C(ourses) .edu.rs",
      url: "https://www.mooc.edu.rs/",
    },
    {
      icon: None,
      name: "目标网",
      url: "https://www.mubiao.org/",
    },
    {
      icon: None,
      name: "Jiawei Du",
      url: "https://www.jiaweidu.top/",
    },
    {
      icon: Some("https://imuslab.com/favicon.png"),
      name: "imuslab - 托比的創客實驗室",
      url: "https://imuslab.com/",
    },
  ],
}
