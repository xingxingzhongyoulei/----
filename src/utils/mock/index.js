import { mock } from 'mockjs'
mock(/.*\/user/, 'get', {
  code: 0,
  'data|3': [
    {
      id: '@id',
      name: '@cname',
      age: '@integer(18, 60)',
      address: '@city(true)',
      email: '@email',
      phone: '@phone'
    }
  ],
  msg: 'success'
})
