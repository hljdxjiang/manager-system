import $axios from '@/utils/axios'

export default {
  getRoleDetail(params?: object): Promise<any> {
    return $axios.post('roleDetail/getRoleDetail', params)
  },
  saveRole(params?: object): Promise<any> {
    return $axios.post('roleDetail/saveRole', params)
  },
  deleteRole(params?: object): Promise<any> {
    return $axios.post('roleDetail/deleteRole', params)
  }
}
