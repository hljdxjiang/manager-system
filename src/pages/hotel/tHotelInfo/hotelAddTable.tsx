import React, {
  FC, useEffect, useRef, useState
} from 'react'
import hotelApi from '@/api/hotel/hotelApi';
import MyTable from '@/components/common/table';
import tHotelInfoApi from '@/api/hotel/tHotelInfo';
import { Button, Input } from 'antd';

/**
 * 封装对话框，展示修改内容
 * canEdit 是否可修改
 * onOk 点击确认方法
 * onCancel 点击取消方法
 * visible 是否展示
 * width 宽度
 * cancelText 取消按钮文本
 * okText 确认按钮文本
 * title 标题
 * keyboard 是否支持esc按钮关闭
 * columns 展示列
 */

interface ModalProps {
  row?: object
  handerAdd?: (arg0?: unknown) => void

}

const HotelAddTable: FC<ModalProps> = (
  (props: ModalProps) => {
    /**
     * 引用父组件的ref实例，成为子组件的一个参数
     * 可以引用父组件的ref绑定到子组件自身的节点上.
     */

    const [key, setKey] = useState(String)
    const tableRef: RefType = useRef()

    const doAdd=(record)=>{
      handerAdd(record)
    }


    const searchConfigList=[{
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
    }]

    const {
      row,handerAdd
    } = props
    const columns = [{
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
    },{
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      editFlag: false,
      render: (text, record) => (
        <>
          {record["addedFlag"]==="N" && (
            <Button className="btn" onClick={() => { doAdd(record) }} size="small">
              编辑
            </Button>
          )}
          {record["addedFlag"]==="Y" && (
            "已添加"
          )}
        </>
      )}]

    return (
      <MyTable
        apiFun={hotelApi.findHotel}
        columns={columns}
        ref={tableRef}
        searchConfigList={searchConfigList}
        key={key}
      ></MyTable>
    )
  }
)

HotelAddTable.defaultProps = {
  row: {},
  handerAdd:()=>{}
}

export default HotelAddTable
