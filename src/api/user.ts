import request from '@/utils/request'
import { FormType } from '@/views/login/type'

export function login(data: FormType) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}