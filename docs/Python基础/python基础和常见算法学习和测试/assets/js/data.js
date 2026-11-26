/* ==========================================================
   豫考通 · 内容数据
   CHAPTERS 知识精讲 / ALGOS 算法专题 / CODE 代码示例库
   ========================================================== */

/* ---------- 代码示例库 ---------- */
var CODE = {
  hello:
'# 我的第一个 Python 程序\nprint("Hello, Python!")   # 在屏幕上输出一句话\nprint("河南会考，我准备好了！")',

  comment:
'# 单行注释：给人看的说明，程序不执行\nprint(1 + 2)      # 输出 3\nprint(4 * 5)      # 输出 20',

  var:
'name = "小明"        # 字符串（str）：名字\nage = 16             # 整数（int）：年龄\nheight = 1.72        # 小数（float）：身高\nis_student = True    # 布尔值（bool）：是否学生\nprint(name, age, height, is_student)',

  types:
'print(type(3))        # <class \'int\'>   整数\nprint(type(3.14))     # <class \'float\'> 小数\nprint(type("3.14"))   # <class \'str\'>   字符串\nprint(type(True))     # <class \'bool\'>  布尔值',

  truthy:
'print(bool(0))        # False\nprint(bool(""))       # False 空字符串\nprint(bool([]))       # False 空列表\nprint(bool(" "))      # True  有一个空格也是内容\nprint(bool(3))        # True',

  ops:
'print(5 + 3)        # 8   加法\nprint(10 - 4)       # 6   减法\nprint(2 * 6)        # 12  乘法\nprint(7 / 2)        # 3.5 除法，结果一定是小数\nprint(7 // 2)       # 3   整除，只要整数商\nprint(7 % 2)        # 1   取余数\nprint(2 ** 3)       # 8   幂运算，2的3次方\nprint(5 + 3 * 2)    # 11  先乘除后加减\nprint((5 + 3) * 2)  # 16  括号最优先',

  cmp:
'print(3 < 5)                    # True\nprint(5 <= 5)                   # True\nprint(3 == 3)                   # True  判断相等用两个等号\nprint(3 != 4)                   # True  判断不相等\nprint("a" < "b")                # True 字符串按字典序比较',

  logic:
'print(3 < 5 and 5 < 3)          # False  and：两边都真才真\nprint(3 < 5 or 5 < 3)           # True   or：有一边真就真\nprint(not (3 < 5))              # False  not：取反\nprint(True or False and False)  # True   优先级：not > and > or\nprint("会" in "会考")            # True   in：判断包含关系',

  convert:
'age = int(input("请输入年龄："))    # input得到文字，int转成数字\nprint("明年你", age + 1, "岁")\n\nprint(int(3.9))        # 3   小数转整数：截断，不是四舍五入\nprint(int("12"))       # 12  纯数字字符串可以转\nprint(float("3.5"))    # 3.5\nprint(str(100))        # 100  数字转成字符串',

  input_err:
'age = input("请输入年龄：")\nprint(age + 1)   # 报错！input得到的是字符串"16"，不能直接和数字相加',

  io:
'name = input("你叫什么名字？")\nprint("你好，", name, "！")\nprint("A", "B", "C", sep="-")   # 输出 A-B-C\nprint("不换行", end="")\nprint("接着输出")               # 两行内容显示在同一行',

  grade:
'score = 72\nif score >= 85:\n    print("A等级")\nelif score >= 70:\n    print("B等级")\nelif score >= 60:\n    print("C等级")\nelse:\n    print("D等级")',

  leap:
'year = 2024\nif year % 4 == 0 and year % 100 != 0 or year % 400 == 0:\n    print(year, "年是闰年")\nelse:\n    print(year, "年不是闰年")',

  abs_flow:
'a = -5\nif a >= 0:\n    print(a)      # a不小于0，原样输出\nelse:\n    print(-a)     # a小于0，输出它的相反数',

  for1:
'for i in range(5):\n    print(i)          # 依次输出 0 1 2 3 4\n\nfor i in range(1, 6):\n    print(i)          # 依次输出 1 2 3 4 5\n\nfor i in range(1, 10, 2):\n    print(i)          # 依次输出 1 3 5 7 9（步长2）',

  for_str:
'for ch in "Python":\n    print(ch)         # 依次输出 P y t h o n\n\nfor x in [10, 20, 30]:\n    print(x)          # 依次输出 10 20 30',

  while1:
'a = 76\nwhile a <= 90:\n    a = a + 4\nprint(a)     # 会考真题：a的值？',

  while_dead:
'i = 1\nwhile i <= 5:\n    print(i)\n# 糟糕！忘了写 i = i + 1，循环永远不会停',

  bc:
'for i in range(10):\n    if i == 3:\n        continue       # 跳过3，直接进入下一轮\n    if i == 6:\n        break          # 到6就结束整个循环\n    print(i)           # 依次输出 0 1 2 4 5',

  nest:
'for i in range(3):        # 外层循环管"行"\n    for j in range(3):    # 内层循环管"列"\n        print("*", end="")\n    print()               # 每行结束换一下行',

  accumulate:
's = 0                    # 计数器先清零\nfor i in range(1, 101):  # 1到100\n    s = s + i            # 每轮累加\nprint(s)                 # 5050',

  index:
's = "HelloWorld"\nprint(s[0])      # H   第一个字符\nprint(s[-1])     # d   最后一个字符\nprint(s[2:5])    # llo 切片：从2开始到4结束（含头不含尾）\nprint(len(s))    # 10  字符串长度',

  methods:
's = "Hello,Python"\nprint(s.upper())                  # HELLO,PYTHON 全部变大写\nprint(s.lower())                  # hello,python 全部变小写\nprint(s.replace("l", "L"))        # HeLLo,Python 替换字符\nprint("2024-06-18".split("-"))    # [\'2024\', \'06\', \'18\'] 按-分割\nprint("abc123".isalpha())         # False 是否全是字母\nprint("123".isdigit())            # True  是否全是数字\nprint("Python".find("th"))        # 2     查找位置',

  list1:
'nums = [3, 1, 4, 1, 5]\nprint(nums[0])        # 3   第一个元素\nnums.append(9)        # 在末尾添加9\nnums.insert(0, 7)     # 在开头插入7\nnums.pop()            # 删除最后一个元素\nnums.remove(1)        # 删除第一个1\nnums.sort()           # 升序排序\nprint(nums)           # [3, 4, 7, 9]\nprint(len(nums), sum(nums), max(nums), min(nums))',

  list2:
'nums = [3, 1, 2]\nnew = sorted(nums)    # 生成新列表，原列表不变\nprint(new, nums)      # [1, 2, 3] [3, 1, 2]\nprint(nums[::-1])     # [2, 1, 3] 切片反转',

  tupdict:
't = (1, 2, 3)                    # 元组：创建后不能修改\nprint(t[0])                     # 1\n\nd = {"name": "小明", "age": 16}  # 字典：键值对\nd["city"] = "郑州"                # 添加"城市"\nprint(d["name"], d["age"])       # 小明 16\nprint(len(d))                    # 3',

  def1:
'def greet(name):           # 定义函数：起个名字，留下参数\n    print("你好，", name)\n\ngreet("小明")              # 调用函数\ngreet("小红")              # 可以反复调用',

  ret:
'def add(a, b):\n    return a + b           # 把结果还给调用者\n\nprint(add(2, 3))           # 5\nprint(add(2, 3) * 2)       # 10  返回值可以继续参与计算',

  gcd:
'def gcd(a, b):\n    while b:               # b不等于0就继续除\n        a, b = b, a % b\n    return a\n\nprint(gcd(12, 18))         # 6',

  foo:
'def foo(s):\n    t = ""\n    for i in range(len(s)):\n        if i % 2 == 0:\n            t += s[i].upper()\n        else:\n            t += s[i].lower()\n    return t\n\nprint(foo("Information"))',

  /* 小测用代码 */
  m2code:
'x = "5"\nprint(x * 2)',
  m4code:
'age = input("请输入年龄：")\nprint(age + 1)',
  m9code:
'print(7 // 2, 7 % 2)'
};

