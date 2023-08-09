import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { onItemChange } from "@/utils/tableCommon";
import tSysRoleApi from '@/api/sys/tSysRole'
import RolePage from '@/components/common/myPage/roleModel'
import roleApi from '@/api/sys/roleApi'

const TSysRole: FC = () => {
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
      dataIndex: 'roleDesc',
    }
  ]

  return (
    <>
      <RolePage
      apiFun={tSysRoleApi.queryByPage}
      columns={columns}
      permissionPrefix={"user:list"}
      addApiFun={roleApi.saveRole}
      editApiFun={roleApi.saveRole}
      delApiFun={roleApi.deleteRole}
      showOpeation={true}
      searchConfigList={searchConfigList}
      />
    </>
  )
}
export default TSysRole
