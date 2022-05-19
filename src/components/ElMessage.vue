<template>
  <el-button :plain="true" @click="open2">success</el-button>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';

const open2 = () => {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};
</script>
