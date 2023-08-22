import React, {
  FC, useEffect, useState
} from 'react'
import { Descriptions, Input, Button, Table, Popconfirm, Modal, Row, Col } from 'antd'
import hotelApi from '@/api/hotel/hotelApi'
import tHotelRoomInfo from '@/api/hotel/tHotelRoomInfo'
import "./index.less"
import { onItemChange } from '@/utils/tableCommon'
import MyModal from '@/components/common/myModal'
import { AlignType } from 'rc-table/lib/interface';

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
  onView?: (arg0?: unknown) => void
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
      onView,
      doBack,
    } = props


    const back = () => {
      doBack()
    }

    const [key, setKey] = useState(String)
    const [addedRooms, setAddedRooms] = useState([])
    const [newRooms, setNewRooms] = useState([])
    const [show, setShow] = useState(false)
    const [editShow, setEditShow] = useState(false)
    const [homeRecord, setHomeRecord] = useState(Object)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
      if (row === undefined) {
        console.log("useEffect key undefined")
        return;
      }
      var obj={}
      obj["hotelID"]=row["hotelId"];
      const res = hotelApi.roomDetail(obj)
      res.then((response) => {
        setNewRooms(response.newRooms)
        setAddedRooms(response.addedRooms)
      }).catch((err) => {

      })
      // setAddedRooms(res["data"]["addedRooms"])
      // setAddedRooms(res["data"]["newRooms"])
    }, [key, row])

    const doEdit=(record)=>{
      setHomeRecord(record)
      setEditShow(true)
      setEdit(true)
      setShow(false)
    }

    const doView=(record)=>{
      setHomeRecord(record)
      setEditShow(true)
      setEdit(false)
      setShow(false)
    }


    const doOk = (type) => {
      var newRecord = Object.assign(homeRecord, row)
      tHotelRoomInfo.add(newRecord)
      setTimeout(() => {
        setKey((Math.random() * 10).toString())
        setShow(false)
        setEditShow(false)
      }, 500)
    }
    const doAdd = (record) => {
      setHomeRecord(record)
      setShow(true)
    }

    const doCancel = (record) => {
      setHomeRecord({})
      setShow(false)
      setEditShow(false)
    }

    const del = (record) => {
      tHotelRoomInfo.deleteById(record)
      setTimeout(() => {
        setKey((Math.random() * 10).toString())
      }, 500)
    }

    var columns = [
      {
        title: '酒店ID',
        key: "hotelId",
        dataIndex: 'hotelId',
      }

      , {
        title: '酒店名称',
        key: "hotelName",
        dataIndex: 'hotelName',
      }

      , {
        title: '城市名称',
        key: "cityName",
        dataIndex: 'cityName',
      }
    ]

    var addedHotelColumns = [
      {
        title: '房间名称',
        key: "roomName",
        width:200,
        dataIndex: 'roomName',
      }
      , {
        title: '房间面积',
        width:120,
        key: "useableArea",
        dataIndex: 'useableArea',
        align: "center" as AlignType,
      }

      , {
        title: '容量',
        width:80,
        key: "capacity",
        dataIndex: 'capacity',
        align: "center" as AlignType,
      }

      , {
        title: '床型描述',
        key: "bedType",
        width:120,
        dataIndex: 'bedType',
        align: "center" as AlignType,
      },
      , {
        title: '当前上架价格',
        key: "currentPrice",
        width:120,
        dataIndex: 'currentPrice',
        align: "center" as AlignType,
      }, {
        title: '官方价格',
        width:120,
        dataIndex: 'price',
        align: "center" as AlignType,
        key: 'price',
      }

      , {
        title: '状态',
        width:80,
        key: "status",
        align: "center" as AlignType,
        dataIndex: 'status',
      },{
        title: '操作',
        key:'operations',
        align: "center" as AlignType,
        with:120,
        dataIndex: 'operations',
        render: (text, record) => (
          <>
            <Button className="btn" size="small" onClick={() => onView(record)}>
              价格
            </Button>
            <Button className="btn" size="small" onClick={() => doEdit(record)}>
              修改
            </Button>
            {canEdit && (
              <Popconfirm title={"确认删除"} onConfirm={() => del(record)}>
                <Button className="btn" size="small">
                  删除
                </Button>
              </Popconfirm>)
            }
          </>
        )
      }
    ]

    var editColumns = [
      {
        title: '房间名称',
        key: "roomName",
        dataIndex: 'roomName',
      }
      , {
        title: '房间面积',
        with:60,
        key: "useableArea",
        dataIndex: 'useableArea',
      }

      , {
        title: '楼层',
        key: "floor",
        with:20,
        dataIndex: 'floor',
      }

      , {
        title: '房间容量',
        with:60,
        key: "capacity",
        dataIndex: 'capacity',
      }

      , {
        title: '床型描述',
        key: "bedType",
        dataIndex: 'bedType',
      },
      , {
        title: '当前上架价格',
        key: "currentPrice",
        dataIndex: 'currentPrice',
      }

      , {
        title: '涨价提示范围(金额或%)',
        key: "confirmUpPrice",
        dataIndex: 'confirmUpPrice',
      }, {
        title: '降价提示范围(金额或%)',
        key: "confirmDownPrice",
        dataIndex: 'confirmDownPrice',
      }
      , {
        title: '协议价格',
        key: "agreementPrice",
        dataIndex: 'agreementPrice',
      }
      , {
        title: '状态',
        key: "status",
        dataIndex: 'status',
      }
    ]

    var newHotelColumns = [
      {
        title: '房间名称',
        key: "roomName",
        dataIndex: 'roomName',
      }

      , {
        title: '房间面积',
        key: "useableArea",
        dataIndex: 'useableArea',
      }

      , {
        title: '楼层',
        key: "floor",
        dataIndex: 'floor',
      }

      , {
        title: '房间容量',
        key: "capacity",
        dataIndex: 'capacity',
      },
      , {
        title: '最新价格',
        key: "price",
        dataIndex: 'price',
      }

      , {
        title: '床型描述',
        key: "bedType",
        dataIndex: 'bedType',
      }, {
        title: '操作',
        key: "operations",
        dataIndex: 'operations',
        render: (text, record) => (
          <>
            {canEdit && (<Button className="btn" onClick={() => doAdd(record)} size="small">
              添加
            </Button>)}
          </>
        )
      }]


    const onChange = (e, stype?, sid?) => {
      var newRow={ ...homeRecord, [e.target.id]: e.target.value }
      setHomeRecord(newRow)
    }


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
        <MyModal title={"修改信息"} row={homeRecord} columns={editColumns} onChange={onChange}
        visible={editShow} onOk={()=>doOk("edit")} onCancel={doCancel} canEdit={edit}>

        </MyModal>
        <Modal title={"输入房间信息"} onOk={()=>doOk("add")} onCancel={doCancel} visible={show} width={"80%"}>
          <Row gutter={24}>
            <Col span={4}>
              <span>上架金额</span>
            </Col>
            <Col span={8}>
              <Input placeholder={"输入房间上架金额"} id="currentPrice" value={homeRecord["currentPrice"]} allowClear onChange={onChange} />
            </Col>
            <Col span={4}>
              <span>协议价格</span>
            </Col>
            <Col span={8}>
              <Input placeholder={"请输入协议价格"}  id="agreementPrice" value={homeRecord["agreementPrice"]} allowClear onChange={onChange} />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={4}>
              <span>涨价提示范围(金额或%)</span>
            </Col>
            <Col span={8}>
              <Input placeholder={"涨价提示范围(金额或%)"}id="confirmUpPrice"  value={homeRecord["confirmUpPrice"]} allowClear onChange={onChange} />
            </Col>
            <Col span={4}>
              <span>降价提示范围(涨价提升金额)</span>
            </Col>
            <Col span={8}>
              <Input placeholder={"降价提示范围(金额或%)"}id="confirmDownPrice"  value={homeRecord["confirmDownPrice"]} allowClear onChange={onChange} />
            </Col>
          </Row>
        </Modal>
      </>)
  }
)

HotelRoomDetail.defaultProps = {
  row: {},
  canEdit: false,
  onOk: () => { },
  onCancel: () => { },
  doBack: () => { },
  onView: () => { },
  width: "80%",
  cancelText: "取消",
  okText: "确认",
  keyboard: true,
  title: "编辑"
}

export default HotelRoomDetail
