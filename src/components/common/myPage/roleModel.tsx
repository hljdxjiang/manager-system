import React, { useRef, FC, useState, useEffect } from 'react'
import { Button } from 'antd'
import MyTable from '@/components/common/table'
import { isAuthorized } from '@/assets/js/publicFunc'
import MyModal from '@/components/common/myModal'
import { onItemChange } from "@/utils/tableCommon";
import RoleModel from '../myModal/roleModel'
import { Key } from 'antd/lib/table/interface'


interface PageProps {
  columns?: Object[]
  searchConfigList?: Object[]
  selectedMenus?:Key[],
  selectedRevokes?:Key[],
  showAddBtn?: boolean
  showBatchDelBtn?: boolean
  showOpeation?: boolean
  onSelectedChange?: (arg0: object, arg1?: unknown, arg2?: unknown) => void
  permissionPrefix?: String
  apiFun?: (arg0?: unknown[]) => Promise<{}>
  addApiFun?: (arg0?: unknown[]) => Promise<{}>
  delApiFun?: (arg0?: unknown[]) => Promise<{}>
  editApiFun?: (arg0?: unknown[]) => Promise<{}>
}

const RolePage: FC<PageProps> = (

  (props: PageProps) => {
    const {
      columns,
      apiFun,
      searchConfigList,
      showAddBtn,
      showBatchDelBtn,
      onSelectedChange,
      showOpeation,
      permissionPrefix,
      addApiFun,
      delApiFun,
      editApiFun
    } = props

    const tableRef: RefType = useRef()
    const [open, setOpen] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [selectRow, setSelectRow] = useState(Object);
    const [selectKeys, setSelectKeys] = useState([]);
    const [selectedMenus, setSelectedMenus] = useState([]);
    const [selectedRevokes, setSelectedRevokes] = useState([]);
    const [key, setKey] = useState(String)
    const [tableColumns, setTabColumns] = useState([])

    useEffect(() => {
      if (showOpeation === false) {
        setTabColumns(columns)
      } else {
        const opera = {
          title: '操作',
          dataIndex: 'operations',
          align: 'center',
          editFlag: false,
          render: (text, record) => (
            <>
              {isAuthorized(permissionPrefix + ':edit') && (
                <Button className="btn" onClick={() => { doEdit(record) }} size="small">
                  编辑
                </Button>
              )}
              <Button className="btn" onClick={() => { doView(record) }} size="small">
                查看
              </Button>
              {isAuthorized(permissionPrefix + ':add') && (<Button className="btn" onClick={() => doDel(record)} size="small">
                删除
              </Button>)}
            </>
          )
        }
        var newColumns = [...columns, opera]
        setTabColumns(newColumns)

      }
    }, [columns, showOpeation, permissionPrefix])

    // 添加
    const add = () => {
      setOpen(true)
      setCanEdit(true)
      setSelectRow({});
    }

    const queryRoleDetail=(record)=>{
      if(record!==undefined&&record.roleId!==undefined){
          //TODO 查询详情
      }else{
        setSelectedMenus([]);
        setSelectedRevokes([]);
      }
    }
    // 编辑
    const doEdit = (record) => {
        queryRoleDetail(record)
      setSelectRow(record)
      setOpen(true)
      setCanEdit(true)
    }
    // 查看
    const doView = (record) => {
      setSelectRow(record)
      setOpen(true)
      setCanEdit(false)
    }
    const doDel = (record) => {
      delApiFun(record)
      setKey((Math.random() * 10).toString())
    }

    const selectedChange=(keys,type)=>{
      console.log("model onchange",keys,type)
      if(type==="menus"){
        setSelectedMenus(keys)
      }
      if(type==="revokes"){
        setSelectedRevokes(keys)
      }
    }

    const delBatch = () => {
      console.log(selectKeys)
    }

    const beforeOk = () => {
      var row = selectRow
      row.menus=selectedMenus;
      row.revokes=selectedRevokes;
      columns.forEach(e => {
        if (e["editType"] === "edit") {
          row[e["dataIndex"]] = selectRow[e["dataIndex"]].toHTML();
        }
      });
      console.log(row);
      return row;
    }

    const onChange = (e, stype?, sid?) => {
      var newRow = onItemChange(selectRow, e, stype, sid);
      setSelectRow(newRow)
    }

    // 新增按钮
    const AddBtn = () => (
      <Button className="fr" onClick={add} type="primary">
        新增
      </Button>
    )

    // 新增按钮
    const BatchDelBtn = () => (
      <Button className="fr" style={{ marginRight: "10px" }} onClick={delBatch} type="primary">
        删除
      </Button>
    )

    const onSelectRow = (rowKeys: string[]) => {
      setSelectKeys(rowKeys);
      console.log(selectKeys)
    }

    const handleOk = () => {
      var row = beforeOk();
      if (row["id"] === undefined) {
        addApiFun(row)
      } else {
        editApiFun(row)
      }
      setSelectRow({});
      setSelectedMenus([]);
      setSelectedRevokes([]);
      setCanEdit(false)
      setOpen(false)
      setKey((Math.random() * 10).toString())
    }

    const handCancle = () => {
      setSelectRow({});
      setSelectedMenus([]);
      setSelectedRevokes([]);
      setCanEdit(false)
      setOpen(false)
    }
    return (<>
      {isAuthorized(permissionPrefix + ':add') && showAddBtn && <AddBtn />}
      {isAuthorized(permissionPrefix + ':del') && showBatchDelBtn && <BatchDelBtn />}
      <MyTable
        key={key}
        apiFun={apiFun}
        columns={tableColumns}
        ref={tableRef}
        onSelectRow={onSelectRow}
        searchConfigList={searchConfigList}
        extraProps={{ results: 10 }}
      />
      <RoleModel title="aaaa" visible={open} onCancel={handCancle} onOk={handleOk} columns={columns} onSelectedChange={selectedChange}
        canEdit={canEdit} row={selectRow} selectedMenus={selectedMenus} selectedRevokes={selectedRevokes} onChange={onChange} />
    </>
    )
  })
  RolePage.defaultProps = {
  columns: [],
  selectedMenus:[],
  onSelectedChange: () => { },
  searchConfigList: [],
  showAddBtn: true,
  showBatchDelBtn: false,
  showOpeation: false,
  permissionPrefix: "",
}
export default RolePage
