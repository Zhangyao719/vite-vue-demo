import useTestStore from './modules/test'

export default function useStore() {
  return {
    test: useTestStore(),
  }
}
