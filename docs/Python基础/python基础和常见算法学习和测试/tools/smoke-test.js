/* 冒烟测试 v2：模拟 DOM + 事件，遍历路由，模拟答题与考试全流程 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
let failures = [];
function check(name, cond, extra) {
  if (cond) console.log("  ✓ " + name);
  else { failures.push(name + (extra ? " | " + extra : "")); console.log("  ✗ " + name + (extra ? " | " + extra : "")); }
}

/* ---------- 模拟 DOM ---------- */
function makeClassList() {
  const s = new Set();
  return {
    add(c) { s.add(c); }, remove(c) { s.delete(c); },
    toggle(c, f) { if (f === undefined) { s.has(c) ? s.delete(c) : s.add(c); } else { f ? s.add(c) : s.delete(c); } },
    contains(c) { return s.has(c); }
  };
}
function makeEl() {
  const el = {
    innerHTML: "", textContent: "", value: "", checked: false,
    style: { cssText: "", setProperty() {} },
    dataset: {},
    classList: makeClassList(),
    _attrs: {},
    setAttribute(k, v) { this._attrs[k] = v; },
    getAttribute(k) { return this._attrs[k] !== undefined ? this._attrs[k] : null; },
    hasAttribute(k) { return this._attrs[k] !== undefined; },
    removeAttribute(k) { delete this._attrs[k]; },
    addEventListener() {}, removeEventListener() {},
    appendChild() {}, removeChild() {}, select() {}, focus() {}, blur() {},
    closest() { return null; }, scrollIntoView() {},
    querySelector() { return makeEl(); },
    querySelectorAll() { return []; }
  };
  return el;
}

const els = {};
const winHandlers = {};
const docHandlers = {};
const documentMock = {
  documentElement: makeEl(),
  querySelector(sel) { if (!els[sel]) els[sel] = makeEl(); return els[sel]; },
  querySelectorAll() { return []; },
  addEventListener(type, fn) { (docHandlers[type] = docHandlers[type] || []).push(fn); },
  createElement() { return makeEl(); },
  body: { appendChild() {}, removeChild() {} }
};
const localStorageMock = (function () {
  const m = {};
  return {
    getItem: k => (k in m ? m[k] : null),
    setItem: (k, v) => { m[k] = String(v); },
    removeItem: k => { delete m[k]; }
  };
})();
const locationMock = { hash: "#/home" };

const sandbox = {
  console,
  setTimeout() { return 0; }, clearTimeout() {},
  setInterval() { return 0; }, clearInterval() {},
  confirm: () => true, alert: () => {},
  addEventListener(type, fn) { (winHandlers[type] = winHandlers[type] || []).push(fn); },
  removeEventListener() {}, scrollTo() {}, innerWidth: 1200
};
sandbox.window = sandbox;
sandbox.document = documentMock;
sandbox.localStorage = localStorageMock;
sandbox.location = locationMock;
sandbox.navigator = {};
vm.createContext(sandbox);

function fireHash() { (winHandlers.hashchange || []).forEach(fn => fn()); }
function go(hash) { locationMock.hash = hash; fireHash(); }
function fireClick(target) { (docHandlers.click || []).forEach(fn => fn({ target })); }

/* 构造假点击目标：closestMap 指定选择器命中谁，attrs 指定属性 */
function makeTarget(closestMap, attrs) {
  const t = {
    _attrs: attrs || {},
    getAttribute(k) { return this._attrs[k] !== undefined ? this._attrs[k] : null; },
    hasAttribute(k) { return this._attrs[k] !== undefined; },
    closest(sel) { return closestMap[sel] !== undefined ? closestMap[sel] : null; },
    classList: makeClassList(),
    style: {},
    querySelector() { return makeEl(); },
    querySelectorAll() { return []; }
  };
  return t;
}

/* ---------- 加载脚本 ---------- */
console.log("[1] 加载脚本");
["assets/js/highlight.js", "assets/js/data.js", "assets/js/data-quiz.js", "assets/js/app.js"].forEach(f => {
  try {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });
    console.log("  ✓ " + f);
  } catch (e) { console.log("  ✗ " + f + ": " + e.message); failures.push("load " + f); }
});

const app = els["#app"];

