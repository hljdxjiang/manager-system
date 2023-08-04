import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tHotelInfoApi from '@/api/hotel/tHotelInfo'
import { onItemChange } from "@/utils/tableCommon";
import MyTable from '@/components/common/table';
import MyModal from '@/components/common/myModal'
import hotelApi from '@/api/hotel/hotelApi';
import HotelAddModel from './hotelAddModel';
import "./index.less"

const THotelInfo: FC = () => {

  const permissionPrefix = "user:list";
  const tableRef: RefType = useRef()
  const [open, setOpen] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [addFlag, setAddFlag] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [selectRow, setSelectRow] = useState(Object);
  const [selectKeys, setSelectKeys] = useState([]);
  const [key, setKey] = useState(String)
  // 添加
  const add = () => {
    setOpen(true)
    setEditFlag(false)
    setAddFlag(true)
    setCanEdit(true)
    setSelectRow({});
  }
  const delBatch = () => {
    console.log(selectKeys)
  }

  // 新增按钮
  const AddBtn = () => (
    <Button className="fr" onClick={add} type="primary">
      新增
    </Button>
  )

  // 新增按钮
  const BatchDelBtn = () => (
    <Button className="fr" style={{ marginRight: "10px" }} onClick={delBatch} type="primary">
      删除
    </Button>
  )

  const onSelectRow = (rowKeys: string[]) => {
    setSelectKeys(rowKeys);
    console.log(selectKeys)
  }

  const handleOk = () => {
    var row = selectRow;
    row["edit"] = selectRow["edit"].toHTML();
    setSelectRow({});
    setCanEdit(false)
    setOpen(false)
    setKey((Math.random() * 10).toString())
  }

  const handCancle = () => {
    setSelectRow({});
    setCanEdit(false)
    setOpen(false)
  }

  const onHotelAdd=(record)=>{
    setAddFlag(false);
    setEditFlag(true);
    setSelectRow(record)
  }

  const onChange = (e, stype?, sid?) => {
    var newRow = onItemChange(selectRow, e, stype, sid);
    setSelectRow(newRow)
  }

  // 编辑
  const doEdit = (record) => {
    setSelectRow(record)
    setOpen(true)
    setCanEdit(true)
  }
  // 查看
  const doView = (record) => {
    setSelectRow(record)
    setOpen(true)
    setCanEdit(false)
  }
  const doDel = (record) => {
    tHotelInfoApi.deleteById(record)
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
    , {
      key: 'cityName',
      slot: <Input placeholder="城市名称" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'userId',
      slot: <Input placeholder="管理员ID" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'status',
      slot: <Input placeholder="状态0正常9下架" allowClear />,
      rules: [],
      initialValue: ''
    }
  ]
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      tableShow: false,
    }

    , {
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
      title: '地址',
      dataIndex: 'address',
      tableShow: false,
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
      title: '所属分组ID',
      dataIndex: 'groupId',
      tableShow: false,
    }

    , {
      title: '管理员ID',
      dataIndex: 'userId',
    }

    , {
      title: '状态0正常9下架',
      dataIndex: 'status',
    }

    , {
      title: '创建时间',
      dataIndex: 'createTime',
    }

    , {
      title: '最后修改时间',
      dataIndex: 'lastModifiedTime',
    }

    , {
      title: '备注',
      dataIndex: 'remark',
    }

    , {
      title: '经理姓名',
      dataIndex: 'managerName',
    }

    , {
      title: '经理性别',
      dataIndex: 'managerGender',
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
              编辑
            </Button>
          )}
          <Button className="btn" onClick={() => { doView(record) }} size="small">
            查看
          </Button>
          {isAuthorized(permissionPrefix + ':add') && (<Button className="btn" onClick={() => doDel(record)} size="small">
            删除
          </Button>)}
        </>
      )
    }
  ]
  return (
    <>
      {isAuthorized(permissionPrefix + ':add') && <AddBtn />}
      {isAuthorized(permissionPrefix + ':del') && <BatchDelBtn />}
      <MyTable
        key={key}
        apiFun={hotelApi.findHotel}
        columns={columns}
        ref={tableRef}
        onSelectRow={selectRow}
        searchConfigList={searchConfigList}
        extraProps={{ results: 10 }}
      />
      <MyModal title="酒店详情" visible={open && editFlag} onCancel={handCancle} onOk={handleOk} columns={columns}
        canEdit={canEdit} row={selectRow} onChange={onChange} />
      <HotelAddModel title="添加酒店" visible={open && addFlag} onCancel={handCancle} onOk={handleOk}
        row={selectRow} />
    </>
  )
}
export default THotelInfo
