import React from "react"
import {Space, Tooltip} from "antd"

import html5_logo from "@/assets/images/logo/frontend/html5-badge-h-solo.png"
import css3_logo from "@/assets/images/logo/frontend/CSS3_logo.svg"
import ecmascript_logo from "@/assets/images/logo/frontend/es-ecmascript-logo.png"
import javascript_logo from "@/assets/images/logo/frontend/JavaScript-logo.png"
import typescript_logo from "@/assets/images/logo/frontend/Typescript_logo_2020.svg"
import react_logo from "@/assets/images/logo/frontend/React-icon.svg"
import sass_logo from "@/assets/images/logo/frontend/Sass_Logo_Color.svg"
import less_logo from "@/assets/images/logo/frontend/LESS_Logo.svg"
import styled_component_logo from "@/assets/images/logo/frontend/styled-components.png"
import redux_logo from "@/assets/images/logo/frontend/redux-logo.svg"
import vue_logo from "@/assets/images/logo/frontend/Vue.js_Logo_2.svg"
import vite_logo from "@/assets/images/logo/frontend/vite-logo-with-shadow.png"
import webpack_logo from "@/assets/images/logo/frontend/webpack_icon.svg"
import gulp_logo from "@/assets/images/logo/frontend/gulp.svg"
import babel_logo from "@/assets/images/logo/frontend/Babel_Logo.svg"
import jquery_logo from "@/assets/images/logo/frontend/JQuery-Logo.svg"
import storybook_logo from "@/assets/images/logo/frontend/storybook.svg"
import eslint_logo from "@/assets/images/logo/frontend/ESLint_logo.svg"
import ant_design_logo from "@/assets/images/logo/frontend/ant-design.svg"
import tailwind_css_logo from "@/assets/images/logo/frontend/Tailwind_CSS_Logo.svg"
import tdesign_logo from "@/assets/images/logo/frontend/tdesign_logo.svg"
import expo_logo from "@/assets/images/logo/frontend/expo.png"

import nodejs_logo from "@/assets/images/logo/backend/Node.js_logo.svg"
import nestjs_logo from "@/assets/images/logo/backend/nestjs.svg"
import php_logo from "@/assets/images/logo/backend/PHP-logo.svg"
import laravel_logo from "@/assets/images/logo/backend/laravel.png"
import java_logo from "@/assets/images/logo/backend/Java-Logo.svg"
import spring_framework_logo from "@/assets/images/logo/backend/spring.svg"
import golang_logo from "@/assets/images/logo/backend/Go-Logo_Blue.png"
import gin_logo from "@/assets/images/logo/backend/gin-color.png"
import python_logo from "@/assets/images/logo/backend/Python-logo-notext.svg"
import flask_logo from "@/assets/images/logo/backend/Flask_logo.svg"
import asp_dotnet_logo from "@/assets/images/logo/backend/Asp.net.svg"

import postgres_logo from "@/assets/images/logo/database/Postgresql_elephant.svg"
import mysql_logo from "@/assets/images/logo/database/Mysql_logo.png"
import mariadb_logo from "@/assets/images/logo/database/mariadb-horizontal-blue.svg"
import sql_server_logo from "@/assets/images/logo/database/microsoft-sql-server-logo.svg"
import access_logo from "@/assets/images/logo/database/Microsoft_Office_Access_(2019-present).svg"
import mongodb_logo from "@/assets/images/logo/database/MongoDB_Logo.svg"
import redis_logo from "@/assets/images/logo/database/redis-logo.svg"
import memcached_logo from "@/assets/images/logo/database/memcached.svg"
import elasticsearch_logo from "@/assets/images/logo/database/Elasticsearch_logo.svg"
import dbeaver_logo from "@/assets/images/logo/database/dbeaver.png"
import mysql_workbench_logo from "@/assets/images/logo/database/mysql-workbench.png"
import pgadmin_logo from "@/assets/images/logo/database/pgadmin.svg"
import powerdesign_logo from "@/assets/images/logo/database/logo-powerdesigner.png"

import csharp_logo from "@/assets/images/logo/desktop/Logo_C_sharp.svg"
import vb6_logo from "@/assets/images/logo/desktop/Microsoft_Visual_Basic_for_Applications_logo.svg"
import winform_logo from "@/assets/images/logo/desktop/winforms-logo.png"
import dotnet_logo from "@/assets/images/logo/desktop/Microsoft-dot-net-logo.png"

