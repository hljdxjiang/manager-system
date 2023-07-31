import $axios from '@/utils/axios'
import { Menu, Revoke } from '@/app_models/user'

export default {
  // 获取所有菜单
  getAllMenus(params?: object): Promise<Menu> {
    return $axios.post('/roleDetail/getAllMenus', params)
  },

  getAllRevoke(params?: object): Promise<Revoke> {
    return $axios.post('/roleDetail/getAllRevoke', params)
  },


  getRoleMenus(params?: object): Promise<Menu> {
    return $axios.post('/roleDetail/getAllMenus', params)
  },

  getRoleRevokes(params?: object): Promise<Revoke> {
    return $axios.post('/roleDetail/getAllRevoke', params)
  }
}
