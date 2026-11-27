/* ==========================================================
   豫考通 · 题库 / 错因诊所 / 速查表
   ========================================================== */

/* ---------- 题库 ---------- */
var QBANK = {

  /* ===== 选择题 ===== */
  choice: [
    { id: "c01", topic: "走进Python", diff: 1,
      q: "程序设计语言发展的正确顺序是（ ）",
      options: ["高级语言 → 汇编语言 → 机器语言", "机器语言 → 汇编语言 → 高级语言", "汇编语言 → 机器语言 → 高级语言", "机器语言 → 高级语言 → 汇编语言"],
      answer: 1,
      explain: "从计算机能直接识别的 0/1 机器语言，到助记符汇编语言，再到接近自然语言的高级语言。" },

    { id: "c02", topic: "走进Python", diff: 1,
      q: "下列关于 Python 的说法，正确的是（ ）",
      options: ["Python 是编译型语言", "Python 代码运行前必须先整体编译成机器码", "Python 是解释型高级语言，免费开源", "Python 只能在 Windows 上运行"],
      answer: 2,
      explain: "Python 是解释型高级语言：解释器逐行翻译执行，无需事先编译；它免费、开源、跨平台。" },

    { id: "c03", topic: "走进Python", diff: 1,
      q: "下列选项中，不属于 Python 语言特点的是（ ）",
      options: ["语法简洁", "跨平台", "免费开源", "运行前必须编译成机器码"],
      answer: 3,
      explain: "“必须先编译成机器码”是编译型语言（如 C）的特点。Python 靠解释器逐行执行。" },

    { id: "c04", topic: "数据与变量", diff: 1,
      q: "下列选项中，可以作为 Python 合法变量名的是（ ）",
      options: ["3m", "if", "exe", "a+b"],
      answer: 2,
      explain: "会考真题。3m 以数字开头；if 是关键字；a+b 含运算符；exe 合法。" },

    { id: "c05", topic: "数据与变量", diff: 1,
      q: "关于 Python 变量名，下列说法正确的是（ ）",
      options: ["不区分大小写，Age 和 age 相同", "不能以数字开头", "可以使用关键字命名", "可以包含空格"],
      answer: 1,
      explain: "变量名区分大小写、不能以数字开头、不能用关键字、不能含空格（可用下划线代替）。" },

    { id: "c06", topic: "数据与变量", diff: 1,
      q: "执行 print(type(3.14)) 的输出是（ ）",
      options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
      answer: 1,
      explain: "3.14 是小数，类型为 float。type() 用来查看数据类型。" },

    { id: "c07", topic: "数据与变量", diff: 1,
      q: "执行 print(2 ** 3) 的输出是（ ）",
      options: ["6", "8", "9", "23"],
      answer: 1,
      explain: "** 是幂运算，2 的 3 次方等于 8。" },

    { id: "c08", topic: "数据与变量", diff: 1,
      q: "执行 print(7 // 2, 7 % 2) 的输出是（ ）",
      options: ["3.5 1", "3 1", "1 3", "3.5 0"],
      answer: 1,
      explain: "// 是整除取商 3；% 是取余数 1。print 输出多个值默认用空格分隔。" },

    { id: "c09", topic: "数据与变量", diff: 2,
      q: "表达式 int(3.9) 的值是（ ）",
      options: ["4", "3", "3.9", "报错"],
      answer: 1,
      explain: "小数转整数是直接截断小数部分，不是四舍五入，所以结果是 3。" },

    { id: "c10", topic: "数据与变量", diff: 2,
      q: "执行 int(\"3.5\") 的结果是（ ）",
      options: ["3", "3.5", "4", "报错（ValueError）"],
      answer: 3,
      explain: "int() 不能直接把带小数点的字符串转成整数，会报 ValueError。正确写法：int(float(\"3.5\"))。" },

    { id: "c11", topic: "数据与变量", diff: 2,
      q: "age = input(\"请输入年龄：\")，用户输入 18 后执行 print(age + 1)，结果是（ ）",
      options: ["19", "181", "报错", "18"],
      answer: 2,
      explain: "input() 返回字符串 \"18\"，字符串和整数相加会报 TypeError。应先 int(input()) 转换。" },

    { id: "c12", topic: "选择结构", diff: 2,
      q: "score = 72，执行下面的程序，输出结果是（ ）\nif score >= 85:\n    print(\"A等级\")\nelif score >= 70:\n    print(\"B等级\")\nelif score >= 60:\n    print(\"C等级\")\nelse:\n    print(\"D等级\")",
      options: ["A等级", "B等级", "C等级", "D等级"],
      answer: 1,
      explain: "从上往下判断：72 >= 85 不成立；72 >= 70 成立，执行该分支输出 B等级，后续分支不再判断。" },

    { id: "c13", topic: "选择结构", diff: 2,
      q: "判断闰年的正确条件是（ ）",
      options: ["year % 4 == 0", "year % 4 == 0 and year % 100 != 0 or year % 400 == 0", "year % 400 == 0", "year % 100 != 0"],
      answer: 1,
      explain: "四年一闰、百年不闰、四百年再闰：能被4整除且不被100整除，或能被400整除。" },

    { id: "c14", topic: "选择结构", diff: 2,
      q: "表达式 True or False and False 的值是（ ）",
      options: ["True", "False", "报错", "None"],
      answer: 0,
      explain: "逻辑优先级：not > and > or。先算 False and False 得 False，再算 True or False 得 True。" },

    { id: "c15", topic: "循环结构", diff: 1,
      q: "for i in range(5): print(i) 共执行 5 次，i 依次取值为（ ）",
      options: ["1 2 3 4 5", "0 1 2 3 4", "0 1 2 3 4 5", "1 2 3 4 5 6"],
      answer: 1,
      explain: "range(5) 含头不含尾，从 0 开始到 4 结束，共 5 个数。" },

    { id: "c16", topic: "循环结构", diff: 2,
      q: "range(1, 10, 2) 生成的整数个数是（ ）",
      options: ["4", "5", "9", "10"],
      answer: 1,
      explain: "从 1 开始、步长 2、小于 10：1、3、5、7、9，共 5 个。" },

    { id: "c17", topic: "循环结构", diff: 2,
      q: "执行下列程序段后，a 的值是（ ）\na = 76\nwhile a <= 90:\n    a = a + 4",
      options: ["88", "90", "92", "94"],
      answer: 2,
      explain: "会考真题。跟踪：76→80→84→88→92，此时 92 > 90 循环结束，输出 92。" },

    { id: "c18", topic: "循环结构", diff: 2,
      q: "下面程序运行的结果是（ ）\ni = 1\nwhile i <= 5:\n    print(i)",
      options: ["输出 1 到 5", "输出 1 到 4", "死循环，无限输出 1", "什么都不输出"],
      answer: 2,
      explain: "循环体里没有更新 i 的语句，i 永远是 1，条件永远成立——死循环。应加上 i = i + 1。" },

    { id: "c19", topic: "循环结构", diff: 2,
      q: "执行下面的程序，print(\"*\", end=\"\") 一共执行多少次？\nfor i in range(3):\n    for j in range(3):\n        print(\"*\", end=\"\")",
      options: ["3", "6", "9", "1"],
      answer: 2,
      explain: "嵌套循环：外层 3 次 × 内层 3 次 = 9 次，输出 3 行 3 列的星号方阵。" },

    { id: "c20", topic: "循环结构", diff: 1,
      q: "执行下列程序段后，s 的值是（ ）\ns = 0\nfor i in range(1, 101):\n    s = s + i",
      options: ["100", "4950", "5050", "5100"],
      answer: 2,
      explain: "1+2+…+100 = (1+100)×100÷2 = 5050。累加器 s=0 放在循环外是正确写法。" },

    { id: "c21", topic: "字符串与列表", diff: 2,
      q: "s = \"HelloWorld\"，执行 print(s[2:5]) 的输出是（ ）",
      options: ["ell", "llo", "lloW", "Hel"],
      answer: 1,
      explain: "切片含头不含尾：取下标 2、3、4 三个字符，即 llo。" },

    { id: "c22", topic: "字符串与列表", diff: 2,
      q: "s = \"Python\"，执行 print(s[-1]) 的输出是（ ）",
      options: ["P", "n", "o", "报错"],
      answer: 1,
      explain: "-1 表示最后一个字符，Python 共 6 个字符，最后一个是 n。" },

    { id: "c23", topic: "字符串与列表", diff: 2,
      q: "nums = [1, 2, 3]，依次执行 nums.append(4) 后，print(len(nums)) 的输出是（ ）",
      options: ["3", "4", "5", "报错"],
      answer: 1,
      explain: "append 在列表末尾添加元素，长度从 3 变成 4。" },

    { id: "c24", topic: "字符串与列表", diff: 2,
      q: "关于 lst.sort() 和 sorted(lst) 的说法，正确的是（ ）",
      options: ["两者都直接修改原列表", "sort() 直接排原列表，sorted() 返回排好序的新列表", "两者都返回新列表", "两者都不改变任何数据"],
      answer: 1,
      explain: "lst.sort() 就地排序，返回 None；sorted(lst) 返回新列表，原列表不变。" },

    { id: "c25", topic: "函数", diff: 1,
      q: "Python 中定义函数使用的关键字是（ ）",
      options: ["func", "def", "function", "define"],
      answer: 1,
      explain: "def 函数名(参数): 是标准定义格式，注意结尾是英文冒号，函数体要缩进。" },

    { id: "c26", topic: "函数", diff: 2,
      q: "执行下列程序，输出结果是（ ）\ndef f(x):\n    return x * 2\nprint(f(3) + 1)",
      options: ["6", "7", "8", "报错"],
      answer: 1,
      explain: "f(3) 返回 6，返回值继续参与计算 6 + 1 = 7。" },

    { id: "c27", topic: "函数", diff: 2,
      q: "关于函数的调用，下列说法正确的是（ ）",
      options: ["函数定义后会自动执行", "函数必须经过调用才会执行", "函数不能重复调用", "没有 return 的函数会报错"],
      answer: 1,
      explain: "定义只是“造好机器”，调用才真正执行；没有 return 的函数返回 None，不报错。" },

    { id: "c28", topic: "算法基础", diff: 2,
      q: "“程序 = 数据结构 + 算法”这一著名论断的提出者是（ ）",
      options: ["图灵", "尼古拉斯·沃思", "冯·诺依曼", "迪杰斯特拉"],
      answer: 1,
      explain: "沃思（Niklaus Wirth）因提出这一论断获得图灵奖。" },

    { id: "c29", topic: "算法基础", diff: 1,
      q: "流程图中，表示“条件判断”的图形是（ ）",
      options: ["矩形", "菱形", "平行四边形", "椭圆"],
      answer: 1,
      explain: "判断框是菱形，有两个出口；矩形是处理框，平行四边形是输入输出框，椭圆是起止框。" },

    { id: "c30", topic: "循环结构", diff: 2,
      q: "在循环体中，continue 语句的作用是（ ）",
      options: ["结束整个循环", "跳过本次循环，进入下一轮", "暂停程序", "退出函数"],
      answer: 1,
      explain: "continue 跳过本轮剩余语句直接进入下一轮；break 才是结束整个循环。" }
  ],

  /* ===== 判断题 ===== */
  judge: [
    { id: "j01", topic: "走进Python", diff: 1, q: "Python 是解释型语言，代码不需要编译就能运行。", answer: true,
      explain: "解释器逐行翻译执行，因此写一行就能立即跑一行。" },
    { id: "j02", topic: "数据与变量", diff: 1, q: "Python 变量名区分大小写，Age 和 age 是两个不同的变量。", answer: true,
      explain: "大小写敏感是 Python 变量名的基本规则。" },
    { id: "j03", topic: "数据与变量", diff: 1, q: "input() 函数无论用户输入什么内容，返回的都是字符串。", answer: true,
      explain: "所以要做计算必须先转换：age = int(input())。" },
    { id: "j04", topic: "数据与变量", diff: 1, q: "空列表 [] 的布尔值为 False。", answer: true,
      explain: "0、空字符串、空列表、空元组等“空”对象的布尔值都是 False。" },
    { id: "j05", topic: "字符串与列表", diff: 2, q: "字符串 \"abc\" 可以通过 s[0] = \"A\" 修改第一个字符。", answer: false,
      explain: "字符串不可变，不能通过索引修改，会报 TypeError。要变只能用拼接或 replace 生成新串。" },
    { id: "j06", topic: "数据与变量", diff: 2, q: "int(\"3.5\") 的结果是 3。", answer: false,
      explain: "会报 ValueError。正确写法是 int(float(\"3.5\"))。" },
    { id: "j07", topic: "数据与变量", diff: 2, q: "表达式 \"12\" + 3 的结果是 15。", answer: false,
      explain: "字符串和整数不能相加，会报 TypeError，不是 15。" },
    { id: "j08", topic: "选择结构", diff: 1, q: "Python 用缩进来表示代码块的归属范围。", answer: true,
      explain: "if、for、while、def 后面的冒号加缩进，是 Python 的标志性规则。" },
    { id: "j09", topic: "循环结构", diff: 2, q: "break 语句用于结束整个循环，continue 语句用于跳过本次循环。", answer: true,
      explain: "会考判断题常客：break 是急刹车，continue 是跳过键。" },
    { id: "j10", topic: "字符串与列表", diff: 1, q: "列表是有序的、可变的序列。", answer: true,
      explain: "有序（有下标）且可变（可增删改）正是列表与元组的最大区别。" },
    { id: "j11", topic: "函数", diff: 2, q: "函数只要定义了，程序运行时就会自动执行它。", answer: false,
      explain: "定义不会自动执行，必须显式调用：函数名(参数)。" },
    { id: "j12", topic: "数据与变量", diff: 2, q: "表达式 7 / 2 的结果是 3。", answer: false,
      explain: "/ 是真除法，结果是小数 3.5；要得到 3 需要用整除 7 // 2。" },
    { id: "j13", topic: "算法基础", diff: 1, q: "一个算法必须有输出，可以没有输入。", answer: true,
      explain: "算法的基本特征：有穷性、确定性、可行性、有输入（可零个或多个）、有输出（至少一个）。" },
    { id: "j14", topic: "数据与变量", diff: 2, q: "可以用 Python 关键字作为变量名，例如 if = 1。", answer: false,
      explain: "关键字有特殊含义，用作变量名会直接报语法错误。" }
  ],

  /* ===== 程序阅读（看程序写结果） ===== */
  read: [
    { id: "r01", topic: "函数", diff: 3, title: "函数 + 字符串处理（会考真题同款）",
      code: CODE.foo,
      answer: "InFoRmAtIoN",
      steps: [
        "函数功能：i 为偶数时字符转大写，i 为奇数时转小写，拼接后返回",
        "逐个位置推演：0位I→I，1位n→n，2位f→F，3位o→o，4位r→R，5位m→m，6位a→A，7位t→t，8位i→I，9位o→o，10位n→N",
        "所以输出：InFoRmAtIoN（大小写交替）"
      ] },

    { id: "r02", topic: "循环结构", diff: 2, title: "while 循环求值（会考真题）",
      code: CODE.while1,
      answer: "92",
      steps: [
        "a = 76，判断 76 <= 90 成立 → a = 80",
        "80 <= 90 成立 → 84 → 88 → 92",
        "92 <= 90 不成立，循环结束，print 输出 92"
      ] },

    { id: "r03", topic: "循环结构", diff: 1, title: "累加求和",
      code: "s = 0\nfor i in range(1, 101):\n    s = s + i\nprint(s)",
      answer: "5050",
      steps: [
        "range(1, 101) 依次产生 1, 2, 3, …, 100",
        "s 每轮累加：1 → 3 → 6 → 10 …",
        "1 到 100 的和 = (1+100)×100÷2 = 5050"
      ] },

    { id: "r04", topic: "循环结构", diff: 1, title: "累乘求阶乘",
      code: "n = 5\ns = 1\nfor i in range(1, 6):\n    s = s * i\nprint(s)",
      answer: "120",
      steps: [
        "累乘器 s 初始为 1（不能为 0）",
        "s 的变化：1 → 1 → 2 → 6 → 24 → 120",
        "输出 120，即 5! = 120"
      ] },

    { id: "r05", topic: "函数", diff: 3, title: "辗转相除法求最大公约数",
      code: CODE.gcd,
      answer: "6",
      steps: [
        "调用 gcd(12, 18)，进入 while b 循环",
        "a, b = 18, 12 % 18 = 12 → (a, b) = (18, 12)",
        "a, b = 12, 18 % 12 = 6 → (a, b) = (12, 6)",
        "a, b = 6, 12 % 6 = 0 → (a, b) = (6, 0)，b 为 0 循环结束",
        "返回 a = 6"
      ] },

    { id: "r06", topic: "循环结构", diff: 3, title: "斐波那契数列",
      code: 'a, b = 1, 1\nfor i in range(8):\n    print(a, end=" ")\n    a, b = b, a + b',
      answer: "1 1 2 3 5 8 13 21",
      steps: [
        "每轮先输出 a，再更新 (a, b) = (b, a+b)",
        "a 依次输出：1, 1, 2, 3, 5, 8, 13, 21",
        "共 8 项"
      ] },

    { id: "r07", topic: "循环结构", diff: 2, title: "嵌套循环打印方阵",
      code: CODE.nest,
      answer: "3 行 3 列共 9 个星号（*** / *** / ***）",
      steps: [
        "外层 range(3) 控制行数，内层 range(3) 控制列数",
        "内层每圈输出 3 个 *，print() 负责换行",
        "总共 3 × 3 = 9 个星号"
      ] },

    { id: "r08", topic: "字符串与列表", diff: 1, title: "字符串切片",
      code: CODE.index,
      answer: "H d llo 10",
      steps: [
        "s[0] 第一个字符 H；s[-1] 最后一个字符 d",
        "s[2:5] 含头不含尾，取下标 2、3、4 → llo",
        "len(s) = 10"
      ] },

    { id: "r09", topic: "字符串与列表", diff: 2, title: "列表增删与排序",
      code: "nums = [3, 1, 2]\nnums.append(0)\nnums.sort()\nprint(nums)",
      answer: "[0, 1, 2, 3]",
      steps: [
        "append(0) 后：[3, 1, 2, 0]",
        "sort() 升序排序 → [0, 1, 2, 3]",
        "sort() 直接修改原列表，不生成新列表"
      ] },

    { id: "r10", topic: "函数", diff: 2, title: "函数嵌套调用",
      code: "def f(a, b):\n    return a * b\n\nprint(f(3, f(2, 2)))",
      answer: "12",
      steps: [
        "先算内层 f(2, 2) = 2 × 2 = 4",
        "再算外层 f(3, 4) = 3 × 4 = 12",
        "输出 12"
      ] },

    { id: "r11", topic: "字符串与列表", diff: 2, title: "统计字母与数字（会考填空同款思路）",
      code: 's = "ab12cd3"\nalpha = digit = 0\nfor ch in s:\n    if ch.isalpha():\n        alpha += 1\n    elif ch.isdigit():\n        digit += 1\nprint(alpha, digit)',
      answer: "4 3",
      steps: [
        "字符串 \"ab12cd3\" 中字母：a、b、c、d 共 4 个",
        "数字：1、2、3 共 3 个",
        "输出 4 3"
      ] },

    { id: "r12", topic: "字符串与列表", diff: 2, title: "回文判断",
      code: 's = "level"\nif s == s[::-1]:\n    print("是回文")\nelse:\n    print("不是回文")',
      answer: "是回文",
      steps: [
        "s[::-1] 是切片反转，得到 \"level\"",
        "原串和反转串相同，条件成立",
        "输出：是回文"
      ] },

    { id: "r13", topic: "循环结构", diff: 2, title: "数字反转",
      code: "n = 123\nr = 0\nwhile n > 0:\n    r = r * 10 + n % 10\n    n = n // 10\nprint(r)",
      answer: "321",
      steps: [
        "第1轮：r = 0×10 + 3 = 3，n = 12",
        "第2轮：r = 3×10 + 2 = 32，n = 1",
        "第3轮：r = 32×10 + 1 = 321，n = 0 循环结束",
        "输出 321"
      ] },

    { id: "r14", topic: "选择结构", diff: 2, title: "闰年判断",
      code: 'for year in [2024, 1900, 2000]:\n    if year % 4 == 0 and year % 100 != 0 or year % 400 == 0:\n        print(year, "闰年")\n    else:\n        print(year, "平年")',
      answer: "2024 闰年 / 1900 平年 / 2000 闰年",
      steps: [
        "2024：能被4整除且不被100整除 → 闰年",
        "1900：能被100整除但不能被400整除（百年不闰）→ 平年",
        "2000：能被400整除（四百年再闰）→ 闰年"
      ] },

    { id: "r15", topic: "字符串与列表", diff: 3, title: "选择排序第一轮",
      code: "nums = [5, 3, 8, 1, 9]\nfor i in range(len(nums)):\n    m = i\n    for j in range(i + 1, len(nums)):\n        if nums[j] < nums[m]:\n            m = j\n    nums[i], nums[m] = nums[m], nums[i]\n    break\nprint(nums)",
      answer: "[1, 3, 8, 5, 9]",
      steps: [
        "第一轮 i=0：在 [5,3,8,1,9] 中找最小值，m 最终指向 1（下标3）",
        "交换 nums[0] 和 nums[3] → [1, 3, 8, 5, 9]",
        "break 结束，输出第一轮结果"
      ] },

    { id: "r16", topic: "循环结构", diff: 2, title: "素数判断",
      code: 'for n in [7, 9]:\n    is_prime = True\n    for i in range(2, n):\n        if n % i == 0:\n            is_prime = False\n            break\n    print(n, "是素数" if is_prime else "不是素数")',
      answer: "7 是素数 / 9 不是素数",
      steps: [
        "n=7：2到6都不能整除7 → 是素数",
        "n=9：9 % 3 == 0，立即改判并 break → 不是素数",
        "break 让程序提前退出，找到因子就不用再试了"
      ] }
  ],

  /* ===== 程序填空 ===== */
  fill: [
    { id: "f01", topic: "函数", diff: 3, title: "辗转相除法求最大公约数（会考真题）",
      code: "a = int(input())\nb = int(input())\nwhile ____:\n    a, b = b, ____\nprint(a)",
      answers: ["b != 0", "a % b"],
      explain: "b 不为 0 就继续：把 b 交给 a，把 a%b（余数）交给 b。循环结束时 a 就是最大公约数。while b: 简写也对。" },

    { id: "f02", topic: "选择结构", diff: 2, title: "成绩等级判定",
      code: 'score = int(input())\nif score < 0 ____ score > 100:\n    print("输入无效")\nelif ____:\n    print("A等级")\nelif ____:\n    print("B等级")\nelse:\n    print("C等级")',
      answers: ["or", "score >= 85", "score >= 70"],
      explain: "① or 连接“小于0”和“大于100”两个无效条件；② ③ 注意必须从高到低判断，>=85 在前、>=70 在后。" },

    { id: "f03", topic: "循环结构", diff: 1, title: "累加求和 1~100",
      code: "s = 0\nfor i in range(____):\n    s = s + i\nprint(s)",
      answers: ["1, 101"],
      explain: "range 含头不含尾：要包含 100，终点必须写 101。" },

    { id: "f04", topic: "循环结构", diff: 1, title: "求阶乘 n!",
      code: "n = int(input())\ns = 1\nfor i in range(1, n + 1):\n    s = ____\nprint(s)",
      answers: ["s * i"],
      explain: "累乘模式：每轮把 i 乘进 s。注意 s 初始值是 1 而不是 0。" },

    { id: "f05", topic: "循环结构", diff: 2, title: "素数判断",
      code: "n = int(input())\nflag = True\nfor i in range(2, ____):\n    if n % i == 0:\n        flag = False\n        ____\nif flag:\n    print(\"是素数\")\nelse:\n    print(\"不是素数\")",
      answers: ["n", "break"],
      explain: "② 用 2 到 n-1 逐个试除（简版会考写法）；③ 找到因子立即 break，没必要再试。" },

    { id: "f06", topic: "字符串与列表", diff: 2, title: "找最大值",
      code: "nums = [3, 7, 2, 9, 5]\nmx = nums[0]\nfor x in nums:\n    if ____:\n        mx = x\nprint(mx)",
      answers: ["x > mx"],
      explain: "发现比擂主更强的就上台：x > mx 时更新 mx。print(mx) 在循环外——缩进位置决定对错。" },

    { id: "f07", topic: "循环结构", diff: 3, title: "斐波那契数列",
      code: 'a, b = 1, 1\nfor i in range(10):\n    print(a, end=" ")\n    a, b = ____',
      answers: ["b, a + b"],
      explain: "同时赋值：新的 a 是旧的 b，新的 b 是旧的 a+b。写成两行就错了。" },

    { id: "f08", topic: "字符串与列表", diff: 2, title: "统计字母和数字（会考真题）",
      code: 's = input()\nalpha = digit = 0\nfor ch in s:\n    if ____:\n        alpha += 1\n    elif ____:\n        digit += 1\nprint(alpha, digit)',
      answers: ["ch.isalpha()", "ch.isdigit()"],
      explain: "isalpha() 判断是否字母，isdigit() 判断是否数字；elif 保证一个字符只归一类。" },

    { id: "f09", topic: "选择结构", diff: 2, title: "闰年判断",
      code: 'year = int(input())\nif ____:\n    print("闰年")\nelse:\n    print("平年")',
      answers: ["year % 4 == 0 and year % 100 != 0 or year % 400 == 0"],
      explain: "四年一闰、百年不闰、四百年再闰。不确定时加括号更稳：(year%4==0 and year%100!=0) or year%400==0" }
  ],

  /* ===== 编程题 ===== */
  code: [
    { id: "p01", topic: "循环结构", diff: 1, title: "累加求和",
      desc: "输入一个正整数 n，输出 1+2+…+n 的和。",
      hints: ["累加器先清零：s = 0", "用 range(1, n+1) 遍历 1 到 n", "循环体：s = s + i"],
      solution: "n = int(input())\ns = 0\nfor i in range(1, n + 1):\n    s = s + i\nprint(s)" },

    { id: "p02", topic: "选择结构", diff: 1, title: "判断闰年",
      desc: "输入一个年份，判断是否闰年，输出“闰年”或“平年”。",
      hints: ["四年一闰、百年不闰、四百年再闰", "条件：year % 4 == 0 and year % 100 != 0 or year % 400 == 0"],
      solution: "year = int(input())\nif year % 4 == 0 and year % 100 != 0 or year % 400 == 0:\n    print(\"闰年\")\nelse:\n    print(\"平年\")" },

    { id: "p03", topic: "选择结构", diff: 2, title: "成绩等级转换",
      desc: "输入一个 0~100 的分数：85 分及以上为 A，70 分及以上为 B，60 分及以上为 C，其余为 D。",
      hints: ["多分支用 if-elif-else", "必须从高到低依次判断", "注意 72 分应输出 B"],
      solution: "score = int(input())\nif score >= 85:\n    print(\"A\")\nelif score >= 70:\n    print(\"B\")\nelif score >= 60:\n    print(\"C\")\nelse:\n    print(\"D\")" },

    { id: "p04", topic: "循环结构", diff: 1, title: "求阶乘",
      desc: "输入正整数 n，输出 n!（1×2×…×n）。",
      hints: ["累乘器初始化为 1，不是 0", "for i in range(1, n + 1): s = s * i"],
      solution: "n = int(input())\ns = 1\nfor i in range(1, n + 1):\n    s = s * i\nprint(s)" },

    { id: "p05", topic: "循环结构", diff: 2, title: "判断素数",
      desc: "输入正整数 n，判断是否为素数，输出“是素数”或“不是素数”。",
      hints: ["小于 2 直接不是素数", "用 2 到 n-1 逐个试除", "找到因子就 break"],
      solution: "n = int(input())\nif n < 2:\n    print(\"不是素数\")\nelse:\n    is_prime = True\n    for i in range(2, n):\n        if n % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(\"是素数\")\n    else:\n        print(\"不是素数\")" },

    { id: "p06", topic: "字符串与列表", diff: 2, title: "统计字母和数字",
      desc: "输入一行字符串，统计其中字母和数字各自的个数并输出。",
      hints: ["遍历每个字符 for ch in s", "ch.isalpha() 判字母，ch.isdigit() 判数字", "两个计数器分别累加"],
      solution: "s = input()\nalpha = digit = 0\nfor ch in s:\n    if ch.isalpha():\n        alpha += 1\n    elif ch.isdigit():\n        digit += 1\nprint(alpha, digit)" },

    { id: "p07", topic: "函数", diff: 3, title: "最大公约数",
      desc: "输入两个正整数，用辗转相除法输出它们的最大公约数。",
      hints: ["while b 不为 0 就继续除", "同时赋值：a, b = b, a % b", "循环结束时 a 就是答案"],
      solution: "a = int(input())\nb = int(input())\nwhile b:\n    a, b = b, a % b\nprint(a)" },

    { id: "p08", topic: "循环结构", diff: 3, title: "斐波那契数列",
      desc: "输入项数 n，输出斐波那契数列前 n 项（空格分隔）：1 1 2 3 5 8 …",
      hints: ["a, b = 1, 1", "每轮先输出 a", "同时更新 a, b = b, a + b"],
      solution: "n = int(input())\na, b = 1, 1\nfor i in range(n):\n    print(a, end=\" \")\n    a, b = b, a + b" }
  ]
};

