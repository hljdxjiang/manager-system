import request from '@/utils/axios'

export default {
  // 酒店搜索
  findHotel(params?: object): Promise<CommonObjectType<Object>> {
    return request.post('tHotelInfo/findHotel', params)
  },

  hotelDetail(params?: object): Promise<CommonObjectType<Object>> {
    return request.post('tHotelInfo/hotelDetail', params)
  },

  roomDetail(params?: object): Promise<CommonObjectType<Object>> {
    return request.post('tHotelInfo/hotelDetail', params)
  },
}