/* ---------- 路由遍历 ---------- */
console.log("\n[2] 路由渲染");
go("#/home");
let html = app.innerHTML;
check("首页渲染", html.indexOf("会考 Python 学习站") >= 0 && html.indexOf("开始学习") >= 0);
// 考纲七大考点：标题说七条，实际卡片也必须是 7 张
{
  const ks = (html.match(/考点 \d<\/b>/g) || []).length;
  check("首页考纲考点卡片共 7 张", ks === 7, "实际 " + ks);
  check("首页考点卡编号连续", (html.match(/考点 (\d)<\/b>/g) || []).map(s => s[3]).join("") === "1234567");
}

go("#/learn");
check("知识精讲目录", app.innerHTML.indexOf("知识精讲") >= 0 && app.innerHTML.indexOf("第6章") >= 0);

for (let i = 1; i <= 6; i++) {
  go("#/chapter/ch" + i);
  const ok = app.innerHTML.indexOf("章末小测") >= 0;
  check("第" + i + "章渲染", ok);
}

go("#/chapter/ch1/ch1-3");
check("章节定位到小节", app.innerHTML.indexOf("data-lesson=\"ch1-3\"") >= 0);

go("#/algo");
check("算法专题首页", app.innerHTML.indexOf("算法专题") >= 0);
go("#/algo/a5");
check("算法详情（最大公约数）", app.innerHTML.indexOf("辗转相除") >= 0 || app.innerHTML.indexOf("最大公约数") >= 0);

go("#/quiz");
check("刷题中心全部", app.innerHTML.indexOf("刷题中心") >= 0 && app.innerHTML.indexOf("题库总量") >= 0);
go("#/quiz/choice");
check("筛选：选择题", app.innerHTML.indexOf("单项选择题") < 0 && app.innerHTML.indexOf("程序填空题") < 0);
go("#/quiz/read");
check("筛选：程序阅读", app.innerHTML.indexOf("显示答案与推演") >= 0);

go("#/exam");
check("模拟测试说明页", app.innerHTML.indexOf("模拟卷结构") >= 0 && app.innerHTML.indexOf("开始模拟测试") >= 0);

go("#/clinic");
check("错因诊所", app.innerHTML.indexOf("错因诊所") >= 0 && app.innerHTML.indexOf("语法错误") >= 0);

go("#/cheat");
check("速查表", app.innerHTML.indexOf("考前速查表") >= 0);
go("#/cheat/2");
check("速查表切换 tab", app.innerHTML.indexOf("类型转换") >= 0);

go("#/search/" + encodeURIComponent("循环"));
check("搜索：循环", app.innerHTML.indexOf("搜索") >= 0 && app.innerHTML.indexOf("找到") >= 0);

go("#/nonexistent");
check("未知路由回退首页", app.innerHTML.indexOf("会考 Python 学习站") >= 0);

/* ---------- 路由别名与进度页 ---------- */
console.log("\n[2b] 路由别名 / 学习进度");
go("#/learn/ch1");
check("learn/ch1 别名渲染第1章", app.innerHTML.indexOf("章末小测") >= 0 && app.innerHTML.indexOf("知识精讲") >= 0);
go("#/learn/chX");
check("learn/无效ID 回退目录", app.innerHTML.indexOf("第6章") >= 0);

/* 章末小测题干代码缩进（ch5 第一题 c19 嵌套循环）：换行与缩进必须原样进入 HTML */
go("#/chapter/ch5");
{
  const h = app.innerHTML;
  check("章末小测题干保留代码缩进", h.indexOf("\n    for j in range(3):") >= 0 && h.indexOf('\n        print("*", end="")') >= 0, JSON.stringify((h.match(/for i in range\(3\):[\s\S]{0,60}/) || [""])[0]));
  const cssSrc = fs.readFileSync(path.join(ROOT, "assets/css/style.css"), "utf8");
  check("q-text 启用 pre-wrap 保留缩进", /\.q-card \.q-text \{[^}]*white-space:\s*pre-wrap/.test(cssSrc));
}

go("#/progress");
check("学习进度页渲染", app.innerHTML.indexOf("学习进度") >= 0 && app.innerHTML.indexOf("章节完成度") >= 0 && app.innerHTML.indexOf("下一步建议") >= 0);
check("空数据显示空态", app.innerHTML.indexOf("还没有考试记录") >= 0);
check("空数据给出起步建议", app.innerHTML.indexOf("从第1章开始") >= 0);

