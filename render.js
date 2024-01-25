const information = document.getElementById('info')
information.innerText = `Chrome (v${versions.chrome()}) Node.js (v${versions.node()})  Electron (v${versions.electron()})`

function substringChinese (strValue) {
  if (!strValue) return ''

  const regexp = /[\u4e00-\u9fa5]/g
  const array = [...strValue.matchAll(regexp)]

  const first = array[0]
  const last = array[array.length - 1]
  return strValue.substring(first.index, last.index + 1)
}

const getLanguageMap = async (str) => {
  const map = await window.versions.ipcMainStats(str)

  const arr = []
  let dom = ''

  map.forEach((value, key, map) => {
    const format = substringChinese(value.trim())
    const item = {
      lineCode: key + 1,
      content: format,
      source: value.trim()
    }

    arr.push(item)
    const row = `<tr><td>${item.lineCode}</td><td>${item.content}</td><td>${item.source}</td></tr>`
    dom += row
  })

  const tbody = document.getElementById('tbody')
  tbody.innerHTML = dom

}

const btn = document.getElementById('button')

function submit () {
  FrameDialog.selectFileSync().then(res => {
    console.log('res', res)
    getLanguageMap(res[0])
  }).catch(e => {
    console.log('err', e);
  })
}