import docker_logo from "@/assets/images/logo/operations/docker-logo-blue.svg"
import docker_compose_logo from "@/assets/images/logo/operations/docker-compose.svg"
import ansible_logo from "@/assets/images/logo/operations/Ansible_logo.svg"
import linux_logo from "@/assets/images/logo/operations/Linux_Logo.jpg"
import bash_shell_logo from "@/assets/images/logo/operations/Gnu-bash-logo.svg"
import ubuntu_logo from "@/assets/images/logo/operations/Logo-ubuntu_cof-orange-hex.svg"
import debian_logo from "@/assets/images/logo/operations/Openlogo-debianV2.svg"
import centos_logo from "@/assets/images/logo/operations/Centos-logo-light.svg"
import fedora_logo from "@/assets/images/logo/operations/Fedora_logo.svg"
import windows_server_logo from "@/assets/images/logo/operations/Windows_Server_logo.svg"
import reactos_logo from "@/assets/images/logo/operations/ReactOS_logo.svg"
// import windows2k_logo from '@/assets/images/logo/operations/microsoft-windows-2000.svg'

import git_logo from "@/assets/images/logo/development-tools/Git-logo.svg"
import vscode_logo from "@/assets/images/logo/development-tools/vscode.png"
import sublime_text_logo from "@/assets/images/logo/development-tools/sublime_text.png"
import webstorm_logo from "@/assets/images/logo/development-tools/WebStorm_Icon.svg"
import intellij_idea_logo from "@/assets/images/logo/development-tools/IntelliJ_IDEA_Icon.svg"
import goland_logo from "@/assets/images/logo/development-tools/goland.png"
import pycharm_logo from "@/assets/images/logo/development-tools/PyCharm_Icon.svg"
import phpstorm_logo from "@/assets/images/logo/development-tools/PhpStorm_Icon.svg"
import visual_studio_logo from "@/assets/images/logo/development-tools/visual-studio.png"
import sourcetree_logo from "@/assets/images/logo/development-tools/sourcetree.svg"
import winscp_logo from "@/assets/images/logo/development-tools/WinSCP_Logo.png"
import xshell_logo from "@/assets/images/logo/development-tools/xshell.png"
import xftp_logo from "@/assets/images/logo/development-tools/xftp.png"
import thunderbird_logo from "@/assets/images/logo/development-tools/Thunderbird_Logo,_2018.svg"

import altera_logo from "@/assets/images/logo/electric/Altera_logo.svg"
import arduino_logo from "@/assets/images/logo/electric/Arduino_Logo.svg"
// import arm_logo from '@/assets/images/logo/electric/Arm-logo-black-pms432.svg'
import arm_logo from "@/assets/images/logo/electric/Arm-logo-blue-pms313.svg"
// import arm_logo from '@/assets/images/logo/electric/Arm-logo-reverse-white.svg'
import intel_logo from "@/assets/images/logo/electric/Intel_logo_2023.svg"
import keil_logo from "@/assets/images/logo/electric/keil.webp"
import keil_arm_logo from "@/assets/images/logo/electric/Keil_logo.svg"
import kicad_logo from "@/assets/images/logo/electric/KiCad-Logo.svg"
import stm32cubeide_logo from "@/assets/images/logo/electric/logo-stm32cubeide.png"
import mips_logo from "@/assets/images/logo/electric/MIPS_Logo_v2.0_Final_Primary.svg"
import quartus_logo from "@/assets/images/logo/electric/quartus.png"
import raspberrypi_logo from "@/assets/images/logo/electric/Raspberry_Pi_Logo.svg"
import risc_v_logo from "@/assets/images/logo/electric/RISC-V-logo-square.svg"
// import _logo from '@/assets/images/logo/electric/RISC_V-Logo-1-300x199.webp'
import stm32_logo from "@/assets/images/logo/electric/stm32-logo.png"
import systemverilog_logo from "@/assets/images/logo/electric/SystemVerilog_logo.gif"
// import _logo from '@/assets/images/logo/electric/vivado.jpg'
import vivado_logo from "@/assets/images/logo/electric/vivado.png"
import xilinx_logo from "@/assets/images/logo/electric/Xilinx.svg"
import stc_logo from "@/assets/images/logo/electric/stc_logo_c.png"
import wch_logo from "@/assets/images/logo/electric/wch-logo.png"
import easyeda_logo from "@/assets/images/logo/electric/easyeda.png"
import altium_designer_logo from "@/assets/images/logo/electric/Altium.Designer.23.webp"

