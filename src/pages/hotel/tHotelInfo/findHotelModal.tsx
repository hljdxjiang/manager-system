import React, {
  FC, useRef, useState
} from 'react'
import {AlignType} from "rc-table/lib/interface"
import { Modal, Input, Button, Table, List, message } from 'antd';
import hotelApi from '@/api/hotel/hotelApi'
import tHotelInfo from '@/api/hotel/tHotelInfo'
import { onItemChange } from '@/utils/tableCommon'

/**
 * 封装对话框，展示修改内容
 * canEdit 是否可修改
 * onOk 点击确认方法
 * onCancel 点击取消方法
 * visible 是否展示
 * width 宽度
 * cancelText 取消按钮文本
 * okText 确认按钮文本
 * title 标题
 * keyboard 是否支持esc按钮关闭
 * columns 展示列
 */

interface ModalProps {
  onCancel?: (arg0?: unknown) => void
  onOk?: (arg0?: unknown) => void
}

const FindHotelModal: FC<ModalProps> = (
  (props: ModalProps) => {
    /**
     * 引用父组件的ref实例，成为子组件的一个参数
     * 可以引用父组件的ref绑定到子组件自身的节点上.
     */
    const {
      onOk,
      onCancel,
    } = props

    const [key, setKey] = useState(String)
    const [param, setParam] = useState(Object);
    const [data, SetData] = useState([]);

    const columns = [
      {
        title: '酒店ID',
        key:'hotelID',
        dataIndex: 'hotelID',
      }

      , {
        title: '酒店名称',
        key:'hotelName',
        dataIndex: 'hotelName',
      }

      , {
        title: '城市名称',
        key:'cityName',
        dataIndex: 'cityName',
      }

      , {
        title: '地址',
        key:'address',
        dataIndex: 'address',

      }, {
        title: '价格',
        key:'startingPrice',
        dataIndex: 'startingPrice',

      }

      , {
        title: '酒店星级',
        key:'hotelStar',
        dataIndex: 'hotelStar',
      },{
        title: '操作',
        key:'operations',
        dataIndex: 'operations',
        align: "center" as AlignType,
        render: (text, record) => (
          <>
            {record["addedFlag"] === "N" && (
              <Button className="btn" onClick={() => { doAdd(record) }} size="small">
                添加
              </Button>
            )}
            {record["addedFlag"] === "Y" && (
              "已添加"
            )}
          </>
        )
      }
    ]

    const doSearch = () => {
      if(param.queryText===undefined){
        message.error("酒店所在城市必输")
        return;
      }
      const res = hotelApi.findHotel(param)
      res.then((response) => {
        if(response.list.length){
          SetData(response.list)
        }else{
          message.info("没有符合条件的数据")
        }
      }).catch((err) => {
        message.error(err)
      })
    }

    const doAdd=(record)=>{
      record.hotelId=record.hotelID
      record.mainImg=record.mainImage
      record.currentPrice=record.startingPrice
      tHotelInfo.add(record).then((response) => {
        console.log("doSearch",response)
        setTimeout(()=>{
          doSearch()
        },500)
      }).catch((err) => {
      });
    }

    const onChange = (e, stype?, sid?) => {
      var newRow={ ...param, [e.target.id]: e.target.value }
      console.log("onChange",newRow)
      setParam(newRow)
    }


    return (
      <div>
        <span>
        <Input placeholder={"请输入所在城市"} id={"cityName"} allowClear value={param["cityName"]} onChange={onChange}
        style={{ width: "30%" }}/>
        <Input placeholder={"请输入酒店名称"} id={"queryText"} allowClear value={param["queryText"]} onChange={onChange}
        style={{ width: "50%" }}/>
        <Button className="fr" onClick={doSearch} type="primary">
          搜索
        </Button>
        </span>
        <Table dataSource={data} columns={columns} bordered scroll={{ y: 400 }} key={key}></Table>
      </div >
    )
  }
)

FindHotelModal.defaultProps = {
  onOk: () => { },
  onCancel: () => { },
}

export default FindHotelModal