/* ---------- 小测（嵌入章节） ---------- */
var MINIS = {
  m1: {
    type: "choice",
    q: "Python 语言属于下列哪一类语言？",
    options: ["机器语言", "汇编语言", "解释型高级语言", "编译型低级语言"],
    answer: 2,
    explain: "Python 是解释型高级语言：代码接近自然语言、可读性强，运行时由解释器逐行翻译执行，不需要事先编译成机器码。"
  },
  m2: {
    type: "read",
    q: "看程序写结果：下列程序执行后，输出是什么？",
    code: CODE.m2code,
    answer: '"55"（即两个5）',
    steps: [
      'x = "5" 把字符串 "5" 存进变量 x',
      '字符串的 * 表示重复：x * 2 就是 "5" 重复 2 次',
      '所以输出 55（注意是字符串形式，不是数字 10）'
    ]
  },
  m3: {
    type: "choice",
    q: "下列选项中，可以作为 Python 合法变量名的是（ ）",
    options: ["3m", "if", "exe", "a+b"],
    answer: 2,
    explain: "变量名必须以字母或下划线开头，且不能使用关键字。3m 以数字开头；if 是关键字；a+b 含运算符；只有 exe 合法。（会考常考题型）"
  },
  m4: {
    type: "read",
    q: "看程序写结果：用户输入 18 后，程序会怎样？",
    code: CODE.m4code,
    answer: "报错（TypeError：字符串和整数不能相加）",
    steps: [
      'input() 无论输入什么，得到的都是字符串 "18"',
      '"18" + 1：字符串不能和整数相加，Python 直接报错',
      "正确写法：age = int(input(...))，先转成数字再计算"
    ]
  },
  m5: {
    type: "read",
    q: "看程序写结果：score = 72，执行后输出什么？",
    code: "score = 72\nif score >= 85:\n    print(\"A等级\")\nelif score >= 70:\n    print(\"B等级\")\nelif score >= 60:\n    print(\"C等级\")\nelse:\n    print(\"D等级\")",
    answer: "B等级",
    steps: [
      "从上往下依次判断：72 >= 85 吗？不成立",
      "72 >= 70 吗？成立！执行这一分支",
      "输出 B等级，后面分支不再判断"
    ]
  },
  m6: {
    type: "read",
    q: "看程序写结果：执行后 print(a) 输出多少？（会考真题同款）",
    code: CODE.while1,
    answer: "92",
    steps: [
      "a = 76，判断 76 <= 90 成立，a = 80",
      "80 <= 90 成立，a = 84；接着 88；接着 92",
      "92 <= 90 不成立，循环结束，输出 92"
    ]
  },
  m7: {
    type: "read",
    q: "看程序写结果：for 循环结束后，s 的值是多少？",
    code: "s = 0\nfor i in range(1, 6):\n    s = s + i\nprint(s)",
    answer: "15",
    steps: [
      "range(1, 6) 依次产生 1、2、3、4、5（含 1 不含 6）",
      "s 的变化：0 → 1 → 3 → 6 → 10 → 15",
      "循环结束输出 15"
    ]
  },
  m8: {
    type: "read",
    q: "看程序写结果：print(foo(\"Information\")) 输出什么？（函数+字符串综合）",
    code: CODE.foo,
    answer: "InFoRmAtIoN",
    steps: [
      "函数功能：偶数下标取大写，奇数下标取小写",
      "第0位 I→I，第1位 n→n，第2位 f→F，第3位 o→o……",
      "所以输出 InFoRmAtIoN（大小写交替）"
    ]
  },
  m9: {
    type: "read",
    q: "看程序写结果：print(7 // 2, 7 % 2) 输出什么？",
    code: CODE.m9code,
    answer: "3 1",
    steps: [
      "// 是整除：7 // 2 = 3（只要商，不要余数）",
      "% 是取余：7 % 2 = 1",
      "print 输出两个值，中间用空格隔开：3 1"
    ]
  },
  m10: {
    type: "read",
    q: "看程序写结果：print(f(3) + 1) 输出多少？",
    code: "def f(x):\n    return x * 2\n\nprint(f(3) + 1)",
    answer: "7",
    steps: [
      "调用 f(3)，函数返回 3 * 2 = 6",
      "返回值 6 再和 1 相加",
      "输出 7"
    ]
  }
};

/* ---------- 辅助函数（生成 HTML 片段） ---------- */
function cb(key, title) {
  return PyHL.codeBlock(CODE[key], title || ("示例代码 · " + key));
}
function mq(id) {
  return '<div class="mini-quiz" data-mini="' + id + '"></div>';
}
/* 代码 + 流程图配对容器：宽屏并排（代码在左、图在右），窄屏堆叠；
   传 3 个及以上子元素时加 pair3（一段代码对两张对比图，三栏并排）；
   pairWide 用于代码含超长行的配对（图列让位，且并排阈值更高） */
function pair() {
  var cls = arguments.length > 2 ? "fc-pair pair3" : "fc-pair";
  return '<div class="' + cls + '">' + Array.prototype.join.call(arguments, "") + "</div>";
}
function pairWide() {
  return '<div class="fc-pair wide-code">' + Array.prototype.join.call(arguments, "") + "</div>";
}

/* ---------- 流程图生成器（会考标准符号） ----------
   term 起止框（圆角）/ io 输入输出框（平行四边形）/ proc 处理框（矩形）/ dec 判断框（菱形） */
var FC_STYLE = {
  term: { fill: "#ccfbf1", stroke: "#0f766e", text: "#115e59" },
  io: { fill: "#dbeafe", stroke: "#2563eb", text: "#1e3a8a" },
  proc: { fill: "#f0fdfa", stroke: "#0f766e", text: "#134e4a" },
  dec: { fill: "#fef3c7", stroke: "#d97706", text: "#92400e" },
  line: "#64748b"
};
function fcNode(type, x, y, w, h, label) {
  var c = FC_STYLE[type] || FC_STYLE.proc;
  var cx = x + w / 2, cy = y + h / 2, s = "";
  if (type === "term") {
    s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + h / 2 + '" fill="' + c.fill + '" stroke="' + c.stroke + '" stroke-width="1.6"/>';
  } else if (type === "io") {
    var sk = Math.min(12, h * 0.42);
    s += '<polygon points="' + (x + sk) + "," + y + " " + (x + w) + "," + y + " " + (x + w - sk) + "," + (y + h) + " " + x + "," + (y + h) + '" fill="' + c.fill + '" stroke="' + c.stroke + '" stroke-width="1.6"/>';
  } else if (type === "dec") {
    s += '<polygon points="' + cx + "," + y + " " + (x + w) + "," + cy + " " + cx + "," + (y + h) + " " + x + "," + cy + '" fill="' + c.fill + '" stroke="' + c.stroke + '" stroke-width="1.6"/>';
  } else {
    s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" fill="' + c.fill + '" stroke="' + c.stroke + '" stroke-width="1.6"/>';
  }
  var lines = String(label).split("\n");
  var lh = 13.5, y0 = cy - (lines.length - 1) * lh / 2 + 4.2;
  lines.forEach(function (t, i) {
    s += '<text x="' + cx + '" y="' + (y0 + i * lh).toFixed(1) + '" text-anchor="middle" font-size="' + (lines.length > 1 ? 10.5 : 12.5) + '" font-weight="600" fill="' + c.text + '">' + t + "</text>";
  });
  return s;
}
function fcArrow(pts, label, lx, ly, noHead) {
  var d = "M " + pts.map(function (p) { return p[0] + " " + p[1]; }).join(" L ");
  var s = '<path d="' + d + '" fill="none" stroke="' + FC_STYLE.line + '" stroke-width="1.6"/>';
  if (!noHead) {
    var a = pts[pts.length - 2], b = pts[pts.length - 1];
    var ang = Math.atan2(b[1] - a[1], b[0] - a[0]), L = 8, W = 3.6;
    var p1 = (b[0] - L * Math.cos(ang) + W * Math.sin(ang)).toFixed(1) + "," + (b[1] - L * Math.sin(ang) - W * Math.cos(ang)).toFixed(1);
    var p2 = (b[0] - L * Math.cos(ang) - W * Math.sin(ang)).toFixed(1) + "," + (b[1] - L * Math.sin(ang) + W * Math.cos(ang)).toFixed(1);
    s += '<polygon points="' + b[0] + "," + b[1] + " " + p1 + " " + p2 + '" fill="' + FC_STYLE.line + '"/>';
  }
  if (label) {
    s += '<text x="' + lx + '" y="' + ly + '" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b45309" stroke="#fff" stroke-width="3" paint-order="stroke">' + label + "</text>";
  }
  return s;
}
function fc(w, h, body, cap, wide) {
  return '<div class="fc-wrap view-enter"><div class="fc-cap">' + cap + "</div>" +
    '<svg class="fc' + (wide ? " wide" : "") + '" viewBox="0 0 ' + w + " " + h + '" xmlns="http://www.w3.org/2000/svg" role="img">' + body + "</svg></div>";
}
/* 判断框左上角的 ①② 角标（对应会考"图中①处应填"） */
function fcBadge(x, y, n) {
  return '<circle cx="' + x + '" cy="' + y + '" r="9" fill="#fff" stroke="#d97706" stroke-width="1.4"/>' +
    '<text x="' + x + '" y="' + (y + 3.5) + '" text-anchor="middle" font-size="10.5" font-weight="700" fill="#b45309">' + n + "</text>";
}

