<template>
  <el-table :data="tableData">
    <el-table-column fixed prop="date" label="Date" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="state" label="State" />
    <el-table-column prop="city" label="City" />
    <el-table-column prop="address" label="Address" />
    <el-table-column prop="zip" label="Zip" />
    <el-table-column fixed="right" label="Operations">
      <template #default>
        <el-button type="text" size="small" @click="handleClick"
          >Detail</el-button
        >
        <el-button type="text" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import useStore from '@/store'
import { storeToRefs } from 'pinia'
const { test } = useStore()
const { name, state } = storeToRefs(test)

const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name,
    state,
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
</script>
