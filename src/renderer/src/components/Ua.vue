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

      <el-popover :width="220">
        <template #reference>
          <el-button size="large" type="danger" @click="downLocal()" :disabled="downing"
            >下载本地包</el-button
          >
        </template>
        <template #default>
          <div style="display: flex; gap: 16px; flex-direction: column">
            <h3 style="font-weight: 600">本地包配置</h3>
            <p style="font-size: 12px">本地包实时下载在线线路，可自定义一些配置项</p>
            <p><el-button @click="drawerSetting()">去配置</el-button></p>
          </div>
        </template>
      </el-popover>
      <el-button size="large" type="warning"
        >前往主页
        <a href="https://lige.fit" target="_blank" class="back"></a>
      </el-button>

      <!-- <el-button size="large" type="info" @click="qrDialogVisible = true">QQ频道</el-button> -->
    </div>

    <el-drawer v-model="drawer" size="50%">
      <template #header>
        <h4>本地包下载配置</h4>
      </template>
      <template #default>
        <ul class="drawer-list">
          <li>
            <p>自定义token<span>(可不填)</span></p>
            <div class="drawer-item-div">
              <el-input
                v-model="config.token"
                placeholder="支持token值或链接（默认：http://127.0.0.1:9978/file/tvbox/token.txt）"
              />
              <el-button type="success" @click="tokenRefresh" :disabled="tokening"
                >刷新Token</el-button
              >
            </div>
          </li>
          <li>
            <p>自定义壁纸<span>(可不填)</span></p>
            <el-input
              v-model="config.wallpaper"
              placeholder="支持随机壁纸接口或本地壁纸（如：clan://localhost/xxx/1.png）"
            />
          </li>
          <li>
            <p>线路更新提醒<span>(选择一条常用的线路，若线路更新，会收到提醒通知)</span></p>
            <el-select v-model="config.lineTip.url" clearable placeholder="请选择" @change="lineChange($event)">
              <el-option
                v-for="item in urls"
                :key="item.url"
                :label="item.name"
                :value="item.url"
              />
            </el-select>
          </li>
          <li>
            <p>是否生成多线路</p>
            <el-radio-group v-model="config.isLines">
              <el-radio :label="true" size="large">是</el-radio>
              <el-radio :label="false" size="large">否</el-radio>
            </el-radio-group>
          </li>
          <li>
            <el-text class="mx-info" type="info"
              >所有配置数据仅保存本地，刷新完Token后需点击“保存配置”按钮</el-text
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
      <img src="https://www.lige.fit/images/QRCode.jpg" class="qrcode" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, toRaw, reactive, onMounted } from 'vue'
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

let configCopy = reactive({})

const initConfig = () => {
  return {
    token: '',
    wallpaper: '',
    isLines: false,
    lineTip: { name:'',url: '', hash: '' }
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
}

const handleInput = () => {
  selectedName.value = ''
}

const isObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

const getUrlsData = async () => {
  try {
    const data = await window.api.getJson()
    if (data) {
      urls.value = data
      localStorage.setItem('urls', JSON.stringify(data))
    }
  } catch (error) {
    console.error(error)
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
    // if (isObject(resData)) {
    //   resData = JSON.stringify(resData,null,2)
    // }
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
const confirmClick = () => {
  console.log(JSON.stringify(config))
  if (config?.lineTip.url != configCopy?.lineTip.url) {
    config.lineTip.hash = ''
  }
  // localStorage.setItem('config', JSON.stringify(config))

  window.store.setItem('config', toRaw(config))
  ElMessage({
    message: '保存成功',
    type: 'success'
  })
  drawer.value = false
}

const lineChange = (val)=>{
   const result = urls.value.find((item)=> {
     return item.url == val;
   });
   if(result){
    config.lineTip.name = result.name
   }else{
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
      ElMessage('提醒线路无更新')
    }
  }else{
    console.log("没设置线路提醒")
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
    .mx-info {
      font-size: 12px;
    }
  }
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

