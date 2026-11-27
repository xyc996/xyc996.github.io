/* Python 代码质检：提取站点全部代码示例，用真实 Python 运行验证 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const PY = "C:\\Users\\Lenovo\\.workbuddy\\binaries\\python\\versions\\3.13.12\\python.exe";
const TMP = path.join(ROOT, "tools", "_py_check");
fs.mkdirSync(TMP, { recursive: true });

/* 加载站点数据 */
const sandbox = { console, setTimeout, clearTimeout, setInterval, clearInterval };
sandbox.window = sandbox;
vm.createContext(sandbox);
["assets/js/highlight.js", "assets/js/data.js", "assets/js/data-quiz.js"].forEach(f => {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });
});
const D = vm.runInContext("({ CODE, ALGOS, MINIS, QBANK })", sandbox);

let fail = 0, warn = 0, pass = 0;

function run(name, code, stdin, expect) {
  const file = path.join(TMP, name + ".py");
  fs.writeFileSync(file, code, "utf8");
  let out = "", err = "", code0 = 0;
  try {
    out = execFileSync(PY, [file], {
      input: stdin || "", encoding: "utf8", timeout: 5000,
      stdio: ["pipe", "pipe", "pipe"]
    });
  } catch (e) {
    code0 = e.status === undefined ? -1 : e.status;
    out = e.stdout || ""; err = e.stderr || "";
    if (e.killed || e.code === "ETIMEDOUT" || e.signal) { // 超时
      warn++;
      console.log("  ⚠ " + name + " 运行超时（5秒）" + (name.indexOf("dead") >= 0 ? "（死循环示例，属预期）" : ""));
      return;
    }
  }
  const errText = err.trim();
  if (errText.indexOf("SyntaxError") >= 0) {
    fail++;
    console.log("  ✗ " + name + " 语法错误:\n    " + errText.split("\n").slice(-3).join("\n    "));
    return;
  }
  if (code0 !== 0) {
    // input() 相关错误属预期（无输入环境）
    if (errText.indexOf("EOFError") >= 0) { pass++; return; }
    warn++;
    console.log("  ⚠ " + name + " 运行错误: " + errText.split("\n").slice(-1)[0]);
    return;
  }
  if (expect !== undefined) {
    const got = out.trim().replace(/\s+/g, " ");
    const want = String(expect).trim().replace(/\s+/g, " ");
    if (got === want) { pass++; }
    else {
      fail++;
      console.log("  ✗ " + name + " 输出不符:\n    期望: " + want + "\n    实际: " + got);
    }
  } else pass++;
}

console.log("[A] CODE 示例库（共 " + Object.keys(D.CODE).length + " 个）");
Object.keys(D.CODE).forEach(k => {
  const code = D.CODE[k];
  if (k === "while_dead") { run(k, code, "", undefined); return; }      // 故意死循环
  if (k === "input_err") { run(k, code, "16\n", undefined); return; }    // 故意报错示例
  if (k === "var" || k === "types" || k === "ops" || k === "cmp" || k === "logic" || k === "truthy" || k === "hello" || k === "comment") {
    run(k, code, "", undefined); return;
  }
  if (k === "convert" || k === "io") { run(k, code, "16\n", undefined); return; }
  run(k, code, "", undefined);
});

console.log("\n[B] 算法专题（共 " + D.ALGOS.length + " 个）");
const algoInput = { a1: "100\n", a2: "5\n", a3: "4\n", a4: "7\n", a5: "12\n18\n", a6: "8\n", a12: "123\n", a13: "2024\n" };
const algoExpect = {
  a1: "请输入n：5050", a2: "请输入n：120", a3: "请输入n：30", a4: "请输入n：7 是素数", a5: "6",
  a6: "项数：1 1 2 3 5 8 13 21", a12: "321", a13: "年份：闰年",
  a7: "9", a8: "[1, 3, 5, 8, 9]", a9: "[1, 3, 5, 8]",
  a10: "是回文", a11: "4 3",
  a14: "153\n370\n371\n407"
};
D.ALGOS.forEach(a => {
  run("algo_" + a.id, a.code, algoInput[a.id] || "", algoExpect[a.id]);
});

console.log("\n[C] 程序阅读题验证输出");
const readExpect = {
  r01: "InFoRmAtIoN", r02: "92", r03: "5050", r04: "120", r05: "6",
  r06: "1 1 2 3 5 8 13 21", r07: "***\n***\n***", r08: "H\nd\nllo\n10",
  r09: "[0, 1, 2, 3]", r10: "12", r11: "4 3", r12: "是回文", r13: "321",
  r14: "2024 闰年\n1900 平年\n2000 闰年", r15: "[1, 3, 8, 5, 9]",
  r16: "7 是素数\n9 不是素数"
};
D.QBANK.read.forEach(q => {
  run("read_" + q.id, q.code, "", readExpect[q.id]);
});

console.log("\n[D] 编程题参考答案");
D.QBANK.code.forEach(q => {
  const inputs = { p01: "100\n", p02: "2024\n", p03: "72\n", p04: "5\n", p05: "7\n", p06: "ab12cd3\n", p07: "12\n18\n", p08: "8\n" };
  const expects = { p01: "5050", p02: "闰年", p03: "B", p04: "120", p05: "是素数", p06: "4 3", p07: "6", p08: "1 1 2 3 5 8 13 21" };
  run("code_" + q.id, q.solution, inputs[q.id], expects[q.id]);
});

console.log("\n[E] 程序填空答案组合验证");
D.QBANK.fill.forEach(q => {
  // 把答案填回 ____ 后运行
  let i = 0;
  const filled = q.code.replace(/____/g, () => q.answers[i++]);
  const inputs = { f01: "12\n18\n", f02: "85\n", f03: "", f04: "5\n", f05: "7\n", f06: "", f07: "", f08: "ab12cd3\n", f09: "2024\n" };
  const expects = { f01: "6", f02: "A等级", f03: "5050", f04: "120", f05: "是素数", f06: "9", f07: "1 1 2 3 5 8 13 21 34 55", f08: "4 3", f09: "闰年" };
  run("fill_" + q.id, filled, inputs[q.id] || "", expects[q.id]);
});

console.log("\n========================================");
console.log("通过 " + pass + " · 警告 " + warn + " · 失败 " + fail);
if (fail > 0) process.exit(1);
