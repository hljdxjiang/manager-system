import React, {
  FC, useEffect, useState
} from 'react'
import { Descriptions, Input, Button, Table, Modal, Row, Col } from 'antd'
import "./index.less"
import tHotelRoomPrice from '@/api/hotel/tHotelRoomPrice'
import { TablePaginationConfig } from 'antd/lib/table'
import { onItemChange } from '@/utils/tableCommon'
import tHotelRoomPriceApi from '@/api/hotel/tHotelRoomPrice';

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

interface TableParam {
  pagination?: TablePaginationConfig
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
    const [pageSize, setPageSize] = useState(20)
    const [pageNum, setPageNum] = useState(1)
    const [total, setTotal] = useState(0)
    const [view, setView] = useState(false)
    const [key, setKey] = useState(String)
    const [priceRecord, setPriceRecord] = useState(Object)



    useEffect(() => {
      const obj = {}
      obj["roomId"] = row["roomId"];
      obj["pageSize"] = pageSize;
      obj["pageNum"] = pageNum;
      console.log("begin useEffect", obj)
      tHotelRoomPrice.queryByPage(obj).then((response) => {
        const total = response.total;
        setTotal(Number(total));
        const list = response.list;
        setPriceList(list)

      }).catch((err) => {

      })
      // setAddedRooms(res["data"]["addedRooms"])
      // setAddedRooms(res["data"]["newRooms"])
    }, [pageSize, pageNum, key])

    var desColumns = [
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
        title: '支付方式0预付1现付',
        dataIndex: 'paymentType',
        key: 'paymentType',
      }

      , {
        title: '平均价格',
        dataIndex: 'averageprice',
        key: 'averageprice',
      }

      , {
        title: '入住日期',
        dataIndex: 'date',
        key: 'date',
      }

      , {
        title: '官方报价',
        dataIndex: 'price',
        key: 'price',
      }

      , {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
      }

      , {
        title: '确认方式:0不支持即时确认1支持即时确认',
        dataIndex: 'confirmType',
        key: 'confirmType',
      }

      , {
        title: '上次上架价格',
        dataIndex: 'lastJustPrice',
        key: 'lastJustPrice',
      }
      , {
        title: '当前上架价格',
        dataIndex: 'myPrice',
        key: 'myPrice',
      }, {
        title: '协议价格',
        dataIndex: 'agreementPrice',
        key: 'agreementPrice',
      }, {
        title: '官方价格',
        dataIndex: 'price',
        key: 'price',
      }
      , {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      }, {

        title: '操作',
        key: 'operations',
        dataIndex: 'operations',
        render: (text, record) => (
          <>
            {canEdit &&
              <Button className="btn" size="small" onClick={() => doEdit(record)}>
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
      console.log("createInput", row)
      return <Input placeholder={item["title"]} id={item["dataIndex"]} allowClear value={row[item["dataIndex"]]} disabled={true} />
    }

    const doOk = () => {
      console.log("doOk", priceRecord)
      setView(false)
      tHotelRoomPriceApi.edit(priceRecord).then((res) => {
        console.log(res)
        setTimeout(() => {
          setKey((Math.random() * 10).toString())
        })
      }).catch((err) => {
        console.log(err)
      })
    }
    const doCancel = () => {
      setPriceRecord({})
      setView(false)
    }

    const doEdit = (record) => {
      console.log(record)
      setPriceRecord(record)
      setView(true)
    }

    const onChange = (e, stype?, sid?) => {
      var newRow = { ...priceRecord, [e.target.id]: e.target.value }
      console.log("onChange", newRow)
      setPriceRecord(newRow)
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
        }} dataSource={priceList} scroll={{ y: "20%" }} key={key}></Table>
        <Modal title={"输入房间价格"} onOk={doOk} onCancel={doCancel} visible={view} width={"60%"}>
          <Row gutter={24}>
            <Col span={4}>
              <span>上架金额</span>
            </Col>
            <Col span={8}>
              <Input placeholder={"输入房间上架金额"} id="myPrice" value={priceRecord["myPrice"]}
                allowClear onChange={onChange} />
            </Col>
            <Col span={4}>
              <span>协议金额</span>
            </Col>
            <Col span={8}>
              <Input placeholder={"请输入协议价格"} id="agreementPrice" value={priceRecord["agreementPrice"]}
                allowClear onChange={onChange} />
            </Col>
          </Row>
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
