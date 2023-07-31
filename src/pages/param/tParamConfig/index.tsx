import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tParamConfigApi from '@/api/param/tParamConfig'
import { onItemChange } from "@/utils/tableCommon";
import MyPage from '@/components/common/myPage';

const TParamConfig: FC = () => {
    const [selectRow, setSelectRow] = useState(Object);
    const [selectKeys, setSelectKeys] = useState([]);
    // 搜索栏配置项
    const searchConfigList = [
                                                                    {
                    key:'configKey',
                slot: <Input placeholder="配置编号" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'configName',
                slot: <Input placeholder="配置中文名" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'configValue',
                slot: <Input placeholder="配置值" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'configDesc',
                slot: <Input placeholder="配置描述" allowClear />,
                rules: [],
                initialValue: ''
            }
                                                    ,{
                    key:'lastUpdateTime',
                slot: <Input placeholder="最后修改时间" allowClear />,
                rules: [],
                initialValue: ''
            }
                        ]
    const columns = [
                                                        {
                                        title: '',
            dataIndex: 'id',
            }
            
                    
                                                ,{
                        title: '配置编号',
            dataIndex: 'configKey',
            }
            
                                                ,{
                        title: '配置中文名',
            dataIndex: 'configName',
            }
            
                                                ,{
                        title: '配置值',
            dataIndex: 'configValue',
            }
            
                                                ,{
                        title: '配置描述',
            dataIndex: 'configDesc',
            }
            
                                                ,{
                        title: '创建时间',
            dataIndex: 'createTime',
            }
            
                                                ,{
                        title: '最后修改时间',
            dataIndex: 'lastUpdateTime',
            }
            
            ]
    return (
        <>
            <MyPage
                apiFun={tParamConfigApi.queryByPage}
                columns={columns}
                permissionPrefix={"user:list"}
                addApiFun={tParamConfigApi.add}
                editApiFun={tParamConfigApi.edit}
                delApiFun={tParamConfigApi.deleteById}
                showOpeation={false}
                searchConfigList={searchConfigList}
            />
        </>
    )
}
export default TParamConfig
