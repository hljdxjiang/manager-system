import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tSysMenusApi from '@/api/sys/tSysMenus'
import { onItemChange } from "@/utils/tableCommon";
import MyPage from '@/components/common/myPage';

const TSysMenus: FC = () => {
  const [selectRow, setSelectRow] = useState(Object);
  const [selectKeys, setSelectKeys] = useState([]);
  // 搜索栏配置项
  const searchConfigList = [
    {
      key: 'menuId',
      slot: <Input placeholder="菜单ID" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'path',
      slot: <Input placeholder="跳转路径" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'name',
      slot: <Input placeholder="菜单权限标题" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'icon',
      slot: <Input placeholder="菜单图标" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'hideinmenu',
      slot: <Input placeholder="是否展示0展示1不展示" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'exact',
      slot: <Input placeholder="匹配规则，0精确匹配" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'component',
      slot: <Input placeholder="链接组件" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'type',
      slot: <Input placeholder="菜单类型" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'parentId',
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
      title: '菜单ID',
      dataIndex: 'menuId',
    }

    , {
      title: '跳转路径',
      dataIndex: 'path',
    }

    , {
      title: '菜单权限标题',
      dataIndex: 'name',
    }

    , {
      title: '菜单图标',
      dataIndex: 'icon',
    }

    , {
      title: '是否展示0展示1不展示',
      dataIndex: 'hideinmenu',
    }

    , {
      title: '匹配规则，0精确匹配',
      dataIndex: 'exact',
    }

    , {
      title: '链接组件',
      dataIndex: 'component',
    }

    , {
      title: '菜单类型',
      dataIndex: 'type',
    }

    , {
      title: '权限父ID',
      dataIndex: 'parentId',
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
      title: '备注信息',
      dataIndex: 'remark',
    }

  ]
  return (
    <>
      <MyPage
        apiFun={tSysMenusApi.queryByPage}
        columns={columns}
        permissionPrefix={"user:list"}
        addApiFun={tSysMenusApi.add}
        editApiFun={tSysMenusApi.edit}
        delApiFun={tSysMenusApi.deleteById}
        showOpeation={false}
        searchConfigList={searchConfigList}
      />
    </>
  )
}
export default TSysMenus
