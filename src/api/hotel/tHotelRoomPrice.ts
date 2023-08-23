import request from '@/utils/axios'

export default {
    // 分页查询
    queryByPage(params?: object): Promise<CommonObjectType<any>> {
        return request.post('tHotelRoomPrice/queryByPage', params)
    },
    // 新增数据
    add(params?: object): Promise<CommonObjectType<any>> {
        return request.post('tHotelRoomPrice/add', params)
    },
    // 修改数据
    edit(params?: object): Promise<CommonObjectType<any>> {
        return request.post('tHotelRoomPrice/edit', params)
    },
    // 修改数据
    deleteById(params?: object): Promise<CommonObjectType<any>> {
        return request.post('tHotelRoomPrice/delete', params)
    },
    // 模糊查询
    query(params?: object): Promise<CommonObjectType<any>> {
      return request.post('tHotelRoomPrice/fuzzyQuery', params)
    },
    selectChanged(params?: object): Promise<CommonObjectType<any>> {
      console.log("selectChanged",params)
      return request.post('tHotelRoomPrice/selectChanged', params)
    }
}
