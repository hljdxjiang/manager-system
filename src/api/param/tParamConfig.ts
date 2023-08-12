import request from '@/utils/axios'

export default {
    // 分页查询
    queryByPage(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tParamConfig/queryByPage', params)
    },
    // 新增数据
    add(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tParamConfig/add', params)
    },
    // 修改数据
    edit(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tParamConfig/edit', params)
    },
    // 修改数据
    deleteById(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tParamConfig/delete', params)
    },
    // 模糊查询
    query(params?: object): Promise<CommonObjectType<any>> {
      return request.post('tParamConfig/fuzzyQuery', params)
    }
}