/* ==========================================================
   错因诊所
   ========================================================== */
var CLINIC_TYPES = [
  { name: "语法错误", ratio: 40, color: "#b91c1c", icon: "🚧", desc: "代码不合规矩，程序根本跑不起来" },
  { name: "逻辑错误", ratio: 25, color: "#b45309", icon: "🧠", desc: "能跑，但结果不对" },
  { name: "类型错误", ratio: 15, color: "#1d4ed8", icon: "🔀", desc: "把文字当数字用，或反之" },
  { name: "边界问题", ratio: 12, color: "#0f766e", icon: "📏", desc: "多一次少一次、越界访问" },
  { name: "概念误解", ratio: 8, color: "#6d28d9", icon: "💡", desc: "对规则理解偏差" }
];

var CLINIC = [
  { type: "语法错误", icon: "🚧", title: "用了中文标点",
    wrong: 'if score >= 60：\n    print("及格")',
    right: 'if score >= 60:\n    print("及格")',
    cause: "冒号、引号、括号写成了中文全角（：），Python 只认英文半角标点，直接报 SyntaxError。",
    tip: "口诀：标点只用英文版，冒号引号括号线。" },

  { type: "语法错误", icon: "🚧", title: "if 后面漏了冒号",
    wrong: 'if score >= 60\n    print("及格")',
    right: 'if score >= 60:\n    print("及格")',
    cause: "if/elif/else/for/while/def 后面都必须跟英文冒号，它是“接下来要缩进了”的信号。",
    tip: "口诀：if for while def 后，冒号一个不能丢。" },

  { type: "语法错误", icon: "🚧", title: "变量名以数字开头",
    wrong: "3m = 5\nprint(3m)",
    right: "m3 = 5\nprint(m3)",
    cause: "变量名只能以字母或下划线开头，3m 以数字开头，直接判定非法。",
    tip: "口诀：名字开头用字母，数字只能排后头。" },

  { type: "语法错误", icon: "🚧", title: "拿关键字当变量名",
    wrong: "if = 1",
    right: "score = 1",
    cause: "if、for、while、True 等关键字有特殊含义，不能用作变量名。",
    tip: "口诀：关键字有编制，起名先要躲开它。" },

  { type: "逻辑错误", icon: "🧠", title: "print 缩进错位（会考真题错法）",
    wrong: "nums = [3, 7, 2, 9]\nmx = nums[0]\nfor x in nums:\n    if x > mx:\n        mx = x\n    print(mx)",
    right: "nums = [3, 7, 2, 9]\nmx = nums[0]\nfor x in nums:\n    if x > mx:\n        mx = x\nprint(mx)",
    cause: "print 缩进进了循环体，每轮都输出一次；缩进决定归属，print 要顶格写在循环外才能只输出最终结果。",
    tip: "口诀：输出语句站对队，进不进循环看缩进。" },

  { type: "逻辑错误", icon: "🧠", title: "比较符号写反",
    wrong: "mx = nums[0]\nfor x in nums:\n    if x < mx:\n        mx = x",
    right: "mx = nums[0]\nfor x in nums:\n    if x > mx:\n        mx = x",
    cause: "求最大值却用了 <，轮轮替换更小的，最后得到的是最小值。逻辑没错、结果全反。",
    tip: "口诀：求大用 > 求小用 <，符号方向看三遍。" },

  { type: "逻辑错误", icon: "🧠", title: "累加器放进循环里",
    wrong: "s = 0\nfor i in range(1, 6):\n    s = 0\n    s = s + i\nprint(s)",
    right: "s = 0\nfor i in range(1, 6):\n    s = s + i\nprint(s)",
    cause: "初始化写进循环体，每轮都清零，累加永远失败。初始化必须在循环外。",
    tip: "口诀：计数器、累加器，放在循环外头去。" },

  { type: "类型错误", icon: "🔀", title: "input 忘了转 int",
    wrong: 'age = input("年龄：")\nprint(age + 1)',
    right: 'age = int(input("年龄："))\nprint(age + 1)',
    cause: "input() 拿到的是字符串，字符串和整数相加直接 TypeError。",
    tip: "口诀：input 到手是字符，要算先转 int。" },

  { type: "类型错误", icon: "🔀", title: "字符串和数字相加",
    wrong: 'print("12" + 3)',
    right: 'print(int("12") + 3)   # 15\nprint("12" + str(3))   # 123',
    cause: "不同类型不能混算，要么把字符串转数字，要么把数字转字符串。",
    tip: "口诀：相加先同类型，转谁看你要啥。" },

  { type: "类型错误", icon: "🔀", title: "int(\"3.5\") 报错",
    wrong: 'print(int("3.5"))',
    right: 'print(int(float("3.5")))   # 3',
    cause: "int() 不接受带小数点的字符串，要先 float() 再 int()。",
    tip: "口诀：小数串想变整，先穿 float 再穿 int。" },

  { type: "边界问题", icon: "📏", title: "range 终点少写 1",
    wrong: "for i in range(1, n):\n    s = s + i",
    right: "for i in range(1, n + 1):\n    s = s + i",
    cause: "range 含头不含尾：要算到 n，终点必须写 n+1，否则最后一个数永远加不上。",
    tip: "口诀：range 尾巴不含它，要包终点就加一。" },

  { type: "边界问题", icon: "📏", title: "列表索引越界",
    wrong: "nums = [1, 2, 3]\nprint(nums[3])",
    right: "nums = [1, 2, 3]\nprint(nums[2])",
    cause: "长度 3 的列表合法下标只有 0、1、2，访问 3 报 IndexError。数数从 0 开始，到 n-1 结束。",
    tip: "口诀：下标从零到 n-1，越界之前想清楚。" },

  { type: "概念误解", icon: "💡", title: "函数定义了却没调用",
    wrong: "def greet():\n    print(\"你好\")\n\n# 没有调用，什么都不输出",
    right: "def greet():\n    print(\"你好\")\n\ngreet()",
    cause: "函数定义只是“造好机器”，不会自动运行，必须显式调用。",
    tip: "口诀：定了函数要调用，不叫不动是规矩。" },

  { type: "概念误解", icon: "💡", title: "return 后面的代码不执行",
    wrong: "def f(x):\n    return x * 2\n    print(\"这句话永远看不到\")",
    right: "def f(x):\n    r = x * 2\n    print(\"先干活再交卷\")\n    return r",
    cause: "return 有两重身份：返回值 + 立即结束函数。它后面的语句永远不会执行。",
    tip: "口诀：return 说完就下班，后边代码看不见。" },

  { type: "概念误解", icon: "💡", title: "while 忘了更新循环变量",
    wrong: "i = 1\nwhile i <= 5:\n    print(i)",
    right: "i = 1\nwhile i <= 5:\n    print(i)\n    i = i + 1",
    cause: "条件永远成立，程序陷入死循环。while 体里必须有让条件趋向 false 的语句。",
    tip: "口诀：while 循环要变天，更新语句写里面。" }
];

