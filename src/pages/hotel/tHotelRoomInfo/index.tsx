import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tHotelInfo from '@/api/hotel/tHotelInfo'
import tHotelInfoApi from '@/api/hotel/tHotelInfo'
import { onItemChange } from "@/utils/tableCommon";
import MyTable from '@/components/common/table';
import MyModal from '@/components/common/myModal'
import HotelRoomModel from './hotelRoomModel';

const THotelRoomInfo: FC = () => {

  const permissionPrefix = "user:list";
  const tableRef: RefType = useRef()
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectRow, setSelectRow] = useState(Object);
  const [selectKeys, setSelectKeys] = useState([]);
  const [key, setKey] = useState(String)
  // 添加
  const add = () => {
    setVisible(true)
    setSelectRow({});
  }
  const delBatch = () => {
    console.log(selectKeys)
  }

  const onSelectRow = (rowKeys: string[]) => {
    setSelectKeys(rowKeys);
    console.log(selectKeys)
  }

  const handleOk = () => {
    setSelectRow({});
    setVisible(false)
  }

  const onChange = (e, stype?, sid?) => {
    var newRow = onItemChange(selectRow, e, stype, sid);
    setSelectRow(newRow)
  }

  // 编辑
  const doEdit = (record) => {
    setSelectRow(record)
    setOpen(true)
  }
  // 查看
  const doView = (record) => {
    setSelectRow(record)
    setOpen(true)
  }
  const doDel = (record) => {
    tHotelInfo.deleteById(record)
    setKey((Math.random() * 10).toString())
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
      key: 'hotelName',
      slot: <Input placeholder="酒店名称" allowClear />,
      rules: [],
      initialValue: ''
    }
  ]

  const tableColumns=[    {
    title: '酒店ID',
    dataIndex: 'hotelId',
  }

  , {
    title: '酒店名称',
    dataIndex: 'hotelName',
  }]
  const columns = [
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
    , {
      title: '酒店星级',
      dataIndex: 'hotelStar',
    }
    , {
      title: '酒店主图',
      dataIndex: 'mainImg',
      tableShow:false,
    }

    , {
      title: '状态0正常9下架',
      dataIndex: 'status',
    }

    , {
      title: '经理姓名',
      dataIndex: 'managerName',
    }
    , {
      title: '经理电话',
      dataIndex: 'managerTel',
    }
    , {
      title: '酒店联系电话',
      dataIndex: 'phone',
    }, {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      editFlag: false,
      render: (text, record) => (
        <>
          {isAuthorized(permissionPrefix + ':edit') && (
            <Button className="btn" onClick={() => { doEdit(record) }} size="small">
              修改
            </Button>
          )}
          <Button className="btn" onClick={() => { doView(record) }} size="small">
            查看
          </Button>
        </>
      )
    }
  ]
  return (
    <>
            <Button className="fr" onClick={add} type="primary">
      新增
    </Button>
    <MyTable
        key={key}
        apiFun={tHotelInfoApi.queryByPage}
        columns={columns}
        ref={tableRef}
        onSelectRow={selectRow}
        searchConfigList={searchConfigList}
        extraProps={{ results: 10 }}
      />
      <HotelRoomModel
        title={"房间管理"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleOk}
        key={key}
        columns={tableColumns}
        row={selectRow}
      />
    </>
  )
}
export default THotelRoomInfo
