import {Space, Tooltip} from "antd";
import React from "react";

import html5_logo from '@/assets/images/logo/frontend/html5-badge-h-solo.png'
import css3_logo from '@/assets/images/logo/frontend/CSS3_logo.svg'
import ecmascript_logo from '@/assets/images/logo/frontend/es-ecmascript-logo.png'
import javascript_logo from '@/assets/images/logo/frontend/JavaScript-logo.png'
import typescript_logo from '@/assets/images/logo/frontend/Typescript_logo_2020.svg'
import react_logo from '@/assets/images/logo/frontend/React-icon.svg'
import sass_logo from '@/assets/images/logo/frontend/Sass_Logo_Color.svg'
import less_logo from '@/assets/images/logo/frontend/LESS_Logo.svg'
import styled_component_logo from '@/assets/images/logo/frontend/styled-components.png'
import redux_logo from '@/assets/images/logo/frontend/redux-logo.svg'
import vue_logo from '@/assets/images/logo/frontend/Vue.js_Logo_2.svg'
import vite_logo from '@/assets/images/logo/frontend/vite-logo-with-shadow.png'
import webpack_logo from '@/assets/images/logo/frontend/webpack_icon.svg'
import gulp_logo from '@/assets/images/logo/frontend/gulp.svg'
import babel_logo from '@/assets/images/logo/frontend/Babel_Logo.svg'
import jquery_logo from '@/assets/images/logo/frontend/JQuery-Logo.svg'
import storybook_logo from '@/assets/images/logo/frontend/storybook.svg'
import eslint_logo from '@/assets/images/logo/frontend/ESLint_logo.svg'
import ant_design_logo from '@/assets/images/logo/frontend/ant-design.svg'
import tailwind_css_logo from '@/assets/images/logo/frontend/Tailwind_CSS_Logo.svg'
import tdesign_logo from '@/assets/images/logo/frontend/tdesign_logo.svg'
import expo_logo from '@/assets/images/logo/frontend/expo.png'

import nodejs_logo from '@/assets/images/logo/backend/Node.js_logo.svg'
import nestjs_logo from '@/assets/images/logo/backend/nestjs.svg'
import php_logo from '@/assets/images/logo/backend/PHP-logo.svg'
import laravel_logo from '@/assets/images/logo/backend/laravel.png'
import java_logo from '@/assets/images/logo/backend/Java-Logo.svg'
import spring_framework_logo from '@/assets/images/logo/backend/spring.svg'
import golang_logo from '@/assets/images/logo/backend/Go-Logo_Blue.png'
import gin_logo from '@/assets/images/logo/backend/gin-color.png'
import python_logo from '@/assets/images/logo/backend/Python-logo-notext.svg'
import flask_logo from '@/assets/images/logo/backend/Flask_logo.svg'
import asp_dotnet_logo from '@/assets/images/logo/backend/Asp.net.svg'

import postgres_logo from '@/assets/images/logo/database/Postgresql_elephant.svg'
import mysql_logo from '@/assets/images/logo/database/Mysql_logo.png'
import mariadb_logo from '@/assets/images/logo/database/mariadb-horizontal-blue.svg'
import sql_server_logo from '@/assets/images/logo/database/microsoft-sql-server-logo.svg'
import access_logo from '@/assets/images/logo/database/Microsoft_Office_Access_(2019-present).svg'
import mongodb_logo from '@/assets/images/logo/database/MongoDB_Logo.svg'
import redis_logo from '@/assets/images/logo/database/redis-logo.svg'
import memcached_logo from '@/assets/images/logo/database/memcached.svg'
import elasticsearch_logo from '@/assets/images/logo/database/Elasticsearch_logo.svg'
import dbeaver_logo from '@/assets/images/logo/database/dbeaver.png'

import csharp_logo from '@/assets/images/logo/desktop/Logo_C_sharp.svg'
import vb6_logo from '@/assets/images/logo/desktop/Microsoft_Visual_Basic_for_Applications_logo.svg'
import winform_logo from '@/assets/images/logo/desktop/winforms-logo.png'
import dotnet_logo from '@/assets/images/logo/desktop/Microsoft-dot-net-logo.png'

import docker_logo from '@/assets/images/logo/operations/docker-logo-blue.svg'
import docker_compose_logo from '@/assets/images/logo/operations/docker-compose.svg'
import ansible_logo from '@/assets/images/logo/operations/Ansible_logo.svg'
import linux_logo from '@/assets/images/logo/operations/Linux_Logo.jpg'
import bash_shell_logo from '@/assets/images/logo/operations/Gnu-bash-logo.svg'
import ubuntu_logo from '@/assets/images/logo/operations/Logo-ubuntu_cof-orange-hex.svg'
import centos_logo from '@/assets/images/logo/operations/Centos-logo-light.svg'
import fedora_logo from '@/assets/images/logo/operations/Fedora_logo.svg'
import windows_server_logo from '@/assets/images/logo/operations/Windows_Server_logo.svg'
import reactos_logo from '@/assets/images/logo/operations/ReactOS_logo.svg'

