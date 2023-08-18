import React, { FC, useState } from 'react'
import { Input, } from 'antd'
import tParamConfigApi from '@/api/param/tParamConfig'
import MyPage from '@/components/common/myPage';

const TParamConfig: FC = () => {
  // 搜索栏配置项
  const searchConfigList = [
    {
      key: 'configKey',
      slot: <Input placeholder="配置编号" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'configName',
      slot: <Input placeholder="配置中文名" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'configValue',
      slot: <Input placeholder="配置值" allowClear />,
      rules: [],
      initialValue: ''
    }
    , {
      key: 'configDesc',
      slot: <Input placeholder="配置描述" allowClear />,
      rules: [],
      initialValue: ''
    }
  ]
  const columns = [
     {
      title: '配置编号',
      dataIndex: 'configKey',
    }

    , {
      title: '配置中文名',
      dataIndex: 'configName',
    }

    , {
      title: '配置值',
      dataIndex: 'configValue',
    }

    , {
      title: '配置描述',
      dataIndex: 'configDesc',
    }

  ]
  return (
    <>
      <MyPage
        apiFun={tParamConfigApi.query}
        columns={columns}
        permissionPrefix={"config:param"}
        addApiFun={tParamConfigApi.add}
        editApiFun={tParamConfigApi.edit}
        delApiFun={tParamConfigApi.deleteById}
        showOpeation={true}
        searchConfigList={searchConfigList}
      />
    </>
  )
}
export default TParamConfig