/* ---------- 刷题交互 ---------- */
console.log("\n[3] 刷题交互");
go("#/quiz/choice");
// c01 正确答案是 B（索引1）
{
  const card = makeTarget({}, { "data-type": "choice", "data-q": "c01" });
  const opt = makeTarget({ ".q-opt[data-i]": null, ".q-card": card }, { "data-i": "1" });
  // 让 closest 返回自身
  opt.closest = function (sel) { return sel === ".q-opt[data-i]" ? opt : (sel === ".q-card" ? card : null); };
  fireClick(opt);
  const stats = JSON.parse(localStorageMock.getItem("ykt_quizStats") || "{}");
  check("答对选择题后统计 +1", stats.done === 1 && stats.right === 1, JSON.stringify(stats));
}
{
  const card = makeTarget({}, { "data-type": "choice", "data-q": "c02" });
  const opt = makeTarget({}, { "data-i": "0" }); // c02 正确是 C(2)，答 A 错误
  opt.closest = function (sel) { return sel === ".q-opt[data-i]" ? opt : (sel === ".q-card" ? card : null); };
  fireClick(opt);
  const stats = JSON.parse(localStorageMock.getItem("ykt_quizStats") || "{}");
  check("答错选择题统计正确", stats.done === 2 && stats.right === 1, JSON.stringify(stats));
}
// 判断题：j01 正确（true → data-i=1）
go("#/quiz/judge");
{
  const card = makeTarget({}, { "data-type": "judge", "data-q": "j01" });
  const opt = makeTarget({}, { "data-i": "1" });
  opt.closest = function (sel) { return sel === ".q-opt[data-i]" ? opt : (sel === ".q-card" ? card : null); };
  fireClick(opt);
  const stats = JSON.parse(localStorageMock.getItem("ykt_quizStats") || "{}");
  check("判断题答对统计 +1", stats.done === 3 && stats.right === 2, JSON.stringify(stats));
}

/* ---------- 学习进度 ---------- */
console.log("\n[4] 学习进度");
{
  const lc = makeTarget({ "[data-learn]": null }, { "data-learn": "ch1-1" });
  lc.closest = function (sel) { return sel === "[data-learn]" ? lc : null; };
  fireClick(lc);
  const prog = JSON.parse(localStorageMock.getItem("ykt_progress") || "{}");
  check("标记已学会写入进度", prog["ch1-1"] === true);
  fireClick(lc);
  const prog2 = JSON.parse(localStorageMock.getItem("ykt_progress") || "{}");
  check("再次点击取消标记", prog2["ch1-1"] === undefined);
}

