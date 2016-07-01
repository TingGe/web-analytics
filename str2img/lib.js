(function(win) {
  var _ = {};

  // ASCII 转 Base64 图片
  _.Encode = function(n) {
    var r = n.length;
    if (0 !== r % 8) {
      var s = "";
      var c = 0;
      for (; c < 8 - r % 8; c++) {
        s += "\x00";
      }
      n = s + n;
    }
    r = [];
    s = 0;
    for (; s < n.length; s += 8) {
      c = 0;
      for (; 7 > c; c++) {
        r.push((n.charCodeAt(s + c) << c + 1 & 255) + (n.charCodeAt(s + c + 1) >> 6 - c));
      }
    }
    n = Math.ceil(r.length / 3);
    s = Math.ceil(Math.sqrt(n));
    s = [s, Math.ceil(n / s)];
    n = s[0];
    s = s[1];
    c = document.createElement("canvas");
    c.width = n;
    c.height = s;
    var ctx = c.getContext("2d");
    var imgData = ctx.createImageData(n, s);
    var offset = 0;
    var i = 0;
    for (; i < s; i++) {
      var j = 0;
      for (; j < n; j++) {
        var index = 4 * (i * n + j);
        var k = 0;
        for (; 3 > k; k++) {
          imgData.data[index + k] = r[offset++];
        }
        imgData.data[index + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    return c.toDataURL();
  };

  // Base64 图片 转 ASCII
  _.Decode = function(ctx) {
    var rows;
    rows = [];
    var w = ctx.width;
    var h = ctx.height;
    var c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    c = c.getContext("2d");
    c.drawImage(ctx, 0, 0);
    ctx = c.getImageData(0, 0, w, h);
    c = 0;
    for (; c < w * h * 4; c += 4) {
      [].push.apply(rows, [].slice.call(ctx.data, c, c + 3));
    }
    w = rows.length - 1;
    for (; 0 === rows[w];) {
      rows = rows.slice(0, w);
      w--;
    }
    w = "";
    h = 0;
    for (; h < rows.length; h += 7) {
      ctx = 0;
      for (; 8 > ctx; ctx++) {
        c = ((0 == ctx ? 0 : rows[h + ctx - 1]) << 7 - ctx & 127) + ((7 == ctx ? 0 : rows[h + ctx]) >> ctx + 1);
        w += 0 == c ? "" : String.fromCharCode(c);
      }
    }
    return w;
  };

  win.Everycookie = _;
})(window);
