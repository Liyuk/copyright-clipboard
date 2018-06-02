const genCopy = ({title, author, link}) => {
  return [
    '',
    '',
    `标题：${title}`,
    `链接：${link}`,
    `来源：${author}`,
    '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。',
  ]
}

document.querySelector('.content').oncopy = (event) => {
  if (!window.getSelection) {
    return
  }

  var selectionObj = window.getSelection()
  const data = {
    title: this.$page.title,
    author: '我们眼中的大学',
    link: location.href
  }

  if (selectionObj.toString().length < 42) {
    return
  }

  if (selectionObj.rangeCount) {
    var container = document.createElement("div");
    for (var i = 0, len = selectionObj.rangeCount; i < len; ++i) {
      container.appendChild(selectionObj.getRangeAt(i).cloneContents());
    }
  }
  
  if ('object' === typeof event.clipboardData) {
    event.clipboardData.setData('text/html',  container.innerHTML + genCopy(data).join('<br>'))
    container.remove();
    event.clipboardData.setData('text/plain', selectionObj.toString() + genCopy(data).join('\n'))
    event.preventDefault();
    return
  }

  document.body.append('<div id="symFixCopy" style="position: fixed; left: -9999px;">' +
    selectionObj.toString() + genCopy(data).join('<br>') + '</div>')
  window.getSelection().selectAllChildren(document.querySelectorAll('#symFixCopy')[0])
  setTimeout(function () {
    document.querySelector('#symFixCopy').remove()
  }, 200)
}