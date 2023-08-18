import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import tUserInfoApi from '@/api/user/tUserInfo'
import MyPage from '@/components/common/myPage';

const TUserInfo: FC = () => {
  // 搜索栏配置项
  const searchConfigList = [
    {
      key: 'userId',
      slot: <Input placeholder="用户ID" allowClear />,
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
      key: 'idNo',
      slot: <Input placeholder="证件号" allowClear />,
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
      title: '用户ID',
      key: "userId",
      dataIndex: 'userId',
    }

    , {
      title: '用户分组ID',
      key: "groupId",
      dataIndex: 'groupId',
    }

    , {
      title: '角色ID',
      key: "roleId",
      dataIndex: 'roleId',
    }

    , {
      title: '姓名',
      key: "userName",
      dataIndex: 'userName',
    }

    , {
      title: '手机号',
      key: "mobileNo",
      dataIndex: 'mobileNo',
    }

    , {
      title: '邮箱地址',
      key: "email",
      dataIndex: 'email',
    }

    , {
      title: '证件号',
      key: "idNo",
      dataIndex: 'idNo',
    }

    , {
      title: '证件类型',
      key: "idType",
      dataIndex: 'idType',
    }

    , {
      title: '二次认证码',
      key: "oauthCode",
      dataIndex: 'oauthCode',
    }

    , {
      title: '用户备注',
      key: "remark",
      dataIndex: 'remark',
    }

    , {
      title: '用户状态',
      key: "status",
      dataIndex: 'status',
    }

  ]
  return (
    <>
      <MyPage
        apiFun={tUserInfoApi.query}
        columns={columns}
        permissionPrefix={"user:list"}
        addApiFun={tUserInfoApi.add}
        editApiFun={tUserInfoApi.edit}
        delApiFun={tUserInfoApi.deleteById}
        showOpeation={true}
        searchConfigList={searchConfigList}
      />
    </>
  )
}
export default TUserInfo