/* ==========================================================
   知识精讲 · 六章
   ========================================================== */
var CHAPTERS = [
/* ---------- 第 1 章 ---------- */
{
  id: "ch1", num: 1, icon: "🐍", title: "走进 Python",
  goal: "了解程序语言的发展与 Python 的特点，写出第一个程序，熟悉会考上机操作",
  stars: 1,
  sections: [
    {
      id: "ch1-1", title: "程序语言的发展", minutes: 6,
      html:
        '<h3>从 0 和 1 到“说人话”</h3>' +
        '<p>计算机其实只认识 <b>0 和 1</b>。人要让计算机干活，就得用它能理解的方式下命令，于是程序语言经历了三代发展：</p>' +
        '<div class="table-wrap"><table class="tb"><tr><th>阶段</th><th>语言</th><th>特点</th><th>举例</th></tr>' +
        "<tr><td>第一代</td><td>机器语言</td><td>直接用 0/1 二进制，计算机能直接执行，但难记易错</td><td>10110000 00000011</td></tr>" +
        "<tr><td>第二代</td><td>汇编语言</td><td>用助记符代替二进制指令，仍需汇编程序翻译</td><td>MOV AX, 3</td></tr>" +
        "<tr><td>第三代</td><td>高级语言</td><td>接近自然语言，可读性强、易学易维护</td><td>Python、C、C++</td></tr></table></div>" +
        '<div class="box box-exam"><div class="box-title">🎯 会考怎么考</div><p>常考判断：<b>“Python 属于解释型高级语言”</b>。注意区分：C 语言一般是<b>编译型</b>（先整体翻译再执行）；Python 是<b>解释型</b>（解释器逐行翻译执行）。</p></div>' +
        '<div class="box box-analogy"><div class="box-title">💡 直觉理解</div><p>编译像<b>请翻译把整本书译好再出版</b>；解释像<b>同声传译</b>，说一句翻一句。Python 就是后者，所以写一行就能立刻跑一行。</p></div>'
    },
    {
      id: "ch1-2", title: "Python 的四大特点", minutes: 6,
      html:
        "<h3>为什么学考选它</h3>" +
        "<ul>" +
        "<li><b>简洁</b>：语法接近英语，代码量往往只有其他语言的几分之一</li>" +
        "<li><b>跨平台</b>：Windows、Linux、手机系统上都能跑</li>" +
        "<li><b>免费开源</b>：不用花钱，全球开发者共同建设</li>" +
        "<li><b>类库丰富</b>：大量现成工具包，如 <code>time</code>（时间）、<code>random</code>（随机数）、<code>math</code>（数学计算）</li>" +
        "</ul>" +
        '<div class="box box-exam"><div class="box-title">🎯 会考怎么考</div><p>常考选择题：“下列<b>不属于</b> Python 特点的是”——记住 Python 是解释型、免费开源、跨平台；如果选项说“Python 代码需要先编译成机器码才能运行”，这句话是<b>错</b>的。</p></div>'
    },
    {
      id: "ch1-3", title: "写出第一个程序", minutes: 8,
      html:
        "<h3>print 和注释</h3>" +
        "<p><code>print()</code> 是 Python 的“嘴巴”，负责把内容显示到屏幕上；<code>#</code> 后面的文字是<b>注释</b>，只给人看，程序不执行。</p>" +
        cb("hello") +
        '<div class="box box-warn"><div class="box-title">⚠️ 新手第一坑：中文标点</div><p>代码里的引号、冒号、括号<b>必须是英文半角</b>。写成 <code>print（"你好"）</code> 会直接报错——这是初学者最常见的错误，没有之一。</p></div>' +
        '<div class="box box-exam"><div class="box-title">🎯 会考上机提示</div><p>会考 Python 操作题在考试系统里完成：先读题目和代码里的注释，补全代码，按 <b>F5</b> 运行看结果，确认无误后<b>保存</b>。退出前务必确认已保存！</p></div>' +
        mq("m1")
    },
    {
      id: "ch1-4", title: "会考 Python 部分长什么样", minutes: 7,
      html:
        "<h3>知己知彼</h3>" +
        "<p>河南信息技术会考实行<b>全省统一上机考试</b>，Python 相关考查主要有两种形态：</p>" +
        "<ul>" +
        "<li><b>客观题（选择题/判断题）</b>：给一段程序，问输出结果、问变量名是否合法、问结构类型</li>" +
        "<li><b>操作题（应用处理题）</b>：给出项目和半成品代码，要求补全空缺处，使程序正确运行并保存</li>" +
        "</ul>" +
        '<div class="box box-say"><div class="box-title">🧭 学习路线建议</div><p>把本站当闯关：<b>知识精讲</b>打基础 → <b>算法专题</b>练会考常考套路 → <b>刷题中心</b>检验 → <b>模拟测试</b>找考场感觉 → <b>错因诊所</b>扫清盲区。</p></div>'
    }
  ],
  quizIds: ["c01", "c02", "c03"]
},

/* ---------- 第 2 章 ---------- */
{
  id: "ch2", num: 2, icon: "📦", title: "数据与变量",
  goal: "掌握变量命名规则、四种基本数据类型、常用运算符、类型转换与输入输出",
  stars: 1,
  sections: [
    {
      id: "ch2-1", title: "变量与命名规则", minutes: 8,
      html:
        "<h3>变量是一个“贴了标签的盒子”</h3>" +
        "<p>变量就像贴了名字的盒子，把数据放进去，随时取用。往盒子里放东西叫<b>赋值</b>，用等号 <code>=</code>：</p>" +
        cb("var") +
        "<h4>命名规则（会考高频）</h4>" +
        "<ul>" +
        "<li>只能由<b>字母、数字、下划线</b>组成，且<b>不能以数字开头</b></li>" +
        "<li><b>区分大小写</b>：<code>Age</code> 和 <code>age</code> 是两个变量</li>" +
        "<li>不能使用<b>关键字</b>（if、for、while、True 等有特殊含义的词）</li>" +
        "</ul>" +
        '<div class="table-wrap"><table class="tb"><tr><th>变量名</th><th>合法？</th><th>原因</th></tr>' +
        "<tr><td><code>3m</code></td><td>✗</td><td>数字开头</td></tr>" +
        "<tr><td><code>if</code></td><td>✗</td><td>关键字</td></tr>" +
        "<tr><td><code>a+b</code></td><td>✗</td><td>含运算符</td></tr>" +
        "<tr><td><code>exe</code></td><td>✓</td><td>合法（会考真题选项）</td></tr>" +
        "<tr><td><code>_name</code> / <code>Name2</code></td><td>✓</td><td>合法</td></tr></table></div>" +
        '<div class="box box-exam"><div class="box-title">🎯 会考真题</div><p>“下列选项中，可以作为 Python 合法变量名的是（ ）A.3m B.if C.a+b D.exe” ——答案选 <b>D</b>。</p></div>'
    },
    {
      id: "ch2-2", title: "四种基本数据类型", minutes: 8,
      html:
        "<h3>数据有不同的“形状”</h3>" +
        "<p>会考要求掌握四种基本类型，用 <code>type()</code> 可以查看：</p>" +
        '<div class="table-wrap"><table class="tb"><tr><th>类型</th><th>含义</th><th>例子</th></tr>' +
        "<tr><td><code>int</code> 整型</td><td>整数</td><td>16、-3、100</td></tr>" +
        "<tr><td><code>float</code> 浮点型</td><td>小数</td><td>1.72、3.14</td></tr>" +
        "<tr><td><code>str</code> 字符串型</td><td>文本</td><td>\"小明\"、\"2024\"</td></tr>" +
        "<tr><td><code>bool</code> 布尔型</td><td>真/假</td><td>True、False</td></tr></table></div>" +
        cb("types") +
        '<div class="box box-analogy"><div class="box-title">💡 直觉理解</div><p>Python 的变量“不挑食”：同一个名字，这次装整数，下次可以装字符串，类型可以随时变（这叫<b>动态类型</b>）。</p></div>' +
        "<h4>布尔值的真假规律（常考）</h4>" +
        cb("truthy") +
        "<p>记住：<b>0、空字符串、空列表</b> 等“空”的东西都算 False，其余基本算 True。</p>"
    },
    {
      id: "ch2-3", title: "运算符与表达式", minutes: 10,
      html:
        "<h3>算术运算符</h3>" +
        "<p>重点区分 <code>/</code> 和 <code>//</code>：<code>/</code> 结果一定是小数，<code>//</code> 只取整数商。</p>" +
        cb("ops") +
        "<h4>比较运算符</h4>" +
        cb("cmp") +
        "<h4>逻辑运算符</h4>" +
        cb("logic") +
        '<div class="box box-warn"><div class="box-title">⚠️ 易混点</div><p><code>=</code> 是赋值（把右边放进左边），<code>==</code> 才是判断相等。写 <code>if score = 60</code> 会报语法错误。</p></div>' +
        '<div class="box box-exam"><div class="box-title">🎯 运算优先级</div><p>括号 <code>()</code> → 幂 <code>**</code> → 乘除取余 → 加减 → 比较 → <code>not</code> → <code>and</code> → <code>or</code>。记不住就先加括号，括号永远最优先。</p></div>'
    },
    {
      id: "ch2-4", title: "类型转换", minutes: 8,
      html:
        "<h3>字符串 ↔ 数字</h3>" +
        "<p><code>int()</code>、<code>float()</code>、<code>str()</code> 三个函数负责“变形”：</p>" +
        cb("convert") +
        '<div class="box box-warn"><div class="box-title">⚠️ 两个会考的坑</div><p>① <code>int(3.9)</code> 等于 <b>3</b>，是直接砍掉小数部分，<b>不是四舍五入</b>；<br>② <code>int("3.5")</code> 会<b>报错</b>——字符串必须先转 float 再转 int：<code>int(float("3.5"))</code>。</p></div>'
    },
    {
      id: "ch2-5", title: "输入与输出", minutes: 8,
      html:
        "<h3>input 得到的一定是字符串</h3>" +
        "<p>这是本章最重要的结论：<b>无论用户输入什么，input() 拿到的都是 str</b>。要做计算，必须先转换。</p>" +
        cb("input_err") +
        "<h4>print 的两个小技巧</h4>" +
        cb("io") +
        '<div class="box box-say"><div class="box-title">🔍 先想一想</div><p>如果要让用户输入两个整数并输出它们的和，代码应该怎么写？提示：两个 input 都要转 int。</p></div>'
    }
  ],
  quizIds: ["c04", "c05", "c06", "c07", "c08"]
},

/* ---------- 第 3 章 ---------- */
{
  id: "ch3", num: 3, icon: "🔀", title: "顺序与选择结构",
  goal: "理解三种基本结构，掌握 if-elif-else 分支，会画会认流程图",
  stars: 2,
  sections: [
    {
      id: "ch3-1", title: "三种基本结构与流程图", minutes: 9,
      html:
        "<h3>程序的三种“走法”</h3>" +
        "<p>任何程序都由三种基本结构组成，会考常在流程图里考：</p>" +
        "<ul>" +
        "<li><b>顺序结构</b>：从头到尾，一步接一步</li>" +
        "<li><b>选择（分支）结构</b>：到路口看条件，走不同分支</li>" +
        "<li><b>循环结构</b>：满足条件就反复执行某段操作</li>" +
        "</ul>" +
        '<div class="table-wrap"><table class="tb"><tr><th>符号</th><th>形状</th><th>含义</th></tr>' +
        "<tr><td>起止框</td><td>椭圆 / 圆角矩形</td><td>开始、结束</td></tr>" +
        "<tr><td>输入输出框</td><td>平行四边形</td><td>输入数据、输出结果</td></tr>" +
        "<tr><td>处理框</td><td>矩形</td><td>赋值、计算等处理</td></tr>" +
        "<tr><td>判断框</td><td><b>菱形</b></td><td>条件判断，有两个出口（是/否）</td></tr>" +
        "<tr><td>流程线</td><td>带箭头</td><td>执行方向</td></tr></table></div>" +
        fc(950, 250,
          '<text x="150" y="16" text-anchor="middle" font-size="13" font-weight="700" fill="#0f766e">顺序结构</text>' +
          fcNode("term", 108, 28, 84, 28, "开始") +
          fcArrow([[150, 56], [150, 74]]) +
          fcNode("proc", 108, 76, 84, 30, "处理 A") +
          fcArrow([[150, 106], [150, 124]]) +
          fcNode("proc", 108, 126, 84, 30, "处理 B") +
          fcArrow([[150, 156], [150, 174]]) +
          fcNode("term", 108, 176, 84, 28, "结束") +
          '<text x="450" y="16" text-anchor="middle" font-size="13" font-weight="700" fill="#0f766e">选择结构</text>' +
          fcNode("term", 408, 28, 84, 28, "开始") +
          fcArrow([[450, 56], [450, 74]]) +
          fcNode("dec", 375, 76, 150, 56, "条件？") +
          fcArrow([[525, 104], [548, 104]], "是", 536, 94) +
          fcNode("proc", 550, 88, 84, 30, "处理 A") +
          fcArrow([[450, 132], [450, 158]], "否", 466, 147) +
          fcNode("proc", 408, 160, 84, 30, "处理 B") +
          fcArrow([[450, 190], [450, 208]]) +
          fcArrow([[592, 118], [592, 224], [496, 224]]) +
          fcNode("term", 408, 210, 84, 28, "结束") +
          '<text x="750" y="16" text-anchor="middle" font-size="13" font-weight="700" fill="#0f766e">循环结构</text>' +
          fcNode("term", 708, 28, 84, 28, "开始") +
          fcArrow([[750, 56], [750, 74]]) +
          fcNode("dec", 675, 76, 150, 56, "条件成立？") +
          fcArrow([[825, 104], [848, 104]], "是", 836, 94) +
          fcNode("proc", 850, 88, 84, 30, "循环体") +
          fcArrow([[892, 88], [892, 64], [750, 64], [750, 74]]) +
          fcArrow([[750, 132], [750, 208]], "否", 766, 172) +
          fcNode("term", 708, 210, 84, 28, "结束"),
          "图 1 · 三种基本结构流程图（会考要求：会认、会画）", true) +
        '<div class="box box-exam"><div class="box-title">🎯 会考真题</div><p>“如图是一个选择（分支）结构流程图，描述正确的是：<b>A 操作有可能不被执行</b>”。选择结构的本质：判断框条件不满足时，分支内容就跳过——这正是“选择”的意义。</p></div>'
    },
    {
      id: "ch3-2", title: "if 分支语句", minutes: 10,
      html:
        "<h3>让程序学会“看情况”</h3>" +
        "<p>if 语句的格式，三样都不能少：<b>关键字 if/elif/else、英文冒号、下一行缩进</b>。</p>" +
        pair(cb("grade"),
          fc(310, 448,
          fcNode("term", 60, 12, 84, 30, "开始") +
          fcArrow([[102, 42], [102, 54]]) +
          fcNode("io", 60, 54, 84, 34, "输入 score") +
          fcArrow([[102, 88], [102, 104]]) +
          fcNode("dec", 28, 104, 148, 60, "score ≥ 85 ?") +
          fcArrow([[176, 134], [188, 134]], "是", 182, 126) +
          fcNode("proc", 190, 117, 92, 34, "输出 A 等级") +
          fcArrow([[102, 164], [102, 184]], "否", 118, 177) +
          fcNode("dec", 28, 184, 148, 60, "score ≥ 70 ?") +
          fcArrow([[176, 214], [188, 214]], "是", 182, 206) +
          fcNode("proc", 190, 197, 92, 34, "输出 B 等级") +
          fcArrow([[102, 244], [102, 264]], "否", 118, 257) +
          fcNode("dec", 28, 264, 148, 60, "score ≥ 60 ?") +
          fcArrow([[176, 294], [188, 294]], "是", 182, 286) +
          fcNode("proc", 190, 277, 92, 34, "输出 C 等级") +
          fcArrow([[102, 324], [102, 344]], "否", 118, 337) +
          fcNode("proc", 60, 344, 84, 34, "输出 D 等级") +
          fcArrow([[102, 378], [102, 396]]) +
          fcNode("term", 60, 396, 84, 30, "结束") +
          fcArrow([[282, 134], [296, 134], [296, 411], [148, 411]]) +
          fcArrow([[282, 214], [296, 214]], "", 0, 0, true) +
          fcArrow([[282, 294], [296, 294]], "", 0, 0, true),
          "图 2 · if-elif-else 流程图（与配套代码一一对应）")) +
        '<div class="box box-analogy"><div class="box-title">💡 直觉理解</div><p>if-elif-else 就像<b>查体温分流</b>：37.2℃以下直接进校；37.3~38℃去观察室；超过 38℃送医——从上往下挨个问，问到符合条件的就执行，后面不再问。</p></div>' +
        '<div class="box box-warn"><div class="box-title">⚠️ 缩进 = 归属</div><p>Python 用缩进表示“这段代码归谁管”。同一段分支里的语句必须对齐；<code>print("B等级")</code> 顶格写就跑到 if 外面去了。</p></div>' +
        mq("m5")
    },
    {
      id: "ch3-3", title: "条件判断进阶：闰年与绝对值", minutes: 10,
      html:
        "<h3>会考两大经典题</h3>" +
        "<h4>① 判断闰年</h4>" +
        "<p>规则：四年一闰，百年不闰，四百年再闰。</p>" +
        pairWide(cb("leap"),
          fc(350, 332,
          fcNode("term", 63, 12, 84, 30, "开始") +
          fcArrow([[105, 42], [105, 54]]) +
          fcNode("io", 63, 54, 84, 34, "输入 year") +
          fcArrow([[105, 88], [105, 100]]) +
          fcNode("dec", 20, 100, 170, 88, "year%4==0 且 year%100!=0\n或 year%400==0") +
          fcArrow([[190, 144], [208, 144]], "是", 199, 136) +
          fcNode("proc", 210, 127, 100, 34, "输出“是闰年”") +
          fcArrow([[105, 188], [105, 220]], "否", 121, 207) +
          fcNode("proc", 63, 220, 84, 34, "输出“不是闰年”") +
          fcArrow([[105, 254], [105, 280]]) +
          fcNode("term", 63, 280, 84, 30, "结束") +
          fcArrow([[310, 144], [330, 144], [330, 295], [149, 295]]),
          "图 3 · 判断闰年流程图")) +
        "<h4>② 输出绝对值</h4>" +
        "<p>流程图版：输入 a → 判断 a≥0 → 是则输出 a，否则输出 -a。</p>" +
        pair(cb("abs_flow"),
          fc(330, 322,
          fcNode("term", 63, 12, 84, 30, "开始") +
          fcArrow([[105, 42], [105, 54]]) +
          fcNode("io", 63, 54, 84, 34, "输入 a") +
          fcArrow([[105, 88], [105, 102]]) +
          fcBadge(44, 112, "①") +
          fcNode("dec", 30, 102, 150, 64, "a ≥ 0 ?") +
          fcArrow([[180, 134], [198, 134]], "是", 189, 126) +
          fcNode("proc", 200, 117, 90, 34, "输出 a") +
          fcArrow([[105, 166], [105, 206]], "否", 121, 189) +
          fcNode("proc", 63, 206, 84, 34, "输出 -a") +
          fcArrow([[105, 240], [105, 266]]) +
          fcNode("term", 63, 266, 84, 30, "结束") +
          fcArrow([[290, 134], [310, 134], [310, 281], [149, 281]]),
          "图 4 · 输出绝对值流程图（①即会考所问的判断条件）")) +
        '<div class="box box-exam"><div class="box-title">🎯 会考真题</div><p>“流程图描述的是任意输入数据 a，输出 a 的绝对值，图中①处应填 <b>a≥0</b>”。判断框的条件写反，整个程序就反了——这类题先拿具体数字（如 -5）在心里走一遍。</p></div>'
    }
  ],
  quizIds: ["c09", "c10", "c11", "c12"]
},

/* ---------- 第 4 章 ---------- */
{
  id: "ch4", num: 4, icon: "🔁", title: "循环结构",
  goal: "掌握 for/range 与 while 循环、break/continue、嵌套循环和累加计数模式",
  stars: 2,
  sections: [
    {
      id: "ch4-1", title: "for 循环与 range()", minutes: 10,
      html:
        "<h3>数着次数重复</h3>" +
        "<p>for 循环最常和 <code>range()</code> 搭档。<b>range 含头不含尾</b>，这是铁律：</p>" +
        pair(cb("for1"),
          fc(320, 292,
            fcNode("term", 63, 12, 84, 30, "开始") +
            fcArrow([[105, 42], [105, 54]]) +
            fcNode("proc", 63, 54, 84, 34, "i = 1") +
            fcArrow([[105, 88], [105, 104]]) +
            fcNode("dec", 30, 104, 150, 64, "i ≤ 5 ?") +
            fcArrow([[180, 136], [198, 136]], "是", 189, 128) +
            fcNode("proc", 200, 118, 90, 34, "输出 i") +
            fcArrow([[105, 168], [105, 232]], "否", 121, 202) +
            fcNode("proc", 200, 170, 90, 34, "i = i + 1") +
            fcArrow([[245, 152], [245, 170]]) +
            fcArrow([[245, 204], [245, 272], [12, 272], [12, 136], [28, 136]]) +
            fcNode("term", 63, 232, 84, 30, "结束"),
            "图 5 · for 循环流程图（对应配套代码中的 range(1, 6)，含头不含尾）")) +
        '<div class="table-wrap"><table class="tb"><tr><th>写法</th><th>产生的数</th><th>个数</th></tr>' +
        "<tr><td><code>range(5)</code></td><td>0 1 2 3 4</td><td>5</td></tr>" +
        "<tr><td><code>range(1, 6)</code></td><td>1 2 3 4 5</td><td>5</td></tr>" +
        "<tr><td><code>range(1, 10, 2)</code></td><td>1 3 5 7 9</td><td>5</td></tr>" +
        "<tr><td><code>range(5, 0, -1)</code></td><td>5 4 3 2 1</td><td>5</td></tr></table></div>" +
        "<p>for 还可以直接遍历字符串和列表：</p>" +
        cb("for_str")
    },
    {
      id: "ch4-2", title: "while 循环", minutes: 10,
      html:
        "<h3>盯着条件重复</h3>" +
        "<p>while 先判断、再执行：条件成立就干，干完再判断。经典真题：</p>" +
        pair(cb("while1"),
          fc(320, 272,
          fcNode("term", 63, 12, 84, 30, "开始") +
          fcArrow([[105, 42], [105, 54]]) +
          fcNode("proc", 63, 54, 84, 34, "a = 76") +
          fcArrow([[105, 88], [105, 104]]) +
          fcNode("dec", 30, 104, 150, 64, "a ≤ 90 ?") +
          fcArrow([[180, 136], [198, 136]], "是", 189, 128) +
          fcNode("proc", 200, 118, 90, 34, "a = a + 4") +
          fcArrow([[105, 168], [105, 232]], "否", 121, 202) +
          fcNode("term", 63, 232, 84, 30, "结束") +
          fcArrow([[245, 152], [245, 218], [12, 218], [12, 136], [28, 136]]),
          "图 6 · while 循环流程图（对应配套代码：76 → 92）")) +
        '<div class="box box-analogy"><div class="box-title">💡 纸上跟踪法</div><p>“看程序写结果”别慌，拿笔把变量每轮变化列出来：76 → 80 → 84 → 88 → 92，此时 92&gt;90 不满足条件，循环停，输出 <b>92</b>。</p></div>' +
        cb("while_dead") +
        '<div class="box box-warn"><div class="box-title">⚠️ 死循环警告</div><p>while 循环体里<b>必须有让条件趋向 false 的语句</b>（如 <code>i = i + 1</code>），否则永远停不下来。</p></div>' +
        mq("m6")
    },
    {
      id: "ch4-3", title: "break 与 continue", minutes: 7,
      html:
        "<h3>循环的“急刹车”和“跳过键”</h3>" +
        "<ul>" +
        "<li><code>break</code>：<b>结束整个循环</b>，后面的轮次都不干了</li>" +
        "<li><code>continue</code>：<b>跳过本轮</b>，进入下一轮</li>" +
        "</ul>" +
        pair(cb("bc"),
          fc(310, 278,
          fcNode("term", 60, 12, 84, 30, "开始") +
          fcArrow([[102, 42], [102, 60]]) +
          fcNode("dec", 28, 60, 148, 64, "i == 6 ?") +
          fcArrow([[176, 92], [188, 92]], "是", 182, 84) +
          fcNode("proc", 190, 74, 92, 34, "跳出循环") +
          fcArrow([[102, 124], [102, 160]], "否", 118, 145) +
          fcNode("proc", 60, 160, 84, 34, "输出 i") +
          fcArrow([[60, 177], [12, 177], [12, 92], [26, 92]]) +
          fcArrow([[282, 91], [294, 91], [294, 235], [148, 235]]) +
          fcNode("term", 60, 220, 84, 30, "结束"),
          "图 7 · break：条件成立，整个循环就地结束"),
          fc(310, 278,
          fcNode("term", 60, 12, 84, 30, "开始") +
          fcArrow([[102, 42], [102, 60]]) +
          fcNode("dec", 28, 60, 148, 64, "i == 3 ?") +
          fcArrow([[176, 92], [188, 92]], "是", 182, 84) +
          fcNode("proc", 190, 74, 92, 34, "跳过本轮") +
          fcArrow([[102, 124], [102, 160]], "否", 118, 145) +
          fcNode("proc", 60, 160, 84, 34, "输出 i") +
          fcArrow([[236, 108], [236, 235], [148, 235]]) +
          fcArrow([[102, 194], [102, 220]]) +
          fcNode("term", 60, 220, 84, 30, "进入下一轮"),
          "图 8 · continue：条件成立，只跳过本轮，循环继续")) +
        '<div class="box box-exam"><div class="box-title">✅ 会考判断题</div><p>“break 结束整个循环，continue 跳过本次循环”——这句话是<b>正确</b>的。常考！</p></div>'
    },
    {
      id: "ch4-4", title: "嵌套循环", minutes: 9,
      html:
        "<h3>循环里面套循环</h3>" +
        "<p>外层循环走一步，内层循环跑一整圈。想清楚<b>谁管行、谁管列</b>：</p>" +
        pair(cb("nest"),
          fc(470, 398,
          fcNode("term", 63, 12, 84, 30, "开始") +
          fcArrow([[105, 42], [105, 54]]) +
          fcNode("proc", 63, 54, 84, 34, "i = 1") +
          fcArrow([[105, 88], [105, 104]]) +
          fcNode("dec", 30, 104, 150, 64, "i ≤ 3 ?") +
          fcArrow([[180, 136], [193, 136]], "是", 186, 128) +
          fcNode("proc", 195, 118, 90, 34, "j = 1") +
          fcArrow([[105, 168], [105, 352]], "否", 121, 262) +
          fcNode("dec", 165, 170, 150, 64, "j ≤ 3 ?") +
          fcArrow([[240, 152], [240, 170]]) +
          fcArrow([[315, 202], [328, 202]], "是", 321, 194) +
          fcNode("proc", 330, 185, 80, 34, "输出 *") +
          fcArrow([[370, 219], [370, 255], [289, 255]]) +
          fcNode("proc", 195, 238, 90, 34, "j = j + 1") +
          fcArrow([[195, 255], [150, 255], [150, 202], [163, 202]]) +
          fcArrow([[240, 234], [240, 290]]) +
          fcNode("proc", 195, 290, 90, 34, "i = i + 1") +
          fcArrow([[195, 307], [12, 307], [12, 136], [28, 136]]) +
          fcNode("term", 63, 352, 84, 30, "结束"),
          "图 9 · 嵌套循环流程图（外层管行、内层管列）", true)) +
        '<div class="box box-analogy"><div class="box-title">💡 直觉理解</div><p>像钟表：分针（外层）走一格，秒针（内层）转一圈。打印 3×3 方阵 = 外层 3 次 × 内层 3 次 = 输出 9 个星号。</p></div>' +
        '<div class="box box-exam"><div class="box-title">🎯 看程序写结果</div><p>遇到嵌套循环，把“内层一圈”当作外层的一次动作数：外层 range(3) × 内层 range(3)，print 执行 <b>9</b> 次。</p></div>'
    },
    {
      id: "ch4-5", title: "累加与计数模式", minutes: 9,
      html:
        "<h3>会考编程题的“万能开头”</h3>" +
        "<p>累加、累乘、计数三大模式，结构几乎一样：<b>循环前初始化 → 循环里更新</b>。</p>" +
        pair(cb("accumulate"),
          fc(330, 348,
          fcNode("term", 63, 12, 84, 30, "开始") +
          fcArrow([[105, 42], [105, 54]]) +
          fcNode("proc", 63, 54, 84, 34, "s = 0") +
          fcArrow([[105, 88], [105, 102]]) +
          fcNode("proc", 63, 102, 84, 34, "i = 1") +
          fcArrow([[105, 136], [105, 150]]) +
          fcNode("dec", 30, 150, 150, 64, "i ≤ 100 ?") +
          fcArrow([[180, 182], [198, 182]], "是", 189, 174) +
          fcNode("proc", 200, 164, 90, 34, "s = s + i") +
          fcArrow([[105, 214], [105, 250]], "否", 121, 235) +
          fcNode("proc", 200, 206, 90, 34, "i = i + 1") +
          fcArrow([[245, 198], [245, 206]]) +
          fcArrow([[290, 181], [308, 181], [308, 223], [292, 223]]) +
          fcArrow([[245, 240], [245, 274], [12, 274], [12, 182], [28, 182]]) +
          fcNode("proc", 63, 250, 84, 34, "输出 s") +
          fcArrow([[105, 284], [105, 302]]) +
          fcNode("term", 63, 302, 84, 30, "结束"),
          "图 10 · 累加求和流程图（初始化在循环外，是得分关键）")) +
        '<div class="table-wrap"><table class="tb"><tr><th>模式</th><th>初始化</th><th>循环体</th></tr>' +
        "<tr><td>累加求和</td><td><code>s = 0</code></td><td><code>s = s + i</code></td></tr>" +
        "<tr><td>累乘求积</td><td><code>s = 1</code></td><td><code>s = s * i</code></td></tr>" +
        "<tr><td>计数</td><td><code>cnt = 0</code></td><td><code>cnt = cnt + 1</code></td></tr></table></div>" +
        '<div class="box box-warn"><div class="box-title">⚠️ 位置！位置！</div><p>初始化必须放在循环<b>外面</b>。写进循环里，每轮都清零，结果一定错——这是会考操作题最常挖的坑。</p></div>' +
        mq("m7")
    }
  ],
  quizIds: ["c13", "c14", "c15", "c16", "c17", "c18"]
},

/* ---------- 第 5 章 ---------- */
{
  id: "ch5", num: 5, icon: "🔤", title: "字符串与列表",
  goal: "掌握字符串索引切片与常用方法、列表的增删改查排序，了解元组和字典",
  stars: 2,
  sections: [
    {
      id: "ch5-1", title: "字符串索引与切片", minutes: 9,
      html:
        "<h3>给每个字符编号</h3>" +
        "<p>字符串的字符从 <b>0</b> 开始编号；还支持<b>负数下标</b>，-1 表示最后一个。</p>" +
        cb("index") +
        '<div class="box box-warn"><div class="box-title">⚠️ 切片含头不含尾</div><p><code>s[2:5]</code> 取的是 2、3、4 号字符（<b>不含 5</b>），和 range 一个脾气。另外字符串<b>不可变</b>：不能写 <code>s[0] = "x"</code>，会报错。</p></div>'
    },
    {
      id: "ch5-2", title: "字符串常用方法", minutes: 10,
      html:
        "<h3>处理文本的工具箱</h3>" +
        cb("methods") +
        '<div class="box box-exam"><div class="box-title">🎯 会考真题</div><p>函数 foo 把字符串偶数位转大写、奇数位转小写，问 <code>foo("Information")</code> 的结果——答案 <b>InFoRmAtIoN</b>。这类题用“逐字符列表法”推演。</p></div>' +
        mq("m8")
    },
    {
      id: "ch5-3", title: "列表操作", minutes: 11,
      html:
        "<h3>一个变量存一堆数据</h3>" +
        "<p>列表用方括号创建，元素可以是任意类型，<b>可以随时改</b>：</p>" +
        cb("list1") +
        '<div class="table-wrap"><table class="tb"><tr><th>操作</th><th>方法</th><th>说明</th></tr>' +
        "<tr><td>末尾添加</td><td><code>lst.append(x)</code></td><td>加到队尾</td></tr>" +
        "<tr><td>插入</td><td><code>lst.insert(i, x)</code></td><td>插到第 i 位</td></tr>" +
        "<tr><td>删除</td><td><code>lst.pop()</code> / <code>lst.remove(x)</code></td><td>按位置删 / 按值删</td></tr>" +
        "<tr><td>排序</td><td><code>lst.sort()</code></td><td>直接排原列表</td></tr>" +
        "<tr><td>统计</td><td><code>len/sum/max/min</code></td><td>长度/和/最大/最小</td></tr></table></div>" +
        "<h4>sort 和 sorted 的区别（易混）</h4>" +
        cb("list2") +
        '<div class="box box-warn"><div class="box-title">⚠️ 索引越界</div><p>长度为 3 的列表，合法下标是 0、1、2。访问 <code>lst[3]</code> 会报 IndexError。</p></div>'
    },
    {
      id: "ch5-4", title: "元组与字典速览", minutes: 6,
      html:
        "<h3>另外两种容器</h3>" +
        cb("tupdict") +
        '<div class="table-wrap"><table class="tb"><tr><th>类型</th><th>写法</th><th>特点</th></tr>' +
        "<tr><td>元组 tuple</td><td><code>(1, 2, 3)</code></td><td>创建后<b>不能改</b></td></tr>" +
        "<tr><td>字典 dict</td><td><code>{\"键\": 值}</code></td><td>按键存取，如通讯录</td></tr></table></div>" +
        '<div class="box box-exam"><div class="box-title">🎯 会考要求</div><p>会考以列表和字符串为主，元组、字典了解即可：记住“元组不可变、字典按键取值”就能应对绝大多数题目。</p></div>'
    }
  ],
  quizIds: ["c19", "c20", "c21", "c22", "c23"]
},

/* ---------- 第 6 章 ---------- */
{
  id: "ch6", num: 6, icon: "🧩", title: "函数",
  goal: "理解函数的定义、调用、参数与返回值，体会代码复用思想",
  stars: 2,
  sections: [
    {
      id: "ch6-1", title: "函数的定义与调用", minutes: 9,
      html:
        "<h3>给一段代码起个名字</h3>" +
        "<p>函数是<b>代码复用</b>的核心：定义一次，调用无数次。</p>" +
        cb("def1") +
        '<div class="box box-analogy"><div class="box-title">💡 直觉理解</div><p>函数就像<b>洗衣机</b>：造好之后（定义），以后脏衣服放进去按开关（调用）就行，不用重新造一台。</p></div>' +
        '<div class="box box-warn"><div class="box-title">⚠️ 不调用不执行</div><p>函数定义后<b>不会自动运行</b>，必须写 <code>函数名(参数)</code> 调用才执行。会考判断题常考。</p></div>'
    },
    {
      id: "ch6-2", title: "参数与返回值", minutes: 10,
      html:
        "<h3>进料口和出货口</h3>" +
        "<ul>" +
        "<li><b>参数</b>：调用时传进去的原料（如 <code>add(2, 3)</code> 里的 2 和 3）</li>" +
        "<li><code>return</code>：把结果送回，同时<b>立即结束函数</b></li>" +
        "<li>没有 return 的函数，返回值是 <code>None</code></li>" +
        "</ul>" +
        cb("ret") +
        '<div class="box box-exam"><div class="box-title">🎯 看程序写结果</div><p>嵌套调用是常考套路：<code>add(add(1,2), 3)</code> —— 先算内层返回 3，再算外层 3+3=6。一层层剥皮即可。</p></div>' +
        mq("m10")
    },
    {
      id: "ch6-3", title: "用函数封装算法", minutes: 8,
      html:
        "<h3>会考操作题的常见形态</h3>" +
        "<p>给出半成品，要求补全函数。把经典算法封装成函数，是标准答案的常见长相：</p>" +
        cb("gcd") +
        '<div class="box box-say"><div class="box-title">🧭 解题三步法</div><p>① 读注释和已有代码，猜函数要干什么；② 看参数名猜输入；③ 对照调用处看输出。三件事一凑，空缺处该写什么基本就浮出水面了。</p></div>'
    }
  ],
  quizIds: ["c24", "c25", "c26"]
}
];

