import request from '@/utils/axios'

export default {
    // 分页查询
    queryByPage(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tHotelRoomInfo/queryByPage', params)
    },
    // 新增数据
    add(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tHotelRoomInfo/add', params)
    },
    // 修改数据
    edit(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tHotelRoomInfo/edit', params)
    },
    // 修改数据
    deleteById(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tHotelRoomInfo/delete', params)
    },
    // 模糊查询
    query(params?: object): Promise<CommonObjectType<string>> {
      return request.post('tHotelRoomInfo/fuzzyQuery', params)
    }
}
