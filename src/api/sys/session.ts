import { UserInfo } from '@/app_models/user'
import request from '@/utils/axios'

export default {
  // 获取数据
  login(params?: object): Promise<UserInfo> {
    return request.post('user/login', params)
  },
  changePwd(params?: object): Promise<any> {
    console.log("changePwd",params)
    return request.post('user/changePwd', params)
  }
}
