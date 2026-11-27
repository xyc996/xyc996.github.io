/* ==========================================================
   轻量 Python 语法高亮器（零依赖，离线可用）
   用法: highlightPython(src) -> 带 <span> 的 HTML
   ========================================================== */
(function (global) {
  "use strict";

  var KEYWORDS = {
    "False": 1, "None": 1, "True": 1, "and": 1, "as": 1, "assert": 1,
    "async": 1, "await": 1, "break": 1, "class": 1, "continue": 1,
    "def": 1, "del": 1, "elif": 1, "else": 1, "except": 1, "finally": 1,
    "for": 1, "from": 1, "global": 1, "if": 1, "import": 1, "in": 1,
    "is": 1, "lambda": 1, "nonlocal": 1, "not": 1, "or": 1, "pass": 1,
    "raise": 1, "return": 1, "try": 1, "while": 1, "with": 1, "yield": 1
  };

  var BUILTINS = {
    "print": 1, "input": 1, "int": 1, "float": 1, "str": 1, "bool": 1,
    "list": 1, "tuple": 1, "dict": 1, "set": 1, "len": 1, "range": 1,
    "type": 1, "sum": 1, "max": 1, "min": 1, "abs": 1, "sorted": 1,
    "reversed": 1, "round": 1, "open": 1, "enumerate": 1, "zip": 1,
    "isinstance": 1, "ord": 1, "chr": 1, "pow": 1, "divmod": 1,
    "map": 1, "filter": 1, "any": 1, "all": 1, "format": 1, "eval": 1,
    "id": 1, "random": 1, "math": 1, "time": 1, "self": 1
  };

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // 单次扫描：注释 / 字符串 / 数字 / 标识符 / 运算符
  var TOKEN_RE = new RegExp(
    "(#[^\\n]*)" +                                   // 1 注释
    "|(\"\"\"[\\s\\S]*?\"\"\"|'''[\\s\\S]*?''')" +    // 2 三引号字符串
    "|(\"(?:[^\"\\\\\\n]|\\\\.)*\"|'(?:[^'\\\\\\n]|\\\\.)*')" + // 3 普通字符串
    "|(\\b\\d+\\.?\\d*(?:[eE][+-]?\\d+)?\\b|\\.\\d+)" + // 4 数字
    "|([A-Za-z_]\\w*)" +                             // 5 标识符
    "|(\\*\\*|//|[-+*/%=<>!&|^~@:,.()\\[\\]{}])",     // 6 运算符与标点
    "g"
  );

  function highlightPython(src) {
    var out = "";
    var last = 0;
    var m;
    var prevWord = "";
    TOKEN_RE.lastIndex = 0;

    while ((m = TOKEN_RE.exec(src)) !== null) {
      if (m.index > last) out += esc(src.slice(last, m.index));
      var t = m[0];

      if (m[1]) {                                   // 注释
        out += '<span class="tok-c">' + esc(t) + "</span>";
        prevWord = "";
      } else if (m[2] || m[3]) {                    // 字符串
        out += '<span class="tok-s">' + esc(t) + "</span>";
        prevWord = "";
      } else if (m[4]) {                            // 数字
        out += '<span class="tok-n">' + esc(t) + "</span>";
        prevWord = "";
      } else if (m[5]) {                            // 标识符
        var cls = "tok-v";
        if (KEYWORDS[t]) cls = "tok-k";
        else if (prevWord === "def") cls = "tok-f";
        else if (BUILTINS[t]) cls = "tok-b";
        else if (/^[A-Z][A-Z0-9_]*$/.test(t)) cls = "tok-const";
        out += '<span class="' + cls + '">' + esc(t) + "</span>";
        prevWord = t;
      } else if (m[6]) {                            // 运算符
        out += '<span class="tok-o">' + esc(t) + "</span>";
        prevWord = "";
      }
      last = m.index + t.length;
    }
    if (last < src.length) out += esc(src.slice(last));
    return out;
  }

  /* 生成带行号的代码块 HTML */
  function codeBlockHTML(src, title) {
    var html = highlightPython(src);
    var lines = html.split("\n").map(function (line, i) {
      return '<span class="cb-line" data-n="' + (i + 1) + '">' + (line || " ") + "</span>";
    });
    return (
      '<div class="codeblock">' +
      '<div class="cb-head"><span>' + esc(title || "python") + '</span>' +
      '<button class="cb-copy" type="button">复制代码</button></div>' +
      "<pre><code>" + lines.join("\n") + "</code></pre></div>"
    );
  }

  global.PyHL = { highlight: highlightPython, codeBlock: codeBlockHTML, esc: esc };
})(window);
