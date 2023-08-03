import React, {
  FC, useRef, useState
} from 'react'
import { Modal, Descriptions, Input, Button, Table } from 'antd'
import MyTable from '@/components/common/table'

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
  row?: object
  columns?: Object[]
  onCancel?: (arg0?: unknown) => void
  onOk?: (arg0?: unknown) => void
  onHotelAdd?: (arg0?: unknown) => void
  visible?: boolean
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
      title,onHotelAdd
    } = props

    const doBack=()=>{
      onHotelAdd()
    }

    const [key, setKey] = useState(String)
    const [addedRooms, setAddedRooms] = useState([])
    const [newRooms, setNewRooms] = useState([])
    const tableRef: RefType = useRef()
    const [selectRow, setSelectRow] = useState(Object);

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
        <Descriptions title={title}>
          {createItems()}
        </Descriptions>
        <span style={{ marginLeft: 8 }}>
          {"已添加列表"}
        </span>
        <Table columns={[]} dataSource={addedRooms} scroll={{ y: "30%" }}></Table>
        <span style={{ marginLeft: 8 }}>
          {"新房间列表"}
        </span>
        <Table columns={[]} dataSource={newRooms}  scroll={{ y: "30%" }}></Table>
      </>)
  }
)

HotelRoomDetail.defaultProps = {
  row: {},
  visible: false,
  onOk: () => { },
  onCancel: () => { },
  onHotelAdd: () => { },
  width: "80%",
  cancelText: "取消",
  okText: "确认",
  keyboard: true,
  title: "编辑"
}

export default HotelRoomDetail
