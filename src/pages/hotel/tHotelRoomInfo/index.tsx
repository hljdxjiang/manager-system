import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tHotelRoomInfoApi from '@/api/hotel/tHotelRoomInfo'
import { onItemChange } from "@/utils/tableCommon";
import MyPage from '@/components/common/myPage';

const THotelRoomInfo: FC = () => {
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
                    key:'roomId',
                slot: <Input placeholder="房间ID" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'roomName',
                slot: <Input placeholder="放假名称" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'useableArea',
                slot: <Input placeholder="房间面积" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'floor',
                slot: <Input placeholder="楼层" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'capacity',
                slot: <Input placeholder="房间容量" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'bedType',
                slot: <Input placeholder="床型描述" allowClear />,
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
                        title: '房间ID',
            dataIndex: 'roomId',
            }
            
                                                ,{
                        title: '放假名称',
            dataIndex: 'roomName',
            }
            
                                                ,{
                        title: '房间面积',
            dataIndex: 'useableArea',
            }
            
                                                ,{
                        title: '楼层',
            dataIndex: 'floor',
            }
            
                                                ,{
                        title: '房间容量',
            dataIndex: 'capacity',
            }
            
                                                ,{
                        title: '床型描述',
            dataIndex: 'bedType',
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
            
            ]
    return (
        <>
            <MyPage
                apiFun={tHotelRoomInfoApi.queryByPage}
                columns={columns}
                permissionPrefix={"user:list"}
                addApiFun={tHotelRoomInfoApi.add}
                editApiFun={tHotelRoomInfoApi.edit}
                delApiFun={tHotelRoomInfoApi.deleteById}
                showOpeation={false}
                searchConfigList={searchConfigList}
            />
        </>
    )
}
export default THotelRoomInfo
