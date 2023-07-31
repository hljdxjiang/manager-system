import request from '@/utils/axios'

export default {
    // 分页查询
    queryByPage(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tSysMenus/queryByPage', params)
    },
    // 新增数据
    add(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tSysMenus/add', params)
    },
    // 修改数据
    edit(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tSysMenus/edit', params)
    },
    // 修改数据
    deleteById(params?: object): Promise<CommonObjectType<string>> {
        return request.post('tSysMenus/delete', params)
    }
}
