import {Space, Tooltip} from "antd";
import React from "react";
import styles from "./SkillSection.module.sass";

import javascript_logo from '@/assets/images/logo/JavaScript-logo.png'
import typescript_logo from '@/assets/images/logo/Typescript_logo_2020.svg'
import react_logo from '@/assets/images/logo/React-icon.svg'
import sass_logo from '@/assets/images/logo/Sass_Logo_Color.svg'
import vue_logo from '@/assets/images/logo/Vue.js_Logo_2.svg'
import vite_logo from '@/assets/images/logo/vite-logo-with-shadow.png'
import webpack_logo from '@/assets/images/logo/webpack_icon.svg'
import gulp_logo from '@/assets/images/logo/gulp.svg'
import babel_logo from '@/assets/images/logo/Babel_Logo.svg'

import postgres_logo from '@/assets/images/logo/Postgresql_elephant.svg'
import mysql_logo from '@/assets/images/logo/Mysql_logo.png'
import redis_logo from '@/assets/images/logo/Node.js_logo.svg'
import sql_server_logo from '@/assets/images/logo/microsoft-sql-server-logo.svg'

const data = [
  {
    category_name: "Front End",
    skills: [
      {name: 'JavaScript', icon: javascript_logo},
      {name: 'TypeScript', icon: typescript_logo},
      {name: 'React', icon: react_logo},
      {name: 'Vue', icon: vue_logo},
      {name: 'Vite', icon: vite_logo},
      {name: 'Sass', icon: sass_logo},
      {name: 'Webpack', icon: webpack_logo},
      {name: 'Gulp.js', icon: gulp_logo},
      {name: 'Babel', icon: babel_logo},
    ],
  },
  {
    category_name: "Back End",
    skills: [
      {name: 'JavaScript', icon: javascript_logo},
      {name: 'TypeScript', icon: typescript_logo},
      {name: 'React', icon: react_logo},
      {name: 'Sass', icon: sass_logo},
      {name: 'Vue', icon: vue_logo},
      {name: 'Webpack', icon: webpack_logo},
      // {name: 'Glup', icon: webpack_logo},
    ],
  },
  {
    category_name: "Database / Storage",
    skills: [
      {name: 'Postgres', icon: postgres_logo},
      {name: 'MySQL', icon: mysql_logo},
      {name: 'Redis', icon: redis_logo},
      {name: 'SQL Server', icon: sql_server_logo},
      {name: 'Vue', icon: vue_logo},
      {name: 'Webpack', icon: webpack_logo},
      // {name: 'Glup', icon: webpack_logo},
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
        <Space key={category.category_name} className={styles.category} size={16}>
          <div className={styles.category_name}>{category.category_name}: </div>
          <Space className={styles.category_skills} size={16}>
            {category.skills.map((skill) => (
              <Tooltip title={skill.name}>
                <img style={{height: 48, width: 'auto'}} {...skill.icon} alt={skill.name} />
              </Tooltip>
            ))}
          </Space>
          
        </Space>
      ))}
    </Space>
    </div>
  )
}
