const readline = require('readline')
const fs = require('fs')

/**
 * 判断是否存在中文
 * @param str
 * @returns {boolean}
 */
function isZhCN (str) {
  const reg = /.*[\u4e00-\u9fa5]+.*$/
  return reg.test(str)
}

/**
 * 统计
 * @param filePath
 * @returns {Promise<unknown>}
 */
function statistics (filePath) {
  return new Promise((resolve, reject) => {
    let count = 0
    let lineCode = 0
    let map = new Map()

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    })

    rl.on('line', (line) => {
      const lineWithoutComment = line.replace(/(<!--.*?-->)/g, '')
      const hasChinese = isZhCN(line)
      if (hasChinese) {
        count++
        // console.log(`${lineCode + 1}\t ${hasChinese} \t ${line}`)
        map.set(lineCode, line)
      }
      lineCode++
    })
    rl.on('close', () => {
      console.log(`Matched ${count} lines, total ${lineCode}.`)
      resolve(map)
    })
  })
}

module.exports = statistics
