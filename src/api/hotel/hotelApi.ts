import request from '@/utils/axios'

export default {
  // 酒店搜索
  findHotel(params?: object): Promise<CommonObjectType<any>> {
    return request.post('hotelInfo/findHotel', params)
  },

  hotelDetail(params?: object): Promise<CommonObjectType<any>> {
    return request.post('hotelInfo/hotelDetail', params)
  },

  roomDetail(params?: object): Promise<CommonObjectType<any>> {
    return request.post('hotelInfo/roomDetail', params)
  },
}
