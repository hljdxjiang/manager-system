import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import { isAuthorized } from '@/assets/js/publicFunc'
import tUserInfoApi from '@/api/user/tUserInfo'
import { onItemChange } from "@/utils/tableCommon";
import MyPage from '@/components/common/myPage';

const TUserInfo: FC = () => {
  const [selectRow, setSelectRow] = useState(Object);
  const [selectKeys, setSelectKeys] = useState([]);
  // 搜索栏配置项
  const searchConfigList = [
    {
      key: 'userId',
      slot: <Input placeholder="用户ID" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'passwd',
      slot: <Input placeholder="密码" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'groupId',
      slot: <Input placeholder="用户分组ID" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'roleId',
      slot: <Input placeholder="角色ID" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'userName',
      slot: <Input placeholder="姓名" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'mobileNo',
      slot: <Input placeholder="手机号" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'email',
      slot: <Input placeholder="邮箱地址" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'idNo',
      slot: <Input placeholder="证件号" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'idType',
      slot: <Input placeholder="证件类型" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'oauthCode',
      slot: <Input placeholder="二次认证码" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'remark',
      slot: <Input placeholder="用户备注" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'status',
      slot: <Input placeholder="用户状态" allowClear />,
      rules: [],
      initialValue: ''
    }
  ]
  const columns = [
    {
      title: '',
      dataIndex: 'id',
    }


    , {
      title: '用户ID',
      dataIndex: 'userId',
    }

    , {
      title: '密码',
      dataIndex: 'passwd',
    }

    , {
      title: '用户分组ID',
      dataIndex: 'groupId',
    }

    , {
      title: '角色ID',
      dataIndex: 'roleId',
    }

    , {
      title: '姓名',
      dataIndex: 'userName',
    }

    , {
      title: '手机号',
      dataIndex: 'mobileNo',
    }

    , {
      title: '邮箱地址',
      dataIndex: 'email',
    }

    , {
      title: '证件号',
      dataIndex: 'idNo',
    }

    , {
      title: '证件类型',
      dataIndex: 'idType',
    }

    , {
      title: '二次认证码',
      dataIndex: 'oauthCode',
    }

    , {
      title: '用户备注',
      dataIndex: 'remark',
    }

    , {
      title: '用户状态',
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

  ]
  return (
    <>
      <MyPage
        apiFun={tUserInfoApi.queryByPage}
        columns={columns}
        permissionPrefix={"user:list"}
        addApiFun={tUserInfoApi.add}
        editApiFun={tUserInfoApi.edit}
        delApiFun={tUserInfoApi.deleteById}
        showOpeation={false}
        searchConfigList={searchConfigList}
      />
    </>
  )
}
export default TUserInfo
