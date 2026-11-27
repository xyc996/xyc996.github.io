/* ==========================================================
   豫考通 · 交互逻辑
   路由 / 渲染 / 刷题 / 模拟考试 / 进度 / 搜索
   ========================================================== */
(function () {
  "use strict";

  /* ---------- 工具 ---------- */
  function $(s, p) { return (p || document).querySelector(s); }
  function $$(s, p) { return Array.prototype.slice.call((p || document).querySelectorAll(s)); }
  function esc(s) { return PyHL.esc(String(s)); }
  function codeHTML(src, title) { return PyHL.codeBlock(src, title || "python"); }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function norm(s) { return String(s == null ? "" : s).replace(/\s+/g, "").toLowerCase(); }
  function stripTags(html) { return String(html).replace(/<[^>]*>/g, " "); }
  function fmtTime(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
  }

  /* ---------- 本地存储 ---------- */
  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem("ykt_" + k); return v ? JSON.parse(v) : d; }
      catch (e) { return d; }
    },
    set: function (k, v) { try { localStorage.setItem("ykt_" + k, JSON.stringify(v)); } catch (e) {} }
  };
  var progress = store.get("progress", {});          // { sectionId: true }
  var quizStats = store.get("quizStats", { done: 0, right: 0 });

  var DIFF = { 1: "容易", 2: "中等", 3: "较难" };
  var DIFF_STARS = { 1: "⭐", 2: "⭐⭐", 3: "⭐⭐⭐" };

  var app = $("#app");
  var sidebar = $("#sidebar");

  /* ==========================================================
     路由
     ========================================================== */
  var views = {
    home: renderHome,
    learn: renderLearn,
    chapter: renderChapter,
    algo: renderAlgo,
    quiz: renderQuiz,
    exam: renderExam,
    clinic: renderClinic,
    cheat: renderCheat,
    progress: renderProgress,
    search: renderSearch
  };

  function parseHash() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/");
    return { name: parts[0] || "home", param: parts[1] || "", sub: parts[2] || "" };
  }

  var lastRoute = null;
  function router() {
    var p = parseHash();
    var prevRoute = lastRoute;
    lastRoute = p;
    // 路由别名：/learn/ch1 与 /chapter/ch1 等价，避免误输入的链接落到目录页
    if (p.name === "learn" && p.param) { renderChapter(p.param); renderSidebar("chapter"); updateNav("learn"); updateProgressRing(); window.scrollTo({ top: 0 }); return; }
    var fn = views[p.name] || renderHome;
    closeMobileNav();
    fn(p.param, p.sub);
    updateNav(p.name);
    updateProgressRing();
    // 在算法详情之间翻页时不回顶，由 renderAlgo 平滑滚动定位到新的详情区
    if (!(p.name === "algo" && prevRoute && prevRoute.name === "algo")) window.scrollTo({ top: 0 });
  }

  function updateNav(name) {
    var group = { chapter: "learn", search: "search" };
    var key = group[name] || name;
    $$("#topnav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === key);
    });
  }

  function updateProgressRing() {
    var total = 0, done = 0;
    CHAPTERS.forEach(function (c) {
      c.sections.forEach(function (s) { total++; if (progress[s.id]) done++; });
    });
    var pct = total ? Math.round(done / total * 100) : 0;
    var ring = $("#progressPill .pp-ring");
    if (ring) ring.style.setProperty("--p", pct + "%");
    var txt = $("#ppText");
    if (txt) txt.textContent = pct + "%";
  }

  function closeMobileNav() {
    $$("#topnav").forEach(function (n) { n.classList.remove("open"); });
    if (sidebar) sidebar.classList.remove("open");
  }

  /* ---------- 侧边栏折叠（桌面端） ----------
     折叠态记在 <html> 的 sb-collapsed 类上（head 内联脚本负责恢复，避免闪烁），
     同时写入 localStorage；移动端侧边栏是抽屉，由 #sbToggle 控制，不折叠。 */
  function sbIsCollapsed() {
    return document.documentElement.classList.contains("sb-collapsed");
  }
  function updateSbCollapseIcon() {
    var btn = $("#sbCollapse");
    if (!btn) return;
    var c = sbIsCollapsed();
    btn.textContent = c ? "»" : "«";
    var label = c ? "展开侧边栏" : "折叠侧边栏";
    btn.title = label;
    btn.setAttribute("aria-label", label);
    btn.setAttribute("aria-expanded", c ? "false" : "true");
  }
  function toggleSidebarCollapse() {
    document.documentElement.classList.toggle("sb-collapsed");
    try { localStorage.setItem("ykt_sbCollapsed", sbIsCollapsed() ? "1" : "0"); } catch (e) {}
    updateSbCollapseIcon();
  }

  /* ==========================================================
     侧栏
     ========================================================== */
  function sbSection(title, items) {
    var h = '<div class="sb-title">' + title + "</div>";
    items.forEach(function (it) {
      h += '<a class="sb-item' + (it.active ? " active" : "") + (it.done ? " done" : "") +
        '" href="#' + it.href + '">' +
        (it.num ? '<span class="sb-num">' + it.num + "</span>" : (it.icon || "")) +
        "<span>" + it.label + "</span>" +
        (it.done ? '<span class="sb-check">✓</span>' : "") + "</a>";
    });
    return h;
  }

  function chapterDone(c) {
    return c.sections.every(function (s) { return progress[s.id]; });
  }

  function renderSidebar(name, param) {
    var h = "";
    if (name === "home" || name === "search") {
      h += sbSection("快速开始", [
        { label: "首页 · 考试速览", href: "/home", active: name === "home", icon: "🏠" },
        { label: "开始知识精讲", href: "/learn", icon: "📖" },
        { label: "直接刷题", href: "/quiz", icon: "✏️" },
        { label: "模拟测试", href: "/exam", icon: "📝" }
      ]);
      h += '<div class="sb-title">学习路径</div>';
      CHAPTERS.forEach(function (c) {
        h += '<a class="sb-item' + (chapterDone(c) ? " done" : "") + '" href="#/chapter/' + c.id + '">' +
          '<span class="sb-num">' + c.num + "</span><span>" + c.title + "</span>" +
          (chapterDone(c) ? '<span class="sb-check">✓</span>' : "") + "</a>";
      });
      h += sbSection("工具箱", [
        { label: "算法专题", href: "/algo", icon: "🧮" },
        { label: "错因诊所", href: "/clinic", icon: "🩺" },
        { label: "速查表", href: "/cheat", icon: "📇" }
      ]);
    } else if (name === "learn" || name === "chapter") {
      h += sbSection("知识精讲", CHAPTERS.map(function (c) {
        return { num: c.num, label: c.title, href: "/chapter/" + c.id, active: name === "chapter" && param === c.id, done: chapterDone(c) };
      }));
      if (name === "chapter" && param) {
        var c = findChapter(param);
        if (c) {
          h += '<div class="sb-title">本章节目录</div>';
          c.sections.forEach(function (s, i) {
            h += '<a class="sb-item' + (progress[s.id] ? " done" : "") + '" href="#/chapter/' + c.id + "/" + s.id + '">' +
              '<span class="sb-num">' + (i + 1) + "</span><span>" + s.title + "</span>" +
              (progress[s.id] ? '<span class="sb-check">✓</span>' : "") + "</a>";
          });
        }
      }
      h += sbSection("继续闯关", [
        { label: "算法专题", href: "/algo", icon: "🧮" },
        { label: "刷题中心", href: "/quiz", icon: "✏️" },
        { label: "模拟测试", href: "/exam", icon: "📝" }
      ]);
    } else if (name === "algo") {
      h += sbSection("算法专题", ALGOS.map(function (a) {
        return { icon: a.icon, label: a.name, href: "/algo/" + a.id, active: param === a.id };
      }));
      h += sbSection("相关", [
        { label: "知识精讲", href: "/learn", icon: "📖" },
        { label: "刷题中心", href: "/quiz", icon: "✏️" }
      ]);
    } else if (name === "quiz") {
      h += sbSection("题型", [
        { label: "全部练习", href: "/quiz", active: !param, icon: "📚" },
        { label: "选择题（" + QBANK.choice.length + "）", href: "/quiz/choice", active: param === "choice", icon: "🔘" },
        { label: "判断题（" + QBANK.judge.length + "）", href: "/quiz/judge", active: param === "judge", icon: "⚖️" },
        { label: "程序阅读（" + QBANK.read.length + "）", href: "/quiz/read", active: param === "read", icon: "👀" },
        { label: "程序填空（" + QBANK.fill.length + "）", href: "/quiz/fill", active: param === "fill", icon: "✍️" },
        { label: "编程题（" + QBANK.code.length + "）", href: "/quiz/code", active: param === "code", icon: "💻" }
      ]);
      h += sbSection("换个方式", [
        { label: "模拟测试", href: "/exam", icon: "📝" },
        { label: "错因诊所", href: "/clinic", icon: "🩺" }
      ]);
    } else if (name === "exam") {
      h += sbSection("模拟测试", [
        { label: "考试说明", href: "/exam", active: true, icon: "📋" },
        { label: "错因诊所", href: "/clinic", icon: "🩺" },
        { label: "速查表", href: "/cheat", icon: "📇" }
      ]);
      h += '<div class="sb-title">温馨提示</div><div style="font-size:12.5px;color:#6b7280;padding:0 8px;line-height:1.7">模拟卷随机抽题，每次都不一样。答完记得看解析，错题比分数更重要。</div>';
    } else if (name === "clinic") {
      h += sbSection("错因类型", CLINIC_TYPES.map(function (t) {
        return { icon: t.icon, label: t.name + " " + t.ratio + "%", href: "/clinic/" + encodeURIComponent(t.name) };
      }));
      h += sbSection("相关", [
        { label: "刷题中心", href: "/quiz", icon: "✏️" },
        { label: "速查表", href: "/cheat", icon: "📇" }
      ]);
    } else if (name === "cheat") {
      h += sbSection("速查表", CHEAT.map(function (c, i) {
        return { icon: c.icon, label: c.tab, href: "/cheat/" + i };
      }));
    } else if (name === "progress") {
      h += sbSection("学习进度", [
        { label: "总览", href: "/progress", active: true, icon: "📊" },
        { label: "知识精讲", href: "/learn", icon: "📖" },
        { label: "刷题中心", href: "/quiz", icon: "✏️" },
        { label: "模拟测试", href: "/exam", icon: "📝" },
        { label: "错因诊所", href: "/clinic", icon: "🩺" }
      ]);
      h += '<div class="sb-title">说明</div><div style="font-size:12.5px;color:#6b7280;padding:0 8px;line-height:1.7">进度数据保存在本机浏览器（localStorage），换设备或清理浏览器数据后会重置。</div>';
    }
    sidebar.innerHTML = h;
  }

  /* ==========================================================
     视图：首页
     ========================================================== */
  function renderHome() {
    var h = "";

    h += '<div class="hero view-enter">' +
      '<span class="hero-tag">河南省 · 普通高中信息技术学业水平合格性考试</span>' +
      "<h1>会考 Python 学习站</h1>" +
      "<p>从零基础到稳拿编程题。知识点精讲、会考算法专题、智能刷题、模拟测试、错因诊所——陪你一个知识点一个知识点地啃下来。</p>" +
      '<div class="hero-cta">' +
      '<a class="btn btn-white" href="#/learn">📖 开始学习</a>' +
      '<a class="btn btn-outline" href="#/quiz">✏️ 进入刷题</a>' +
      '<a class="btn btn-outline" href="#/exam">📝 模拟测试</a>' +
      "</div></div>";

    /* 考试速览 */
    h += '<div class="section-title"><h2>📋 考试速览</h2><span>先认识敌人，再打败它</span></div>';
    h += '<div class="grid-4">' +
      statCard("🎓", "考试性质", "合格性考试<br>毕业重要依据") +
      statCard("🗓️", "考试时间", "高二上学期期末<br>原则上每年12月") +
      statCard("💻", "考试形式", "全省统一命题<br>上机无纸化") +
      statCard("🏅", "成绩呈现", "A/B/C/D/E 五级<br>E为不合格") +
      "</div>";

    /* 题型分值 */
    h += '<div class="card view-enter">' +
      '<h3 style="margin-bottom:10px">🧾 试卷结构（参考）</h3>' +
      '<div class="table-wrap"><table class="tb">' +
      "<tr><th>题型</th><th>题量</th><th>分值</th><th>考查方式</th></tr>" +
      "<tr><td>单项选择题</td><td>20 题</td><td>40 分</td><td>四选一，覆盖全部考点（含程序阅读）</td></tr>" +
      "<tr><td>理解判断题</td><td>5 题</td><td>10 分</td><td>判断说法对错</td></tr>" +
      "<tr><td>综合分析题</td><td>2 题</td><td>20 分</td><td>结合情境分析作答</td></tr>" +
      "<tr><td>应用处理题</td><td>2 题</td><td>30 分</td><td>第1题 Excel（WPS）；<b>第2题 Python 程序设计（15分）</b></td></tr>" +
      "</table></div>" +
      '<div class="box box-exam"><div class="box-title">🎯 Python 操作题长这样</div><p>给出一个项目和半成品代码，要求你<b>补全空缺处</b>（流程图完善 + 代码完善），使程序正确运行并<b>保存</b>。红色 # 号后面是注释，那就是出题人递来的“小抄”。</p></div>' +
      '<p style="font-size:12.5px;color:#6b7280">注：题型与分值以当年考试说明为准，此处参照近年河南会考整理。</p>' +
      "</div>";

    /* 考纲考点 */
    h += '<div class="section-title"><h2>🎯 Python 考纲七大考点</h2><span>本站内容全部围绕它们组织</span></div>';
    h += '<div class="grid-2">' +
      miniCard("1", "语言发展与特点", "机器/汇编/高级语言；解释型、简洁、开源、跨平台", "#/chapter/ch1") +
      miniCard("2", "数据类型", "int / float / str / bool；type() 查看", "#/chapter/ch2") +
      miniCard("3", "常量变量与命名", "命名规则、关键字、区分大小写", "#/chapter/ch2") +
      miniCard("4", "运算符与表达式", "算术 / 比较 / 逻辑 / 赋值；优先级", "#/chapter/ch2") +
      miniCard("5", "三大程序结构", "顺序、选择（if）、循环（for/while）", "#/chapter/ch3") +
      miniCard("6", "字符串与列表", "索引与切片、常用方法、列表增删改查排序；元组字典了解", "#/chapter/ch5") +
      miniCard("7", "代码复用", "函数定义、调用、参数、返回值", "#/chapter/ch6", true) +
      "</div>";

    /* 学习路径 */
    h += '<div class="section-title"><h2>🗺️ 学习路径</h2><span>建议按顺序闯关</span></div>';
    h += '<div class="card view-enter"><div class="roadmap">';
    var steps = [
      { n: 1, icon: "🐍", t: "走进 Python", d: "语言特点 + 第一个程序 + 会考形式", href: "#/chapter/ch1" },
      { n: 2, icon: "📦", t: "数据与变量", d: "命名规则、四种类型、运算符、类型转换", href: "#/chapter/ch2" },
      { n: 3, icon: "🔀", t: "顺序与选择结构", d: "if-elif-else、闰年、流程图", href: "#/chapter/ch3" },
      { n: 4, icon: "🔁", t: "循环结构", d: "for/range、while、break/continue、嵌套", href: "#/chapter/ch4" },
      { n: 5, icon: "🔤", t: "字符串与列表", d: "索引切片、常用方法、增删改查", href: "#/chapter/ch5" },
      { n: 6, icon: "🧩", t: "函数", d: "def、参数、return、代码复用", href: "#/chapter/ch6" },
      { n: 7, icon: "🧮", t: "算法专题", d: "会考 14 个常考算法套路全拆解", href: "#/algo" },
      { n: 8, icon: "✏️", t: "刷题中心", d: "50+ 题目即时判分 + 详细解析", href: "#/quiz" },
      { n: 9, icon: "📝", t: "模拟测试", d: "仿真题型 + 倒计时 + 成绩单", href: "#/exam" },
      { n: 10, icon: "🩺", t: "错因诊所", d: "五大错因类型 + 典型案例修正", href: "#/clinic" },
      { n: 11, icon: "📇", t: "速查表", d: "考前一夜扫一遍，稳", href: "#/cheat" }
    ];
    steps.forEach(function (s) {
      h += '<a class="rm-item" href="' + s.href + '">' +
        '<div class="rm-num">' + s.icon + "</div>" +
        '<div class="rm-body"><h4>第' + s.n + "步 · " + s.t + "</h4><p>" + s.d + "</p></div>" +
        '<div class="rm-go">›</div></a>';
    });
    h += "</div></div>";

    /* 学习建议 */
    h += '<div class="section-title"><h2>💡 给新手的三个建议</h2></div>';
    h += '<div class="grid-3">' +
      '<div class="card"><h4>⏱️ 每天 30 分钟</h4><p style="font-size:14px;color:#4b5563">编程是技能不是知识，看十遍不如敲一遍。每天一小节，六章两周能过完。</p></div>' +
      '<div class="card"><h4>✍️ 先猜后看</h4><p style="font-size:14px;color:#4b5563">“看程序写结果”先自己推演再点开答案；错了没关系，错因诊所帮你归因。</p></div>' +
      '<div class="card"><h4>🔁 错题复盘</h4><p style="font-size:14px;color:#4b5563">模拟测试的错题比分数值钱。回到对应章节重学，再回错因诊所对症。</p></div>' +
      "</div>";

    renderSidebar("home");
    app.innerHTML = h;
  }

  function statCard(icon, label, value) {
    return '<div class="card stat-card"><div class="sc-icon">' + icon + '</div>' +
      '<div class="sc-label">' + label + '</div><div class="sc-value">' + value + "</div></div>";
  }
  function miniCard(n, t, d, href, wide) {
    return '<a class="card" href="' + href + '" style="display:block;color:inherit' + (wide ? ";grid-column:1/-1" : "") + '">' +
      '<b style="color:#0f766e">考点 ' + n + "</b><h4>" + t + '</h4>' +
      '<p style="font-size:13px;color:#6b7280;margin-top:4px">' + d + "</p></a>";
  }

  /* ==========================================================
     视图：知识精讲（章目录）
     ========================================================== */
  function renderLearn() {
    var h = '<div class="page-head view-enter"><h1><span class="ph-icon">📖</span>知识精讲</h1>' +
      "<p>六章内容，覆盖会考全部编程考点。每节按“直觉理解 → 语法解析 → 运行原理”三层递进。</p></div>";
    h += '<div class="grid-2">';
    CHAPTERS.forEach(function (c) {
      h += '<a class="card" href="#/chapter/' + c.id + '" style="display:block;color:inherit">' +
        '<div style="display:flex;align-items:center;gap:12px">' +
        '<div class="ch-icon" style="width:46px;height:46px;font-size:23px">' + c.icon + "</div>" +
        "<div><h3 style=\"font-size:17px\">第" + c.num + "章 · " + c.title + "</h3>" +
        '<p style="font-size:13px;color:#6b7280">' + c.goal + "</p></div></div>" +
        '<div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;align-items:center">' +
        '<span class="badge gray">' + c.sections.length + " 节</span>" +
        '<span class="badge gold">难度 ' + "★".repeat(c.stars) + "</span>" +
        (chapterDone(c) ? '<span class="badge green">已完成 ✓</span>' : "") +
        "</div></a>";
    });
    h += "</div>";
    renderSidebar("learn");
    app.innerHTML = h;
  }

  function findChapter(id) {
    for (var i = 0; i < CHAPTERS.length; i++) if (CHAPTERS[i].id === id) return CHAPTERS[i];
    return null;
  }

  /* ==========================================================
     视图：章节详情
     ========================================================== */
  function renderChapter(id, focusSection) {
    var c = findChapter(id);
    if (!c) { renderLearn(); return; }

    var h = '<div class="chapter-head view-enter">' +
      '<div class="ch-icon">' + c.icon + "</div>" +
      '<div class="ch-meta"><h1>第' + c.num + "章 · " + c.title + "</h1>" +
      '<div class="ch-goal">' + c.goal + "</div>" +
      '<div class="ch-badges">' +
      '<span class="badge teal">' + c.sections.length + " 节</span>" +
      '<span class="badge gold">难度 ' + "★".repeat(c.stars) + "</span>" +
      (chapterDone(c) ? '<span class="badge green">本章已完成 ✓</span>' : '<span class="badge gray">未完成</span>') +
      "</div></div></div>";

    c.sections.forEach(function (s, i) {
      var open = !focusSection || focusSection === s.id;
      h += '<div class="lesson' + (open ? "" : " collapsed") + '" data-lesson="' + s.id + '">' +
        '<div class="lesson-head" data-toggle-lesson="' + s.id + '">' +
        '<span class="lh-num">' + (i + 1) + "</span><h2>" + s.title + "</h2>" +
        '<span class="lh-time">约 ' + s.minutes + " 分钟</span>" +
        '<span class="lh-arrow">▼</span></div>' +
        '<div class="lesson-body prose">' + s.html + "</div>" +
        '<div style="padding:0 22px 16px"><span class="learn-check' + (progress[s.id] ? " on" : "") +
        '" data-learn="' + s.id + '">' + (progress[s.id] ? "✓ 已学会" : "○ 标记为已学会") + "</span></div>" +
        "</div>";
    });

    /* 章末小测 */
    var qs = (c.quizIds || []).map(function (qid) {
      return QBANK.choice.filter(function (q) { return q.id === qid; })[0];
    }).filter(Boolean);
    if (qs.length) {
      h += '<div class="card view-enter"><h3 style="margin-bottom:4px">🎯 章末小测</h3>' +
        '<p style="font-size:13.5px;color:#6b7280;margin-bottom:14px">三道选择题检验本章掌握程度，答错没关系，看看解析卡在哪。</p>';
      qs.forEach(function (q) { h += choiceCardHTML(q); });
      h += "</div>";
    }

    /* 上下章导航 */
    var idx = CHAPTERS.indexOf(c);
    h += '<div style="display:flex;justify-content:space-between;margin-top:10px;gap:10px;flex-wrap:wrap">';
    if (idx > 0) h += '<a class="btn btn-ghost" href="#/chapter/' + CHAPTERS[idx - 1].id + '">← 上一章：' + CHAPTERS[idx - 1].title + "</a>";
    else h += "<span></span>";
    if (idx < CHAPTERS.length - 1) h += '<a class="btn btn-primary" href="#/chapter/' + CHAPTERS[idx + 1].id + '">下一章：' + CHAPTERS[idx + 1].title + " →</a>";
    else h += '<a class="btn btn-primary" href="#/algo">前往算法专题 →</a>';
    h += "</div>";

    renderSidebar("chapter", id);
    app.innerHTML = h;
    postProcess();

    if (focusSection) {
      var el = $('[data-lesson="' + focusSection + '"]');
      if (el) setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
    }
  }

  /* ==========================================================
     视图：算法专题
     ========================================================== */
  function renderAlgo(id) {
    var cur = null;
    ALGOS.forEach(function (a) { if (a.id === id) cur = a; });
    if (!cur) cur = ALGOS[0];

    var h = '<div class="page-head view-enter"><h1><span class="ph-icon">🧮</span>算法专题</h1>' +
      "<p>会考常考的 14 个算法套路。每个都按“思路 → 步骤 → 代码 → 易错点”拆解，建议先看思路自己写，再对照代码。</p></div>";

    h += '<div class="algo-grid">';
    ALGOS.forEach(function (a) {
      h += '<div class="algo-card' + (a.id === cur.id ? " on" : "") + '" data-algo="' + a.id + '">' +
        '<div class="ac-top"><span style="font-size:24px">' + a.icon + "</span>" +
        '<span class="ac-stars">' + "<b>" + "★".repeat(a.stars) + "</b>" + "☆".repeat(3 - a.stars) + "</span></div>" +
        '<div class="ac-name">' + a.name + "</div>" +
        '<div class="ac-scene">' + a.scene + "</div>" +
        '<div style="margin-top:8px"><span class="badge ' + (a.tag === "必考" ? "red" : a.tag === "高频" ? "gold" : "teal") + '">' + a.tag + "</span></div>" +
        "</div>";
    });
    h += "</div>";

    h += '<div class="algo-detail view-enter">' +
      '<div class="card"><div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">' +
      '<span style="font-size:34px">' + cur.icon + "</span>" +
      "<div><h2 style=\"font-size:21px\">" + cur.name + "</h2>" +
      '<span class="badge ' + (cur.tag === "必考" ? "red" : cur.tag === "高频" ? "gold" : "teal") + '">' + cur.tag + "</span> " +
      '<span class="badge gray">难度 ' + "★".repeat(cur.stars) + "</span></div></div>" +
      '<div class="ad-sec"><h4>🎬 应用场景</h4><p>' + cur.scene + "</p></div>" +
      '<div class="ad-sec"><h4>💡 思路点拨</h4><p>' + cur.idea + "</p></div>" +
      '<div class="ad-sec"><h4>🪜 解题步骤</h4><ol class="ad-steps">';
    cur.steps.forEach(function (s) { h += "<li>" + s + "</li>"; });
    h += "</ol></div>" +
      '<div class="ad-sec"><h4>💻 参考代码</h4>' + codeHTML(cur.code, "python · " + cur.name) + "</div>" +
      '<div class="ad-sec"><h4>⚠️ 易错点</h4><ul>';
    cur.traps.forEach(function (t) { h += "<li>" + t + "</li>"; });
    h += "</ul></div>" +
      '<div class="ad-sec"><h4>🔁 变式拓展</h4><p>' + cur.variant + "</p></div>" +
      "</div></div>";

    /* 详情页底部翻页：在全部算法间前后切换 */
    var ai = ALGOS.indexOf(cur);
    h += '<nav class="algo-pager" aria-label="算法翻页">';
    if (ai > 0) {
      h += '<a class="ap-btn ap-prev" href="#/algo/' + ALGOS[ai - 1].id + '" rel="prev">' +
        '<span class="ap-dir">← 上一个</span><span class="ap-name">' + ALGOS[ai - 1].name + "</span></a>";
    } else {
      h += '<span class="ap-btn ap-prev is-off" aria-disabled="true"><span class="ap-dir">← 上一个</span><span class="ap-name">已是第一篇</span></span>';
    }
    h += '<span class="ap-pos">第 ' + (ai + 1) + " / " + ALGOS.length + " 篇</span>";
    if (ai < ALGOS.length - 1) {
      h += '<a class="ap-btn ap-next" href="#/algo/' + ALGOS[ai + 1].id + '" rel="next">' +
        '<span class="ap-dir">下一个 →</span><span class="ap-name">' + ALGOS[ai + 1].name + "</span></a>";
    } else {
      h += '<span class="ap-btn ap-next is-off" aria-disabled="true"><span class="ap-dir">下一个 →</span><span class="ap-name">已是最后一篇</span></span>';
    }
    h += "</nav>";

    renderSidebar("algo", cur.id);
    app.innerHTML = h;
    postProcess();

    /* 带 ID 进入（侧栏链接 / 卡片点击）时，平滑滚动到详情区，点击条目即可看到对应内容 */
    if (id) {
      var ad = $(".algo-detail");
      if (ad) setTimeout(function () { ad.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
    }
  }

  /* ==========================================================
     视图：刷题中心
     ========================================================== */
  var QUIZ_TYPES = [
    { key: "choice", label: "选择题", icon: "🔘" },
    { key: "judge", label: "判断题", icon: "⚖️" },
    { key: "read", label: "程序阅读", icon: "👀" },
    { key: "fill", label: "程序填空", icon: "✍️" },
    { key: "code", label: "编程题", icon: "💻" }
  ];

  function renderQuiz(filter) {
    var totalCount = QBANK.choice.length + QBANK.judge.length + QBANK.read.length + QBANK.fill.length + QBANK.code.length;
    var h = '<div class="page-head view-enter"><h1><span class="ph-icon">✏️</span>刷题中心</h1>' +
      "<p>即时判分 + 详细解析。做错恰恰是赚到——解析会告诉你错在哪一类、怎么想。</p></div>";

    h += '<div class="q-stats">' +
      '<div class="q-stat"><b>' + quizStats.done + "</b>已练习题</div>" +
      '<div class="q-stat"><b>' + quizStats.right + "</b>答对</div>" +
      '<div class="q-stat"><b>' + (quizStats.done ? Math.round(quizStats.right / quizStats.done * 100) : 0) + "%</b>正确率</div>" +
      '<div class="q-stat"><b>' + totalCount + "</b>题库总量</div>" +
      "</div>";

    h += '<div class="quiz-filters">';
    h += '<button class="qf-chip' + (!filter ? " on" : "") + '" data-filter="">📚 全部</button>';
    QUIZ_TYPES.forEach(function (t) {
      h += '<button class="qf-chip' + (filter === t.key ? " on" : "") + '" data-filter="' + t.key + '">' + t.icon + " " + t.label + "（" + QBANK[t.key].length + "）</button>";
    });
    h += "</div>";

    var showTypes = filter ? [filter] : ["choice", "judge", "read", "fill", "code"];
    QUIZ_TYPES.forEach(function (t) {
      if (showTypes.indexOf(t.key) < 0) return;
      h += '<div class="section-title"><h2>' + t.icon + " " + t.label + '</h2><span>' + QBANK[t.key].length + " 题</span></div>";
      QBANK[t.key].forEach(function (q) {
        if (t.key === "choice") h += choiceCardHTML(q);
        else if (t.key === "judge") h += judgeCardHTML(q);
        else if (t.key === "read") h += readCardHTML(q);
        else if (t.key === "fill") h += fillCardHTML(q);
        else h += codeCardHTML(q);
      });
    });

    renderSidebar("quiz", filter);
    app.innerHTML = h;
    postProcess();
  }

  /* ---------- 题目卡片 ---------- */
  function qTopHTML(q, typeName, extra) {
    return '<div class="q-top">' +
      '<span class="badge teal">' + typeName + "</span>" +
      '<span class="badge gray">' + esc(q.topic) + "</span>" +
      '<span class="badge gold">' + DIFF_STARS[q.diff] + " " + DIFF[q.diff] + "</span>" +
      (extra || "") +
      '<span class="q-id">#' + q.id + "</span></div>";
  }
  /* 题干渲染：保留原始换行与缩进（.q-text 配 white-space:pre-wrap，
     若用 <br> 替换换行，HTML 会折叠前导空格导致代码缩进丢失） */
  function qText(s) { return esc(s); }

  function choiceCardHTML(q) {
    var h = '<div class="q-card" data-q="' + q.id + '" data-type="choice">' + qTopHTML(q, "选择题") +
      '<div class="q-text">' + qText(q.q) + "</div>" +
      '<div class="q-opts">';
    var letters = ["A", "B", "C", "D"];
    q.options.forEach(function (o, i) {
      h += '<button class="q-opt" data-i="' + i + '"><span class="opt-letter">' + letters[i] + "</span><span>" + esc(o) + '</span><span class="opt-mark"></span></button>';
    });
    h += "</div>" +
      '<div class="q-explain"><div class="qe-title">解析</div>' + esc(q.explain) + "</div></div>";
    return h;
  }

  function judgeCardHTML(q) {
    var h = '<div class="q-card" data-q="' + q.id + '" data-type="judge">' + qTopHTML(q, "判断题") +
      '<div class="q-text">' + esc(q.q) + "</div>" +
      '<div class="q-opts" style="flex-direction:row">' +
      '<button class="q-opt" data-i="1" style="flex:1"><span class="opt-letter">✓</span><span>正确</span><span class="opt-mark"></span></button>' +
      '<button class="q-opt" data-i="0" style="flex:1"><span class="opt-letter">✗</span><span>错误</span><span class="opt-mark"></span></button>' +
      "</div>" +
      '<div class="q-explain"><div class="qe-title">解析</div>' + esc(q.explain) + "</div></div>";
    return h;
  }

  function readCardHTML(q) {
    return '<div class="q-card" data-q="' + q.id + '" data-type="read">' + qTopHTML(q, "程序阅读") +
      '<div class="q-text">' + esc(q.title) + "</div>" +
      codeHTML(q.code, "python · 读程序") +
      '<div class="rq-prompt">🔍 苏格拉底提问：先别看答案——把变量每轮的变化写在纸上，再点开推演过程核对。</div>' +
      '<div class="q-reveal"><button class="btn btn-ghost btn-sm reveal-btn" data-reveal="read">👀 显示答案与推演</button>' +
      '<div class="read-answer"><div style="font-size:13px;color:#15803d;font-weight:700">运行结果</div>' +
      '<div class="ra-val">' + esc(q.answer) + "</div>" +
      '<div style="font-size:13px;color:#15803d;font-weight:700;margin-top:8px">逐步推演</div><ol>' +
      q.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") +
      "</ol></div></div></div>";
  }

  function fillCardHTML(q) {
    var blankIdx = 0;
    var lines = q.code.split("\n").map(function (line) {
      if (line.indexOf("____") >= 0) {
        var parts = line.split("____");
        var inner = "";
        parts.forEach(function (p, i) {
          inner += esc(p);
          if (i < parts.length - 1) {
            inner += '<input class="fill-blank" data-blank="' + (blankIdx++) + '" placeholder="?" spellcheck="false">';
          }
        });
        return '<div class="fill-code-line">' + inner + "</div>";
      }
      return '<div class="fill-code-line">' + esc(line) + "</div>";
    }).join("");
    return '<div class="q-card" data-q="' + q.id + '" data-type="fill">' + qTopHTML(q, "程序填空") +
      '<div class="q-text">' + esc(q.title) + "</div>" +
      '<div class="codeblock"><div class="cb-head"><span>python · 补全代码</span></div><pre style="padding:13px 16px">' + lines + "</pre></div>" +
      '<div class="q-reveal" style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">' +
      '<button class="btn btn-primary btn-sm fill-check" data-q="' + q.id + '">检查答案</button>' +
      '<button class="btn btn-ghost btn-sm fill-show" data-q="' + q.id + '">显示答案</button></div>' +
      '<div class="q-explain"><div class="qe-title">解析</div>' + esc(q.explain) + "</div></div>";
  }

  function codeCardHTML(q) {
    return '<div class="q-card" data-q="' + q.id + '" data-type="code">' + qTopHTML(q, "编程题") +
      '<div class="q-text">' + esc(q.title) + "</div>" +
      '<p style="font-size:14.5px;margin-bottom:10px">' + esc(q.desc) + "</p>" +
      '<div class="q-reveal" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">' +
      '<button class="btn btn-ghost btn-sm reveal-btn" data-reveal="hint">💡 查看思路提示</button>' +
      '<button class="btn btn-ghost btn-sm reveal-btn" data-reveal="sol">✅ 查看参考答案</button></div>' +
      '<div class="read-answer" style="display:none;background:#fffbeb;border-color:#fde68a"><div style="font-size:13px;color:#92400e;font-weight:700">思路提示</div><ul style="margin:6px 0 0 20px;font-size:14px">' +
      q.hints.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="read-answer" style="display:none"><div style="font-size:13px;color:#15803d;font-weight:700">参考答案</div>' +
      codeHTML(q.solution, "python · 参考解法") + "</div></div>";
  }

  /* ---------- 章节内嵌小测 ---------- */
  function renderMinis(container) {
    $$("[data-mini]", container).forEach(function (box) {
      var m = MINIS[box.getAttribute("data-mini")];
      if (!m) return;
      var h = '<div class="mq-q"><span class="mq-tag">随堂小测</span>' + esc(m.q) + "</div>";
      if (m.type === "choice") {
        h += '<div class="q-opts">';
        var letters = ["A", "B", "C", "D"];
        m.options.forEach(function (o, i) {
          h += '<button class="q-opt" data-mini-i="' + i + '"><span class="opt-letter">' + letters[i] + "</span><span>" + esc(o) + '</span><span class="opt-mark"></span></button>';
        });
        h += "</div>";
        h += '<div class="q-explain"><div class="qe-title">解析</div>' + esc(m.explain) + "</div>";
        box.innerHTML = h;
        box.dataset.miniAnswer = m.answer;
      } else {
        h += codeHTML(m.code, "python · 小测") +
          '<div class="q-reveal" style="margin-top:8px"><button class="btn btn-ghost btn-sm reveal-btn" data-reveal="read">👀 显示答案与推演</button>' +
          '<div class="read-answer"><div class="ra-val">' + esc(m.answer) + "</div><ol>" +
          m.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></div></div>";
        box.innerHTML = h;
      }
    });
  }

  /* ---------- 全局后处理 ---------- */
  function postProcess() {
    renderMinis(app);
  }

  /* ==========================================================
     刷题交互（事件委托）
     ========================================================== */
  function handleChoiceAnswer(card, idx) {
    if (card.classList.contains("locked")) return;
    var type = card.getAttribute("data-type");
    var id = card.getAttribute("data-q");
    var q = null;
    if (type === "choice") q = QBANK.choice.filter(function (x) { return x.id === id; })[0];
    else if (type === "judge") q = QBANK.judge.filter(function (x) { return x.id === id; })[0];
    if (!q) return;

    var isMini = false;
    if (!q) {
      var box = card.closest("[data-mini-answer]");
      if (!box) return;
      isMini = true;
    }

    var correct = type === "judge" ? (idx === 1) === q.answer : idx === q.answer;
    card.classList.add("locked");
    $$(".q-opt", card).forEach(function (btn) {
      btn.classList.add("locked");
      var bi = parseInt(btn.getAttribute("data-i"), 10);
      var isAns = type === "judge" ? (bi === 1) === q.answer : bi === q.answer;
      if (isAns) { btn.classList.add("correct"); $(".opt-mark", btn).textContent = "✓ 正确答案"; }
      if (bi === idx && !correct) { btn.classList.add("wrong"); $(".opt-mark", btn).textContent = "✗ 你的选择"; }
    });
    var ex = $(".q-explain", card);
    if (ex) {
      ex.classList.add("show");
      ex.classList.add(correct ? "ok" : "bad");
      var title = $(".qe-title", ex);
      if (title) {
        title.textContent = correct ? "🎉 回答正确！" : "💡 回答错误，看看解析";
        title.classList.add(correct ? "ok" : "bad");
      }
    }
    if (!isMini) {
      quizStats.done++;
      if (correct) quizStats.right++;
      store.set("quizStats", quizStats);
      refreshStatsBar();
    }
  }

  function handleMiniAnswer(box, idx) {
    var ans = parseInt(box.getAttribute("data-mini-answer"), 10);
    var correct = idx === ans;
    $$(".q-opt", box).forEach(function (btn) {
      btn.classList.add("locked");
      var bi = parseInt(btn.getAttribute("data-mini-i"), 10);
      if (bi === ans) { btn.classList.add("correct"); $(".opt-mark", btn).textContent = "✓ 正确答案"; }
      if (bi === idx && !correct) { btn.classList.add("wrong"); $(".opt-mark", btn).textContent = "✗ 你的选择"; }
    });
    var ex = $(".q-explain", box);
    if (ex) {
      ex.classList.add("show");
      ex.classList.add(correct ? "ok" : "bad");
      var title = $(".qe-title", ex);
      if (title) {
        title.textContent = correct ? "🎉 回答正确！" : "💡 回答错误，看看解析";
        title.classList.add(correct ? "ok" : "bad");
      }
    }
  }

  function refreshStatsBar() {
    var bars = $$(".q-stats .q-stat");
    if (bars.length >= 3) {
      bars[0].innerHTML = "<b>" + quizStats.done + "</b>已练习题";
      bars[1].innerHTML = "<b>" + quizStats.right + "</b>答对";
      bars[2].innerHTML = "<b>" + (quizStats.done ? Math.round(quizStats.right / quizStats.done * 100) : 0) + "%</b>正确率";
    }
  }

  function handleFillCheck(card, showOnly) {
    var id = card.getAttribute("data-q");
    var q = QBANK.fill.filter(function (x) { return x.id === id; })[0];
    if (!q) return;
    var inputs = $$(".fill-blank", card);
    var allOk = true;
    inputs.forEach(function (inp) {
      var bi = parseInt(inp.getAttribute("data-blank"), 10);
      var ok = norm(inp.value) === norm(q.answers[bi]);
      inp.classList.remove("ok", "bad");
      inp.classList.add(ok ? "ok" : "bad");
      if (!ok) allOk = false;
      if (showOnly) inp.value = q.answers[bi];
    });
    var ex = $(".q-explain", card);
    if (ex) {
      ex.classList.add("show");
      ex.classList.add(allOk ? "ok" : "bad");
      var title = $(".qe-title", ex);
      if (title) {
        title.textContent = showOnly ? "📖 参考答案已填入" : (allOk ? "🎉 全部正确！" : "💡 有错误，红色为空缺处");
        title.classList.add(allOk ? "ok" : "bad");
      }
    }
    if (!showOnly) {
      quizStats.done += inputs.length;
      quizStats.right += inputs.filter(function (i) { return i.classList.contains("ok"); }).length;
      store.set("quizStats", quizStats);
      refreshStatsBar();
    }
  }

  /* ==========================================================
     模拟测试引擎
     ========================================================== */
  var exam = null;   // 考试状态
  var examTimer = null;

  function buildExam() {
    var choice = shuffle(QBANK.choice).slice(0, 20).map(function (q) {
      return { kind: "choice", q: q, ans: null };
    });
    var judge = shuffle(QBANK.judge).slice(0, 5).map(function (q) {
      return { kind: "judge", q: q, ans: null };
    });
    var read = shuffle(QBANK.read).slice(0, 2).map(function (q) {
      return { kind: "read", q: q, ans: "" };
    });
    var fill = shuffle(QBANK.fill).slice(0, 2).map(function (q) {
      return { kind: "fill", q: q, ans: [] };
    });
    var code = shuffle(QBANK.code).slice(0, 1).map(function (q) {
      return { kind: "code", q: q, ans: "" };
    });
    var items = choice.concat(judge).concat(read).concat(fill).concat(code);
    return {
      items: items,
      cur: 0,
      remain: 45 * 60,
      submitted: false,
      self: {}   // 主观题自评 { index: true }
    };
  }

  function examAnswered(item) {
    if (item.kind === "choice" || item.kind === "judge") return item.ans !== null;
    if (item.kind === "fill") return item.ans.some(function (v) { return norm(v) !== ""; });
    return norm(item.ans) !== "";
  }

  function examAnsweredCount() {
    return exam.items.filter(examAnswered).length;
  }

  function renderExam() {
    if (!exam || exam.submitted) { renderExamIntro(); return; }
    renderExamPaper();
  }

  function renderExamIntro() {
    var h = '<div class="page-head view-enter"><h1><span class="ph-icon">📝</span>模拟测试</h1>' +
      "<p>仿真题型与分值，随机抽题。建议在安静环境下限时完成，把它当成一次正式演习。</p></div>";

    h += '<div class="card exam-hero">' +
      '<div class="eh-icon">📋</div><h2>模拟卷结构（满分 100 分）</h2>' +
      '<p>选择题 20 题 × 2 分 + 判断题 5 题 × 2 分 + 程序阅读 2 题 × 5 分 + 程序填空 2 题 × 5 分 + 编程题 1 题 × 30 分，建议用时 45 分钟。</p>' +
      '<div class="table-wrap" style="text-align:left;max-width:640px;margin:0 auto 18px"><table class="tb">' +
      "<tr><th>题型</th><th>题量</th><th>分值</th></tr>" +
      "<tr><td>单项选择题</td><td>20</td><td>40</td></tr>" +
      "<tr><td>理解判断题</td><td>5</td><td>10</td></tr>" +
      "<tr><td>程序阅读题</td><td>2</td><td>10</td></tr>" +
      "<tr><td>程序填空题</td><td>2</td><td>10</td></tr>" +
      "<tr><td>编程题</td><td>1</td><td>30</td></tr>" +
      "</table></div>" +
      '<div class="box box-warn" style="text-align:left"><div class="box-title">⚠️ 交卷规则</div>' +
      "<p>选择/判断题由系统自动判分；程序阅读、填空、编程题交卷后显示参考答案，由你诚实地自评计分。合格性考试按排名比例定级，本分数仅供练习参考。</p></div>" +
      '<button class="btn btn-primary" data-action="start-exam" style="font-size:16px;padding:12px 34px">🚀 开始模拟测试</button>' +
      "</div>";

    renderSidebar("exam");
    app.innerHTML = h;
  }

  function selfCheckHTML(i) {
    return '<label class="exam-self"><input type="checkbox" data-self="' + i + '"' + (exam.self[i] ? " checked" : "") +
      "> 我认为本题做对了（交卷时按此自评计分）</label>";
  }

  function renderExamPaper() {
    var item = exam.items[exam.cur];
    var h = "";

    /* 顶栏 */
    h += '<div class="exam-bar">' +
      '<span style="font-weight:700">📝 模拟测试</span>' +
      '<span class="exam-timer' + (exam.remain < 300 ? " urgent" : "") + '" id="examTimer">' + fmtTime(exam.remain) + "</span>" +
      '<span class="exam-progress-text">已完成 ' + examAnsweredCount() + " / " + exam.items.length + " 题</span>" +
      '<div class="exam-palette">';
    exam.items.forEach(function (it, i) {
      h += '<button class="ep-cell' + (examAnswered(it) ? " answered" : "") + (i === exam.cur ? " current" : "") +
        '" data-ep="' + i + '">' + (i + 1) + "</button>";
    });
    h += "</div>" +
      '<button class="btn btn-red btn-sm" data-action="submit-exam">交卷</button></div>';

    /* 题目卡片 */
    var q = item.q;
    var kindName = { choice: "单项选择题", judge: "判断题", read: "程序阅读题", fill: "程序填空题", code: "编程题" }[item.kind];
    var score = { choice: 2, judge: 2, read: 5, fill: 5, code: 30 }[item.kind];
    h += '<div class="q-card view-enter">' + qTopHTML(q, kindName + " · " + score + "分") +
      '<div class="q-text">' + qText(q.q) + "</div>";

    if (item.kind === "choice") {
      h += '<div class="q-opts">';
      var letters = ["A", "B", "C", "D"];
      q.options.forEach(function (o, i) {
        h += '<button class="q-opt exam-opt' + (item.ans === i ? " correct" : "") + '" data-exam-i="' + i + '"><span class="opt-letter">' + letters[i] + "</span><span>" + esc(o) + '</span><span class="opt-mark">' + (item.ans === i ? "✓ 已选" : "") + "</span></button>";
      });
      h += "</div>";
    } else if (item.kind === "judge") {
      h += '<div class="q-opts" style="flex-direction:row">' +
        '<button class="q-opt exam-opt' + (item.ans === 1 ? " correct" : "") + '" data-exam-i="1" style="flex:1"><span class="opt-letter">✓</span><span>正确</span><span class="opt-mark">' + (item.ans === 1 ? "✓ 已选" : "") + "</span></button>" +
        '<button class="q-opt exam-opt' + (item.ans === 0 ? " correct" : "") + '" data-exam-i="0" style="flex:1"><span class="opt-letter">✗</span><span>错误</span><span class="opt-mark">' + (item.ans === 0 ? "✓ 已选" : "") + "</span></button>" +
        "</div>";
    } else if (item.kind === "read") {
      h += codeHTML(q.code, "python · 读程序写结果") +
        '<p style="font-size:13.5px;color:#6b7280;margin:10px 0 6px">在下面写下你的推演结果：</p>' +
        '<textarea class="exam-textarea" data-exam-text="read" placeholder="写下运行结果…">' + esc(item.ans) + "</textarea>" +
        selfCheckHTML(exam.cur);
    } else if (item.kind === "fill") {
      var blankIdx = 0;
      var lines = q.code.split("\n").map(function (line) {
        if (line.indexOf("____") >= 0) {
          var parts = line.split("____");
          var inner = "";
          parts.forEach(function (p, i) {
            inner += esc(p);
            if (i < parts.length - 1) {
              inner += '<input class="fill-blank" data-exam-blank="' + (blankIdx++) + '" value="' + esc(item.ans[blankIdx - 1] || "") + '" placeholder="?" spellcheck="false">';
            }
          });
          return '<div class="fill-code-line">' + inner + "</div>";
        }
        return '<div class="fill-code-line">' + esc(line) + "</div>";
      }).join("");
      h += '<div class="codeblock"><div class="cb-head"><span>python · 补全代码</span></div><pre style="padding:13px 16px">' + lines + "</pre></div>" +
        selfCheckHTML(exam.cur);
    } else {
      h += '<p style="font-size:14.5px;margin-bottom:10px">' + esc(q.desc) + "</p>" +
        '<textarea class="exam-textarea" data-exam-text="code" placeholder="在这里写你的 Python 代码…" style="min-height:180px">' + esc(item.ans) + "</textarea>" +
        selfCheckHTML(exam.cur);
    }
    h += "</div>";

    /* 导航 */
    h += '<div class="exam-nav">' +
      (exam.cur > 0 ? '<button class="btn btn-ghost" data-action="exam-prev">← 上一题</button>' : "<span></span>") +
      (exam.cur < exam.items.length - 1 ? '<button class="btn btn-primary" data-action="exam-next">下一题 →</button>' : '<button class="btn btn-red" data-action="submit-exam">📤 交卷</button>') +
      "</div>";

    app.innerHTML = h;
  }

  function startExamTimer() {
    if (examTimer) clearInterval(examTimer);
    examTimer = setInterval(function () {
      if (!exam || exam.submitted) { clearInterval(examTimer); return; }
      exam.remain--;
      var t = $("#examTimer");
      if (t) {
        t.textContent = fmtTime(exam.remain);
        t.classList.toggle("urgent", exam.remain < 300);
      }
      if (exam.remain <= 0) submitExam(true);
    }, 1000);
  }

  function submitExam(timeUp) {
    if (!exam || exam.submitted) return;
    exam.submitted = true;
    if (examTimer) clearInterval(examTimer);

    var auto = 0, autoMax = 0;
    var subj = 0, subjMax = 0;
    var detail = [];

    exam.items.forEach(function (it, i) {
      if (it.kind === "choice") {
        autoMax += 2;
        var ok = it.ans === it.q.answer;
        if (ok) auto += 2;
        detail.push({ i: i, kind: "choice", ok: ok, q: it.q, yours: it.q.options[it.ans] || "（未作答）", right: it.q.options[it.q.answer], explain: it.q.explain });
      } else if (it.kind === "judge") {
        autoMax += 2;
        var okj = (it.ans === 1) === it.q.answer;
        if (okj) auto += 2;
        detail.push({ i: i, kind: "judge", ok: okj, q: it.q, yours: it.ans === null ? "（未作答）" : (it.ans === 1 ? "正确" : "错误"), right: it.q.answer ? "正确" : "错误", explain: it.q.explain });
      } else if (it.kind === "read") {
        subjMax += 5;
        var okr = norm(it.ans) === norm(it.q.answer);
        detail.push({ i: i, kind: "read", ok: okr, q: it.q, yours: it.ans || "（未作答）", right: it.q.answer, explain: "对照逐步推演检查自己的过程。", self: !!exam.self[i] });
        if (exam.self[i]) subj += okr ? 5 : 0;
      } else if (it.kind === "fill") {
        subjMax += 5;
        var okf = it.q.answers.every(function (a, bi) { return norm(it.ans[bi]) === norm(a); }) && it.ans.filter(function (v) { return norm(v) !== ""; }).length === it.q.answers.length;
        detail.push({ i: i, kind: "fill", ok: okf, q: it.q, yours: it.ans.join(" | ") || "（未作答）", right: it.q.answers.join(" | "), explain: it.q.explain, self: !!exam.self[i] });
        if (exam.self[i]) subj += okf ? 5 : 0;
      } else {
        subjMax += 30;
        detail.push({ i: i, kind: "code", ok: null, q: it.q, yours: it.ans || "（未作答）", right: q_solution(it.q), explain: "对照参考答案检查：结构、缩进、边界都对吗？", self: !!exam.self[i] });
        if (exam.self[i]) subj += 30;
      }
    });

    var total = auto + subj;
    var level = total >= 90 ? "优秀" : total >= 75 ? "良好" : total >= 60 ? "合格" : "仍需努力";
    var desc = total >= 90 ? "稳了！保持这个手感上考场。" :
      total >= 75 ? "很不错，薄弱点补一补还能上一个台阶。" :
      total >= 60 ? "基本合格，错题对应的章节请回去重学。" :
      "别慌，从第一章开始跟着站点重新过一遍，来得及。";

    /* 成绩入档，供学习进度页展示（最多保留最近 20 次） */
    var examHistory = store.get("examHistory", []);
    examHistory.unshift({
      total: total, level: level, auto: auto, autoMax: autoMax,
      subj: subj, subjMax: subjMax, count: exam.items.length,
      timeUp: !!timeUp, date: new Date().toISOString()
    });
    if (examHistory.length > 20) examHistory = examHistory.slice(0, 20);
    store.set("examHistory", examHistory);

    var h = '<div class="page-head view-enter"><h1><span class="ph-icon">📊</span>成绩单</h1>' +
      "<p>" + (timeUp ? "⏰ 时间到，系统已自动交卷。" : "考试结束，以下是你的战绩。") + "</p></div>";

    h += '<div class="card score-card">' +
      '<div class="score-num">' + total + "<small> / 100 分</small></div>" +
      '<div class="score-level">' + level + "</div>" +
      '<div class="score-desc">' + desc + "</div>" +
      '<div class="score-grid">' +
      '<div class="score-item"><b>' + auto + " / " + autoMax + "</b>客观题（系统判分）</div>" +
      '<div class="score-item"><b>' + subj + " / " + subjMax + "</b>主观题（自评计分）</div>" +
      '<div class="score-item"><b>' + exam.items.length + " 题</b>题量规模</div>" +
      '<div class="score-item"><b>45 : 00</b>规定时长</div>' +
      "</div>" +
      '<p style="font-size:12.5px;color:#6b7280;margin-bottom:14px">合格性考试按考生比例划分 A~E 等级，此分数仅作练习参考，不必当真，错题才是指路明灯。</p>' +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
      '<button class="btn btn-primary" data-action="start-exam">🔁 再测一次</button>' +
      '<a class="btn btn-ghost" href="#/quiz">✏️ 去刷题中心</a>' +
      '<a class="btn btn-ghost" href="#/clinic">🩺 错因诊所</a>' +
      "</div></div>";

    /* 逐题回顾 */
    h += '<div class="section-title"><h2>📖 逐题回顾</h2><span>做对的也值得看一眼解析</span></div>';
    var kindName = { choice: "选择题", judge: "判断题", read: "程序阅读", fill: "程序填空", code: "编程题" };
    detail.forEach(function (d) {
      var badge = d.kind === "code" ? '<span class="badge gold">待自评</span>' : (d.ok ? '<span class="badge green">✓ 正确</span>' : '<span class="badge red">✗ 错误</span>');
      h += '<div class="q-card" style="margin-bottom:12px">' +
        '<div class="q-top"><span class="badge teal">第 ' + (d.i + 1) + " 题 · " + kindName[d.kind] + "</span>" + badge + "</div>" +
        '<div class="q-text">' + qText(d.q.q) + "</div>" +
        '<div style="font-size:14px;margin-bottom:8px"><b>你的答案：</b>' + esc(d.yours) + "<br><b>正确答案：</b>" + esc(d.right) + "</div>" +
        (d.kind === "read" || d.kind === "fill" || d.kind === "code" ? '<label style="display:flex;align-items:center;gap:8px;font-size:14px;margin-bottom:8px;cursor:pointer"><input type="checkbox" disabled' + (d.self ? " checked" : "") + "> 本题勾选了自评" + (d.self ? "" : "（未勾选不计分）") + "</label>" : "") +
        '<div class="q-explain show"><div class="qe-title">解析</div>' + esc(d.explain) + "</div>" +
        (d.kind === "read" ? "<ol style='margin:8px 0 0 20px;font-size:13.5px;color:#4b5563'>" + d.q.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" : "") +
        (d.kind === "code" ? '<div style="margin-top:8px">' + codeHTML(d.right, "python · 参考答案") + "</div>" : "") +
        "</div>";
    });

    renderSidebar("exam");
    app.innerHTML = h;
    postProcess();
  }

  function q_solution(q) { return q.solution; }

  /* ==========================================================
     视图：错因诊所
     ========================================================== */
  function renderClinic(typeFilter) {
    var h = '<div class="page-head view-enter"><h1><span class="ph-icon">🩺</span>错因诊所</h1>' +
      "<p>初学者的错误高度集中——五大类型占了几乎全部。看懂一个病例，避开一类坑。</p></div>";

    h += '<div class="clinic-summary">';
    CLINIC_TYPES.forEach(function (t) {
      h += '<div class="card cs-item"><div class="cs-pct" style="color:' + t.color + '">' + t.ratio + "%</div>" +
        '<div class="cs-name">' + t.icon + " " + t.name + "</div>" +
        '<div class="cs-bar"><i style="width:' + t.ratio + "%;background:" + t.color + '"></i></div></div>';
    });
    h += "</div>";

    var cases = CLINIC;
    if (typeFilter) cases = CLINIC.filter(function (c) { return c.type === typeFilter; });

    cases.forEach(function (c, i) {
      var t = CLINIC_TYPES.filter(function (x) { return x.name === c.type; })[0];
      h += '<div class="case' + (i === 0 ? " open" : "") + '">' +
        '<div class="case-head"><span class="case-icon">' + c.icon + "</span><h3>" + c.title + "</h3>" +
        '<span class="badge gray">' + c.type + "</span>" +
        '<span class="case-toggle">▼</span></div>' +
        '<div class="case-body">' +
        '<div class="diff-wrap">' +
        '<div class="diff-box bad"><div class="db-head">✗ 错误写法</div><pre>' + esc(c.wrong) + "</pre></div>" +
        '<div class="diff-box good"><div class="db-head">✓ 正确写法</div><pre>' + esc(c.right) + "</pre></div>" +
        "</div>" +
        '<div class="case-cause"><b>错因分析：</b>' + esc(c.cause) + "</div>" +
        '<div class="case-tip">' + esc(c.tip) + "</div>" +
        "</div></div>";
    });

    renderSidebar("clinic", typeFilter || "");
    app.innerHTML = h;
  }

  /* ==========================================================
     视图：速查表
     ========================================================== */
  var cheatTab = 0;
  function renderCheat(tabIdx) {
    if (tabIdx !== "" && tabIdx != null) cheatTab = parseInt(tabIdx, 10) || 0;
    var h = '<div class="page-head view-enter"><h1><span class="ph-icon">📇</span>考前速查表</h1>' +
      "<p>考前一夜、进考场前五分钟，翻这个就够了。</p></div>";
    h += '<div class="cheat-tabs">';
    CHEAT.forEach(function (c, i) {
      h += '<button class="ct-chip' + (i === cheatTab ? " on" : "") + '" data-ct="' + i + '">' + c.icon + " " + c.tab + "</button>";
    });
    h += "</div>";
    h += '<div class="card prose view-enter">' + CHEAT[cheatTab].html + "</div>";
    renderSidebar("cheat");
    app.innerHTML = h;
  }

  /* ==========================================================
     视图：学习进度
     ========================================================== */
  function sectionTotal() {
    var n = 0;
    CHAPTERS.forEach(function (c) { n += c.sections.length; });
    return n;
  }

  function renderProgress() {
    var totalSec = sectionTotal();
    var doneSec = 0, doneCh = 0, weakCh = null, weakDone = 1e9;
    CHAPTERS.forEach(function (c) {
      var d = 0;
      c.sections.forEach(function (s) { if (progress[s.id]) d++; });
      doneSec += d;
      if (d === c.sections.length) doneCh++;
      if (d < weakDone) { weakDone = d; weakCh = c; }
    });
    var acc = quizStats.done ? Math.round(quizStats.right / quizStats.done * 100) : 0;
    var examHistory = store.get("examHistory", []);
    var best = examHistory.reduce(function (m, e) { return Math.max(m, e.total); }, 0);

    var h = '<div class="page-head view-enter"><h1><span class="ph-icon">📊</span>学习进度</h1>' +
      "<p>数据只存在你自己的浏览器里，关掉页面也不会丢。定期回来看看，比埋头刷题更重要。</p></div>";

    /* ---- 总览 ---- */
    h += '<div class="pg-stats view-enter">' +
      '<div class="card pg-stat"><b>' + doneSec + " / " + totalSec + '</b><span>已学课时</span></div>' +
      '<div class="card pg-stat"><b>' + doneCh + " / " + CHAPTERS.length + '</b><span>完成章节</span></div>' +
      '<div class="card pg-stat"><b>' + acc + "%</b><span>刷题正确率（" + quizStats.done + " 题）</span></div>" +
      '<div class="card pg-stat"><b>' + examHistory.length + " 次</b><span>模拟考试" + (best ? " · 最好 " + best + " 分" : "") + "</span></div>" +
      "</div>";

    /* ---- 分章节进度 ---- */
    h += '<div class="section-title"><h2>📚 章节完成度</h2><span>绿色铺满即通关</span></div>';
    h += '<div class="card view-enter">';
    CHAPTERS.forEach(function (c) {
      var d = 0;
      c.sections.forEach(function (s) { if (progress[s.id]) d++; });
      var pct = Math.round(d / c.sections.length * 100);
      var full = d === c.sections.length;
      h += '<a class="pg-ch" href="#/chapter/' + c.id + '">' +
        '<div class="pg-ch-head"><span>' + c.icon + " 第" + c.num + "章 · " + c.title + "</span>" +
        "<span>" + (full ? "✓ 已完成" : d + "/" + c.sections.length) + "</span></div>" +
        '<div class="pg-bar"><div class="pg-bar-fill' + (full ? " full" : "") + '" style="width:' + pct + '%"></div></div></a>';
    });
    h += "</div>";

    /* ---- 下一步建议 ---- */
    var tips = [];
    if (doneSec === 0) tips.push({ icon: "📖", text: "还没开始系统学习，从<b>第1章</b>跟着走，每天一节，两周就能过完一遍。", href: "#/chapter/ch1", cta: "从第1章开始" });
    if (quizStats.done < 20) tips.push({ icon: "✏️", text: "刷题量还不到 20 题，会考选择题量很大，建议<b>每天 10 题</b>保持手感。", href: "#/quiz", cta: "去刷题" });
    if (quizStats.done >= 20 && acc < 60) tips.push({ icon: "🩺", text: "正确率 " + acc + "%，低于 60% 说明错因集中在几个老坑，去<b>错因诊所</b>对症下药。", href: "#/clinic", cta: "看错因诊所" });
    if (examHistory.length === 0) tips.push({ icon: "📝", text: "还没经历过一次完整模拟考，45 分钟限时训练最能暴露问题。", href: "#/exam", cta: "开始模拟测试" });
    if (weakCh && weakDone < weakCh.sections.length) tips.push({ icon: "🎯", text: "当前最薄弱的是<b>第" + weakCh.num + "章 " + weakCh.title + "</b>（" + weakDone + "/" + weakCh.sections.length + " 节），优先补这里。", href: "#/chapter/" + weakCh.id, cta: "去补课" });
    if (!tips.length) tips.push({ icon: "🏆", text: "章节全通、题量充足、模拟考也过了——你已经是别人口中的“大佬”了，保持节奏，会考稳的。", href: "#/cheat", cta: "翻翻速查表" });

    h += '<div class="section-title"><h2>💡 下一步建议</h2><span>根据你的数据自动生成</span></div>';
    h += '<div class="pg-tips view-enter">';
    tips.forEach(function (t) {
      h += '<div class="card pg-tip"><span class="pg-tip-icon">' + t.icon + "</span>" +
        '<div class="pg-tip-body"><p>' + t.text + '</p><a class="btn btn-primary btn-sm" href="' + t.href + '">' + t.cta + " →</a></div></div>";
    });
    h += "</div>";

    /* ---- 考试历史 ---- */
    h += '<div class="section-title"><h2>📝 模拟考试记录</h2><span>最近 ' + examHistory.length + " / 20 次</span></div>";
    if (examHistory.length) {
      h += '<div class="card view-enter" style="padding:0;overflow-x:auto"><table class="pg-table"><thead><tr>' +
        "<th>时间</th><th>得分</th><th>等级</th><th>客观题</th><th>主观题</th><th>状态</th></tr></thead><tbody>";
      examHistory.forEach(function (e) {
        var dt = new Date(e.date);
        var lvCls = e.total >= 90 ? "green" : e.total >= 75 ? "teal" : e.total >= 60 ? "gold" : "red";
        h += "<tr><td>" + dt.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" }) + " " +
          dt.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }) + "</td>" +
          '<td><b>' + e.total + "</b> / 100</td>" +
          '<td><span class="badge ' + lvCls + '">' + e.level + "</span></td>" +
          "<td>" + e.auto + " / " + e.autoMax + "</td><td>" + e.subj + " / " + e.subjMax + "</td>" +
          "<td>" + (e.timeUp ? "⏰ 超时" : "✅ 按时") + "</td></tr>";
      });
      h += "</tbody></table></div>";
    } else {
      h += '<div class="card pg-empty view-enter"><p>还没有考试记录。完成第一章节学习后，去<a href="#/exam">模拟测试</a>体验一次完整的 45 分钟。</p></div>';
    }

    /* ---- 数据管理 ---- */
    h += '<div class="pg-danger view-enter"><p>想从头再来？清除后所有章节进度、刷题统计、考试记录都会清空，不可恢复。</p>' +
      '<button class="btn btn-red btn-sm" data-action="reset-progress">🗑 重置学习数据</button></div>';

    renderSidebar("progress");
    app.innerHTML = h;
    postProcess();
  }

  /* ==========================================================
     视图：搜索
     ========================================================== */
  var searchIndex = null;
  function buildSearchIndex() {
    if (searchIndex) return searchIndex;
    searchIndex = [];
    CHAPTERS.forEach(function (c) {
      searchIndex.push({ kind: "章节", title: "第" + c.num + "章 " + c.title, text: stripTags(c.goal), href: "#/chapter/" + c.id });
      c.sections.forEach(function (s) {
        searchIndex.push({ kind: "知识点", title: c.title + " · " + s.title, text: stripTags(s.html), href: "#/chapter/" + c.id + "/" + s.id });
      });
    });
    ALGOS.forEach(function (a) {
      searchIndex.push({ kind: "算法", title: a.name, text: stripTags(a.scene + " " + a.idea + " " + a.traps.join(" ")), href: "#/algo/" + a.id });
    });
    QBANK.choice.forEach(function (q) { searchIndex.push({ kind: "选择题", title: q.q.split("\n")[0], text: stripTags(q.explain), href: "#/quiz/choice" }); });
    QBANK.judge.forEach(function (q) { searchIndex.push({ kind: "判断题", title: q.q, text: stripTags(q.explain), href: "#/quiz/judge" }); });
    QBANK.read.forEach(function (q) { searchIndex.push({ kind: "程序阅读", title: q.title, text: stripTags(q.answer + " " + q.steps.join(" ")), href: "#/quiz/read" }); });
    QBANK.fill.forEach(function (q) { searchIndex.push({ kind: "程序填空", title: q.title, text: stripTags(q.explain), href: "#/quiz/fill" }); });
    QBANK.code.forEach(function (q) { searchIndex.push({ kind: "编程题", title: q.title, text: stripTags(q.desc), href: "#/quiz/code" }); });
    CLINIC.forEach(function (c) { searchIndex.push({ kind: "错因", title: c.title, text: stripTags(c.cause + " " + c.tip), href: "#/clinic" }); });
    CHEAT.forEach(function (c, i) { searchIndex.push({ kind: "速查", title: c.tab, text: stripTags(c.html), href: "#/cheat/" + i }); });
    return searchIndex;
  }

  function renderSearch(kw) {
    kw = (kw || "").trim();
    var h = '<div class="page-head view-enter"><h1><span class="ph-icon">🔍</span>搜索</h1>' +
      "<p>" + (kw ? "关键词：" + esc(kw) : "在顶部搜索框输入关键词，试试“循环”“闰年”“列表”“最大公约数”。") + "</p></div>";
    if (kw) {
      var idx = buildSearchIndex();
      var lower = kw.toLowerCase();
      var hits = idx.filter(function (it) {
        return it.title.toLowerCase().indexOf(lower) >= 0 || it.text.toLowerCase().indexOf(lower) >= 0;
      }).slice(0, 24);
      if (!hits.length) {
        h += '<div class="card"><p>没有找到「' + esc(kw) + "」相关内容，换个关键词试试（比如“函数”“切片”“素数”）。</p></div>";
      } else {
        h += '<p style="font-size:13.5px;color:#6b7280;margin-bottom:12px">找到 ' + hits.length + " 条结果</p>";
        hits.forEach(function (it) {
          var snippet = it.text.slice(0, 90).replace(/\s+/g, " ");
          h += '<a class="search-result" href="' + it.href + '">' +
            '<h4><span class="sr-kind">' + it.kind + "</span>" + esc(it.title) + "</h4>" +
            "<p>" + esc(snippet) + "…</p></a>";
        });
      }
    }
    renderSidebar("search");
    app.innerHTML = h;
  }

  /* ==========================================================
     事件绑定
     ========================================================== */
  document.addEventListener("click", function (e) {
    var t = e.target;

    /* 复制代码 */
    var copyBtn = t.closest(".cb-copy");
    if (copyBtn) {
      var block = copyBtn.closest(".codeblock");
      var code = block ? $("code", block) : null;
      if (code) {
        var text = code.textContent;
        var done = function () {
          copyBtn.textContent = "✓ 已复制";
          copyBtn.classList.add("copied");
          setTimeout(function () { copyBtn.textContent = "复制代码"; copyBtn.classList.remove("copied"); }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
        } else { fallbackCopy(text); done(); }
      }
      return;
    }

    /* 课程折叠 */
    var lh = t.closest("[data-toggle-lesson]");
    if (lh) {
      var lesson = lh.closest(".lesson");
      if (lesson) lesson.classList.toggle("collapsed");
      return;
    }

    /* 学会了标记 */
    var lc = t.closest("[data-learn]");
    if (lc) {
      var sid = lc.getAttribute("data-learn");
      if (progress[sid]) delete progress[sid]; else progress[sid] = true;
      store.set("progress", progress);
      lc.classList.toggle("on", !!progress[sid]);
      lc.textContent = progress[sid] ? "✓ 已学会" : "○ 标记为已学会";
      updateProgressRing();
      var ch = findChapter(parseHash().param);
      if (ch) renderSidebar("chapter", ch.id);
      return;
    }

    /* 小测选项（章节内嵌 choice） */
    var miniOpt = t.closest("[data-mini-i]");
    if (miniOpt) {
      var box = miniOpt.closest("[data-mini-answer]");
      if (box) handleMiniAnswer(box, parseInt(miniOpt.getAttribute("data-mini-i"), 10));
      return;
    }

    /* 刷题选项 */
    var opt = t.closest(".q-opt[data-i]");
    if (opt) {
      var card = opt.closest(".q-card");
      if (card) handleChoiceAnswer(card, parseInt(opt.getAttribute("data-i"), 10));
      return;
    }

    /* 考试选项 */
    var eopt = t.closest(".exam-opt");
    if (eopt && exam && !exam.submitted) {
      var it = exam.items[exam.cur];
      it.ans = parseInt(eopt.getAttribute("data-exam-i"), 10);
      renderExamPaper();
      return;
    }

    /* 显示答案 / 提示 */
    var reveal = t.closest(".reveal-btn");
    if (reveal) {
      var what = reveal.getAttribute("data-reveal");
      var container = reveal.closest(".q-reveal") || reveal.parentElement;
      var target = null;
      if (what === "hint") target = $$(".read-answer", container)[0];
      else if (what === "sol") target = $$(".read-answer", container)[1];
      else target = $(".read-answer", container);
      if (target) {
        var show = target.style.display === "none";
        target.style.display = show ? "block" : "none";
        if (show) target.classList.add("show");
        reveal.textContent = what === "read" ? (show ? "🙈 收起答案" : "👀 显示答案与推演")
          : what === "hint" ? (show ? "🙈 收起提示" : "💡 查看思路提示")
          : (show ? "🙈 收起答案" : "✅ 查看参考答案");
      }
      return;
    }

    /* 填空题检查 / 显示答案 */
    var fc = t.closest(".fill-check");
    if (fc) { handleFillCheck(fc.closest(".q-card"), false); return; }
    var fs = t.closest(".fill-show");
    if (fs) { handleFillCheck(fs.closest(".q-card"), true); return; }

    /* 题型筛选 */
    var qf = t.closest(".qf-chip");
    if (qf) {
      var f = qf.getAttribute("data-filter");
      location.hash = "#/quiz" + (f ? "/" + f : "");
      return;
    }

    /* 速查表 tab */
    var ct = t.closest(".ct-chip");
    if (ct) { cheatTab = parseInt(ct.getAttribute("data-ct"), 10) || 0; renderCheat(cheatTab); return; }

    /* 算法卡片 */
    var ac = t.closest(".algo-card");
    if (ac) {
      var aid = ac.getAttribute("data-algo");
      if (location.hash === "#/algo/" + aid) {
        /* 点击已选中的卡片：hash 不变不会触发路由，直接滚动到详情 */
        var adSame = $(".algo-detail");
        if (adSame) adSame.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        location.hash = "#/algo/" + aid;
      }
      return;
    }

    /* 病例折叠 */
    var ch2 = t.closest(".case-head");
    if (ch2) { ch2.closest(".case").classList.toggle("open"); return; }

    /* 考试按钮 */
    var act = t.closest("[data-action]");
    if (act) {
      var a = act.getAttribute("data-action");
      if (a === "start-exam") {
        exam = buildExam();
        startExamTimer();
        renderExamPaper();
        window.scrollTo({ top: 0 });
      } else if (a === "submit-exam") {
        if (confirm("确定交卷吗？未作答的题目将按空处理。")) submitExam(false);
      } else if (a === "exam-prev") {
        if (exam.cur > 0) { exam.cur--; renderExamPaper(); }
      } else if (a === "exam-next") {
        if (exam.cur < exam.items.length - 1) { exam.cur++; renderExamPaper(); }
      } else if (a === "reset-progress") {
        if (confirm("确定清除全部学习数据吗？章节进度、刷题统计、考试记录都会被清空，且不可恢复。")) {
          ["progress", "quizStats", "examHistory"].forEach(function (k) { store.set(k, k === "quizStats" ? { done: 0, right: 0 } : k === "progress" ? {} : []); });
          progress = {};
          quizStats = { done: 0, right: 0 };
          renderProgress();
          updateProgressRing();
          window.scrollTo({ top: 0 });
        }
      } else if (a === "toggle-sidebar") {
        toggleSidebarCollapse();
      }
      return;
    }

    /* 题号跳转 */
    var ep = t.closest("[data-ep]");
    if (ep && exam && !exam.submitted) {
      exam.cur = parseInt(ep.getAttribute("data-ep"), 10);
      renderExamPaper();
      return;
    }
  });

  /* 填空题输入（考试） */
  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.classList && t.classList.contains("fill-blank") && t.hasAttribute("data-exam-blank")) {
      if (exam && !exam.submitted) {
        var it = exam.items[exam.cur];
        var bi = parseInt(t.getAttribute("data-exam-blank"), 10);
        it.ans[bi] = t.value;
        var cell = $$('.ep-cell')[exam.cur];
        if (cell && examAnswered(it)) cell.classList.add("answered");
      }
    }
    if (t.classList && t.classList.contains("exam-textarea")) {
      if (exam && !exam.submitted) {
        var it2 = exam.items[exam.cur];
        it2.ans = t.value;
        var cell2 = $$('.ep-cell')[exam.cur];
        if (cell2 && examAnswered(it2)) cell2.classList.add("answered");
      }
    }
  });

  /* 主观题自评勾选 */
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.hasAttribute && t.hasAttribute("data-self") && exam && !exam.submitted) {
      var i = parseInt(t.getAttribute("data-self"), 10);
      exam.self[i] = t.checked;
    }
  });

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* 搜索框 */
  var searchInput = $("#globalSearch");
  if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var kw = searchInput.value.trim();
        location.hash = "#/search/" + encodeURIComponent(kw);
        searchInput.blur();
      }
    });
  }

  /* 移动端导航 */
  var menuToggle = $("#menuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      $("#topnav").classList.toggle("open");
    });
  }
  var sbToggle = $("#sbToggle");
  if (sbToggle) {
    sbToggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
  }
  updateSbCollapseIcon();
  /* 点击主内容区关闭移动端侧栏 */
  document.addEventListener("click", function (e) {
    if (window.innerWidth > 860) return;
    if (sidebar.classList.contains("open") &&
        !e.target.closest("#sidebar") && !e.target.closest("#sbToggle")) {
      sidebar.classList.remove("open");
    }
  });

  /* ---------- 启动 ---------- */
  window.addEventListener("hashchange", router);
  router();
})();
