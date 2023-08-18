import React, { useRef, FC, useState } from 'react'
import { Button, Input, Modal, } from 'antd'
import { isAuthorized, previewImg } from '@/assets/js/publicFunc'
import tHotelInfoApi from '@/api/hotel/tHotelInfo'
import { onItemChange } from "@/utils/tableCommon";
import MyTable from '@/components/common/table';
import MyModal from '@/components/common/myModal'
import "./index.less"
import FindHotelModal from './findHotelModal';

const THotelInfo: FC = () => {

  const permissionPrefix = "user:list";
  const tableRef: RefType = useRef()
  const [open, setOpen] = useState(false);
  const [addFlag, setAddFlag] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [selectRow, setSelectRow] = useState(Object);
  const [key, setKey] = useState(String)
  // 添加
  const add = () => {
    setOpen(false)
    setAddFlag(true)
    setCanEdit(true)
    setSelectRow({});
  }

  // 新增按钮
  const AddBtn = () => (
    <Button className="fr" onClick={add} type="primary">
      新增
    </Button>
  )
  const getStatus = (status) => {
    switch (status) {
      case 0:
        return "正常";
        break;
      case 9:
        return "下架"
        break;
      default:
        return status
    }

  }

  const handleOk = (typ) => {
    var row = selectRow;
    tHotelInfoApi.edit(row).then((response) => {
      console.log(response)
      setTimeout(() => {
        setSelectRow({});
        setCanEdit(false)
        setOpen(false)
        setKey((Math.random() * 10).toString())
      }, 500)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleAddOk=()=>{
    setSelectRow({});
    setCanEdit(false)
    setAddFlag(false)
    setOpen(false)
    setKey((Math.random() * 10).toString())
  }

  const handCancle = () => {
    setSelectRow({});
    setCanEdit(false)
    setAddFlag(false)
    setOpen(false)
  }

  const doViewImg = (url) => {
    previewImg(<img src={url} width="100%" alt="" />)
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
    setTimeout(()=>{
    setKey((Math.random() * 10).toString())
    })
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
    // , {
    //   key: 'userId',
    //   slot: <Input placeholder="管理员ID" allowClear />,
    //   rules: [],
    //   initialValue: ''
    // }
    , {
      key: 'status',
      slot: <Input placeholder="状态0正常9下架" allowClear />,
      rules: [],
      initialValue: ''
    }
  ]
  const columns = [
    {
      title: '酒店ID',
      key: 'hotelId',
      dataIndex: 'hotelId',
    }

    , {
      title: '酒店名称',
      key: 'hotelName',
      dataIndex: 'hotelName',
    }

    , {
      title: '城市名称',
      key: 'cityName',
      width: '120',
      dataIndex: 'cityName',
    }

    , {
      title: '地址',
      dataIndex: 'address',
      width: '120',
      key: 'address',
      tableShow: false,
    }

    , {
      title: '酒店星级',
      key: 'id',
      width: '120',
      dataIndex: 'hotelStar',
      tableShow: false,
    }
    , {
      title: '酒店主图',
      key: 'mainImg',
      dataIndex: 'mainImg',
      align: 'center',
      editFlag: false,
      render: (text, record) => (
        <>
          <Button className="btn" onClick={() => { doViewImg(record["mainImg"]) }} size="small">
            查看
          </Button>
        </>
      )
    }
    // , {
    //   title: '所属分组ID',
    //   key: 'groupId',
    //   dataIndex: 'groupId',
    //   tableShow: false,
    // }

    // , {
    //   title: '管理员ID',
    //   key: 'userId',
    //   dataIndex: 'userId',
    //   tableShow: false,
    // }

    , {
      title: '状态',
      key: 'status',
      width: 80,
      align: 'center',
      dataIndex: 'status',
      render: (text, record) => (
        getStatus(record["status"])
      )
    }
    , {
      title: '经理姓名',
      key: 'managerName',
      dataIndex: 'managerName',
    }

    , {
      title: '经理性别',
      key: 'managerGender',
      dataIndex: 'managerGender',
      tableShow: false,
    }

    , {
      title: '经理电话',
      key: 'managerTel',
      dataIndex: 'managerTel',
    }

    , {
      title: '酒店联系电话',
      key: 'phone',
      dataIndex: 'phone',
    }, {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
      tableShow: false,
    }, {
      title: '操作',
      key: 'operations',
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
      <MyTable
        key={key}
        apiFun={tHotelInfoApi.query}
        columns={columns}
        ref={tableRef}
        onSelectRow={selectRow}
        searchConfigList={searchConfigList}
        extraProps={{ results: 10 }}
      />
      <MyModal title="酒店详情" visible={open} onCancel={handCancle} onOk={handleOk} columns={columns}
        canEdit={canEdit} row={selectRow} onChange={onChange} />
      <Modal title="添加酒店" visible={addFlag} onCancel={handleAddOk} onOk={handleAddOk} width={"90%"}>
        <FindHotelModal />
      </Modal>
    </>
  )
}
export default THotelInfo
