<template>
  <div class="login">
    <div class="login-container">
      <el-form ref="loginForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" size="large" autocomplete="off" placeholder="用户名">
            <template #prefix>
              <el-icon :size="18" class="el-input__icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" type="password" size="large" autocomplete="off" placeholder="密码">
            <template #prefix>
              <el-icon :size="18" class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%;" type="primary" :loading="loading" size="large" @click="submitForm(loginForm)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Login'
}
</script>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from "element-plus"
import { FormType } from './type'
import { userStore } from '@store/user'

const validatePassword = (rule: any, value: string, callback: any) => {
  if (value.length < 6) {
    callback(new Error('请输入不少于6位数的密码'))
  } else {
    callback()
  }
}

const ruleForm = reactive<FormType>({
  username: 'admin',
  password: ''
})


const rules: FormRules = {
  username: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
}

const store = userStore()

const redirect = ref()
const router = useRouter()
const route = useRoute()
redirect.value = route.query.redirect

const loginForm = ref<FormInstance>()
const loading= ref<boolean>(false)
const submitForm = (formEl: FormInstance | undefined) => {
  formEl?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      store.Login(ruleForm).then(() => {
        loading.value = false
        router.push({ path: redirect.value || '/' })
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.login {
  min-height: 100%;
  height: 100%;
  background: #2d3a4b;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  &-container {
    .demo-ruleForm {
      width: 400px;
      margin: 25px auto;
    }
  }
  @media screen and (max-width:1600px ) {
    &-img {
      width: 580px;
    }
  }
  @media screen and (max-width:800px ) {
    &-img {
      width: 480px;
    }
  }
  @media screen and (max-width:600px ) {
    &-img {
      width: 380px;
    }
  }
}
</style>