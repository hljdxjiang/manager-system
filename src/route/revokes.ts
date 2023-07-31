import type { DataNode } from 'rc-tree/lib/interface';

/**
 * path 跳转的路径
 * component 对应路径显示的组件
 * exact 匹配规则，true的时候则精确匹配。
 */
const preDefinedRevokes: DataNode[] = [
  {
    title: '用户管理',
    key: 'user',
    children: [
      {
        title: '修改用户',
        key: 'user:list:edit',
      },{
        title: '添加用户',
        key: 'user:list:add',
      },{
        title: '删除用户',
        key: 'user:list:del',
      }
    ]
  }
]

export default preDefinedRevokes