import figma_logo from "@/assets/images/logo/design/figma.png"
import xd_logo from "@/assets/images/logo/design/Adobe_XD_CC_icon.svg"
import axure_logo from "@/assets/images/logo/design/Axure.svg"
import illustrator_logo from "@/assets/images/logo/design/Adobe_Illustrator_CC_icon.svg"
import photoshop_logo from "@/assets/images/logo/design/Adobe_Photoshop_CC_icon.svg"
import after_effects_logo from "@/assets/images/logo/design/Adobe_After_Effects_CC_icon.svg"
import animate_logo from "@/assets/images/logo/design/Adobe_Animate_CC_icon_(2020).svg"
import flash_logo from "@/assets/images/logo/design/Adobe_Flash_Professional_CS6_Icon.svg"
import indesign_logo from "@/assets/images/logo/design/Adobe_InDesign_CC_icon.svg"
import premiere_logo from "@/assets/images/logo/design/Adobe_Premiere_Pro_CC_icon.svg"
import diagrams_logo from "@/assets/images/logo/design/Diagrams.net_Logo.svg"
import visio_logo from "@/assets/images/logo/design/Microsoft_Office_Visio_(2013–2019).svg"

import styles from "./SkillSection.module.sass"

const data = [
  {
    category_name: "Frontend",
    skills: [
      {name: "HTML5", icon: html5_logo},
      {name: "CSS3", icon: css3_logo},
      {name: "ECMAScript", icon: ecmascript_logo},
      {name: "JavaScript", icon: javascript_logo},
      {name: "TypeScript", icon: typescript_logo},
      {name: "React", icon: react_logo},
      {name: "Vue", icon: vue_logo},
      {name: "Sass", icon: sass_logo},
      {name: "less", icon: styled_component_logo},
      {name: "styled-components", icon: less_logo},
      {name: "Redux", icon: redux_logo},
      {name: "Vite", icon: vite_logo},
      {name: "Webpack", icon: webpack_logo},
      {name: "Gulp.js", icon: gulp_logo},
      {name: "Babel", icon: babel_logo},
      {name: "jQuery", icon: jquery_logo},
      {name: "StoryBook", icon: storybook_logo},
      {name: "ESLint", icon: eslint_logo},
      {name: "Ant-Design", icon: ant_design_logo},
      {name: "Tailwind CSS", icon: tailwind_css_logo},
      {name: "TDesign", icon: tdesign_logo},
      {name: "Expo", icon: expo_logo},
    ],
  },
  {
    category_name: "Backend",
    skills: [
      {name: "Node.js", icon: nodejs_logo},
      {name: "Nest.js", icon: nestjs_logo},
      {name: "PHP", icon: php_logo},
      {name: "Laravel", icon: laravel_logo},
      {name: "Java", icon: java_logo},
      {name: "Spring Framework", icon: spring_framework_logo},
      {name: "Golang", icon: golang_logo},
      {name: "Gin", icon: gin_logo},
      {name: "Python", icon: python_logo},
      {name: "Flask", icon: flask_logo},
      {name: "ASP.NET", icon: asp_dotnet_logo},
    ],
  },
  {
    category_name: "Database",
    skills: [
      {name: "Postgres", icon: postgres_logo},
      {name: "MySQL", icon: mysql_logo},
      {name: "MariaDB", icon: mariadb_logo},
      {name: "SQL Server", icon: sql_server_logo},
      {name: "Microsoft Access", icon: access_logo},
      {name: "MongoDB", icon: mongodb_logo},
      {name: "Redis", icon: redis_logo},
      {name: "Memcached", icon: memcached_logo},
      {name: "Elasticsearch", icon: elasticsearch_logo},
      {name: "DBeaver", icon: dbeaver_logo},
      {name: "MySQL Workbench", icon: mysql_workbench_logo},
      {name: "pgAdmin", icon: pgadmin_logo},
      {name: "SAP PowerDesigner", icon: powerdesign_logo},
    ],
  },
  {
    category_name: "Desktop application",
    skills: [
      {name: "C#", icon: csharp_logo},
      {name: "Visual Basic 6.0", icon: vb6_logo},
      {name: "WinForm", icon: winform_logo},
      {name: ".NET", icon: dotnet_logo},
    ],
  },
  {
    category_name: "Operations",
    skills: [
      {name: "Docker", icon: docker_logo},
      {name: "Docker Compose", icon: docker_compose_logo},
      {name: "Ansible", icon: ansible_logo},
      {name: "Bash shell", icon: bash_shell_logo},
      {name: "Linux", icon: linux_logo},
      {name: "Ubuntu", icon: ubuntu_logo},
      {name: "Debian", icon: debian_logo},
      {name: "CentOS", icon: centos_logo},
      {name: "Fedora", icon: fedora_logo},
      {name: "Windows Server", icon: windows_server_logo},
      {name: "ReactOS", icon: reactos_logo},
    ],
  },
  {
    category_name: "Development tools",
    skills: [
      {name: "Git", icon: git_logo},
      {name: "Visual Studio Code", icon: vscode_logo},
      {name: "Sublime Text", icon: sublime_text_logo},
      {name: "WebStorm", icon: webstorm_logo},
      {name: "IntelliJ IDEA", icon: intellij_idea_logo},
      {name: "GoLand", icon: goland_logo},
      {name: "PyCharm", icon: pycharm_logo},
      {name: "PhpStorm", icon: phpstorm_logo},
      {name: "Visual Studio", icon: visual_studio_logo},
      {name: "Sourcetree", icon: sourcetree_logo},
      {name: "WinSCP", icon: winscp_logo},
      {name: "Xshell", icon: xshell_logo},
      {name: "Xftp", icon: xftp_logo},
      {name: "Thunderbird", icon: thunderbird_logo},
    ],
  },
  {
    category_name: "Electronic Engineering / Embedded system development",
    skills: [
      {name: "Altera", icon: altera_logo},
      {name: "Xilinx", icon: xilinx_logo},
      {name: "Arduino", icon: arduino_logo},
      {name: "ARM", icon: arm_logo},
      {name: "Intel", icon: intel_logo},
      {name: "Keil", icon: keil_logo},
      {name: "Keil for ARM", icon: keil_arm_logo},
      {name: "EasyEDA", icon: easyeda_logo},
      {name: "Altium Designer", icon: altium_designer_logo},
      {name: "KiCad", icon: kicad_logo},
      {name: "MIPS", icon: mips_logo},
      {name: "Quartus", icon: quartus_logo},
      {name: "Raspberry Pi", icon: raspberrypi_logo},
      {name: "RISC-V", icon: risc_v_logo},
      {name: "SystemVerilogHDL", icon: systemverilog_logo},
      {name: "Vivado", icon: vivado_logo},
      {name: "STM32CubeIDE", icon: stm32cubeide_logo},
      {name: "STM32", icon: stm32_logo},
      // {name: 'STC', icon: stc_logo},
      // {name: 'WCH', icon: wch_logo},
    ],
  },
  {
    category_name: "Design / User Interface / User Experience",
    skills: [
      {name: "Figma", icon: figma_logo},
      {name: "Axure RP", icon: axure_logo},
      {name: "Adobe XD", icon: xd_logo},
      {name: "Adobe Illustrator", icon: illustrator_logo},
      {name: "Adobe Photoshop", icon: photoshop_logo},
      {name: "Adobe AfterEffects", icon: after_effects_logo},
      {name: "Adobe Animate", icon: animate_logo},
      {name: "Adobe Flash", icon: flash_logo},
      {name: "Adobe Indesign", icon: indesign_logo},
      {name: "Adobe Premiere", icon: premiere_logo},
      {name: "Diagrams.net (draw.io)", icon: diagrams_logo},
      {name: "Microsoft Visio", icon: visio_logo},
    ],
  },
] as const

export interface IPropsSkillSection {}

export const SkillSection: React.FunctionComponent<IPropsSkillSection> = (
  props,
) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Skill</h2>
      <Space direction={"vertical"} size={16}>
        {data.map((category) => (
          <div key={category.category_name} className={styles.category}>
            <div className={styles.category_name}>
              {category.category_name}:{" "}
            </div>
            <Space className={styles.category_skills} size={16} wrap>
              {category.skills.map((skill) => (
                <Tooltip key={skill.name} title={skill.name}>
                  <img
                    style={{height: 32, width: "auto"}}
                    src={skill.icon.src}
                    alt={skill.name}
                  />
                </Tooltip>
              ))}
            </Space>
          </div>
        ))}
      </Space>
    </div>
  )
}
