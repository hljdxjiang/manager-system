import React, {
  FC, useEffect, useRef, useState
} from 'react'
import hotelApi from '@/api/hotel/hotelApi';
import MyTable from '@/components/common/table';
import tHotelInfoApi from '@/api/hotel/tHotelInfo';

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
}

const HotelAddTable: FC<ModalProps> = (
  (props: ModalProps) => {
    /**
     * 引用父组件的ref实例，成为子组件的一个参数
     * 可以引用父组件的ref绑定到子组件自身的节点上.
     */

    const [key, setKey] = useState(String)
    const tableRef: RefType = useRef()

    useEffect(()=>{
      hotelApi.findHotel
    },[key])

    const searchConfigList=[]

    const {
      row,
    } = props
    const columns = []

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
}

export default HotelAddTable
