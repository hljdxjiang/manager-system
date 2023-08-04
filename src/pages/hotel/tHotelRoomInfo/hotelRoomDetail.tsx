import React, {
  FC, useEffect, useRef, useState
} from 'react'
import { Descriptions, Input, Button, Table } from 'antd'
import hotelApi from '@/api/hotel/hotelApi'
import tHotelRoomInfo from '@/api/hotel/tHotelRoomInfo'
import "./index.less"
import { response } from 'msw'

/**
 * 封装对话框，展示修改内容
 * canEdit 是否可修改
 * onOk 点击确认方法
 * onCancel 点击取消方法
 * canEdit 是否展示
 * width 宽度
 * cancelText 取消按钮文本
 * okText 确认按钮文本
 * title 标题
 * keyboard 是否支持esc按钮关闭
 * columns 展示列
 */

interface ModalProps {
  row?: object
  columns?: Object[]
  onCancel?: (arg0?: unknown) => void
  onOk?: (arg0?: unknown) => void
  doBack?: (arg0?: unknown) => void
  canEdit?: boolean
  width?: string | number
  cancelText?: String
  okText?: String
  keyboard?: boolean
  title?: String
}

const HotelRoomDetail: FC<ModalProps> = (
  (props: ModalProps) => {
    /**
     * 引用父组件的ref实例，成为子组件的一个参数
     * 可以引用父组件的ref绑定到子组件自身的节点上.
     */
    const {
      row,
      canEdit,
      title,
      doBack,
    } = props

    const back = () => {
      console.log("back begin")
      doBack()
    }

    const [key, setKey] = useState(String)
    const [addedRooms, setAddedRooms] = useState([])
    const [newRooms, setNewRooms] = useState([])

    useEffect(() => {
      console.log("useEffect key")
      if(row===undefined){
        console.log("useEffect key undefined")
        return;
      }
      const res=hotelApi.roomDetail(row)
      res.then((response)=>{
        setNewRooms(response.newRooms)
        setAddedRooms(response.addedRooms)
      }).catch((err)=>{

      })
      // setAddedRooms(res["data"]["addedRooms"])
      // setAddedRooms(res["data"]["newRooms"])
    }, [key,row])

    const add = (record) => {
      var newRecord=Object.assign(record,row)
      tHotelRoomInfo.add(newRecord)
      setKey((Math.random() * 10).toString())
    }

    const del = (record) => {
      tHotelRoomInfo.deleteById(record)
      setKey((Math.random() * 10).toString())
    }

    var columns = [
      {
        title: '酒店ID',
        dataIndex: 'hotelId',
      }

      , {
        title: '酒店名称',
        dataIndex: 'hotelName',
      }

      , {
        title: '城市名称',
        dataIndex: 'cityName',
      }
    ]

    var addedHotelColumns = [
      {
        title: '房间ID',
        dataIndex: 'roomId',
      }

      , {
        title: '房间名称',
        dataIndex: 'roomName',
      }

      , {
        title: '房间面积',
        dataIndex: 'useableArea',
      }

      , {
        title: '楼层',
        dataIndex: 'floor',
      }

      , {
        title: '房间容量',
        dataIndex: 'capacity',
      }

      , {
        title: '床型描述',
        dataIndex: 'bedType',
      }

      , {
        title: '状态0正常9下架',
        dataIndex: 'status',
      },{
        title: '操作',
        dataIndex: 'operations',
        render: (text, record) => (
          <>
            {canEdit && (<Button className="btn" onClick={() => del(record)} size="small">
              删除
            </Button>)}
          </>
        )
      }
    ]

    var newHotelColumns = [
      {
      title: '房间ID',
      dataIndex: 'roomId',
    }

      , {
      title: '房间名称',
      dataIndex: 'roomName',
    }

      , {
      title: '房间面积',
      dataIndex: 'useableArea',
    }

      , {
      title: '楼层',
      dataIndex: 'floor',
    }

      , {
      title: '房间容量',
      dataIndex: 'capacity',
    }

      , {
      title: '床型描述',
      dataIndex: 'bedType',
    },{
      title: '操作',
      dataIndex: 'operations',
      render: (text, record) => (
        <>
          {canEdit && (<Button className="btn" onClick={() => add(record)} size="small">
            添加
          </Button>)}
        </>
      )
    }]

    const createItems = () => {
      return columns.map((item, _) => {
        if (item["editFlag"] === false) {
          return "";
        }
        if (item["span"] !== undefined) {
          return (
            <Descriptions.Item label={item["title"]} span={3}>
              {createInput(item)}
            </Descriptions.Item>
          )
        }
        return (
          <Descriptions.Item label={item["title"]}>
            {createInput(item)}
          </Descriptions.Item>
        )
      })
    }

    const createInput = (item) => {
      return <Input placeholder={item["title"]} id={item["dataIndex"]} allowClear value={row[item["dataIndex"]]} disabled={true} />
    }

    return (
      <>
        <Button className="btn" onClick={back} size="small">
            返回列表
        </Button>
        <Descriptions title={title}>
          {createItems()}
        </Descriptions>
        <span style={{ marginLeft: 8 }}>
          {"已添加列表"}
        </span>
        <Table columns={addedHotelColumns} dataSource={addedRooms} scroll={{ y: "20%" }}></Table>
        <span style={{ marginLeft: 8 }}>
          {"新房间列表"}
        </span>
        <Table columns={newHotelColumns} dataSource={newRooms} scroll={{ y: "20%" }}></Table>
      </>)
  }
)

HotelRoomDetail.defaultProps = {
  row: {},
  canEdit: false,
  onOk: () => { },
  onCancel: () => { },
  doBack: () => { },
  width: "80%",
  cancelText: "取消",
  okText: "确认",
  keyboard: true,
  title: "编辑"
}

export default HotelRoomDetail
