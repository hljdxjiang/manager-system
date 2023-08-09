import React, {
  FC, useEffect, useState
} from 'react'
import { Descriptions, Input, Button, Table, Modal } from 'antd'
import "./index.less"
import tHotelRoomPrice from '@/api/hotel/tHotelRoomPrice'
import { TablePaginationConfig } from 'antd/lib/table'

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
  onView?: (arg0?: unknown) => void
  canEdit?: boolean
  width?: string | number
  cancelText?: String
  okText?: String
  keyboard?: boolean
  title?: String
}

interface TableParam{
  pagination?:TablePaginationConfig
}

const HotelRoomPrice: FC<ModalProps> = (
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
      onView,
    } = props

    const back = () => {
      console.log("back begin")
      doBack()
    }
    const [priceList, setPriceList] = useState([])
    const [pageSize,setPageSize] =useState(20)
    const [pageNum,setPageNum] =useState(1)
    const [total,setTotal] =useState(0)
    const [view,setView] =useState(false)
    const [price,setPrice] =useState(String)
    const [key,setKey] =useState(String)
    const [priceRecord,setPriceRecord] =useState(Object)



    useEffect(() => {
      const obj={}
      obj["roomId"]=row["roomId"];
      obj["pageSize"]=pageSize;
      obj["pageNum"]=pageNum;
      console.log("begin useEffect",obj)
      const res = tHotelRoomPrice.queryByPage(obj)
      res.then((response) => {
        const total=response.total;
        setTotal(Number(total));
        const list=response.list;
        setPriceList(list)

      }).catch((err) => {

      })
      // setAddedRooms(res["data"]["addedRooms"])
      // setAddedRooms(res["data"]["newRooms"])
    }, [pageSize,pageNum])

    var desColumns=[
      {
        title: '房间ID',
        key: "roomId",
        dataIndex: 'roomId',
      }

      , {
        title: '房间名称',
        key: "roomName",
        dataIndex: 'roomName',
      }
    ]

    var columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      }

      , {
        title: '酒店ID',
        dataIndex: 'hotelId',
      }


      , {
        title: '房间ID',
        dataIndex: 'roomId',
      }

      , {
        title: '产品价格ID',
        dataIndex: 'ratePlanid',
      }

      , {
        title: '支付方式0预付1现付',
        dataIndex: 'paymentType',
      }

      , {
        title: '平均价格',
        dataIndex: 'averageprice',
      }

      , {
        title: '入住日期',
        dataIndex: 'date',
      }

      , {
        title: '入住价格',
        dataIndex: 'price',
      }

      , {
        title: '库存',
        dataIndex: 'stock',
      }

      , {
        title: '确认方式:0不支持即时确认1支持即时确认',
        dataIndex: 'confirmType',
      }

      , {
        title: '早餐规则',
        dataIndex: 'breakfast',
      }

      , {
        title: '上次调整时的价格',
        dataIndex: 'lastJustPrice',
      }

      , {
        title: '当前上架价格',
        dataIndex: 'myPrice',
      }

      , {
        title: '价格上浮提醒差额',
        dataIndex: 'confirmUpPrice',
      }

      , {
        title: '价格下浮提醒差额',
        dataIndex: 'confirmDownPrice',
      }

      , {
        title: '状态0正常9下架',
        dataIndex: 'status',
      },{ 

        title: '操作', 

        dataIndex: 'operations',
        render: (text, record) => (
          <>
            {canEdit &&
             <Button className="btn" size="small" onClick={doEdit}>
             修改
           </Button>
            }
          </>
        )
      }
    ]


    const createItems = () => {
      return desColumns.map((item, _) => {
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
      console.log("createInput",row)
      return <Input placeholder={item["title"]} id={item["dataIndex"]} allowClear value={row[item["dataIndex"]]} disabled={true} />
    }

    const doOk=()=>{
      setPrice("");
      setView(false)
      setTimeout(()=>{
        setKey((Math.random() * 10).toString())
      })
    }
    const doCancel=()=>{
      setPrice("");
      setPriceRecord({})
      setView(false)
    }

    const doEdit=(record)=>{
      console.log(record)
      setPriceRecord(record)
      setView(true)
    }

    const onPriceChange = (e, stype?, sid?) => {
      setPrice(e.target.value)
    }
    return (
      <>
        <Button className="btn" onClick={back} size="small">
          返回房间列表
        </Button>
        <Descriptions title={title}>
          {createItems()}
        </Descriptions>
        <Table columns={columns} pagination={{
            total,
            pageSize: pageSize,
            current: pageNum,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            showTotal: (all) => `共 ${all} 条`
          }} dataSource={priceList} scroll={{ y: "20%" }}></Table>
        <Modal title={"输入房间价格"} onOk={doOk} onCancel={doCancel} visible={view}>
          <Input placeholder={"输入房间上架金额"} value={price} allowClear onChange={onPriceChange} />
        </Modal>
      </>)
  }
)

HotelRoomPrice.defaultProps = {
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

export default HotelRoomPrice
