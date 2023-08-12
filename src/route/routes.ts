import {
  HomeOutlined,
  UserOutlined,
  DashboardOutlined
} from '@ant-design/icons'
import Home from '@/pages/home'
import Workspace from '@/pages/home/Workspace'
import { MenuRoute } from '@/route/types'

import NewUserList from '@/pages/user/newList'

import TSysRole from '@/pages/sys/tSysRole'

import THotelInfo from '@/pages/hotel/tHotelInfo'

import THotelRoomInfo from '@/pages/hotel/tHotelRoomInfo'

import THotelRoomPrice from '@/pages/hotel/tHotelRoomPrice'

import TParamConfig from '@/pages/param/tParamConfig'
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
  // {
  //   path: '/workspace',
  //   name: '工作台',
  //   exact: true,
  //   key: 'workspace',
  //   component: Workspace,
  //   icon: DashboardOutlined
  //   // icon: () =>
  //   //   React.createElement(Icon, { icon: 'arcticons:syska-smart-home' })
  // },
  {
    path: '/hotel',
    name: '酒店房间',
    key: 'hotel',
    type: 'subMenu',
    icon: UserOutlined,
    iconfont: 'icon-xiaoshouzongjian',
    routes: [
      {
        path: '/hotel/THotelInfo',
        name: '酒店管理',
        exact: true,
        key: 'hotel.hotel',
        //hideInMenu: true,
        component: THotelInfo
      },
      {
        path: '/hotel/THotelRoomInfo',
        name: '房间管理',
        exact: true,
        key: 'hotel.room',
        //hideInMenu: true,
        component: THotelRoomInfo
      },
      {
        path: '/hotel/THotelRoomPrice',
        name: '价格变动管理',
        exact: true,
        key: 'hotel.room.price',
        //hideInMenu: true,
        component: THotelRoomPrice
      },
    ]}
    ,{
      path: '/config',
      name: '系统配置',
      key: 'config',
      type: 'subMenu',
      icon: UserOutlined,
      iconfont: 'icon-xiaoshouzongjian',
      routes: [
        {
          path: '/config/paramConfig',
          name: '参数配置',
          exact: true,
          key: 'config.param',
          //hideInMenu: true,
          component: TParamConfig
        },
      ]}
  //, {
  //   path: '/user',
  //   name: '用户权限',
  //   key: 'user',
  //   type: 'subMenu',
  //   icon: UserOutlined,
  //   iconfont: 'icon-xiaoshouzongjian',
  //   routes: [
  //     {
  //       path: '/user/list',
  //       name: '用户列表',
  //       exact: true,
  //       key: 'user:list',
  //       component: NewUserList
  //     },
  //     {
  //       path: '/user/TSysRole',
  //       name: '角色权限',
  //       exact: true,
  //       key: 'user:role',
  //       //hideInMenu: true,
  //       component: TSysRole
  //     }
  //   ]
  // }
]

export default preDefinedRoutes
