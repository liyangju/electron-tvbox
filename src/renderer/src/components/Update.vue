<template>
  <el-dialog v-model="progressDialogVisible" title="更新进度" center>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="percent" />
  </el-dialog>
</template>

<script setup>
import { onMounted,ref } from 'vue'

const progressDialogVisible = ref(false)
const percent = ref(0)

// 更新出错
const handleUpdaterError = () => {
  progressDialogVisible.value = false
  percent.value = 0
  console.log('下载出错，请重启后再重新下载')
}

// 发现新版本
const handleUpdateAvailable = ({ message }) => {
  ElMessageBox.confirm(`发现新版本（v${message.version}），是否立即升级?`, '版本更新', {
    confirmButtonText: '立即更新',
    cancelButtonText: '取消'
  })
    .then(() => {
      window.updateIpc.updateNow()
    })
    .catch(() => {})
}

// 显示进度条
const handleDownloadProgress = ({ message }) => {
  progressDialogVisible.value = true
  percent.value = message.percent.toFixed(2)

  if (message.percent >= 100) {
    progressDialogVisible.value = false
  }
}

const autoUpdater = () => {
  window.updateIpc.autoUpdater((data) => {
    console.log('autoUpdater', data)
    if (data.status == 'error') {
      handleUpdaterError()
    } else if (data.status == 'update-available') {
      handleUpdateAvailable(data)
    } else if (data.status == 'download-progress') {
      handleDownloadProgress(data)
    }
  })
}

onMounted(()=>{
  autoUpdater()
})
</script>