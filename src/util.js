export function toRgba(color) {
  var div = document.createElement('div');
  div.style.backgroundColor = color;
  document.body.appendChild(div);
  var c = window.getComputedStyle(div).backgroundColor;	
  document.body.removeChild(div);
  return c;
}

export function getContentWidth(value,fontSize){
  // 通过创建span来计算内容长度
  let span = document.createElement('span')
  span.style.position = 'absolute';
  span.style.whiteSpace = 'nowrap';
  span.style.font = 'bold ' + fontSize + 'px "microsoft yahei", sans-serif';
  span.innerText = value;
  span.textContent = value;
  document.body.appendChild(span);
  let width =  span.clientWidth;
  document.body.removeChild(span);

  return width
}