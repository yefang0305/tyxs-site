import { useState } from 'react';

const HealthGuide = () => {
  const [activeTab, setActiveTab] = useState('wuxing');

  return (
    <div className="card" style={{ padding: 0 }}>
      <style>
        {`
          :root {
            --bg-primary: #ffffff;
            --bg-secondary: #f5f5f0;
            --bg-tertiary: #eeede8;
            --text-primary: #1a1a18;
            --text-secondary: #5a5a56;
            --border: rgba(0,0,0,0.12);
            --border-strong: rgba(0,0,0,0.25);
            --font: -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg-primary: #1c1c1a;
              --bg-secondary: #252522;
              --bg-tertiary: #2e2e2b;
              --text-primary: #e8e6dc;
              --text-secondary: #9a9890;
              --border: rgba(255,255,255,0.12);
              --border-strong: rgba(255,255,255,0.25);
            }
          }
          .health-container {
            max-width: 100%;
            margin: 0 auto;
            padding: 24px 16px 48px;
            background: var(--bg-tertiary);
          }
          .header {
            text-align: center;
            padding: 32px 24px 28px;
            background: var(--bg-primary);
            border-radius: 16px;
            margin-bottom: 16px;
            border: 1px solid var(--border);
          }
          .header-badge {
            display: inline-block;
            font-size: 12px;
            padding: 4px 12px;
            border-radius: 20px;
            background: #FAECE7;
            color: #993C1D;
            border: 1px solid #F0997B;
            margin-bottom: 14px;
            letter-spacing: 0.05em;
          }
          @media (prefers-color-scheme: dark) {
            .header-badge { background: #4A1B0C; color: #F5C4B3; border-color: #D85A30; }
          }
          .header h1 {
            font-size: 22px;
            font-weight: 600;
            color: var(--text-primary);
            line-height: 1.4;
            margin-bottom: 8px;
          }
          .header p {
            font-size: 14px;
            color: var(--text-secondary);
            letter-spacing: 0.08em;
          }
          .card-inner {
            background: var(--bg-primary);
            border-radius: 16px;
            border: 1px solid var(--border);
            overflow: hidden;
          }
          .tabs {
            display: flex;
            border-bottom: 1px solid var(--border);
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .tabs::-webkit-scrollbar { display: none; }
          .tab {
            flex: 1;
            min-width: 80px;
            padding: 14px 8px;
            font-size: 13px;
            font-weight: 500;
            text-align: center;
            cursor: pointer;
            color: var(--text-secondary);
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
            white-space: nowrap;
            user-select: none;
          }
          .tab.active {
            color: #993C1D;
            border-bottom-color: #D85A30;
            background: rgba(250,236,231,0.4);
          }
          @media (prefers-color-scheme: dark) {
            .tab.active { color: #F0997B; border-bottom-color: #D85A30; background: rgba(74,27,12,0.3); }
          }
          .panel { display: none; padding: 20px; }
          .panel.active { display: block; }
          .wuxing-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
            margin-bottom: 16px;
          }
          @media (max-width: 480px) {
            .wuxing-grid { grid-template-columns: repeat(5, 1fr); gap: 5px; }
          }
          .element-card {
            border-radius: 12px;
            padding: 12px 6px;
            border: 1.5px solid transparent;
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s;
          }
          .element-card:hover { transform: translateY(-2px); }
          .element-card .icon { font-size: 20px; margin-bottom: 6px; }
          .element-card .ename { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
          .element-card .eattr { font-size: 10.5px; line-height: 1.6; opacity: 0.8; }
          .el-wood { background: #EAF3DE; border-color: #97C459; color: #27500A; }
          .el-fire { background: #FAECE7; border-color: #F0997B; color: #4A1B0C; }
          .el-earth { background: #FAEEDA; border-color: #EF9F27; color: #412402; }
          .el-metal { background: #F1EFE8; border-color: #B4B2A9; color: #2C2C2A; }
          .el-water { background: #E6F1FB; border-color: #85B7EB; color: #042C53; }
          @media (prefers-color-scheme: dark) {
            .el-wood { background: #173404; border-color: #639922; color: #C0DD97; }
            .el-fire { background: #4A1B0C; border-color: #D85A30; color: #F5C4B3; }
            .el-earth { background: #412402; border-color: #BA7517; color: #FAC775; }
            .el-metal { background: #2C2C2A; border-color: #888780; color: #D3D1C7; }
            .el-water { background: #042C53; border-color: #378ADD; color: #B5D4F4; }
          }
          .detail-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          @media (max-width: 480px) {
            .detail-row { grid-template-columns: 1fr; }
          }
          .detail-card {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 13px 14px;
          }
          .detail-card h3 { font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
          .detail-card p { font-size: 12px; color: var(--text-secondary); line-height: 1.7; }
          .year-header {
            display: flex;
            align-items: flex-start;
            gap: 14px;
            background: #FAECE7;
            border: 1.5px solid #F0997B;
            border-radius: 12px;
            padding: 16px 18px;
            margin-bottom: 14px;
            color: #4A1B0C;
          }
          @media (prefers-color-scheme: dark) {
            .year-header { background: #4A1B0C; border-color: #D85A30; color: #F5C4B3; }
          }
          .year-header .yicon { font-size: 30px; flex-shrink: 0; margin-top: 2px; }
          .year-header h2 { font-size: 15px; font-weight: 600; line-height: 1.4; margin-bottom: 5px; }
          .year-header p { font-size: 12px; line-height: 1.6; opacity: 0.8; }
          .warning-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 14px;
          }
          @media (max-width: 480px) {
            .warning-grid { grid-template-columns: 1fr; }
          }
          .warning-card {
            border-radius: 10px;
            padding: 13px 14px;
            border: 1.5px solid transparent;
          }
          .warning-card h3 { font-size: 13px; font-weight: 600; margin-bottom: 6px; }
          .warning-card p { font-size: 12px; line-height: 1.7; opacity: 0.82; }
          .w1 { background: #FAECE7; border-color: #F0997B; color: #4A1B0C; }
          .w2 { background: #E6F1FB; border-color: #85B7EB; color: #042C53; }
          .w3 { background: #FAEEDA; border-color: #EF9F27; color: #412402; }
          .w4 { background: #F1EFE8; border-color: #B4B2A9; color: #2C2C2A; }
          @media (prefers-color-scheme: dark) {
            .w1 { background: #4A1B0C; border-color: #D85A30; color: #F5C4B3; }
            .w2 { background: #042C53; border-color: #378ADD; color: #B5D4F4; }
            .w3 { background: #412402; border-color: #BA7517; color: #FAC775; }
            .w4 { background: #2C2C2A; border-color: #888780; color: #D3D1C7; }
          }
          .guide-section { margin-bottom: 18px; }
          .guide-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 10px;
            padding-left: 10px;
            border-left: 3px solid #D85A30;
          }
          .guide-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          @media (max-width: 480px) {
            .guide-grid { grid-template-columns: 1fr; }
          }
          .guide-item {
            border-radius: 10px;
            padding: 12px 13px;
            border: 1px solid var(--border);
            background: var(--bg-secondary);
          }
          .gi-label {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            gap: 7px;
          }
          .guide-item p { font-size: 12px; color: var(--text-secondary); line-height: 1.7; }
          .dot-red { width: 7px; height: 7px; border-radius: 50%; background: #D85A30; flex-shrink: 0; }
          .dot-green { width: 7px; height: 7px; border-radius: 50%; background: #639922; flex-shrink: 0; }
          .point-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin-bottom: 16px;
          }
          @media (max-width: 480px) {
            .point-grid { grid-template-columns: 1fr; }
          }
          .point-card {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 14px;
            text-align: center;
          }
          .point-card .pname { font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
          .point-card .ploc { font-size: 11px; color: var(--text-secondary); margin-bottom: 7px; }
          .point-card .pfunc { font-size: 12px; color: var(--text-secondary); line-height: 1.6; }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: var(--text-secondary);
            line-height: 1.8;
          }
        `}
      </style>
      <div className="health-container">
        <div className="header">
          <div className="header-badge">2026 丙午年 · 健康指南</div>
          <h1>八字五行与健康</h1>
          <p>天人合一 · 五行映体 · 顺时调养</p>
        </div>

        <div className="card-inner">
          <div className="tabs">
            <div
              className={`tab ${activeTab === 'wuxing' ? 'active' : ''}`}
              onClick={() => setActiveTab('wuxing')}
            >
              🌿 五行与脏腑
            </div>
            <div
              className={`tab ${activeTab === 'year' ? 'active' : ''}`}
              onClick={() => setActiveTab('year')}
            >
              ⚠️ 2026年预警
            </div>
            <div
              className={`tab ${activeTab === 'guide' ? 'active' : ''}`}
              onClick={() => setActiveTab('guide')}
            >
              🛡️ 养生禁忌
            </div>
            <div
              className={`tab ${activeTab === 'points' ? 'active' : ''}`}
              onClick={() => setActiveTab('points')}
            >
              💡 穴位吐纳
            </div>
          </div>

          <div className={`panel ${activeTab === 'wuxing' ? 'active' : ''}`}>
            <div className="wuxing-grid">
              <div className="element-card el-wood">
                <div className="icon">🌿</div>
                <div className="ename">木</div>
                <div className="eattr">肝 · 胆<br/>目 · 筋膜<br/>情志：怒</div>
              </div>
              <div className="element-card el-fire">
                <div className="icon">🔥</div>
                <div className="ename">火</div>
                <div className="eattr">心 · 小肠<br/>舌 · 血脉<br/>情志：喜</div>
              </div>
              <div className="element-card el-earth">
                <div className="icon">⛰️</div>
                <div className="ename">土</div>
                <div className="eattr">脾 · 胃<br/>口唇 · 肌肉<br/>情志：思</div>
              </div>
              <div className="element-card el-metal">
                <div className="icon">🔪</div>
                <div className="ename">金</div>
                <div className="eattr">肺 · 大肠<br/>鼻 · 皮毛<br/>情志：悲</div>
              </div>
              <div className="element-card el-water">
                <div className="icon">💧</div>
                <div className="ename">水</div>
                <div className="eattr">肾 · 膀胱<br/>发 · 骨髓<br/>情志：恐</div>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-card">
                <h3>相生关系</h3>
                <p>木生火 → 火生土 → 土生金 → 金生水 → 水生木，母子相育，生化不息。</p>
              </div>
              <div className="detail-card">
                <h3>相克关系</h3>
                <p>木克土 · 土克水 · 水克火 · 火克金 · 金克木，五行制约，维持平衡。</p>
              </div>
              <div className="detail-card">
                <h3>病态转化</h3>
                <p>相乘（过度克制）与相侮（反向克制）是疾病发生的核心机制，如木旺乘土引发胃肠疾患。</p>
              </div>
            </div>
          </div>

          <div className={`panel ${activeTab === 'year' ? 'active' : ''}`}>
            <div className="year-header">
              <div className="yicon">🌞</div>
              <div>
                <h2>2026 丙午年 — 纯火格局 · 帝旺羊刃</h2>
                <p>天干丙火（阳火如太阳）+ 地支午火（帝旺之地），火能量达到极致顶点。心血管、肺气与肾水将在这一年承受空前压力。</p>
              </div>
            </div>
            <div className="warning-grid">
              <div className="warning-card w1">
                <h3>🔴 原局火旺无制者</h3>
                <p>夏生人，八字满盘丙丁巳午，缺壬癸水调候。2026年如火上浇油，心梗、脑溢血风险指数级上升，重度失眠、肾功能损伤须高度警惕。</p>
              </div>
              <div className="warning-card w2">
                <h3>🔵 原局水旺金寒者</h3>
                <p>冬生人，满盘壬癸亥子，缺丙丁火温暖。2026年迎来调候红利，财运旺盛，但寒湿身体遇烈火易产生"水火相激"，关节风湿、心脏隐患需防。</p>
              </div>
              <div className="warning-card w3">
                <h3>🟡 原局土多极旺者</h3>
                <p>八字满眼戊己辰戌丑未，缺木疏土。丙午火生土，使土气更加僵实壅塞，脾胃负荷崩溃，消化不良、腹胀、病理性水肿频发。</p>
              </div>
              <div className="warning-card w4">
                <h3>⚪ 原局金弱受克者</h3>
                <p>庚辛申酉极少且紧挨火星。丙午烈火炙烤，金气面临熔化绝境，2026年下半年尤危——呼吸道过敏、肺炎、顽固皮肤病、免疫力骤降。</p>
              </div>
            </div>
            <div className="detail-card">
              <h3>核心病理机制：火旺必定伤金耗水</h3>
              <p style={{ marginTop: '6px' }}>火主心 → 心血管系统超负荷运转 · 火伤金 → 肺气与呼吸道敏感 · 火耗水 → 心肾不交，肾水枯竭，泌尿生殖系统失调。整体社会表现为节奏骤然加快、人心浮躁、情绪易失控。</p>
            </div>
          </div>

          <div className={`panel ${activeTab === 'guide' ? 'active' : ''}`}>
            <div className="guide-section">
              <div className="guide-title">🈲 绝对禁忌</div>
              <div className="guide-grid">
                <div className="guide-item">
                  <div className="gi-label"><span className="dot-red"></span>熬夜透支</div>
                  <p>子时前（23:00）必须入睡。子时胆经当令，是肾水萌芽的关键时刻，熬夜直接剥夺心肾交接机会，心血管崩盘风险几何倍增。</p>
                </div>
                <div className="guide-item">
                  <div className="gi-label"><span className="dot-red"></span>正午剧烈运动</div>
                  <p>午时心经当令、火气达巅峰。严禁长跑、高强度对抗等大汗淋漓运动，汗为心之液，过汗直接泄去心脏阳气，可致心脏骤停。</p>
                </div>
                <div className="guide-item">
                  <div className="gi-label"><span className="dot-red"></span>饮食极端倾斜</div>
                  <p>禁疯狂饮冰——形成致命"寒包火"；禁过食羊肉、辣椒、麻辣火锅——助长体内郁火爆炸，加重心火亢盛。</p>
                </div>
                <div className="guide-item">
                  <div className="gi-label"><span className="dot-red"></span>情绪极端波动</div>
                  <p>火旺之年人心焦躁偏执。须有意识远离戾气，"不急，不与人硬刚"。一次极度暴怒往往就是引爆脆弱心血管的最后导火索。</p>
                </div>
              </div>
            </div>
            <div className="guide-section">
              <div className="guide-title">☑️ 积极建议</div>
              <div className="guide-grid">
                <div className="guide-item">
                  <div className="gi-label"><span className="dot-green"></span>起居防寒防燥</div>
                  <p>上半年防倒春寒，随身备防风外套；下半年室内常备加湿器；入冬每晚艾草热水泡脚15分钟，引火下行。</p>
                </div>
                <div className="guide-item">
                  <div className="gi-label"><span className="dot-green"></span>晨起百梳疏通</div>
                  <p>3月至7月心脑血管高危期，每日早晨用圆润木梳梳理头皮百下，疏通胆经与督脉，防止火气冲脑引发脑卒中。</p>
                </div>
                <div className="guide-item">
                  <div className="gi-label"><span className="dot-green"></span>运动宜柔缓</div>
                  <p>将运动安排在早晨或傍晚，选择瑜伽、散步、八段锦或太极等柔和慢运动，动而不耗。</p>
                </div>
                <div className="guide-item">
                  <div className="gi-label"><span className="dot-green"></span>家居风水调候</div>
                  <p>正南方严忌动土装修，可摆放铜制葫芦或水种植物；正北方宜放鱼缸或铜制摆件，以金生水化煞。</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`panel ${activeTab === 'points' ? 'active' : ''}`}>
            <div className="guide-title" style={{ marginBottom: '14px' }}>💡 关键穴位</div>
            <div className="point-grid">
              <div className="point-card">
                <div className="pname">支正穴</div>
                <div className="ploc">小肠经 · 前臂背面尺侧</div>
                <div className="pfunc">清热解表、护心安神，破解2026年"寒包火"引发的心悸、胸闷、咽喉肿痛</div>
              </div>
              <div className="point-card">
                <div className="pname">内关穴</div>
                <div className="ploc">心包经 · 腕上两寸</div>
                <div className="pfunc">宁心安神第一要穴，专治心跳异常、心律不齐，全年护心核心穴位</div>
              </div>
              <div className="point-card">
                <div className="pname">太渊穴</div>
                <div className="ploc">肺经 · 腕掌侧横纹桡侧</div>
                <div className="pfunc">补益肺脏宗气，增强呼吸道抵抗力，应对下半年燥邪伤肺</div>
              </div>
            </div>

            <div className="guide-title" style={{ marginBottom: '12px' }}>💡 道家六字诀吐纳法</div>
            <div className="guide-grid">
              <div className="guide-item">
                <div className="gi-label"><span className="dot-green"></span>吹（Chūi）字诀 — 固摄肾水</div>
                <p>口唇微拢成圆形，缓慢呼气发"吹"音，呼气末提肛收腹。意念引导肾脏寒冷湿浊之气呼出，固摄受损肾气，对抗2026年火耗肾水。</p>
              </div>
              <div className="guide-item">
                <div className="gi-label"><span className="dot-green"></span>呵（Hē）字诀 — 宣泻心火</div>
                <p>口腔张大，舌体平放，呼气发叹气般"呵"音，双手从胸口缓慢推向腹部。引导心火下沉消散，专用于平复暴怒、焦虑、心头烦热。</p>
              </div>
            </div>

            <div className="detail-card" style={{ marginTop: '12px' }}>
              <h3>核心原则：守住生命中轴</h3>
              <p style={{ marginTop: '6px' }}>稳住心肾相交的健康中轴——心火不妄动（上），肾水不枯竭（下），脾胃运化有序（中）。火不妄动，百病不生。唯有如此，方能在丙午烈火烹油之年平安渡劫。</p>
            </div>
          </div>
        </div>

        <div className="footer">
          <p>本内容仅供参考，不构成医疗建议</p>
          <p>如有健康问题，请咨询专业医师</p>
        </div>
      </div>
    </div>
  );
};

export default HealthGuide;
