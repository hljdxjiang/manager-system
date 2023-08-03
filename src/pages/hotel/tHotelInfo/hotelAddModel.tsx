import React, {
  FC, useRef, useState
} from 'react'
import { Modal, Descriptions, Input } from 'antd'
import HotelAddTable from './hotelAddTable'

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
  columns?: Object[]
  onCancel?: (arg0?: unknown) => void
  onOk?: (arg0?: unknown) => void
  onHotelAdd?: (arg0?: unknown) => void
  visible?: boolean
  width?: string | number
  cancelText?: String
  okText?: String
  keyboard?: boolean
  title: String
}

const HotelAddModel: FC<ModalProps> = (
  (props: ModalProps) => {
    /**
     * 引用父组件的ref实例，成为子组件的一个参数
     * 可以引用父组件的ref绑定到子组件自身的节点上.
     */
    const {
      row,
      columns,
      visible,
      onOk,
      onCancel,
      onHotelAdd,
      width,
      cancelText,
      okText,
      keyboard,
      title
    } = props

    const [key, setKey] = useState(String)
    const tableRef: RefType = useRef()
    const [selectRow, setSelectRow] = useState(Object);

    const handOk = (): void => {
      onOk()
    }
    const handCancle = (): void => {
      onCancel();
    }

    const  handAdd=(record)=>{
      onHotelAdd(record)
    }

    const createInput = (item) => {
      return <Input placeholder={item["title"]} id={item["dataIndex"]} allowClear value={row[item["dataIndex"]]} disabled={true} />
    }

    return (
      <div>
        <Modal
          title={title}
          onOk={handOk}
          visible={visible}
          width={width}
          onCancel={handCancle}
          keyboard={keyboard}
          okText={okText}
          cancelText={cancelText}
        >
          <HotelAddTable
            row={row}/>
        </Modal>
      </div >
    )
  }
)

HotelAddModel.defaultProps = {
  row: {},
  visible: false,
  onOk: () => { },
  onCancel: () => { },
  onHotelAdd: () => { },
  width: "80%",
  cancelText: "取消",
  okText: "确认",
  keyboard: true,
  title: "编辑"
}

export default HotelAddModel
