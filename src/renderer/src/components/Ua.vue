<template>
  <div class="container" v-loading="downing" element-loading-text="下载中，莫着急...">
    <!-- <h1 class="title">TVBOX接口解密</h1> -->
    <div class="row">
      <el-autocomplete
        size="large"
        v-model="selectedUrl"
        :fetch-suggestions="querySearch"
        placeholder="可下拉选择"
        @select="handleSelect"
        @input="handleInput"
        clearable
      >
        <template #default="{ item }">
          <span class="name">{{ item.name }}:</span>
          <span class="addr">{{ item.url }}</span>
        </template>

        <template #append>
          <el-button class="btn_oper" plain @click="crawl()" :disabled="crawling">
            一键解密
          </el-button>
        </template>
      </el-autocomplete>
    </div>
    <div class="row" v-loading="crawling" element-loading-text="解密中，莫着急...">
      <el-input
        class="textarea"
        type="textarea"
        :autosize="{ maxRows: 20 }"
        v-model="resultData"
        readonly
      ></el-input>
    </div>

    <div class="row btn-row" style="text-align: center">
      <el-button size="large" type="primary" id="copyResult" @click="copyContent(resultData)">
        复制内容
      </el-button>
      <el-button size="large" type="success" @click="getJar()" :disabled="downing"
        >下载Jar</el-button
      >

      <el-popover :width="208">
        <template #reference>
          <el-button size="large" type="danger" @click="downLocal()" :disabled="downing"
            >下载本地包</el-button
          >
        </template>
        <template #default>
          <div class="popover-div">
            <h3>本地包配置</h3>
            <p class="mx-info">实时下载在线线路，可自定义配置</p>
            <p class="popover-flex">
              <el-button @click="drawerSetting()">去配置</el-button>
              <el-button @click="qrDialogVisible = true">QQ频道</el-button>
            </p>
          </div>
        </template>
      </el-popover>

      <el-button size="large" color="#00B89F" @click="pushDialog()">推送本地包</el-button>
      <el-button size="large" type="warning"
        >前往主页
        <a href="https://lige.chat" target="_blank" class="back"></a>
      </el-button>
    </div>

    <el-drawer v-model="drawer" size="50%">
      <template #header>
        <h4>本地包下载配置</h4>
      </template>
      <template #default>
        <ul class="drawer-list">
          <li>
            <p>自定义Token<span></span></p>
            <div class="drawer-item-div">
              <el-input
                v-model="config.token"
                placeholder="支持Token值或链接（如需统一Token，下载前需要设置Token值）"
              />

              <el-tooltip effect="light" content="刷新Token值" placement="top">
                <el-button @click="tokenRefresh" :disabled="tokening" :icon="Refresh"></el-button>
              </el-tooltip>

              
              <!-- <el-tooltip effect="light" content="统一Token地址" placement="top">
                <el-button @click="tokenUnify" :icon="House"></el-button>
              </el-tooltip> -->

            </div>
          </li>
          <li>
            <p>自定义壁纸<span></span></p>
            <el-input
              v-model="config.wallpaper"
              placeholder="支持随机壁纸接口或本地壁纸（如：clan://localhost/tvbox/1.png）"
            />
          </li>
          <li>
            <p>线路更新提醒<span></span></p>
            <el-select
              v-model="config.lineTip.url"
              clearable
              placeholder="请选择（若线路更新，会收到提醒通知）"
              @change="lineChange($event)"
            >
              <el-option
                v-for="item in urls"
                :key="item.url"
                :label="item.name"
                :value="item.url"
              />
            </el-select>
          </li>
          <li class="flex">
            <p>生成多线路</p>
            <!-- <el-radio-group v-model="config.isLines">
              <el-radio :label="true" size="large">是</el-radio>
              <el-radio :label="false" size="large">否</el-radio>
            </el-radio-group> -->
            
            <el-switch v-model="config.isLines" />
          </li>
          <li>
            <el-text class="mx-info" type="info"
              >所有配置数据仅保存本地，需点击“保存配置”按钮生效</el-text
            >
          </li>
        </ul>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="clearClick">清空缓存</el-button>
          <el-button type="primary" @click="confirmClick">保存配置</el-button>
        </div>
      </template>
    </el-drawer>

    <el-dialog v-model="qrDialogVisible" width="300px" title="加入频道">
      <img src="https://lige.chat/images/QRCode.jpg" class="qrcode" />
    </el-dialog>

    <el-dialog
      v-model="pushdialogVisible"
      title="推送本地包"
      width="448px"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form class="push-form" v-loading="pushing" element-loading-text="上传中">
        <el-form-item label="设备IP">
          <el-select v-model="tvboxIp" placeholder="请选择">
            <el-option v-for="ip in ips" :key="ip" :label="ip" :value="ip" />
          </el-select>
          <el-button class="push-button" :icon="Refresh" circle @click="pushDialog()" />
          <el-button class="push-button" :icon="Position" circle @click="pushLinedialog()" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="pushdialogVisible = false">取消</el-button>
          <el-button type="primary" @click="pushLocal()" :disabled="pushing">上传</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="pushLinedialogVisible"
      title="推送仓库/线路"
      width="448px"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form class="push-form">
        <el-form-item>
          <el-input v-model="pushLine.pushStore_name" placeholder="仓库/线路名称(选填)" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="pushLine.pushStore_url" placeholder="输入仓库/线路地址" />
        </el-form-item>
        <el-form-item>
          <el-text class="mx-info" type="info"
            >需要打开TVBOX配置地址的页面再推送，如推送失败，<a :href="tvboxIp" target="_blank"
              >请点击此处推送</a
            ></el-text
          >
        </el-form-item>
      </el-form>

      <!-- <span style="font-size:12px">推送到TVBOX设备根目录，推送前请保持TVBOX相关软件处于开启状态</span> -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="pushLinedialogVisible = false">取消</el-button>
          <el-button type="primary" @click="pushStore()">推送</el-button>
        </span>
      </template>
    </el-dialog>

    <img src="https://www.lige.chat/images/QRCode.jpg" class="preload" />
  </div>
