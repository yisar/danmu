export function toRgba() {
  var div = document.createElement('div');
  div.style.backgroundColor = color;
  document.body.appendChild(div);
  var c = window.getComputedStyle(div).backgroundColor;	
  document.body.removeChild(div);
  return c;
}