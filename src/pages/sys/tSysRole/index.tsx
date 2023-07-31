import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import MyTable from '@/components/common/table'
import { isAuthorized } from '@/assets/js/publicFunc'
import MySelect from '@/components/common/mySelect'
import MyModal from '@/components/common/myModal'
import { onItemChange } from "@/utils/tableCommon";
import tSysRoleApi from '@/api/sys/tSysRole'
import RoleModel from '@/components/common/myModal/roleModel'
import RolePage from '@/components/common/myPage/roleModel'

const TSysRole: FC = () => {
  const tableRef: RefType = useRef()
  const [open, setOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [selectRow, setSelectRow] = useState(Object);
  const [selectKeys, setSelectKeys] = useState([]);
  const [key, setKey] = useState(String)

  const [tableColumns, setTabColumns] = useState([])

  // 添加
  const add = () => {
    setOpen(true)
    setCanEdit(true)
    setSelectRow({});
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
    setKey((Math.random() * 10).toString())
  }

  const onChange = (e, stype?, sid?) => {
    var newRow = onItemChange(selectRow, e, stype, sid);
    setSelectRow(newRow)
  }

  // 新增按钮
  const AddBtn = () => (
    <Button className="fr" onClick={add} type="primary">
      新增
    </Button>
  )

  const onSelectRow = (rowKeys: string[]) => {
    setSelectKeys(rowKeys);
    console.log(selectKeys)
  }

  const handleOk = () => {
    var row = selectRow;
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
  // 搜索栏配置项
  const searchConfigList = [
    {
      key: 'roleId',
      slot: <Input placeholder="角色编号" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'roleName',
      slot: <Input placeholder="角色名称" allowClear />,
      rules: [],
      initialValue: ''
    }
  ]
  const columns = [
    {
      title: '角色编号',
      dataIndex: 'roleId',
    }
    , {
      title: '角色名称',
      dataIndex: 'roleName',
    }

    , {
      title: '角色描述',
      editType:'textarea',
      dataIndex: 'desc',
    }
  ]

  return (
    <>
      {isAuthorized('user:list:add') && <AddBtn />}
      <RolePage
      apiFun={tSysRoleApi.queryByPage}
      columns={columns}
      permissionPrefix={"user:list"}
      addApiFun={tSysRoleApi.add}
      editApiFun={tSysRoleApi.edit}
      delApiFun={tSysRoleApi.deleteById}
      showOpeation={false}
      searchConfigList={searchConfigList}
      />
    </>
  )
}
export default TSysRole
