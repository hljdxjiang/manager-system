import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tMessageInfoApi from '@/api/message/tMessageInfo'
import { onItemChange } from "@/utils/tableCommon";
import MyPage from '@/components/common/myPage';

const TMessageInfo: FC = () => {
    const [selectRow, setSelectRow] = useState(Object);
    const [selectKeys, setSelectKeys] = useState([]);
    // 搜索栏配置项
    const searchConfigList = [
                                                                    {
                    key:'hotelName',
                slot: <Input placeholder="酒店名称" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'roomName',
                slot: <Input placeholder="房间名称" allowClear />,
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
                    key:'lastJustPrice',
                slot: <Input placeholder="上次调整时的价格" allowClear />,
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
                    key:'myPrice',
                slot: <Input placeholder="当前上架价格" allowClear />,
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
                slot: <Input placeholder="状态0未读1已读" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'priceDiff',
                slot: <Input placeholder="价格变动" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'price',
                slot: <Input placeholder="当前报价" allowClear />,
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
                        title: '酒店名称',
            dataIndex: 'hotelName',
            }
            
                                                ,{
                        title: '房间名称',
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
                        title: '上次调整时的价格',
            dataIndex: 'lastJustPrice',
            }
            
                                                ,{
                        title: '房间容量',
            dataIndex: 'capacity',
            }
            
                                                ,{
                        title: '当前上架价格',
            dataIndex: 'myPrice',
            }
            
                                                ,{
                        title: '床型描述',
            dataIndex: 'bedType',
            }
            
                                                ,{
                        title: '状态0未读1已读',
            dataIndex: 'status',
            }
            
                                                ,{
                        title: '价格变动',
            dataIndex: 'priceDiff',
            }
            
                                                ,{
                        title: '当前报价',
            dataIndex: 'price',
            }
            
                                                ,{
                        title: '创建时间',
            dataIndex: 'createTime',
            }
            
                                                ,{
                        title: '最后修改时间',
            dataIndex: 'lastModifiedTime',
            }
            
            ]
    return (
        <>
            <MyPage
                apiFun={tMessageInfoApi.queryByPage}
                columns={columns}
                permissionPrefix={"user:list"}
                addApiFun={tMessageInfoApi.add}
                editApiFun={tMessageInfoApi.edit}
                delApiFun={tMessageInfoApi.deleteById}
                showOpeation={false}
                searchConfigList={searchConfigList}
            />
        </>
    )
}
export default TMessageInfo