import styles from "./SkillSection.module.sass";


const data = [
  {
    category_name: "Front End",
    skills: [
      {name: 'HTML5', icon: html5_logo},
      {name: 'CSS3', icon: css3_logo},
      {name: 'ECMAScript', icon: ecmascript_logo},
      {name: 'JavaScript', icon: javascript_logo},
      {name: 'TypeScript', icon: typescript_logo},
      {name: 'React', icon: react_logo},
      {name: 'Vue', icon: vue_logo},
      {name: 'Sass', icon: sass_logo},
      {name: 'less', icon: styled_component_logo},
      {name: 'styled-components', icon: less_logo},
      {name: 'Redux', icon: redux_logo},
      {name: 'Vite', icon: vite_logo},
      {name: 'Webpack', icon: webpack_logo},
      {name: 'Gulp.js', icon: gulp_logo},
      {name: 'Babel', icon: babel_logo},
      {name: 'jQuery', icon: jquery_logo},
      {name: 'StoryBook', icon: storybook_logo},
      {name: 'ESLint', icon: eslint_logo},
      {name: 'Ant-Design', icon: ant_design_logo},
      {name: 'Tailwind CSS', icon: tailwind_css_logo},
      {name: 'TDesign', icon: tdesign_logo},
      {name: 'Expo', icon: expo_logo},
    ],
  },
  {
    category_name: "Back End",
    skills: [
      {name: 'Node.js', icon: nodejs_logo},
      {name: 'Nest.js', icon: nestjs_logo},
      {name: 'PHP', icon: php_logo},
      {name: 'Laravel', icon: laravel_logo},
      {name: 'Java', icon: java_logo},
      {name: 'Spring Framework', icon: spring_framework_logo},
      {name: 'Golang', icon: golang_logo},
      {name: 'Gin', icon: gin_logo},
      {name: 'Python', icon: python_logo},
      {name: 'Flask', icon: flask_logo},
      {name: 'ASP.NET', icon: asp_dotnet_logo},
    ],
  },
  {
    category_name: "Database / Storage",
    skills: [
      {name: 'Postgres', icon: postgres_logo},
      {name: 'MySQL', icon: mysql_logo},
      {name: 'MariaDB', icon: mariadb_logo},
      {name: 'SQL Server', icon: sql_server_logo},
      {name: 'Microsoft Access', icon: access_logo},
      {name: 'MongoDB', icon: mongodb_logo},
      {name: 'Redis', icon: redis_logo},
      {name: 'Memcached', icon: memcached_logo},
      {name: 'Elasticsearch', icon: elasticsearch_logo},
      {name: 'DBeaver', icon: dbeaver_logo},
    ],
  },
  {
    category_name: "Desktop Application",
    skills: [
      {name: 'C#', icon: csharp_logo},
      {name: 'Visual Basic 6.0', icon: vb6_logo},
      {name: 'WinForm', icon: winform_logo},
      {name: '.NET', icon: dotnet_logo},
    ],
  },
  {
    category_name: "Operations",
    skills: [
      {name: 'Docker', icon: docker_logo},
      {name: 'Docker Compose', icon: docker_compose_logo},
      {name: 'Ansible', icon: ansible_logo},
      {name: 'Bash shell', icon: bash_shell_logo},
      {name: 'Linux', icon: linux_logo},
      {name: 'Ubuntu', icon: ubuntu_logo},
      {name: 'CentOS', icon: centos_logo},
      {name: 'Fedora', icon: fedora_logo},
      {name: 'Windows Server', icon: windows_server_logo},
      {name: 'ReactOS', icon: reactos_logo},
    ],
  },
]

export interface IPropsSkillSection {
}

export const SkillSection: React.FunctionComponent<IPropsSkillSection> = (props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Skill</h2>
      <Space direction={'vertical'} size={16}>
      {data.map((category) => (
        <div key={category.category_name} className={styles.category}>
          <div className={styles.category_name}>{category.category_name}: </div>
          <Space className={styles.category_skills} size={16} wrap>
            {category.skills.map((skill) => (
              <Tooltip key={skill.name} title={skill.name}>
                <img style={{height: 32, width: 'auto'}} src={skill.icon.src} alt={skill.name} />
              </Tooltip>
            ))}
          </Space>
        </div>
      ))}
    </Space>
    </div>
  )
}
