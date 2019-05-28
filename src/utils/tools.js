/**
 * 公共工具函数
 */

/**
 * 日期时间格式化
 * @param {date} time js的date类型或时间戳
 * @param {string} format 自定义时间格式，选填，默认为'{y}-{m}-{d} {h}:{i}:{s}'
 * @return {string} 默认格式 2018-09-01 10:55:00
 */
export function formatDate (time, format) {
  time = time || new Date()
  format = format || '{y}-{m}-{d} {h}:{i}:{s}'
  let date = time
  if (typeof time !== 'object') {
    if (('' + time).length === 10) time = +time * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * 日期格式转时间戳
 * @param {date} date date类型 2019-05-24 14:22:17
 * @return {string} 1558678937000
 */
export function getTimestamp (date) {
  if (!date) {
    return new Date().getTime()
  }
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  return new Date(date).getTime()
}

/**
 * 日期时间文字化
 * 比较传入时间与当前本地时间，文字化显示日期时间
 * @param {date} time js的date类型或时间戳
 * @param {string} cFormat 自定义两天前的时间格式，选填
 * @return {string} 刚刚 n分钟前 n小时前 1天前
 */
export function txtFormatTime (time, format) {
  if (!time) {
    return 'null'
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  } else {
    return formatDate(time, format)
  }
}

/**
 * 对象参数序列化
 * @param {object} obj 对象参数
 * @return {string} a=1&b=2&c=3
 */
export function objToUrlParams (obj) {
  let str = ''
  Object.keys(obj).forEach(v => {
    if (obj[v] !== undefined) {
      str += `${encodeURIComponent(v)}=${encodeURIComponent(obj[v])}&`
    }
  })
  return str.slice(0, -1)
}

/**
 * 获取地址参数
 * @param {string} url 指定地址，默认取当前页地址
 * @return {string} { a: 1, b: 2, c: 3 }
 */
export function getQueryObject (url) {
  url = url || window.location.href
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
export function createUniqueString () {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * 文件下载
 * @param {string} url 文件下载链接url，带上接口参数
 * @param {string} name 前端自定义的下载文件名，带上文件后缀名，选填
 * chrome会优先使用接口返回的命名，edge会优先使用此name
 */
export function downloadFile (url, name) {
  const ele = document.createElement('a')
  ele.target = '_blank'
  ele.href = url || ''
  ele.download = name || ''
  document.body.appendChild(ele)
  ele.click()
  document.body.removeChild(ele)
}

/**
 * 获取字符串的字节长度
 * @param {String} str 字符串
 * @returns {number} 字节长度
 */
export function getByteLength (str) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line
    if (str[i].match(/[^\x00-\xff]/ig) != null) {
      len += 2
    } else { len += 1 }
  }
  return len
}

/**
 * 数字千分化
 * @param {number} num 数字
 * @return {number} 10,000
 */
export function toThousands (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 数字存储大小格式化
 * @param {number} num 存储大小 单位：Byte
 * @param {number} digits 保留几位小数
 * @return {string} 2MB
 */
export function toStorage (num, digits) {
  if (num < 1024) {
    return num + 'B'
  }
  num = (num * 1000 / 1024)
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'K' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
        si[i].symbol + 'B'
    }
  }
}

/**
 * el-date-picker快捷选项配置
 */
export function pickerOptions () {
  return [
    {
      text: '今天',
      onClick (picker) {
        const end = new Date()
        const start = new Date(new Date().toDateString())
        end.setTime(start.getTime())
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一周',
      onClick (picker) {
        const end = new Date(new Date().toDateString())
        const start = new Date()
        start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一个月',
      onClick (picker) {
        const end = new Date(new Date().toDateString())
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近三个月',
      onClick (picker) {
        const end = new Date(new Date().toDateString())
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }
  ]
}

/**
 * 对象合并 (属性为简单数据类型时更新，复杂数据类型时合并)
 * @param {object} target 目标对象
 * @param {object} source 源对象
 * @return {object} 合并后的对象 (改变引用地址)
 */
export function objectMerge (target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return JSON.parse(JSON.stringify(target))
}

/**
 * 函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 深克隆
 * @param {object|array} 源数据
 * @return {object|array}
 */
export function deepClone (source) {
  return JSON.parse(JSON.stringify(source))
}

/**
 * 获取数据类型
 * @param {any} data 数据
 * @return {string} 'array'
 */
export function getDataType (data) {
  const str = Object.prototype.toString.call(data)
  return str.match(/\s(\w*)\]/)[1].toLowerCase()
}
