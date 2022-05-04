import { defineStore } from 'pinia'

const useTestStore = defineStore({
  persist: true,
  id: 'test',
  state: () => ({
    name: 'James',
    state: 'USA',
  }),
})

export default useTestStore
