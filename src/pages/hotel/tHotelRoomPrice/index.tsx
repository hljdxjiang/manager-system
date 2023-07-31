import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tHotelRoomPriceApi from '@/api/hotel/tHotelRoomPrice'
import { onItemChange } from "@/utils/tableCommon";
import MyPage from '@/components/common/myPage';

const THotelRoomPrice: FC = () => {
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
                    key:'ratePlanid',
                slot: <Input placeholder="产品价格ID" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'paymentType',
                slot: <Input placeholder="支付方式0预付1现付" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'averageprice',
                slot: <Input placeholder="平均价格" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'date',
                slot: <Input placeholder="入住日期" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'price',
                slot: <Input placeholder="入住价格" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'stock',
                slot: <Input placeholder="库存" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'confirmType',
                slot: <Input placeholder="确认方式:0不支持即时确认1支持即时确认" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'breakfast',
                slot: <Input placeholder="早餐规则" allowClear />,
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
                    key:'myPrice',
                slot: <Input placeholder="当前上架价格" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'confirmUpPrice',
                slot: <Input placeholder="价格上浮提醒差额" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'confirmDownPrice',
                slot: <Input placeholder="价格下浮提醒差额" allowClear />,
                rules: [],
                initialValue: ''
            }
                                ,{
                    key:'status',
                slot: <Input placeholder="状态0正常9下架" allowClear />,
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
                        title: '产品价格ID',
            dataIndex: 'ratePlanid',
            }
            
                                                ,{
                        title: '支付方式0预付1现付',
            dataIndex: 'paymentType',
            }
            
                                                ,{
                        title: '平均价格',
            dataIndex: 'averageprice',
            }
            
                                                ,{
                        title: '入住日期',
            dataIndex: 'date',
            }
            
                                                ,{
                        title: '入住价格',
            dataIndex: 'price',
            }
            
                                                ,{
                        title: '库存',
            dataIndex: 'stock',
            }
            
                                                ,{
                        title: '确认方式:0不支持即时确认1支持即时确认',
            dataIndex: 'confirmType',
            }
            
                                                ,{
                        title: '早餐规则',
            dataIndex: 'breakfast',
            }
            
                                                ,{
                        title: '上次调整时的价格',
            dataIndex: 'lastJustPrice',
            }
            
                                                ,{
                        title: '当前上架价格',
            dataIndex: 'myPrice',
            }
            
                                                ,{
                        title: '价格上浮提醒差额',
            dataIndex: 'confirmUpPrice',
            }
            
                                                ,{
                        title: '价格下浮提醒差额',
            dataIndex: 'confirmDownPrice',
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
            
            ]
    return (
        <>
            <MyPage
                apiFun={tHotelRoomPriceApi.queryByPage}
                columns={columns}
                permissionPrefix={"user:list"}
                addApiFun={tHotelRoomPriceApi.add}
                editApiFun={tHotelRoomPriceApi.edit}
                delApiFun={tHotelRoomPriceApi.deleteById}
                showOpeation={false}
                searchConfigList={searchConfigList}
            />
        </>
    )
}
export default THotelRoomPrice
