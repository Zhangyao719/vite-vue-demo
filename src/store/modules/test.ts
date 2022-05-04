import { defineStore } from 'pinia'

const useTestStore = defineStore({
  id: 'test',
  state: () => ({
    name: 'James',
    state: 'USA',
  }),
})

export default useTestStore
