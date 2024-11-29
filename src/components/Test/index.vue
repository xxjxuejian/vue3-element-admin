<script setup>
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
</script>

<template>
  <div class="box">
    <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
    <el-button type="info"><i-ep-InfoFilled />Info</el-button>
    <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
    <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>
    <el-button type="info"><svg-icon icon-class="block-pencil" />SVG 本地图标</el-button>
    <el-button type="info"><SvgIcon icon-class="block-pencil" />SVG 本地图标</el-button>
    <div class="svg-test">
      <SvgIcon icon-class="block-pencil" />
    </div>
    <el-button type="primary" @click="counterStore.increment">{{ counterStore.count }}</el-button>
  </div>
</template>

<style scoped lang="scss">
.box {
  background-color: $bg-color; //scss配置的全局遍历$bg-color;
  .svg-test {
    font-size: 100px;
  }
}
</style>
