%%raw(`"use client"`)

type menuItem = {
  label: React.element,
  url: string,
}

let menuData = [
  {
    label: <>
      {React.string("Home")}
      <br />
      {React.string("(首页)")}
    </>,
    url: "/",
  },
  {
    label: <>
      {React.string("Portfolio")}
      <br />
      {React.string("(作品集)")}
    </>,
    url: "/portfolio",
  },
  {
    label: <>
      {React.string("Guestbook")}
      <br />
      {React.string("(留言板)")}
    </>,
    url: "/guestbook",
  },
  {
    label: <>
      {React.string("Friendly Link")}
      <br />
      {React.string("(友情链接)")}
    </>,
    url: "/friendly-link",
  },
  {
    label: <>
      {React.string("Resume")}
      <br />
      {React.string("(简历)")}
    </>,
    url: "/resume",
  },
]

module HeaderMenuDesktop = {
  @react.component
  let make = () => {
    let pathname = Next.usePathname()
    let styles = %raw(`require("./Header.module.sass")`)
    
    <Antd.Space align="center" className={styles["menu_desktop"]} separator={<Antd.Divider orientation="vertical" />}>
      {menuData
      ->Array.map(item => {
        let isCurrent = String.startsWith(pathname, item.url)
        let linkStyle = %raw(`function(isCurrent) { return {
          fontWeight: isCurrent ? "700" : "400",
          textDecoration: isCurrent ? "underline" : ""
        }}`)
        let target = String.startsWith(item.url, "http") ? "_blank" : ""
        let rel = String.startsWith(item.url, "http") ? "noopener noreferrer" : ""
        
        <Next.Link 
          key={item.url}
          href={item.url}
          className={styles["menu_item"]}
          style={linkStyle(isCurrent)}
          target
          rel
        >
          {item.label}
        </Next.Link>
      })
      ->React.array}
    </Antd.Space>
  }
}

module HeaderMenuMobile = {
  @react.component
  let make = () => {
    let styles = %raw(`require("./Header.module.sass")`)
    let theme = %raw(`{
      components: {
        Dropdown: {
          paddingBlock: 8,
          fontSize: 16
        }
      }
    }`)
    let dropdownStyles = %raw(`{root: {zIndex: 99999}}`)
    let menuItems = menuData->Array.map(item => {
      {
        "key": item.url,
        "label": <Next.Link key={item.url} href={item.url} className={styles["menu_item"]}>
          {item.label}
        </Next.Link>
      }
    })
    
    <Antd.ConfigProvider theme>
      <div className={styles["menu_mobile"]}>
        <Antd.Dropdown 
          menu={{"items": menuItems}}
          styles={dropdownStyles}
          trigger={["click"]}
        >
          <Antd.Button icon={<AntdIcons.MenuOutlined />} size="large" />
        </Antd.Dropdown>
      </div>
    </Antd.ConfigProvider>
  }
}

@react.component
let make = () => {
  <>
    <HeaderMenuDesktop />
    <HeaderMenuMobile />
  </>
}