/* ==========================================================
   速查表
   ========================================================== */
var CHEAT = [
  { tab: "运算符优先级", icon: "📐", html:
    '<div class="table-wrap"><table class="tb"><tr><th>优先级</th><th>运算符</th><th>说明</th></tr>' +
    "<tr><td>1（最高）</td><td><code>( )</code></td><td>括号</td></tr>" +
    "<tr><td>2</td><td><code>**</code></td><td>幂运算</td></tr>" +
    "<tr><td>3</td><td><code>+x -x</code></td><td>正负号</td></tr>" +
    "<tr><td>4</td><td><code>* / // %</code></td><td>乘、除、整除、取余</td></tr>" +
    "<tr><td>5</td><td><code>+ -</code></td><td>加、减</td></tr>" +
    "<tr><td>6</td><td><code>< <= > >= == !=</code></td><td>比较运算</td></tr>" +
    "<tr><td>7</td><td><code>not</code></td><td>逻辑非</td></tr>" +
    "<tr><td>8</td><td><code>and</code></td><td>逻辑与</td></tr>" +
    "<tr><td>9（最低）</td><td><code>or</code></td><td>逻辑或</td></tr></table></div>" +
    '<div class="box box-say"><div class="box-title">💡 记不住怎么办</div><p>拿不准就加括号——括号永远最优先，加了不会错。</p></div>' },

  { tab: "类型转换", icon: "🔀", html:
    '<div class="table-wrap"><table class="tb"><tr><th>函数</th><th>作用</th><th>例子</th></tr>' +
    "<tr><td><code>int(x)</code></td><td>转整数（小数截断）</td><td>int(3.9)=3；int(\"12\")=12</td></tr>" +
    "<tr><td><code>float(x)</code></td><td>转小数</td><td>float(\"3.5\")=3.5；float(2)=2.0</td></tr>" +
    "<tr><td><code>str(x)</code></td><td>转字符串</td><td>str(100)=\"100\"</td></tr>" +
    "<tr><td><code>bool(x)</code></td><td>转布尔值</td><td>bool(0)=False；bool(\"\")=False</td></tr></table></div>" +
    '<div class="box box-warn"><div class="box-title">⚠️ 两个特例</div><p>int(\"3.5\") 报错 → 要先 float 再 int；input() 永远是 str，要计算先转换。</p></div>' },

  { tab: "字符串方法", icon: "🔤", html:
    '<div class="kv-list">' +
    '<div class="kv-item"><b>len(s)</b><span> 长度</span></div>' +
    '<div class="kv-item"><b>s.upper()</b><span> 全部大写</span></div>' +
    '<div class="kv-item"><b>s.lower()</b><span> 全部小写</span></div>' +
    '<div class="kv-item"><b>s.replace(a, b)</b><span> 把 a 替换成 b</span></div>' +
    '<div class="kv-item"><b>s.split(",")</b><span> 按符号分割成列表</span></div>' +
    '<div class="kv-item"><b>s.strip()</b><span> 去掉首尾空白</span></div>' +
    '<div class="kv-item"><b>s.find(x)</b><span> 查找 x 的位置</span></div>' +
    '<div class="kv-item"><b>s.count(x)</b><span> x 出现次数</span></div>' +
    '<div class="kv-item"><b>s.isalpha()</b><span> 是否全是字母</span></div>' +
    '<div class="kv-item"><b>s.isdigit()</b><span> 是否全是数字</span></div>' +
    '<div class="kv-item"><b>s + t</b><span> 拼接</span></div>' +
    '<div class="kv-item"><b>s * n</b><span> 重复 n 次</span></div>' +
    "</div>" },

  { tab: "列表方法", icon: "📋", html:
    '<div class="kv-list">' +
    '<div class="kv-item"><b>lst.append(x)</b><span> 末尾添加</span></div>' +
    '<div class="kv-item"><b>lst.insert(i, x)</b><span> 第 i 位插入</span></div>' +
    '<div class="kv-item"><b>lst.pop()</b><span> 删除并返回末尾</span></div>' +
    '<div class="kv-item"><b>lst.remove(x)</b><span> 删除第一个 x</span></div>' +
    '<div class="kv-item"><b>lst.sort()</b><span> 原地升序排</span></div>' +
    '<div class="kv-item"><b>sorted(lst)</b><span> 返回排好的新列表</span></div>' +
    '<div class="kv-item"><b>lst.reverse()</b><span> 原地反转</span></div>' +
    '<div class="kv-item"><b>len(lst)</b><span> 元素个数</span></div>' +
    '<div class="kv-item"><b>sum / max / min</b><span> 和 / 最大 / 最小</span></div>' +
    '<div class="kv-item"><b>lst[i]</b><span> 按下标取（从0开始）</span></div>' +
    '<div class="kv-item"><b>lst[a:b]</b><span> 切片（含头不含尾）</span></div>' +
    '<div class="kv-item"><b>lst[::-1]</b><span> 切片反转</span></div>' +
    "</div>" },

  { tab: "内置函数", icon: "🧰", html:
    '<div class="kv-list">' +
    '<div class="kv-item"><b>print(x)</b><span> 输出</span></div>' +
    '<div class="kv-item"><b>input(提示)</b><span> 输入，返回 str</span></div>' +
    '<div class="kv-item"><b>int / float / str</b><span> 类型转换</span></div>' +
    '<div class="kv-item"><b>type(x)</b><span> 查看类型</span></div>' +
    '<div class="kv-item"><b>len(x)</b><span> 长度</span></div>' +
    '<div class="kv-item"><b>range(a, b, c)</b><span> 生成数列（含头不含尾）</span></div>' +
    '<div class="kv-item"><b>sum / max / min</b><span> 求和 / 最大 / 最小</span></div>' +
    '<div class="kv-item"><b>abs(x)</b><span> 绝对值</span></div>' +
    '<div class="kv-item"><b>round(x, n)</b><span> 四舍五入留 n 位</span></div>' +
    '<div class="kv-item"><b>sorted / reversed</b><span> 排序 / 反转（返回新的）</span></div>' +
    '<div class="kv-item"><b>enumerate(x)</b><span> 同时拿到下标和值</span></div>' +
    '<div class="kv-item"><b>open(f)</b><span> 打开文件</span></div>' +
    "</div>" },

  { tab: "命名与关键字", icon: "🏷️", html:
    "<h4>命名规则</h4><ul><li>字母或下划线开头，后接字母、数字、下划线</li><li>区分大小写</li><li>不能用关键字，不能用空格</li></ul>" +
    "<h4>常用关键字（不能用作变量名）</h4>" +
    '<p><code>if elif else for while break continue def return True False None and or not in is import from as class with try except</code></p>' },

  { tab: "流程图符号", icon: "🔀", html:
    '<div class="table-wrap"><table class="tb"><tr><th>名称</th><th>形状</th><th>作用</th></tr>' +
    "<tr><td>起止框</td><td>椭圆 / 圆角矩形</td><td>开始、结束</td></tr>" +
    "<tr><td>输入输出框</td><td>平行四边形</td><td>输入 / 输出数据</td></tr>" +
    "<tr><td>处理框</td><td>矩形</td><td>赋值、计算</td></tr>" +
    "<tr><td>判断框</td><td>菱形</td><td>条件判断，两个出口</td></tr>" +
    "<tr><td>流程线</td><td>带箭头直线</td><td>执行方向</td></tr></table></div>" },

  { tab: "易混点对比", icon: "⚖️", html:
    '<div class="table-wrap"><table class="tb"><tr><th>对比</th><th>区别</th></tr>' +
    "<tr><td><code>/</code> vs <code>//</code></td><td>7/2=3.5 真除法；7//2=3 整除</td></tr>" +
    "<tr><td><code>=</code> vs <code>==</code></td><td>= 赋值；== 判断相等</td></tr>" +
    "<tr><td><code>sort()</code> vs <code>sorted()</code></td><td>前者排原列表返回 None；后者返回新列表</td></tr>" +
    "<tr><td><code>break</code> vs <code>continue</code></td><td>前者结束整个循环；后者跳过本轮</td></tr>" +
    "<tr><td><code>range(5)</code> vs <code>range(1,5)</code></td><td>前者 0-4；后者 1-4（都不含 5）</td></tr>" +
    "<tr><td>下标 vs 值</td><td>lst[0] 第一个元素；-1 最后一个</td></tr>" +
    "<tr><td><code>str</code> vs <code>int</code></td><td>\"12\" 是文字，12 是数字，不能直接混算</td></tr>" +
    "</table></div>" },

  { tab: "会考锦囊", icon: "🎒", html:
    '<div class="box box-exam"><div class="box-title">🎯 操作题三步法</div><p>① <b>读注释</b>：题目给的注释就是“题眼”；② <b>读已有代码</b>：猜函数要干什么；③ <b>对照调用</b>：看参数和输出反推空缺。写完按 <b>F5</b> 运行验证，确认后<b>保存</b>。</p></div>' +
    '<div class="box box-analogy"><div class="box-title">💡 看程序写结果四步</div><p>① 圈出变量；② 按执行顺序逐行走；③ 循环拿笔画跟踪表；④ 输出结果对照选项。宁可慢，不要跳。</p></div>' +
    '<div class="box box-ok"><div class="box-title">✅ 考前一夜清单</div><p>运算符优先级过一遍；range 含头不含尾再默念三遍；int/float/str 转换各练一道；早休息，带齐证件。</p></div>' }
];
