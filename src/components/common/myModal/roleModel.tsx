import React, {
  FC
} from 'react'
import { Modal, Descriptions, Input, DatePicker, TimePicker, Row, Col, Tree } from 'antd'
import MySelect from '@/components/common/mySelect'
import MyUpload from '../myUpload';
import Editor from '../editor';
import type { DataNode } from 'rc-tree/lib/interface';
import { Key } from 'antd/es/table/interface';
import { getAllRevokes, getAppMenus } from '@/assets/js/publicFunc';
import { MenuRoute } from '@/route/types';

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
  selectedMenus?: Key[]
  selectedRevokes?: Key[]
  canEdit?: boolean
  onOk?: (arg0?: unknown) => void
  okApiFun?: (arg0?: unknown[]) => Promise<{}>
  onSelectedChange?: (arg0: object, arg1?: unknown, arg2?: unknown) => void
  onCancel?: (arg0?: unknown) => void
  onChange?: (arg0: object, arg1?: unknown, arg2?: unknown) => void
  visible?: boolean
  width?: string | number
  cancelText?: String
  okText?: String
  keyboard?: boolean
  title: String
}

const RoleModel: FC<ModalProps> = (
  (props: ModalProps) => {
    /**
     * 引用父组件的ref实例，成为子组件的一个参数
     * 可以引用父组件的ref绑定到子组件自身的节点上.
     */
    const {
      row,
      columns,
      canEdit,
      onOk,
      onCancel,
      selectedMenus,
      selectedRevokes,
      onSelectedChange,
      onChange,
      visible,
      width,
      cancelText,
      okText,
      keyboard,
      title
    } = props



    const handOk = (): void => {
      onOk()
    }
    const handCancle = (): void => {
      onCancel();
    }


    const handChange = (e, stype?, sid?) => {
      console.log(e,stype,sid)
      onChange(e, stype, sid)
    }


    const onSelectCheck = (type,menusKey) => {
      console.log('onSelectCheck', menusKey,type);
      onSelectedChange(menusKey,type)
      //setMenus(menusKey);
    };


    const createItems = () => {
      return columns.map((item, _) => {
        if (item["editFlag"] === false) {
          return "";
        }
        if (item["span"] !== undefined) {
          return (
            <Descriptions.Item label={item["title"]} span={3}>
              {createInput(item)}
            </Descriptions.Item>
          )
        }
        return (
          <Descriptions.Item label={item["title"]}>
            {createInput(item)}
          </Descriptions.Item>
        )
      })
    }

    const revokeTrees:DataNode[]=getAllRevokes();

    const buildMenuTrees=( menus: MenuRoute[])=>{
      const list = [];
      if(menus===undefined){
        menus=getAppMenus();
      }
      menus.forEach((item,idx)=>{
        const key=item.key;
        const title=item.name
        const treeNode: DataNode = {
          title,
          key,
        };
        if(item.routes){
          treeNode.children=buildMenuTrees(item.routes)
        }
        list.push(treeNode)
      });
      return list;
    }

    const menusRevokes=buildMenuTrees(getAppMenus());

    const createInput = (item) => {
      var type = item["editType"]
      var idx = item["dataIndex"];
      if (type === "select") {
        return (<MySelect data={item["data"]} defaultValue={row[item["dataIndex"]]} onChange={handChange.bind(this, idx, "select")} disabled={!canEdit} />)
      }
      if (type === "date") {
        return <DatePicker value={row[item["dataIndex"]]} onChange={handChange.bind(this, idx, "date")} disabled={!canEdit} ></DatePicker>
      }
      if (type === "datetime") {
        return <DatePicker showTime={true} value={row[item["dataIndex"]]} onChange={handChange.bind(this, idx, "datetime")} disabled={!canEdit} ></DatePicker>
      }
      if (type === "time") {
        return <TimePicker value={row[item["dataIndex"]]} onChange={handChange.bind(this, idx, "time")} disabled={!canEdit} ></TimePicker>
      }
      if (type === "upload") {
        if (canEdit) {
          return <MyUpload value={row[item["dataIndex"]]} onChange={handChange.bind(this, idx, "upload")}></MyUpload>
        } else {
          return <img src={row[item["dataIndex"]]} width="40" alt="" />
        }
      }
      if (type === "edit") {
        return <Editor value={row[item["dataIndex"]]} onChange={handChange.bind(this, idx, "edit")}></Editor>
      }
      if (type === "textarea") {
        return <Input.TextArea value={row[item["dataIndex"]]}  id={item["dataIndex"]}  onChange={(e)=>handChange(e)}></Input.TextArea>
      }
      return <Input placeholder={item["title"]} id={item["dataIndex"]} onChange={handChange} allowClear value={row[item["dataIndex"]]} disabled={!canEdit} />
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
          <Descriptions bordered>
            {createItems()}
          </Descriptions>
          <Row gutter={24}>
            <Col span={12}>
              <label>菜单</label>
              <Tree
                checkable
                defaultExpandAll={true}
                height={300}
                onCheck={(e)=>onSelectCheck("menus",e)}
                checkedKeys={selectedMenus}
                treeData={menusRevokes}
              />
            </Col>
            <Col span={12}>
              <div>
                <label>权限</label>
              </div>
              <Tree
                checkable
                defaultExpandAll={true}
                height={400}
                onCheck={(e)=>onSelectCheck("revokes",e)}
                checkedKeys={selectedRevokes}
                treeData={revokeTrees}
              />
            </Col>
          </Row>

        </Modal>
      </div >
    )
  }
)

RoleModel.defaultProps = {
  row: {},
  selectedMenus: [],
  selectedRevokes: [],
  canEdit: false,
  onOk: () => { },
  onCancel: () => { },
  onChange: () => { },
  onSelectedChange: () => { },
  visible: false,
  width: "80%",
  cancelText: "取消",
  okText: "确认",
  keyboard: true,
  title: "编辑"
}

export default RoleModel
