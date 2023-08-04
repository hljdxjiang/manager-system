import React, { useRef, FC, useState } from 'react'
import { Button, Input, Modal, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tHotelInfoApi from '@/api/hotel/tHotelInfo'
import MyTable from '@/components/common/table';
import HotelRoomDetail from './hotelRoomDetail'

const THotelRoomInfo: FC = () => {

  const permissionPrefix = "user:list";
  const tableRef: RefType = useRef()
  const [visible, setVisible] = useState(false);
  const [selectRow, setSelectRow] = useState(Object);
  const [selectKeys, setSelectKeys] = useState([]);
  const [canEdit, setCanEdit] = useState(false)
  // 添加
  const add = () => {
    setVisible(true)
    setSelectRow({});
  }

  const onSelectRow = (rowKeys: string[]) => {
    setSelectKeys(rowKeys);
    console.log(selectKeys)
  }

  // 编辑
  const doEdit = (record) => {
    setSelectRow(record)
    setCanEdit(true)
    setVisible(true)
  }
  // 查看
  const doView = (record) => {
    setSelectRow(record)
    setCanEdit(false)
    setVisible(true)
  }

  const doBack = () => {
    console.log("doback begin")
    setSelectRow({})
    setVisible(false)
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
      tableShow: false,
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
        {!visible &&(<MyTable
          apiFun={tHotelInfoApi.queryByPage}
          columns={columns}
          ref={tableRef}
          onSelectRow={selectRow}
          searchConfigList={searchConfigList}
          extraProps={{ results: 10 }}
        />)}
        {visible&&(<HotelRoomDetail title={"酒店信息"} row={selectRow} doBack={doBack} canEdit={canEdit}/>)}

    </>
  )
}
export default THotelRoomInfo
