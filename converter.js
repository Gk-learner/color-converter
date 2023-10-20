const hex = document.getElementById("hex");
const rgb = document.getElementById("rgb");

const chkHexValue = (hex) => {
  const hexRegex = /^[#]*([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i
  if (hexRegex.test(hex)) {
    return true;
  }
}

const checkRgb = (rgb) => {
  const rgbRegex = /([R][G][B][A]?[(]\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])(\s*,\s*((0\.[0-9]{1})|(1\.0)|(1)))?[)])/i
  if (rgbRegex.test(rgb)) {
    return true
  }
}
const modifyHex = (hex) => {
  if (hex.length == 4) {
    console.log('alert')
    hex = hex.replace('#', '');
  }
  if (hex.length == 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return hex;
}
const hexToRgb = (hex) => {
  let x = [];
  hex = hex.replace('#', '')
  if (hex.length != 6) {
    hex = modifyHex(hex)
  }
  x.push(parseInt(hex.slice(0, 2), 16))
  x.push(parseInt(hex.slice(2, 4), 16))
  x.push(parseInt(hex.slice(4, 6), 16))
  return "rgb(" + x.toString() + ")"
}

const rgbToHex = (rgb) => {
  let y = rgb.match(/\d+/g).map(function(x) {
    return parseInt(x).toString(16).padStart(2, '0')
  });
  return y.join('').toUpperCase()
}

const addHash = (x) => {
  return '#' + x;
}

const getContrastYIQ = (hexcolor) => {
  if (chkHexValue(hexcolor)) {
    hexcolor = hexcolor.replace("#", '')
  } else {
    hexcolor = rgbToHex(hexcolor)
  }
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? document.body.classList.add('dark') : document.body.classList.remove('dark')
}

hex.addEventListener('keyup', function() {
  let color = hex.value
  if (chkHexValue(color)) {
    color = modifyHex(color);
    document.body.style.backgroundColor = addHash(color);
    getContrastYIQ(color)
    rgb.value = hexToRgb(color);
  }
})

hex.addEventListener('keydown', function() {
 document.getElementsByClassName('tooltiptext').style.display = "none"
})

hex.addEventListener('blur', function() {
  if (chkHexValue(hex.value)) {
    hex.value = modifyHex(hex.value)
    if (hex.value[1] != '#') {
      if (hex.value[0] != '#') {
        hex.value = addHash(hex.value);
      }
    }
  }
})
rgb.addEventListener('keyup', function() {
  let color = rgb.value
  if (checkRgb(color)) {
    hex.value = color = addHash(rgbToHex(color))
    document.body.style.backgroundColor = color;
    getContrastYIQ(color)
  }
})
document.addEventListener('keyup', function() {
  errorMark();
})

const errorMark = () => {
  if (chkHexValue(hex.value)) {
    document.getElementById('hexError').classList.add('hidden');
  } else {
    document.getElementById('hexError').classList.remove('hidden');
  }
  if (checkRgb(rgb.value)) {
    document.getElementById('rgbError').classList.add('hidden');
  } else {
    document.getElementById('rgbError').classList.remove('hidden');
  }
}