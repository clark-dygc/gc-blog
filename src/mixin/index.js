import { timestampToTime } from '../utils/utils'

let mixin = {
  methods: {
    formatTime(value) {
      return timestampToTime(value,true)
    }
  }
}

export default mixin