</template>

<script setup>
import { ref, toRaw, reactive, onMounted } from 'vue'
import { Refresh, Position,House} from '@element-plus/icons-vue'
import JSON5 from 'json5'

const urls = ref(JSON.parse(localStorage.getItem('urls')) || [])
const selectedUrl = ref('')
const selectedName = ref('')
const resultData = ref('')
const crawling = ref(false)
const downing = ref(false)
const tokening = ref(false)
const drawer = ref(false)
const qrDialogVisible = ref(false)
const pushdialogVisible = ref(false)
const pushLinedialogVisible = ref(false)

const pushing = ref(false)
const tvboxIp = ref('')
const ips = ref([])

let pushLine = reactive({
  pushStore_name: '',
  pushStore_url: '',
  do: 'pushStore'
})

let configCopy = reactive({})

const initConfig = () => {
  return {
    token: '',
    wallpaper: '',
    isLines: false,
    lineTip: { name: '', url: '', hash: '' }
  }
}

let config = reactive(initConfig())

const querySearch = (queryString, cb) => {
  const results = queryString ? urls.value.filter(createFilter(queryString)) : urls.value
  // call callback function to return suggestions
  cb(results)
}

const createFilter = (queryString) => {
  return (urls) => {
    return urls.url.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const handleSelect = async (item) => {
  selectedUrl.value = item.url
  selectedName.value = item.name
  resultData.value = ''
}

const handleInput = () => {
  selectedName.value = ''
}

const getUrlsData = async () => {
  try {
    const data = await window.api.getJson()
    if (data && data.length >= 10) {
      urls.value = data
      localStorage.setItem('urls', JSON.stringify(data))
    }
  } catch (error) {
    console.error(error.message)
  }
}

const crawl = async () => {
  const url = selectedUrl.value
  if (!url) {
    ElMessage('请先选择线路再解密')
    return
  }
  crawling.value = true
  try {
    let resData = await window.api.ua(url)
    try {
      resData = JSON5.parse(resData)
      resData = JSON.stringify(resData, null, 2)
    } catch (err) {
      console.error(`JSON5 解析失败：${err}`)
    }
    resultData.value = resData
  } catch (err) {
    ElMessage.error('解密失败，请检查线路')
    window.open(`http://lige.unaux.com?url=${encodeURIComponent(url)}`)
  } finally {
    crawling.value = false
  }
}
const getJar = async () => {
  // let resultDataValue = resultData.value;
  // const jarRegex = /['"]\s*spider\s*['"]\s*:\s*['"](https?:\/\/[^'";}]+)/;
  // const jarUrl = resultDataValue.match(jarRegex)[1];
  const url = selectedUrl.value
  if (!url) {
    ElMessage('请先选择线路再下载')
    return
  }
  downing.value = true
  try {
    const result = await window.api.downloadJar(url)
    if (result.status == 'success') {
      ElMessage({
        message: '下载Jar成功，放在桌面',
        type: 'success'
      })
    } else {
      ElMessage.error('下载失败，请检查线路')
    }

    downing.value = false
  } catch (err) {
    downing.value = false
    ElMessage.error('下载失败，请检查线路')
    console.log(err)
  }
}

const downLocal = async () => {
  const url = selectedUrl.value
  const name = selectedName.value
  if (!url) {
    ElMessage('请先选择线路再下载')
    return
  }
  downing.value = true
  setTimeout(() => {
    downing.value = false
  }, 180000)

  try {
    const result = await window.api.update(url, name, toRaw(config))
    console.log(result)
    if (result == 'error') {
      ElMessage.error('下载失败，请检查线路')
    } else {
      ElMessage({
        message: '下载本地包成功，放在桌面',
        type: 'success'
      })
      setTimeout(() => {
        copyContent(result, 2)
      }, 1500)
    }

    downing.value = false
  } catch (err) {
    downing.value = false
    ElMessage.error('下载失败，请检查线路')
    console.log(err)
  }
}

const copyContent = (content, type) => {
  if (!content) {
    return
  }
  var ele = document.createElement('input') //创建一个input标签
  ele.setAttribute('value', content) // 设置改input的value值
  document.body.appendChild(ele) // 将input添加到body
  ele.select() // 获取input的文本内容
  document.execCommand('copy') // 执行copy指令
  document.body.removeChild(ele) // 删除input标签
  const message = type == 2 ? `复制线路成功:${content}` : `复制内容成功`
  ElMessage({
    message: message,
    type: 'success'
  })
}
const drawerSetting = () => {
  drawer.value = true
  getConfig()
  configCopy = JSON.parse(JSON.stringify(config))
}

const clearClick = () => {
  // localStorage.removeItem('config')
  Object.assign(config, initConfig())

  window.store.deleteItem('config')
  console.log(config)
  ElMessage({
    message: '清空成功',
    type: 'success'
  })
  // drawer.value = false
}
const setHash = async () => {
  try {
    const url = config?.lineTip?.url
    if (url) {
      if (url != configCopy?.lineTip.url) {
        const newHash = await window.api.getHashToWeb(url)
        config.lineTip.hash = newHash
      }
    } else {
      config.lineTip.hash = ''
    }
  } catch (error) {
    config.lineTip.hash = ''
    console.log(error)
  } finally {
    console.log('finally')
    window.store.setItem('config', toRaw(config))
  }
}
const confirmClick = () => {
  // localStorage.setItem('config', JSON.stringify(config))
  window.store.setItem('config', toRaw(config))
  ElMessage({
    message: '保存成功',
    type: 'success'
  })
  drawer.value = false
  // 保存hash
  setHash()
}

const lineChange = (val) => {
  const result = urls.value.find((item) => {
    return item.url == val
  })
  if (result) {
    config.lineTip.name = result.name
  } else {
    config.lineTip.name = ''
  }
}
const getConfig = async () => {
  // const configStr = localStorage.getItem('config')

  const configStr = await window.store.getItem('config')
  if (configStr) {
    Object.assign(config, configStr)
  }
}

const tokenRefresh = async () => {
  const token = config.token
  const regex = /^[a-zA-Z0-9]{32}$/
  const isMatch = regex.test(token)
  if (!isMatch) {
    ElMessage('请输入正确的token后再进行刷新')
    return
  }
  tokening.value = true
  try {
    let resData = await window.api.getToken(token)
    config.token = resData
    ElMessage({
      message: '刷新成功，点击“保存配置”按钮生效',
      type: 'success'
    })
  } catch (err) {
    console.log(err)
    ElMessage.error('刷新失败，Token已失效')
  } finally {
    tokening.value = false
  }
}



const lineUpdateTip = async () => {
  const configStr = await window.store.getItem('config')
  const url = configStr?.lineTip?.url
  const name = configStr?.lineTip?.name
  const hash = configStr?.lineTip?.hash
  if (url && hash) {
    const newHash = await window.api.getHashToWeb(url)
    if (hash != newHash) {
      ElNotification({
        title: '线路更新提醒',
        message: `${name}已更新`,
        type: 'success'
      })
      console.log('线路更新提醒')
    } else {
      console.log('提醒线路无更新')
    }
  } else {
    console.log('没设置线路提醒')
  }
}

const pushDialog = async () => {
  try {
    const result = await window.api.getIps()
    if (result.status == 'success') {
      ips.value = result.ips
      tvboxIp.value = result.ips[0]
      pushdialogVisible.value = true
    } else {
      ips.value = []
      tvboxIp.value = ''
      ElMessage.error(result.message)
    }
    console.log(result)
  } catch (error) {}
}

const pushLocal = async () => {
  if (!tvboxIp.value) {
    ElMessage('请在手机或电视打开TVBOX')
    return
  }
  pushing.value = true
  try {
    const result = await window.api.pushToAndroid(tvboxIp.value)
    if (result.status == 'success') {
      ElMessage({
        message: result.message,
        type: 'success'
      })
      pushdialogVisible.value = false
    } else {
      ElMessage.error(result.message)
    }
    console.log(result)
  } catch (error) {
    ElMessage.error('上传失败')
  } finally {
    console.log('finally')
    pushing.value = false
  }
}

const pushLinedialog = () => {
  pushLinedialogVisible.value = true
  pushLine.pushStore_name = ''
  pushLine.pushStore_url = ''
}
const pushStore = async () => {
  const urlRegex = /^(clan|http).*$/
  if (!urlRegex.test(pushLine.pushStore_url)) {
    ElMessage('请输入正确的仓库/线路地址再推送')
    return
  }
  if (!tvboxIp.value) {
    ElMessage('请在手机或电视打开TVBOX')
    return
  }

  try {
    console.log((tvboxIp.value, toRaw(pushLine)))
    const result = await window.api.actionToAndroid(tvboxIp.value, toRaw(pushLine))
    window.api.actionToAndroid(tvboxIp.value, { url: pushLine.pushStore_url, do: 'api' })
    if (result.status == 'success') {
      ElMessage({
        message: result.message,
        type: 'success'
      })
      pushLinedialogVisible.value = false
    } else {
      ElMessage.error(result.message)
    }
    console.log(result)
  } catch (error) {
    ElMessage.error('推送失败')
  }
}

onMounted(() => {
  getConfig()
  getUrlsData()
  lineUpdateTip()
})
</script>


<style lang="less" scoped>
.container {
  width: 100%;
  max-width: 1024px;
  min-width: 640px;
  margin: 0 auto;
  padding: 16px 50px;
  .title {
    text-align: center;
    margin: 0;
  }
  .row {
    margin-top: 20px;
    width: 100%;
    .inline-input {
      display: block;
    }

    .textarea {
      :deep(.el-textarea__inner) {
        height: 70vh !important;
      }
    }
  }
  .btn-row {
    display: flex;
    justify-content: center;
    :deep(.el-button) {
      position: relative;
      margin: 0 5px;
      //   padding: 0;
      //   width: auto;
      .back {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        color: #fff !important;
      }
    }
  }

  .qrcode {
    width: 260px;
  }
}

.popover-div {
  display: flex;
  gap: 16px;
  flex-direction: column;
  h3 {
    text-align: center;
  }
  .popover-flex {
    display: flex;
    justify-content: space-between;
  }
}
.drawer-list {
  li {
    margin-bottom: 16px;
    p {
      margin-bottom: 8px;
      font-size: 14px;
      span {
        margin-left: 4px;
        font-size: 12px;
      }
    }
    :deep(.el-select) {
      width: 100%;
    }
    .drawer-item-div {
      display: flex;
      justify-content: space-between;
      button {
        margin-left: 12px;
      }
    }
  }
  .flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.mx-info {
  font-size: 12px;
}
.push-form {
  :deep(.el-select) {
    width: 258px;
  }
  .push-button {
    margin-left: 16px;
  }
}

img.preload {
  display: none;
  width: 0;
  height: 0;
  position: absolute;
  top: -9999px;
  left: -9999px;
}

:deep(.el-input-group__append),
:deep(.el-input-group__prepend) {
  background: transparent;
  color: #ffc107;
  padding: 0;
}
:deep(.el-button.is-plain:focus) {
  background-color: transparent;
  color: #ffc107;
  border-color: transparent;
}
:deep(.el-button.is-plain:hover) {
  background-color: #ffc107;
  color: initial;
  border-color: transparent;
}
:deep(.el-input-group__append) .el-button {
  margin: 0;
  border-radius: 0;
  height: 38px;
  & + .btn_oper {
    border-left-color: #dcdfe6;
  }
}
:deep(.el-textarea__inner) {
  background-color: #dcdfe6;
  font-size: 16px;
  color: #000;
}

:deep(input:-moz-placeholder) {
  font-size: 12px;
}

:deep(input:-ms-input-placeholder) {
  font-size: 12px;
}

:deep(input::-webkit-input-placeholder) {
  font-size: 12px;
}
</style>
<style  lang="less">
.el-autocomplete {
  width: 100%;
}
.el-autocomplete-suggestion {
  max-width: 780px;
}
.el-autocomplete-suggestion__wrap {
  max-height: 450px !important;
  li {
    line-height: 36px;
  }
}

@media screen and (max-width: 640px) {
  .el-autocomplete-suggestion {
    max-width: 360px;
  }
  :deep(.el-button) {
    padding: 12px;
  }
}
</style>

