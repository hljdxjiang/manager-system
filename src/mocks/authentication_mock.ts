import { rest } from 'msw'
import type { UserInfo } from '@/app_models/user'

export const userRes: UserInfo[] = [
  {
    username: 'admin',
    password: '123456',
    token: 'asdfghjkl',
    menus: [
      {
        path: 'user',
        desc: '查看用户列表'
      },
      {
        path: 'user:list',
        desc: '查看用户列表'
      },
      {
        path: 'user:role',
        desc: '新增用户列表'
      },
      {
        path: 'hotel.room',
        desc: '编辑用户列表'
      },
      {
        path: 'hotel.hotel',
        desc: '查看角色列表'
      },
      {
        path: 'auth:test:view',
        desc: '查看权限测试页'
      }
    ],
    permission: [
      {
        code: 'user:list',
        name: '查看用户列表'
      },
      {
        code: 'user:role',
        name: '新增用户列表'
      },
      {
        code: 'hotel.room',
        name: '编辑用户列表'
      },
      {
        code: 'hotel.hotel',
        name: '查看角色列表'
      },
      {
        code: 'auth:test:view',
        name: '查看权限测试页'
      }
    ]
  }
]

const app = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    console.log('...............msw mock login.......')
    const { username, password } = req.body as UserInfo
    const user = userRes.find(
      (item) => item.username === username && item.password === password
    )
    if (user) {
      sessionStorage.setItem('mock-authenticated-token', user.token)
      return res(ctx.json(user))
    }
    return res(ctx.status(400), ctx.json('用户名或密码错误'))
  })
]

export default app
