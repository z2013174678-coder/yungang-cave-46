const roles = {
  eye: { icon: "◉", title: "眼睛线索", sub: "看见石头没有说出口的细节", desc: "观察雕塑轮廓、服饰、纹样、色彩与人物动作。你负责把‘我看见了什么’说清楚。", secret: "示例私密线索：先别看编号，观察第16—20窟是不是一组彼此相关的洞窟。" },
  ear: { icon: "♫", title: "耳朵线索", sub: "听见一千五百年前的想象", desc: "从乐伎、环境声和传说片段中寻找关系。你听到的节奏，另外两位队友听不到。", secret: "示例私密线索：你的两拍节奏必须和队友的节奏拼起来，完整音乐才会出现。" },
  time: { icon: "⌛", title: "时间线索", sub: "把眼前一刻放回北魏", desc: "理解开凿先后、时代变化与人物背景。你负责提醒大家：数字和标签未必等于历史。", secret: "示例私密线索：第16—20窟是云冈早期开凿的代表，编号并不是历史时钟。" }
};

const journey = [
  { label:"身份觉醒", kicker:"入口 · 5分钟", title:"AI的准确率是99.6%", text:"三副耳机分别报出‘眼睛、耳朵、时间’。从这一刻起，三个人收到的内容不再相同。", task:"抬头看一眼队友，一起按下回声键，接受校对任务。", result:"99.6%", note:"AI还很自信" },
  { label:"编号迷雾", kicker:"第16—20窟 · 8分钟", title:"20一定比12更晚吗？", text:"AI把洞窟编号当成年代顺序。眼睛找到组合关系，耳朵听到‘昙曜五窟’，时间拿到早期开凿信息。", task:"每人只能说一句线索，拼成反驳：‘先看证据，再看编号。’", result:"67%", note:"解锁：先看证据" },
  { label:"石头乐队", kicker:"第12窟或备用展项 · 10分钟", title:"一段音乐只有一个故乡吗？", text:"三个人听到错开的声音片段。各顾各的只剩杂音，看着彼此对齐四拍，才会响起完整合奏。", task:"复现节奏、交换手势，AI逼你选唯一来源时，全队一起长按。", result:"34%", note:"解锁：允许相遇" },
  { label:"标签陷阱", kicker:"第20窟 · 8分钟", title:"只能选A、B或C吗？", text:"AI要求给造像贴上‘外来、中原、本地’中的唯一标签。但每一个单选都会漏掉现场证据。", task:"十秒倒计时里保持沉默，互相确认后一起长按：不是不会选，是题目太简单。", result:"0.6%", note:"解锁：拒绝单选" },
  { label:"未来来电", kicker:"出口 · 5分钟", title:"AI第一次没有先给答案", text:"来自2126年的提问：如果只能说12秒，云冈为什么值得留下？三个人必须引用刚才亲眼或亲耳获得的证据。", task:"共同录下12秒回答，生成小队专属《第46窟AI纠错报告》。", result:"∞", note:"问题继续，文化继续" }
];

let roleKey = "eye", journeyIndex = 0;
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

function renderRole() {
  if (!$("#roleStage")) return;
  const r = roles[roleKey];
  $("#roleStage").innerHTML = `<div class="role-visual">${r.icon}</div><div class="role-copy"><p class="eyebrow">${r.sub}</p><h3>${r.title}</h3><p>${r.desc}</p><p class="secret"><b>耳机悄悄告诉你</b><br>${r.secret}</p></div>`;
  $$(".role-tab").forEach(b => { const on=b.dataset.role===roleKey; b.classList.toggle("active",on); b.setAttribute("aria-selected",on); });
}
function renderJourney() {
  if (!$("#journeySteps")) return;
  const j = journey[journeyIndex];
  $("#journeySteps").innerHTML = journey.map((x,i)=>`<button class="journey-step ${i===journeyIndex?'active':''}" data-journey="${i}">${i+1}. ${x.label}</button>`).join("");
  $("#journeyCard").innerHTML = `<div><p class="eyebrow">${j.kicker}</p><h3>${j.title}</h3><p>${j.text}</p><div class="clue-pills"><span>◉ 观察</span><span>♫ 倾听</span><span>⌛ 讨论</span></div></div><div><div class="challenge"><b>小队现在要做</b>${j.task}</div><div class="journey-result"><strong>${j.result}</strong><span>AI自信值</span><p>${j.note}</p></div></div>`;
  $("#journeyCount").textContent=`${journeyIndex+1} / ${journey.length}`;
  $("#prevJourney").disabled=journeyIndex===0;
  $("#nextJourney").textContent=journeyIndex===journey.length-1?"回到第一步":"下一步";
}
$$(".role-tab").forEach(b=>b.addEventListener("click",()=>{roleKey=b.dataset.role;renderRole();}));
$$("[data-open-booking]").forEach(b=>b.addEventListener("click",()=>$("#bookingDialog")?.showModal()));
$$("#journeySteps").forEach(el=>el.addEventListener("click",e=>{const b=e.target.closest("[data-journey]");if(b){journeyIndex=+b.dataset.journey;renderJourney();}}));
$("#prevJourney")?.addEventListener("click",()=>{journeyIndex=Math.max(0,journeyIndex-1);renderJourney();});
$("#nextJourney")?.addEventListener("click",()=>{journeyIndex=journeyIndex===journey.length-1?0:journeyIndex+1;renderJourney();});
$$("[data-close-dialog]").forEach(b=>b.addEventListener("click",()=>b.closest("dialog").close()));
$$(".booking-options button").forEach(b=>b.addEventListener("click",()=>{$$(".booking-options button").forEach(x=>x.classList.remove("active"));b.classList.add("active");}));
$("#confirmBooking")?.addEventListener("click",()=>{$("#ticket").hidden=false;$("#confirmBooking").textContent="体验票已生成";});
$("#menuButton")?.addEventListener("click",()=>{const nav=$("#mainNav"),open=nav.classList.toggle("open");$("#menuButton").setAttribute("aria-expanded",open);});
$("#mainNav")?.addEventListener("click",()=>$("#mainNav").classList.remove("open"));
window.addEventListener("scroll",()=>$("#topbar").classList.toggle("scrolled",scrollY>45));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12}); $$(".reveal").forEach(x=>io.observe(x));
renderRole(); renderJourney();