/* ==========================================================
   算法专题 · 会考常考 14 例
   ========================================================== */
var ALGOS = [
{
  id: "a1", icon: "➕", name: "累加求和", tag: "必考", stars: 1,
  scene: "求 1+2+…+n 的和，如 1 到 100 的和",
  idea: "准备一个空盒子 s，从 1 数到 n，每数一个就扔进盒子里。",
  steps: ["初始化累加器 s = 0", "for i in range(1, n+1) 遍历 1 到 n", "循环体：s = s + i", "循环结束输出 s"],
  code: 'n = int(input("请输入n："))\ns = 0\nfor i in range(1, n + 1):\n    s = s + i\nprint(s)',
  traps: ["s = 0 写在循环里面 → 每轮清零，结果错", "range(1, n) 少了最后一个数 n → 应写 range(1, n + 1)"],
  variant: "变式：求 1 到 n 中所有偶数之和 → 判断 if i % 2 == 0 再累加"
},
{
  id: "a2", icon: "✖️", name: "累乘与阶乘", tag: "必考", stars: 1,
  scene: "求 n! = 1×2×…×n，如 5! = 120",
  idea: "和累加一模一样，只换两个地方：初始值必须是 1，运算用乘法。",
  steps: ["初始化累乘器 s = 1（不能是0！）", "for i in range(2, n+1)", "循环体：s = s * i", "输出 s"],
  code: 'n = int(input("请输入n："))\ns = 1\nfor i in range(2, n + 1):\n    s = s * i\nprint(s)',
  traps: ["初始化写成 s = 0 → 乘出来永远是 0", "while 版忘记更新循环变量 → 死循环"],
  variant: "变式：求 1×3×5×…×n（隔项累乘）→ 调整 range 步长"
},
{
  id: "a3", icon: "²", name: "平方和", tag: "高频", stars: 2,
  scene: "求 1²+2²+…+n²（会考真题：n=4 时输出 30）",
  idea: "还是累加，只是每轮加的不是 i，而是 i 的平方。",
  steps: ["s = 0", "for i in range(1, n+1)", "s = s + i * i（或 i ** 2）", "输出 s"],
  code: 'n = int(input("请输入n："))\ns = 0\nfor i in range(1, n + 1):\n    s = s + i * i\nprint(s)',
  traps: ["i * i 写成 i + i", "流程图填空题里循环条件写 i < n 还是 i <= n 要数清楚"],
  variant: "变式：立方和、倒数和 1/1+1/2+…（注意用 float）"
},
{
  id: "a4", icon: "🔍", name: "素数判断", tag: "必考", stars: 2,
  scene: "判断一个数是不是素数（只能被1和自身整除）",
  idea: "拿 2 到 n-1（或到 √n）逐个试除，有一个能整除就不是素数。",
  steps: ["n < 2 直接不是素数", "假设是素数 is_prime = True", "for i in range(2, int(n**0.5)+1) 试除", "只要 n % i == 0 就改判并 break", "按标记输出结论"],
  code: 'n = int(input("请输入n："))\nif n < 2:\n    print(n, "不是素数")\nelse:\n    is_prime = True\n    for i in range(2, n):\n        if n % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(n, "是素数")\n    else:\n        print(n, "不是素数")',
  traps: ["1 不是素数，小于2要特判", "找到因子后忘了 break → 白算（结果不错但效率差）", "标记变量忘记更新"],
  variant: "变式：输出 100 以内所有素数 → 外层再加一层循环"
},
{
  id: "a5", icon: "➗", name: "最大公约数", tag: "必考", stars: 2,
  scene: "求两个整数的最大公约数（辗转相除法，会考填空常客）",
  idea: "大数除以小数取余，用除数接着除新余数，直到余数为0，除数就是答案。",
  steps: ["while b != 0（b不为0就继续）", "a, b = b, a % b（同时赋值）", "循环结束 a 就是最大公约数"],
  code: 'a = int(input())\nb = int(input())\nwhile b:\n    a, b = b, a % b\nprint(a)',
  traps: ["同时赋值顺序：a, b = b, a % b 不能拆成两句", "循环条件写成 a != 0 → 死循环"],
  variant: "最小公倍数 = a * b // 最大公约数"
},
{
  id: "a6", icon: "🐇", name: "斐波那契数列", tag: "高频", stars: 2,
  scene: "输出前 n 项：1 1 2 3 5 8 13 21…（前两项之和=第三项）",
  idea: "记住两个数 a、b，每次输出 a，然后让 (a, b) 变成 (b, a+b)。",
  steps: ["a, b = 1, 1", "循环 n 次：先输出 a", "同时更新 a, b = b, a + b"],
  code: 'n = int(input("项数："))\na, b = 1, 1\nfor i in range(n):\n    print(a, end=" ")\n    a, b = b, a + b',
  traps: ["更新写成 a = b; b = a + b → a 已变，b 算错（必须同时赋值）", "初始值从 0 开始还是 1 开始看题目约定"],
  variant: "变式：输出第 n 项（不打印全部）→ 循环结束后输出 a"
},
{
  id: "a7", icon: "📈", name: "最值查找", tag: "必考", stars: 2,
  scene: "在一组数据中找最大值/最小值（缩进陷阱高发区）",
  idea: "先假设第一个数最大，往后逐个比，发现更大的就替换。",
  steps: ["mx = nums[0] 先拿第一个当擂主", "for x in nums 逐个挑战", "if x > mx: mx = x 更强的上台", "循环结束后 mx 就是最大值"],
  code: 'nums = [3, 7, 2, 9, 5]\nmx = nums[0]\nfor x in nums:\n    if x > mx:\n        mx = x\nprint(mx)',
  traps: ["print(mx) 缩进到循环里 → 每轮都输出一次（会考真题错法）", "判断写反 x < mx → 求出的是最小值", "找最大值用 >，找最小值用 <，别看反"],
  variant: "变式：同时找最大值和最小值 → 两个变量分别更新"
},
{
  id: "a8", icon: "🥇", name: "选择排序", tag: "理解", stars: 3,
  scene: "把无序数据排成升序（会考要求理解过程，填空常考）",
  idea: "每轮从未排序部分选出最小的，放到已排序部分末尾。",
  steps: ["for i 遍历每个位置", "假设 i 位置最小 m = i", "内层 for j 从 i+1 开始找更小", "if nums[j] < nums[m] 更新 m", "交换 nums[i] 和 nums[m]"],
  code: 'nums = [5, 3, 8, 1, 9]\nfor i in range(len(nums)):\n    m = i\n    for j in range(i + 1, len(nums)):\n        if nums[j] < nums[m]:\n            m = j\n    nums[i], nums[m] = nums[m], nums[i]\nprint(nums)',
  traps: ["内层 range 起点写成 i → 自己和自己比，死循环风险", "找到最小值忘记交换，或交换位置写错"],
  variant: "降序排列：比较符号 > 即可"
},
{
  id: "a9", icon: "💭", name: "冒泡排序", tag: "理解", stars: 3,
  scene: "相邻比较交换，大的往后“冒”（了解思想即可）",
  idea: "每轮从头相邻两个比大小，逆序就交换，一轮下来最大的沉到最后。",
  steps: ["外层 n-1 轮", "内层从头到 len-1-i", "if nums[j] > nums[j+1] 就交换", "每轮结束末尾多一个就位元素"],
  code: 'nums = [5, 3, 8, 1]\nfor i in range(len(nums) - 1):\n    for j in range(len(nums) - 1 - i):\n        if nums[j] > nums[j + 1]:\n            nums[j], nums[j + 1] = nums[j + 1], nums[j]\nprint(nums)',
  traps: ["内层终点忘了 -i → 每轮多比已就位元素", "交换时同时赋值的顺序写反"],
  variant: "记住口诀：外层 n-1，内层逐轮短"
},
{
  id: "a10", icon: "🪞", name: "回文判断", tag: "高频", stars: 2,
  scene: "判断字符串正反读是否一样，如 level、上海自来水来自海上",
  idea: "把字符串反转，和原串比较即可。",
  steps: ["读入字符串 s", "反转：s[::-1]", "if s == s[::-1] 输出是回文"],
  code: 's = input("请输入字符串：")\nif s == s[::-1]:\n    print("是回文")\nelse:\n    print("不是回文")',
  traps: ["[::-1] 切片写法记不住 → 可用循环版逐位比较", "大小写敏感：Level 和 level 不是回文（可先 lower()）"],
  variant: "循环版：for i in range(len(s)//2) 比较 s[i] 和 s[len(s)-1-i]"
},
{
  id: "a11", icon: "🔢", name: "统计计数", tag: "必考", stars: 1,
  scene: "统计字符串中字母、数字各自个数（会考填空真题）",
  idea: "遍历每个字符，用 isalpha()/isdigit() 判断归属，分别计数。",
  steps: ["alpha = digit = 0", "for ch in s 逐个字符", "ch.isalpha() 成立 alpha += 1", "ch.isdigit() 成立 digit += 1"],
  code: 's = input("请输入一行字符：")\nalpha = digit = 0\nfor ch in s:\n    if ch.isalpha():\n        alpha += 1\n    elif ch.isdigit():\n        digit += 1\nprint(alpha, digit)',
  traps: ["elif 写成两个 if → 逻辑没错但会考填空考结构", "空格、标点既不是字母也不是数字，不计入"],
  variant: "变式：统计元音字母个数 → 再判断 ch in \"aeiou\""
},
{
  id: "a12", icon: "🧮", name: "分解各位数字", tag: "高频", stars: 2,
  scene: "把整数逐位拆开，或反转数字（123 → 321）",
  idea: "用 %10 取个位，用 //10 去掉个位，反复操作。",
  steps: ["while n > 0", "n % 10 拿到当前个位", "n = n // 10 去掉个位", "要反转就 r = r * 10 + 个位"],
  code: 'n = 123\nr = 0\nwhile n > 0:\n    r = r * 10 + n % 10\n    n = n // 10\nprint(r)',
  traps: ["循环里忘了 n = n // 10 → 死循环", "先除再取余 → 顺序反了，取到的是十位"],
  variant: "变式：判断回文数 → 分解反转后和原数比较"
},
{
  id: "a13", icon: "📅", name: "闰年判断", tag: "必考", stars: 1,
  scene: "判断年份是否闰年（流程图片+代码都常考）",
  idea: "四年一闰、百年不闰、四百年再闰，一条复合条件搞定。",
  steps: ["输入年份 year", "条件：year%4==0 且 year%100!=0，或 year%400==0", "成立输出闰年，否则平年"],
  code: 'year = int(input("年份："))\nif year % 4 == 0 and year % 100 != 0 or year % 400 == 0:\n    print("闰年")\nelse:\n    print("平年")',
  traps: ["and 和 or 混用时建议加括号，避免优先级失误", "流程图①处填 a>=0 还是 a>0 要拿 0 试一下"],
  variant: "变式：判断某月天数 → 分支嵌套"
},
{
  id: "a14", icon: "🌸", name: "水仙花数", tag: "拓展", stars: 3,
  scene: "三位数中，各位数字立方和等于本身的数（153、370、371、407）",
  idea: "先拆出百十个位，再验证立方和。",
  steps: ["for n in range(100, 1000)", "a=n//100, b=n//10%10, c=n%10 拆位", "if a³+b³+c³ == n 输出"],
  code: 'for n in range(100, 1000):\n    a = n // 100\n    b = n // 10 % 10\n    c = n % 10\n    if a ** 3 + b ** 3 + c ** 3 == n:\n        print(n)',
  traps: ["b = n // 10 % 10 是拆十位的关键，别写成 n // 10", "range(100, 1000) 含头不含尾，1000 不取"],
  variant: "拓展：四位的“四叶玫瑰数”同款套路"
}
];
