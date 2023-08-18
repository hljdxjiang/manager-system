import React, { useRef, FC, useState } from 'react'
import { Button, Col, Input, Modal, Row, } from 'antd'
import tHotelRoomPriceApi from '@/api/hotel/tHotelRoomPrice'
import MySelect from '@/components/common/mySelect';
import MyTable from '@/components/common/table';

const THotelRoomPrice: FC = () => {
  const [selectKeys, setSelectKeys] = useState([]);
  const [record, setRecord] = useState(Object);
  const [view, setView] = useState(false)
  const [key, setKey] = useState(String)
  const tableRef: RefType = useRef()

  const onSelectRow = (rowKeys: string[]) => {
    setSelectKeys(rowKeys);
    console.log(selectKeys)
  }

  const doOk = () => {
    console.log("doOk", record)
    record.status = 0;
    setView(false)
    tHotelRoomPriceApi.edit(record).then((res) => {
      console.log(res)
      setTimeout(() => {
        setKey((Math.random() * 10).toString())
      })
    }).catch((err) => {
      console.log(err)
    })
  }
  const doCancel = () => {
    setRecord({})
    setView(false)
  }

  const doEdit = (record) => {
    console.log(record)
    setRecord(record)
    setView(true)
  }


  const onChange = (e, stype?, sid?) => {
    var newRow = { ...record, [e.target.id]: e.target.value }
    console.log("onChange", newRow)
    setRecord(newRow)
  }

  const getStatus = (status) => {
    switch (status) {
      case 1:
        return "售罄";
        break;
      case 2:
        return "涨价"
        break;
      case 3:
        return "降价"
        break;
      default:
        return status
    }


  }
  // 搜索栏配置项
  const searchConfigList = [
    {
      key: 'hotelId',
      slot: <Input placeholder="酒店ID" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'roomId',
      slot: <Input placeholder="房间ID" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'date',
      slot: <Input placeholder="入住日期" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'status',
      slot: <MySelect
        data={[
          { name: '全部', key: '99' },
          { name: '售罄', key: '1' },
          { name: '涨价', key: '2' },
          { name: '降价', key: '3' }
        ]}
        placeholder="状态"
      />,
      rules: [],
      initialValue: '99'
    }
  ]
  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      tableShow: false,
    }

    , {
      title: '酒店ID',
      key: 'hotelId',
      dataIndex: 'hotelId',
    }


    , {
      title: '房间ID',
      key: 'roomId',
      dataIndex: 'roomId',
    }

    , {
      title: '支付方式0预付1现付',
      key: 'paymentType',
      dataIndex: 'paymentType',
      tableShow: false,
    }

    , {
      title: '入住日期',
      key: 'date',
      dataIndex: 'date',
    }

    , {
      title: '官方价格',
      key: 'price',
      dataIndex: 'price',
    }

    , {
      title: '库存',
      key: 'stock',
      dataIndex: 'stock',
    }

    , {
      title: '确认方式:0不支持即时确认1支持即时确认',
      key: 'confirmType',
      dataIndex: 'confirmType',
      tableShow: false,
    }

    , {
      title: '早餐规则',
      key: 'breakfast',
      dataIndex: 'breakfast',
      tableShow: false,
    }

    , {
      title: '上次官方价格',
      key: 'lastJustPrice',
      dataIndex: 'lastJustPrice',
    }

    , {
      title: '上次上架价格',
      key: 'lastMyPrice',
      dataIndex: 'lastMyPrice',
    }

    , {
      title: '当前上架价格',
      key: 'myPrice',
      dataIndex: 'myPrice',
    }      , {
      title: '协议价格',
      key: "agreementPrice",
      dataIndex: 'agreementPrice',
    }

    , {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => (
        getStatus(record["status"])
      )
    }, {
      title: '变动金额',
      key: 'diffPrice',
      dataIndex: 'diffPrice',
    }, {
      title: '操作',
      key: 'operations',
      dataIndex: 'operations',
      align: 'center',
      editFlag: false,
      render: (text, record) => (
        <>
          <Button className="btn" onClick={() => { doEdit(record) }} size="small">
            维护
          </Button>
        </>
      )
    }

  ]
  return (
    <>
      <MyTable
      key={key}
        apiFun={tHotelRoomPriceApi.query}
        columns={columns}
        ref={tableRef}
        onSelectRow={onSelectRow}
        searchConfigList={searchConfigList}
      />

      <Modal title={"输入房间价格"} onOk={doOk} onCancel={doCancel} visible={view} width={"60%"}>
        <Row gutter={24}>
          <Col span={4}>
            <span>上架金额</span>
          </Col>
          <Col span={8}>
            <Input placeholder={"输入房间上架金额"} id="myPrice" value={record.myPrice}
              allowClear onChange={onChange} />
          </Col>
          <Col span={4}>
            <span>协议金额</span>
          </Col>
          <Col span={8}>
            <Input placeholder={"请输入协议价格"} id="agreementPrice" value={record.agreementPrice}
              allowClear onChange={onChange} />
          </Col>
        </Row>
      </Modal>
    </>
  )
}
export default THotelRoomPrice
