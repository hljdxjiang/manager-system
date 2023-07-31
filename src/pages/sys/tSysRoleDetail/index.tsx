import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tSysRoleDetailApi from '@/api/sys/tSysRoleDetail'
import { onItemChange } from "@/utils/tableCommon";
import MyPage from '@/components/common/myPage';

const TSysRoleDetail: FC = () => {
    const [selectRow, setSelectRow] = useState(Object);
    const [selectKeys, setSelectKeys] = useState([]);
    // 搜索栏配置项
    const searchConfigList = [
                                                {
                    key:'roleid',
                slot: <Input placeholder="角色ID" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'path',
                slot: <Input placeholder="权限路径" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'title',
                slot: <Input placeholder="权限描述" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'type',
                slot: <Input placeholder="权限类型" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'parentPath',
                slot: <Input placeholder="父ID" allowClear />,
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
                        title: '角色ID',
            dataIndex: 'roleid',
            }
            
                                                ,{
                        title: '权限路径',
            dataIndex: 'path',
            }
            
                                                ,{
                        title: '权限描述',
            dataIndex: 'title',
            }
            
                                                ,{
                        title: '权限类型',
            dataIndex: 'type',
            }
            
                                                ,{
                        title: '父ID',
            dataIndex: 'parentPath',
            }
            
            ]
    return (
        <>
            <MyPage
                apiFun={tSysRoleDetailApi.queryByPage}
                columns={columns}
                permissionPrefix={"user:list"}
                addApiFun={tSysRoleDetailApi.add}
                editApiFun={tSysRoleDetailApi.edit}
                delApiFun={tSysRoleDetailApi.deleteById}
                showOpeation={false}
                searchConfigList={searchConfigList}
            />
        </>
    )
}
export default TSysRoleDetail
