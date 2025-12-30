@react.component
let make = () => {
  let logoImage = %raw(`require("@/assets/images/changwei-logo.svg")`)
  let styles = %raw(`require("./Header.module.sass")`)
  let spanStyle = %raw(`{fontSize: 14, lineHeight: 1, color: "#8c8c8c"}`)
  
  <header className={styles["container"]}>
    <div className={styles["main"]}>
      <div>
        <Antd.Space align="center">
          <Next.Link href="/">
            <div className={styles["logo"]}>
              <Next.Image src={logoImage["src"]} width={48} height={48} alt="" />
            </div>
          </Next.Link>
          <div className={styles["split"]} />
          <Next.Link href="/">
            <div className={styles["title"]}>
              {React.string("昌维的网站 / 昌維的網站")}
              <br />
              {React.string("Chang Wei's website")}
              <br />
              <span style={spanStyle}>
                {React.string("www.changwei.me")}
              </span>
            </div>
          </Next.Link>
        </Antd.Space>
      </div>
      <div>
        <HeaderMenu />
      </div>
    </div>
  </header>
}
