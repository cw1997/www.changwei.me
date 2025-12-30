@react.component
let make = () => {
  let year = Date.make()->Date.getFullYear->Int.toString
  let styles = %raw(`require("./Footer.module.sass")`)
  let nextLogo = %raw(`require("@/assets/images/logo/frontend/next.svg")`)
  let vercelLogo = %raw(`require("@/assets/images/logo/frontend/vercel.svg")`)
  let cloudflareLogo = %raw(`require("@/assets/images/logo/Cloudflare_Logo.svg")`)
  let marginTopStyle = %raw(`{marginTop: 8}`)

  <footer className={styles["container"]}>
    <div className={styles["content"]}>
      <div className={styles["text"]}>
        <p className={styles["copyright"]}>
          {React.string("© " ++ year ++ ", Chang Wei, All rights reserved.")}
          <br />
          {React.string("© " ++ year ++ ", 昌维 版权所有.")}
        </p>
        <div className={styles["nerd_info"]}>
          <p>
            <AntdIcons.CodeOutlined />
            {React.string(" Source code [")}
            <OutsideLink href="https://github.com/cw1997/www.changwei.me">
              {React.string("cw1997/www.changwei.me")}
            </OutsideLink>
            {React.string("] is under ")}
            <OutsideLink href="https://www.apache.org/licenses/LICENSE-2.0">
              {React.string("Apache License, Version 2.0 (Apache 2.0)")}
            </OutsideLink>
          </p>
          <p className={styles["copyright_github"]}>
            <AntdIcons.GithubOutlined />
            {React.string(" GitHub Repository: ")}
            <OutsideLink href="https://github.com/cw1997/www.changwei.me" />
          </p>
          <div style={marginTopStyle}>
            <div>
              <Antd.Space wrap={true}>
                <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/cw1997/www.changwei.me" />
                <img alt="GitHub Repo watchers" src="https://img.shields.io/github/watchers/cw1997/www.changwei.me" />
                <img alt="GitHub Repo forks" src="https://img.shields.io/github/forks/cw1997/www.changwei.me" />
                <img alt="GitHub branch status" src="https://img.shields.io/github/checks-status/cw1997/www.changwei.me/main" />
                <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/cw1997/www.changwei.me?style=flat" />
                <img alt="GitHub Created At" src="https://img.shields.io/github/created-at/cw1997/www.changwei.me" />
                <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/cw1997/www.changwei.me" />
              </Antd.Space>
            </div>
            <div>
              <Antd.Space wrap={true}>
                <img alt="GitHub followers" src="https://img.shields.io/github/followers/cw1997" />
                <img alt="GitHub User's stars" src="https://img.shields.io/github/stars/cw1997" />
                <img alt="X (formerly Twitter) Follow" src="https://img.shields.io/twitter/follow/changwei1006" />
              </Antd.Space>
            </div>
          </div>
        </div>
      </div>
      <Antd.Divider />
      <div className={styles["powered_by"]}>
        <Antd.Space 
          align="center"
          className={styles["powered_by_list"]}
          separator={<Antd.Divider orientation="vertical" />}
          wrap={true}
        >
          <div className={styles["powered_by_item"]}>
            {React.string("Powered by")}
            <OutsideLink className={styles["logo"]} href="https://nextjs.org/">
              <Next.Image 
                src={nextLogo}
                alt="NextJS Logo"
                className={styles["logo_img"]}
                height={16}
                priority={true}
              />
            </OutsideLink>
          </div>
          <div className={styles["powered_by_item"]}>
            {React.string("Hosted on")}
            <OutsideLink className={styles["logo"]} href="https://vercel.com">
              <Next.Image 
                src={vercelLogo}
                alt="Vercel Logo"
                className={styles["logo_img"]}
                height={16}
                priority={true}
              />
            </OutsideLink>
          </div>
          <div className={styles["powered_by_item"]}>
            {React.string("CDN:")}
            <OutsideLink className={styles["logo"]} href="https://cloudflare.com">
              <Next.Image 
                src={cloudflareLogo}
                alt="CloudFlare Logo"
                className={styles["logo_img"]}
                height={32}
                priority={true}
              />
            </OutsideLink>
          </div>
        </Antd.Space>
      </div>
    </div>
  </footer>
}
