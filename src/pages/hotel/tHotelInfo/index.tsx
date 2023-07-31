import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tHotelInfoApi from '@/api/hotel/tHotelInfo'
import { onItemChange } from "@/utils/tableCommon";
import MyPage from '@/components/common/myPage';

const THotelInfo: FC = () => {
    const [selectRow, setSelectRow] = useState(Object);
    const [selectKeys, setSelectKeys] = useState([]);
    // 搜索栏配置项
    const searchConfigList = [
                                                {
                    key:'hotelId',
                slot: <Input placeholder="酒店ID" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'hotelName',
                slot: <Input placeholder="酒店名称" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'cityName',
                slot: <Input placeholder="城市名称" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'address',
                slot: <Input placeholder="地址" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'hotelStar',
                slot: <Input placeholder="酒店星级" allowClear />,
                rules: [],
                initialValue: ''
            }
                                                    ,{
                    key:'mainImg',
                slot: <Input placeholder="酒店主图" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'groupId',
                slot: <Input placeholder="所属分组ID" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'userId',
                slot: <Input placeholder="管理员ID" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'status',
                slot: <Input placeholder="状态0正常9下架" allowClear />,
                rules: [],
                initialValue: ''
            }
                                                                        ,{
                    key:'remark',
                slot: <Input placeholder="备注" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'managerName',
                slot: <Input placeholder="经理姓名" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'managerGender',
                slot: <Input placeholder="经理性别" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'managerTel',
                slot: <Input placeholder="经理电话" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'phone',
                slot: <Input placeholder="酒店联系电话" allowClear />,
                rules: [],
                initialValue: ''
            }
                        ]
    const columns = [
                                                        {
                                        title: 'ID',
            dataIndex: 'id',
            }
            
                                                ,{
                        title: '酒店ID',
            dataIndex: 'hotelId',
            }
            
                                                ,{
                        title: '酒店名称',
            dataIndex: 'hotelName',
            }
            
                                                ,{
                        title: '城市名称',
            dataIndex: 'cityName',
            }
            
                                                ,{
                        title: '地址',
            dataIndex: 'address',
            }
            
                                                ,{
                        title: '酒店星级',
            dataIndex: 'hotelStar',
            }
            
                    
                                                ,{
                        title: '酒店主图',
            dataIndex: 'mainImg',
            }
            
                                                ,{
                        title: '所属分组ID',
            dataIndex: 'groupId',
            }
            
                                                ,{
                        title: '管理员ID',
            dataIndex: 'userId',
            }
            
                                                ,{
                        title: '状态0正常9下架',
            dataIndex: 'status',
            }
            
                                                ,{
                        title: '创建时间',
            dataIndex: 'createTime',
            }
            
                                                ,{
                        title: '最后修改时间',
            dataIndex: 'lastModifiedTime',
            }
            
                                                ,{
                        title: '备注',
            dataIndex: 'remark',
            }
            
                                                ,{
                        title: '经理姓名',
            dataIndex: 'managerName',
            }
            
                                                ,{
                        title: '经理性别',
            dataIndex: 'managerGender',
            }
            
                                                ,{
                        title: '经理电话',
            dataIndex: 'managerTel',
            }
            
                                                ,{
                        title: '酒店联系电话',
            dataIndex: 'phone',
            }
            
            ]
    return (
        <>
            <MyPage
                apiFun={tHotelInfoApi.queryByPage}
                columns={columns}
                permissionPrefix={"user:list"}
                addApiFun={tHotelInfoApi.add}
                editApiFun={tHotelInfoApi.edit}
                delApiFun={tHotelInfoApi.deleteById}
                showOpeation={false}
                searchConfigList={searchConfigList}
            />
        </>
    )
}
export default THotelInfo
