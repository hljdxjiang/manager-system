import React, { useRef, FC, useState, useEffect } from 'react'
import { Button } from 'antd'
import MyTable from '@/components/common/table'
import { isAuthorized } from '@/assets/js/publicFunc'
import { onItemChange } from "@/utils/tableCommon";
import RoleModel from '../../../pages/sys/tSysRole/roleModel'
import { Key } from 'antd/lib/table/interface'
import roleApi from '@/api/sys/roleApi';


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
      showOpeation,
      permissionPrefix,
      delApiFun,
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
        roleApi.getRoleDetail(record).then((response)=>{
          setSelectedMenus(response.menus);
          setSelectedRevokes(response.revokes);
        }).catch((err)=>{
          console.log("getRoleDetail",err)
        })
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
      queryRoleDetail(record)
      setSelectRow(record)
      setOpen(true)
      setCanEdit(false)
    }
    const doDel = (record) => {
      delApiFun(record)
      setKey((Math.random() * 10).toString())
    }

    const selectedChange=(keys,type)=>{
      if(type==="menus"){
        setSelectedMenus(keys)
      }
      if(type==="revokes"){
        setSelectedRevokes(keys)
      }
    }

    const beforeOk = () => {
      var obj={};
      obj["roleId"]=selectRow.roleId;
      obj["roleDesc"]=selectRow.roleDesc;
      obj["roleName"]=selectRow.roleName;
      obj["menus"]=selectedMenus
      obj["revokes"]=selectedRevokes
      return obj;
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

    const onSelectRow = (rowKeys: string[]) => {
      setSelectKeys(rowKeys);
      console.log(selectKeys)
    }

    const handleOk = () => {
      if(canEdit){
        var row = beforeOk();
        roleApi.saveRole(row).then((response)=>{
          setTimeout(()=>{
            setSelectRow({});
            setSelectedMenus([]);
            setSelectedRevokes([]);
            setCanEdit(false)
            setOpen(false)
            setKey((Math.random() * 10).toString())
          })
        }).catch((err)=>{
          console.log("saveRole err",err)
        })
      }
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
