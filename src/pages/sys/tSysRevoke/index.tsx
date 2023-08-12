import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tSysRevokeApi from '@/api/sys/tSysRevoke'
import { onItemChange } from "@/utils/tableCommon";
import MyPage from '@/components/common/myPage';

const TSysRevoke: FC = () => {
  const [selectRow, setSelectRow] = useState(Object);
  const [selectKeys, setSelectKeys] = useState([]);
  // 搜索栏配置项
  const searchConfigList = [
    {
      key: 'revokeId',
      slot: <Input placeholder="权限ID" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'revokeTitle',
      slot: <Input placeholder="菜单权限标题" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'revokeType',
      slot: <Input placeholder="权限类型" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'revokeParentid',
      slot: <Input placeholder="权限父ID" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'remark',
      slot: <Input placeholder="备注信息" allowClear />,
      rules: [],
      initialValue: ''
    }
  ]
  const columns = [
    {
      title: '主键ID',
      dataIndex: 'id',
    }

    , {
      title: '权限ID',
      dataIndex: 'revokeId',
    }

    , {
      title: '菜单权限标题',
      dataIndex: 'revokeTitle',
    }

    , {
      title: '权限类型',
      dataIndex: 'revokeType',
    }

    , {
      title: '权限父ID',
      dataIndex: 'revokeParentid',
    }

    , {
      title: '',
      dataIndex: 'createTime',
    }

    , {
      title: '',
      dataIndex: 'lastModifiedTime',
    }

    , {
      title: '备注信息',
      dataIndex: 'remark',
    }

  ]
  return (
    <>
      <MyPage
        apiFun={tSysRevokeApi.query}
        columns={columns}
        permissionPrefix={"user:list"}
        addApiFun={tSysRevokeApi.add}
        editApiFun={tSysRevokeApi.edit}
        delApiFun={tSysRevokeApi.deleteById}
        showOpeation={true}
        searchConfigList={searchConfigList}
      />
    </>
  )
}
export default TSysRevoke