/* ---------- 模拟考试全流程 ---------- */
console.log("\n[5] 模拟考试全流程");
go("#/exam");
{
  const btn = makeTarget({ "[data-action]": null }, { "data-action": "start-exam" });
  btn.closest = function (sel) { return sel === "[data-action]" ? btn : null; };
  fireClick(btn);
  check("开始考试后渲染试卷", app.innerHTML.indexOf("exam-bar") >= 0 && app.innerHTML.indexOf("交卷") >= 0);
  check("题号面板 30 题", (app.innerHTML.match(/data-ep="/g) || []).length === 30);

  // 连续答所有选择题（第1题为choice）——直接逐题点击下一题并作答
  const opt = makeTarget({}, { "data-exam-i": "1" });
  opt.closest = function (sel) { return sel === ".exam-opt" ? opt : null; };
  fireClick(opt);
  check("考试中作答选择", app.innerHTML.indexOf("已选") >= 0);

  const next = makeTarget({}, { "data-action": "exam-next" });
  next.closest = function (sel) { return sel === "[data-action]" ? next : null; };
  fireClick(next);
  check("下一题切换", app.innerHTML.indexOf("题号面板") < 0); // 重新渲染无该文案，验证已切换即可

  // 跳到最后一题（编程题）
  const last = makeTarget({}, { "data-ep": "29" });
  last.closest = function (sel) { return sel === "[data-ep]" ? last : null; };
  fireClick(last);
  check("题号跳转到第30题", app.innerHTML.indexOf("在这里写你的 Python 代码") >= 0);

  // 勾选自评（触发 change 事件）
  const selfCb = makeTarget({}, { "data-self": "29" });
  (docHandlers.change || []).forEach(fn => fn({ target: selfCb }));
  // 由于 change handler 只记录状态，这里仅验证不抛错

  // 交卷
  const submit = makeTarget({}, { "data-action": "submit-exam" });
  submit.closest = function (sel) { return sel === "[data-action]" ? submit : null; };
  fireClick(submit);
  check("交卷后渲染成绩单", app.innerHTML.indexOf("成绩单") >= 0 && app.innerHTML.indexOf("/ 100 分") >= 0);
  check("成绩单含逐题回顾", app.innerHTML.indexOf("逐题回顾") >= 0);

  // 再测一次
  const again = makeTarget({}, { "data-action": "start-exam" });
  again.closest = function (sel) { return sel === "[data-action]" ? again : null; };
  fireClick(again);
  check("再测一次重新出卷", app.innerHTML.indexOf("exam-bar") >= 0);
}

/* ---------- 数据完整性 ---------- */
console.log("\n[6] 数据完整性");
const data = vm.runInContext("({ CHAPTERS, ALGOS, MINIS, CODE, QBANK, CLINIC, CLINIC_TYPES, CHEAT })", sandbox);
check("六章知识精讲", data.CHAPTERS.length === 6);
check("14 个算法专题", data.ALGOS.length === 14);
let totalSections = 0;
data.CHAPTERS.forEach(c => totalSections += c.sections.length);
check("章节小节数量 >= 20", totalSections >= 20, "实际 " + totalSections);
let quizIdOk = true, missing = [];
data.CHAPTERS.forEach(c => (c.quizIds || []).forEach(qid => {
  if (!data.QBANK.choice.some(q => q.id === qid)) { quizIdOk = false; missing.push(qid); }
}));
check("章节引用的选择题 ID 全部存在", quizIdOk, missing.join(","));
let miniOk = true, miniMissing = [];
data.CHAPTERS.forEach(c => c.sections.forEach(s => {
  const re = /data-mini="([^"]+)"/g; let m;
  while ((m = re.exec(s.html)) !== null) if (!data.MINIS[m[1]]) { miniOk = false; miniMissing.push(m[1]); }
}));
check("随堂小测 ID 全部存在", miniOk, miniMissing.join(","));
let pairOk = true, pairBad = [], pairCount = 0, pair3Count = 0, wideCount = 0;
data.CHAPTERS.forEach(c => c.sections.forEach(s => {
  const re = /<div class="(fc-pair|fc-pair pair3|fc-pair wide-code)">([\s\S]*?)<\/div><\/div>/g; let m;
  while ((m = re.exec(s.html)) !== null) {
    const inner = m[2];
    const codes = (inner.match(/<div class="codeblock">/g) || []).length;
    const charts = (inner.match(/fc-wrap/g) || []).length;
    if (m[1] === "fc-pair pair3") pair3Count++;
    else { pairCount++; if (m[1] === "fc-pair wide-code") wideCount++; }
    if (codes !== 1 || charts !== (m[1] === "fc-pair pair3" ? 2 : 1) ||
        inner.indexOf('<div class="codeblock">') > inner.indexOf("fc-wrap")) {
      pairOk = false; pairBad.push(s.id);
    }
  }
}));
check("代码+流程图配对完整（6 单配对 + 1 加宽代码列 + 1 三栏，代码在前）",
  pairOk && pairCount === 7 && pair3Count === 1 && wideCount === 1,
  "single=" + pairCount + " pair3=" + pair3Count + " wide=" + wideCount + " bad=" + pairBad.join(","));
check("选择题 >= 25", data.QBANK.choice.length >= 25, "实际 " + data.QBANK.choice.length);
check("判断题 >= 10", data.QBANK.judge.length >= 10, "实际 " + data.QBANK.judge.length);
check("程序阅读 >= 12", data.QBANK.read.length >= 12, "实际 " + data.QBANK.read.length);
check("程序填空 >= 8", data.QBANK.fill.length >= 8, "实际 " + data.QBANK.fill.length);
check("编程题 >= 6", data.QBANK.code.length >= 6, "实际 " + data.QBANK.code.length);
let ansOk = true, optOk = true;
data.QBANK.choice.forEach(q => {
  if (q.answer < 0 || q.answer >= q.options.length) ansOk = false;
  if (q.options.length !== 4) optOk = false;
});
check("选择题答案索引全部合法", ansOk);
check("选择题均为四选一", optOk);
let jOk = true;
data.QBANK.judge.forEach(q => { if (typeof q.answer !== "boolean") jOk = false; });
check("判断题答案均为布尔值", jOk);
let fillOk = true, fillBad = [];
data.QBANK.fill.forEach(q => {
  const n = (q.code.match(/____/g) || []).length;
  if (n !== q.answers.length) { fillOk = false; fillBad.push(q.id + "(" + n + "vs" + q.answers.length + ")"); }
});
check("填空空数与答案数一致", fillOk, fillBad.join(","));
const algoIds = data.ALGOS.map(a => a.id);
check("算法 ID 唯一", new Set(algoIds).size === algoIds.length);
check("错因案例 >= 12", data.CLINIC.length >= 12, "实际 " + data.CLINIC.length);
check("错因类型 5 类", data.CLINIC_TYPES.length === 5);
check("速查表 >= 8 个 tab", data.CHEAT.length >= 8, "实际 " + data.CHEAT.length);
// 速查表 tab 中 html 无未闭合的 code 标签
let cheatOk = true;
data.CHEAT.forEach(c => { if ((c.html.match(/<code>/g) || []).length !== (c.html.match(/<\/code>/g) || []).length) cheatOk = false; });
check("速查表 code 标签闭合", cheatOk);

/* ---------- 高亮器 ---------- */
console.log("\n[7] 语法高亮器");
const hl = vm.runInContext("PyHL.highlight('for i in range(3): pass')", sandbox);
check("关键字着色", hl.indexOf("tok-k") >= 0);
check("内置函数着色", hl.indexOf("tok-b") >= 0);
const hl2 = vm.runInContext("PyHL.highlight('print(\"hi\") # 注释')", sandbox);
check("字符串+注释着色", hl2.indexOf("tok-s") >= 0 && hl2.indexOf("tok-c") >= 0);
const hl3 = vm.runInContext("PyHL.highlight('a < b > c')", sandbox);
check("HTML 转义安全", hl3.indexOf("&lt;") >= 0 && hl3.indexOf("&gt;") >= 0);
const hl4 = vm.runInContext("PyHL.highlight('x = 3.14 + 2e3')", sandbox);
check("数字着色", hl4.indexOf("tok-n") >= 0);

/* ---------- 学习进度端到端（真实交互累积数据） ---------- */
console.log("\n[8] 学习进度端到端");
// 标记 ch1 全章 4 节 + ch2 第 1 节
["ch1-1", "ch1-2", "ch1-3", "ch1-4", "ch2-1"].forEach(function (id) {
  const lc = makeTarget({ "[data-learn]": null }, { "data-learn": id });
  lc.closest = function (sel) { return sel === "[data-learn]" ? lc : null; };
  fireClick(lc);
});
// 再答 5 题：c03 对(3)、c04 对(2)、c05 错(0)、j02 对(1)、j03 错(0)
function answerChoice(qid, i) {
  go("#/quiz/choice");
  const card = makeTarget({}, { "data-type": "choice", "data-q": qid });
  const opt = makeTarget({}, { "data-i": String(i) });
  opt.closest = function (sel) { return sel === ".q-opt[data-i]" ? opt : (sel === ".q-card" ? card : null); };
  fireClick(opt);
}
function answerJudge(qid, i) {
  go("#/quiz/judge");
  const card = makeTarget({}, { "data-type": "judge", "data-q": qid });
  const opt = makeTarget({}, { "data-i": String(i) });
  opt.closest = function (sel) { return sel === ".q-opt[data-i]" ? opt : (sel === ".q-card" ? card : null); };
  fireClick(opt);
}
answerChoice("c03", 3);
answerChoice("c04", 2);
answerChoice("c05", 0);
answerJudge("j02", 1);
answerJudge("j03", 0);
// 补一条历史考试记录（[5] 已真实产生 1 条）
const ehBefore = JSON.parse(localStorageMock.getItem("ykt_examHistory") || "[]");
localStorageMock.setItem("ykt_examHistory", JSON.stringify(
  [{ total: 82, level: "良好", auto: 40, autoMax: 50, subj: 42, subjMax: 50, count: 15, timeUp: false, date: "2026-10-20T09:30:00.000Z" }].concat(ehBefore)
));

go("#/progress");
const pg2 = app.innerHTML;
const qsNow = JSON.parse(localStorageMock.getItem("ykt_quizStats") || "{}");
const ehNow = JSON.parse(localStorageMock.getItem("ykt_examHistory") || "[]");
const accNow = Math.round(qsNow.right / qsNow.done * 100);
const bestNow = ehNow.reduce((m, e) => Math.max(m, e.total), 0);
check("统计卡：课时 5/24、章节 1/6", pg2.indexOf("5 / 24") >= 0 && pg2.indexOf("1 / 6") >= 0, "qs=" + JSON.stringify(qsNow));
check("统计卡：正确率与题量", pg2.indexOf(accNow + "%") >= 0 && pg2.indexOf(qsNow.done + " 题") >= 0, "期望 " + accNow + "% / " + qsNow.done + " 题");
check("统计卡：考试次数与最好成绩", pg2.indexOf(ehNow.length + " 次") >= 0 && pg2.indexOf("最好 " + bestNow + " 分") >= 0, "eh=" + ehNow.length + " best=" + bestNow);
check("考试历史表含成绩等级", pg2.indexOf("模拟考试记录") >= 0 && pg2.indexOf("良好") >= 0 && pg2.indexOf("82") >= 0);
check("ch1 进度条满格", /pg-bar-fill full" style="width:100%/.test(pg2));
check("薄弱章节建议指向第2章", pg2.indexOf("第2章") >= 0 && pg2.indexOf("最薄弱") >= 0);

// 重置动作（confirm 已在沙箱中返回 true）
{
  const btn = makeTarget({}, { "data-action": "reset-progress" });
  btn.closest = function (sel) { return sel === "[data-action]" ? btn : null; };
  fireClick(btn);
  const prog = JSON.parse(localStorageMock.getItem("ykt_progress") || "x");
  const qs = JSON.parse(localStorageMock.getItem("ykt_quizStats") || "x");
  const eh = JSON.parse(localStorageMock.getItem("ykt_examHistory") || "x");
  check("重置后数据清空", prog && Object.keys(prog).length === 0 && qs && qs.done === 0 && eh && eh.length === 0, JSON.stringify({ prog, qs, eh }));
  check("重置后进度环归零", els["#ppText"] && els["#ppText"].textContent === "0%", els["#ppText"] && els["#ppText"].textContent);
  check("重置后回到空态", app.innerHTML.indexOf("还没有考试记录") >= 0);
}

/* ---------- 算法专题滚动定位 ---------- */
console.log("\n[9] 算法专题滚动定位");
const realSetTimeout = sandbox.setTimeout;
let scrolled = null;
sandbox.setTimeout = function (fn) { try { fn(); } catch (e) {} return 0; };
// 预置 .algo-detail 元素并装间谍
const adEl = documentMock.querySelector(".algo-detail");
adEl.scrollIntoView = function (o) { scrolled = o; };

scrolled = null;
go("#/algo");
check("直接访问算法专题不自动滚动", scrolled === null);

scrolled = null;
go("#/algo/a5");
check("带 ID 进入时平滑滚动到详情", !!scrolled && scrolled.behavior === "smooth", JSON.stringify(scrolled));
check("滚动目标存在且渲染对应算法", app.innerHTML.indexOf("algo-detail") >= 0 && (app.innerHTML.indexOf("辗转相除") >= 0 || app.innerHTML.indexOf("最大公约数") >= 0));

// 点击已选中卡片：hash 不变，应直接滚动
scrolled = null;
const aCard = makeTarget({}, { "data-algo": "a5" });
aCard.closest = function (sel) { return sel === ".algo-card" ? aCard : null; };
fireClick(aCard);
check("点击已选中卡片直接滚动到详情", !!scrolled && scrolled.behavior === "smooth", JSON.stringify(scrolled));

sandbox.setTimeout = realSetTimeout;

/* ---------- 算法详情页底部翻页 ---------- */
console.log("\n[10] 算法详情页底部翻页");
// 遍历全部算法：翻页栏存在、页码正确、前后链接指向相邻算法、首末页禁用
let pagerOk = true, pagerBad = [];
algoIds.forEach(function (aid, i) {
  go("#/algo/" + aid);
  const h = app.innerHTML;
  const prevId = i > 0 ? algoIds[i - 1] : null;
  const nextId = i < algoIds.length - 1 ? algoIds[i + 1] : null;
  if (h.indexOf('class="algo-pager"') < 0) { pagerOk = false; pagerBad.push(aid + ":缺翻页栏"); return; }
  if (h.indexOf("第 " + (i + 1) + " / " + algoIds.length + " 篇") < 0) { pagerOk = false; pagerBad.push(aid + ":页码错"); }
  if (prevId) {
    if (h.indexOf('href="#/algo/' + prevId + '" rel="prev"') < 0) { pagerOk = false; pagerBad.push(aid + ":上一页链接错"); }
  } else if (h.indexOf("ap-prev is-off") < 0) { pagerOk = false; pagerBad.push(aid + ":首页未禁用上一页"); }
  if (nextId) {
    if (h.indexOf('href="#/algo/' + nextId + '" rel="next"') < 0) { pagerOk = false; pagerBad.push(aid + ":下一页链接错"); }
  } else if (h.indexOf("ap-next is-off") < 0) { pagerOk = false; pagerBad.push(aid + ":末页未禁用下一页"); }
});
check("全部 " + algoIds.length + " 个算法翻页链接正确（含边界禁用）", pagerOk, pagerBad.slice(0, 4).join("; "));

go("#/algo/a1");
check("第一篇上一页禁用并提示", app.innerHTML.indexOf("ap-prev is-off") >= 0 && app.innerHTML.indexOf("已是第一篇") >= 0);
go("#/algo/a14");
check("最后一篇下一页禁用并提示", app.innerHTML.indexOf("ap-next is-off") >= 0 && app.innerHTML.indexOf("已是最后一篇") >= 0);

// 翻页链接改 hash 后由路由渲染相邻算法
go("#/algo/a2");
locationMock.hash = "#/algo/a3"; fireHash();
check("点击翻页后渲染相邻算法", app.innerHTML.indexOf("平方和") >= 0 && app.innerHTML.indexOf("algo-pager") >= 0);

/* ---------- 侧边栏折叠 ---------- */
console.log("\n[11] 侧边栏折叠（桌面端）");
const htmlEl = documentMock.documentElement;
const sbBtn = els["#sbCollapse"];
check("初始为展开态图标", !!sbBtn && sbBtn.textContent === "«" && sbBtn.getAttribute("aria-expanded") === "true" && sbBtn.title === "折叠侧边栏", sbBtn && sbBtn.textContent);

// 经 data-action 委托点击折叠按钮
const sbTarget = makeTarget({}, { "data-action": "toggle-sidebar" });
sbTarget.closest = function (sel) { return sel === "[data-action]" ? sbTarget : null; };
fireClick(sbTarget);
check("点击后 html 添加 sb-collapsed 类", htmlEl.classList.contains("sb-collapsed"));
check("折叠状态写入 localStorage", localStorageMock.getItem("ykt_sbCollapsed") === "1");
check("图标切换为展开指示", sbBtn.textContent === "»" && sbBtn.getAttribute("aria-expanded") === "false" && sbBtn.title === "展开侧边栏", sbBtn.textContent + "/" + sbBtn.title);

// 折叠态不受路由切换影响
go("#/learn");
check("路由切换后折叠态保持", htmlEl.classList.contains("sb-collapsed"));

// 再次点击恢复
fireClick(sbTarget);
check("再次点击恢复展开态", !htmlEl.classList.contains("sb-collapsed") && localStorageMock.getItem("ykt_sbCollapsed") === "0");
check("图标恢复折叠指示", sbBtn.textContent === "«" && sbBtn.getAttribute("aria-expanded") === "true");

/* ---------- 汇总 ---------- */
console.log("\n========================================");
if (failures.length) {
  console.log("失败 " + failures.length + " 项：");
  failures.forEach(f => console.log(" - " + f));
  process.exit(1);
} else {
  console.log("全部通过 ✔（共 " + (10) + " 组测试）");
}
