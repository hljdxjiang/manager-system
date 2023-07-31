import {
  HomeOutlined,
  BankOutlined,
  UserOutlined,
  AuditOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  ApiOutlined
} from '@ant-design/icons'
import Home from '@/pages/home'
import Workspace from '@/pages/home/Workspace'
import ErrorPage from '@/pages/public/errorPage'

import UserList from '@/pages/user/list'
import UserEdit from '@/pages/user/edit'


import AuthTest from '@/pages/test'
import { MenuRoute } from '@/route/types'
// import React from 'react'
// import { Icon } from '@iconify/react'
import { TestApiLoad } from './TempTestRouteComponent'
import NewUserList from '@/pages/user/newList'

import TUserInfo from "@/pages/user/tUserInfo"

import TSysRole from '@/pages/sys/tSysRole'

/**
 * path 跳转的路径
 * component 对应路径显示的组件
 * exact 匹配规则，true的时候则精确匹配。
 */
const preDefinedRoutes: MenuRoute[] = [
  {
    path: '/',
    name: '首页',
    exact: true,
    key: 'home',
    icon: HomeOutlined,
    component: Home
  },
  {
    path: '/workspace',
    name: '工作台',
    exact: true,
    key: 'workspace',
    component: Workspace,
    icon: DashboardOutlined
    // icon: () =>
    //   React.createElement(Icon, { icon: 'arcticons:syska-smart-home' })
  },
  {
    path: '/user',
    name: '用户管理',
    key: 'user',
    type: 'subMenu',
    icon: UserOutlined,
    iconfont: 'icon-xiaoshouzongjian',
    routes: [
      {
        path: '/user/list',
        name: '用户列表',
        exact: true,
        key: 'user:list:edit',
        component: NewUserList
      },
      {
        path: '/sys/list/TSysRole',
        name: '角色权限',
        exact: true,
        key: 'user:list:view',
        //hideInMenu: true,
        component: TSysRole
      }
    ]
  },
  {
    path: '/auth',
    name: '权限测试页',
    exact: true,
    key: 'auth:test:view',
    icon: BankOutlined,
    component: AuthTest
  },
  {
    path: '/test-api',
    name: '测试api',
    exact: true,
    key: '/test-api',
    icon: ApiOutlined,
    component: TestApiLoad
  },
  {
    path: '/403',
    name: '暂无权限',
    exact: true,
    key: '/403',
    icon: InfoCircleOutlined,
    hideInMenu: true,
    component: ErrorPage
  }
]

export default preDefinedRoutes
