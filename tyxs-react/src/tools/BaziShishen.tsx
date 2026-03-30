import { useState, useEffect } from 'react';

const TIANGAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const WUXING  = ['木','木','火','火','土','土','金','金','水','水'];
const YINYANG = ['阳','阴','阳','阴','阳','阴','阳','阴','阳','阴'];

// 相生：木火土金水
const SHENG: Record<string, string> = {'木':'火','火':'土','土':'金','金':'水','水':'木'};
// 相克：木克土，土克水，水克火，火克金，金克木
const KE: Record<string, string> = {'木':'土','土':'水','水':'火','火':'金','金':'木'};

const SHISHEN_DATA = [
  { name:'比肩', rel:'同我', yy:'同', badge:'自我', color:'gray',
    meaning:'兄弟、朋友、同事，代表竞争与协作。性格独立，我行我素。',
    detail:'比肩为同五行同阴阳，是与日主最相近的力量。代表兄弟、朋友、同业竞争者；性格特征为独立、固执、自尊心强。在命局中旺则朋友多助，过多则与人相争，财易被分。' },
  { name:'劫财', rel:'同我', yy:'异', badge:'自我', color:'gray',
    meaning:'劫取财物，代表竞争对手，也主合作伙伴。',
    detail:'劫财同五行异阴阳，与比肩同类但更具攻击性。易损财、竞争激烈，但也代表能干的合作伙伴。女命劫财为异性争夫之象，男命劫财多克妻财。' },
  { name:'食神', rel:'我生', yy:'同', badge:'表达', color:'teal',
    meaning:'才华、福气、口才，主温暖悠闲之象。',
    detail:'食神为日主所生，同阴阳，是十神中最吉祥温和者之一。代表才艺、表达欲、饮食享受；女命食神为子女之神，性格开朗豁达，财运有保障（食神生财）。' },
  { name:'伤官', rel:'我生', yy:'异', badge:'表达', color:'teal',
    meaning:'才华锋芒、创意，也主桀骜不驯，伤正官。',
    detail:'伤官同为日主所生但异阴阳，性质比食神强烈。才华横溢但叛逆，有伤官者多聪慧、艺术天赋高，但容易与权威冲突（伤官见官，为祸百端）。女命伤官克夫。' },
  { name:'偏财', rel:'我克', yy:'同', badge:'财', color:'amber',
    meaning:'横财、意外之财，也代表父亲或异性缘。',
    detail:'偏财为日主所克，同阴阳。代表流动之财、横财、意外收入；在传统命理中男命偏财也代表父亲或情人。偏财旺者善于理财投资，社交广，但也易散财。' },
  { name:'正财', rel:'我克', yy:'异', badge:'财', color:'amber',
    meaning:'正当收入，男命代表妻子，主勤劳踏实。',
    detail:'正财为日主所克，异阴阳，是最稳定的财富象征。代表工薪收入、踏实致富；男命正财代表妻子，正财旺者勤劳节俭，财富通过努力积累，不投机。' },
  { name:'七杀', rel:'克我', yy:'同', badge:'权威', color:'coral',
    meaning:'压力、挑战、权威，克制日主之煞气。',
    detail:'七杀（偏官）为克日主同阴阳者，十神中最强悍。代表权威、竞争压力、敌对力量；化煞有功则成大将之才，未制化则主灾祸。女命七杀为偏夫（情夫）之象。' },
  { name:'正官', rel:'克我', yy:'异', badge:'规范', color:'coral',
    meaning:'官职、规则、名誉，女命代表丈夫。',
    detail:'正官为克日主异阴阳，是最名正言顺的官星。代表官职、道德规范、社会地位；女命正官代表丈夫，正官旺者守规矩、重名誉、有上进心，适合从事公职。' },
  { name:'偏印', rel:'生我', yy:'同', badge:'智慧', color:'purple',
    meaning:'技艺、偏门学问，也称"枭神"，有孤独之象。',
    detail:'偏印为生日主同阴阳，代表偏门学问、宗教、玄学、特殊技艺；性格内敛、喜独处，有时主孤独或食神被夺（枭神夺食）。偏印旺者多才多艺但难融于主流。' },
  { name:'正印', rel:'生我', yy:'异', badge:'智慧', color:'purple',
    meaning:'学历、慈母、贵人，主文化修养与庇护。',
    detail:'正印为生日主异阴阳，是最正统的印星。代表学历、学术、母亲、贵人庇护；正印旺者有文化涵养、受人尊重，善思考，逢凶化吉，是最受命理界重视的吉星之一。' },
];

const getWuxing = (tg: string) => WUXING[TIANGAN.indexOf(tg)];
const getYY = (tg: string) => YINYANG[TIANGAN.indexOf(tg)];

const getShishen = (rizhu: string, target: string) => {
  if (rizhu === target) return '比肩';
  const rWx = getWuxing(rizhu), tWx = getWuxing(target);
  const rYY = getYY(rizhu), tYY = getYY(target);
  const same = rYY === tYY;
  if (rWx === tWx) return same ? '比肩' : '劫财';
  if (SHENG[rWx] === tWx) return same ? '食神' : '伤官';
  if (KE[rWx] === tWx) return same ? '偏财' : '正财';
  if (SHENG[tWx] === rWx) return same ? '偏印' : '正印';
  if (KE[tWx] === rWx) return same ? '七杀' : '正官';
  return '未知';
};

const BaziShishen = () => {
  const [activeTab, setActiveTab] = useState('wuxing');
  const [selectedShishen, setSelectedShishen] = useState<number | null>(null);
  const [rizhu, setRizhu] = useState('甲');
  const [tiangan, setTiangan] = useState('甲');
  const [calculatedShishen, setCalculatedShishen] = useState('');

  useEffect(() => {
    const ss = getShishen(rizhu, tiangan);
    setCalculatedShishen(ss);
  }, [rizhu, tiangan]);

  const shishenData = SHISHEN_DATA.find(d => d.name === calculatedShishen);

  return (
    <div className="card" style={{ padding: '24px 16px' }}>
      <style>
        {`
          :root {
            --bg: #f9f8f5;
            --bg2: #ffffff;
            --border: #e2e0d8;
            --text: #1a1a18;
            --muted: #6b6960;
            --hint: #9a9890;
            --purple-fill: #EEEDFE;
            --purple-text: #3C3489;
            --purple-border: #534AB7;
            --teal-fill: #E1F5EE;
            --teal-text: #0F6E56;
            --teal-border: #1D9E75;
            --coral-fill: #FAECE7;
            --coral-text: #993C1D;
            --coral-border: #D85A30;
            --amber-fill: #FAEEDA;
            --amber-text: #854F0B;
            --amber-border: #BA7517;
            --blue-fill: #E6F1FB;
            --blue-text: #185FA5;
            --blue-border: #378ADD;
            --gray-fill: #F1EFE8;
            --gray-text: #5F5E5A;
            --gray-border: #888780;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #1e1e1c;
              --bg2: #2a2a27;
              --border: #3a3a36;
              --text: #e8e6de;
              --muted: #9a9890;
              --hint: #6b6960;
              --purple-fill: #26215C;
              --purple-text: #CECBF6;
              --purple-border: #7F77DD;
              --teal-fill: #04342C;
              --teal-text: #9FE1CB;
              --teal-border: #1D9E75;
              --coral-fill: #4A1B0C;
              --coral-text: #F5C4B3;
              --coral-border: #D85A30;
              --amber-fill: #412402;
              --amber-text: #FAC775;
              --amber-border: #BA7517;
              --blue-fill: #042C53;
              --blue-text: #B5D4F4;
              --blue-border: #378ADD;
              --gray-fill: #2C2C2A;
              --gray-text: #D3D1C7;
              --gray-border: #888780;
            }
          }
          .bazi-tool-header {
            margin-bottom: 20px;
          }
          .bazi-tool-header h1 {
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 4px;
            color: var(--text);
          }
          .bazi-tool-header .subtitle {
            font-size: 13px;
            color: var(--muted);
          }

          /* Tabs */
          .bazi-tabs {
            display: flex;
            gap: 4px;
            margin-bottom: 20px;
            border-bottom: 0.5px solid var(--border);
          }
          .bazi-tab {
            padding: 8px 16px;
            font-size: 14px;
            color: var(--muted);
            cursor: pointer;
            border-bottom: 2px solid transparent;
            margin-bottom: -0.5px;
            transition: color .15s;
          }
          .bazi-tab.active {
            color: var(--text);
            border-bottom-color: var(--text);
            font-weight: 500;
          }
          .bazi-tab:hover:not(.active) {
            color: var(--text);
          }
          .bazi-panel {
            display: none;
          }
          .bazi-panel.active {
            display: block;
          }

          /* 五行生克 */
          .wuxing-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }

          /* 十神 grid */
          .shishen-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 10px;
          }
          .ss-card {
            background: var(--bg2);
            border: 0.5px solid var(--border);
            border-radius: 10px;
            padding: 12px 14px;
            cursor: pointer;
            transition: transform .12s, box-shadow .12s;
            position: relative;
          }
          .ss-card:hover {
            transform: translateY(-2px);
          }
          .ss-card.active {
            border-width: 1.5px;
          }
          .ss-card .badge {
            display: inline-block;
            font-size: 11px;
            padding: 2px 7px;
            border-radius: 6px;
            margin-bottom: 6px;
            font-weight: 500;
          }
          .ss-card .name {
            font-size: 17px;
            font-weight: 500;
            margin-bottom: 4px;
          }
          .ss-card .rel {
            font-size: 11px;
            color: var(--muted);
            margin-bottom: 6px;
          }
          .ss-card .meaning {
            font-size: 12px;
            color: var(--muted);
            line-height: 1.5;
          }

          /* Detail panel */
          .detail-box {
            background: var(--bg2);
            border: 0.5px solid var(--border);
            border-radius: 12px;
            padding: 16px 20px;
            margin-top: 16px;
            min-height: 80px;
          }
          .detail-box h3 {
            font-size: 15px;
            font-weight: 500;
            margin-bottom: 8px;
          }
          .detail-box p {
            font-size: 13px;
            color: var(--muted);
            line-height: 1.7;
          }

          /* 推导器 */
          .calc-wrap {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 16px;
          }
          @media(max-width: 480px){
            .calc-wrap {
              grid-template-columns: 1fr;
            }
          }
          .field label {
            display: block;
            font-size: 12px;
            color: var(--muted);
            margin-bottom: 6px;
          }
          .field select {
            width: 100%;
            padding: 8px 10px;
            background: var(--bg2);
            border: 0.5px solid var(--border);
            border-radius: 8px;
            color: var(--text);
            font-size: 14px;
            cursor: pointer;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23888'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 10px center;
          }
          .result-row {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 4px;
          }
          .result-badge {
            font-size: 22px;
            font-weight: 500;
          }
          .result-desc {
            font-size: 13px;
            color: var(--muted);
            line-height: 1.6;
          }

          /* 记忆卡片 */
          .mnemonic-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          @media(max-width: 480px){
            .mnemonic-grid {
              grid-template-columns: 1fr;
            }
          }
          .mn-card {
            border-radius: 10px;
            padding: 14px 16px;
            font-size: 13px;
            line-height: 1.7;
          }
          .mn-card strong {
            font-size: 14px;
            font-weight: 500;
            display: block;
            margin-bottom: 4px;
          }

          /* colors for shishen */
          .purple .badge { background: var(--purple-fill); color: var(--purple-text); }
          .purple.active { border-color: var(--purple-border); }
          .teal .badge { background: var(--teal-fill); color: var(--teal-text); }
          .teal.active { border-color: var(--teal-border); }
          .coral .badge { background: var(--coral-fill); color: var(--coral-text); }
          .coral.active { border-color: var(--coral-border); }
          .amber .badge { background: var(--amber-fill); color: var(--amber-text); }
          .amber.active { border-color: var(--amber-border); }
          .blue .badge { background: var(--blue-fill); color: var(--blue-text); }
          .blue.active { border-color: var(--blue-border); }
          .gray .badge { background: var(--gray-fill); color: var(--gray-text); }
          .gray.active { border-color: var(--gray-border); }

          /* 表格样式 */
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
          }
          thead tr {
            font-size: 11px;
            color: var(--muted);
          }
          th, td {
            padding: 6px 8px;
            border-bottom: 0.5px solid var(--border);
          }
          th:first-child {
            text-align: left;
          }
          td {
            text-align: center;
          }
          td:first-child {
            text-align: left;
            font-weight: 500;
          }
        `}
      </style>

      <div className="bazi-tool-header">
        <h1>八字十神 · 五行生克</h1>
        <p className="subtitle">点击卡片查看详情，或使用推导器计算任意日主的十神</p>
      </div>

      <div className="bazi-tabs">
        <div
          className={`bazi-tab ${activeTab === 'wuxing' ? 'active' : ''}`}
          onClick={() => setActiveTab('wuxing')}
        >
          五行生克
        </div>
        <div
          className={`bazi-tab ${activeTab === 'shishen' ? 'active' : ''}`}
          onClick={() => setActiveTab('shishen')}
        >
          十神详解
        </div>
        <div
          className={`bazi-tab ${activeTab === 'calc' ? 'active' : ''}`}
          onClick={() => setActiveTab('calc')}
        >
          十神推导器
        </div>
        <div
          className={`bazi-tab ${activeTab === 'memory' ? 'active' : ''}`}
          onClick={() => setActiveTab('memory')}
        >
          口诀速记
        </div>
      </div>

      {/* 五行生克 */}
      <div className={`bazi-panel ${activeTab === 'wuxing' ? 'active' : ''}`}>
        <div className="wuxing-wrap">
          <svg width="100%" viewBox="0 0 520 450" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="a-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
              <marker id="a-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#D85A30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>

            {/* 相生箭头（直线，顺时针，从节点边缘到节点边缘） */}
            <line x1="295" y1="95.4" x2="377.2" y2="155.2" stroke="#1D9E75" strokeWidth="1.4" markerEnd="url(#a-green)" opacity="0.8"/>
            <line x1="403.7" y1="206.6" x2="362.5" y2="333.4" stroke="#1D9E75" strokeWidth="1.4" markerEnd="url(#a-green)" opacity="0.8"/>
            <line x1="319" y1="359.4" x2="201" y2="359.4" stroke="#1D9E75" strokeWidth="1.4" markerEnd="url(#a-green)" opacity="0.8"/>
            <line x1="157.5" y1="333.4" x2="116.3" y2="206.6" stroke="#1D9E75" strokeWidth="1.4" markerEnd="url(#a-green)" opacity="0.8"/>
            <line x1="142.8" y1="155.2" x2="225" y2="95.4" stroke="#1D9E75" strokeWidth="1.4" markerEnd="url(#a-green)" opacity="0.8"/>

            {/* 相克箭头（虚线，五角星对角线，从节点边缘到节点边缘） */}
            <line x1="268.4" y1="96" x2="345.6" y2="333.4" stroke="#D85A30" strokeWidth="1" strokeDasharray="5 3" markerEnd="url(#a-red)" opacity="0.6"/>
            <line x1="319" y1="334" x2="142.8" y2="206" stroke="#D85A30" strokeWidth="1" strokeDasharray="5 3" markerEnd="url(#a-red)" opacity="0.6"/>
            <line x1="142.8" y1="180.6" x2="377.2" y2="180.6" stroke="#D85A30" strokeWidth="1" strokeDasharray="5 3" markerEnd="url(#a-red)" opacity="0.6"/>
            <line x1="377.2" y1="206" x2="201" y2="334" stroke="#D85A30" strokeWidth="1" strokeDasharray="5 3" markerEnd="url(#a-red)" opacity="0.6"/>
            <line x1="174.4" y1="333.4" x2="251.6" y2="96" stroke="#D85A30" strokeWidth="1" strokeDasharray="5 3" markerEnd="url(#a-red)" opacity="0.6"/>

            {/* 五行节点（正五边形位置，中心260,230，外接圆R=160） */}
            {/* 木 top (260, 70) */}
            <g>
              <rect x="225" y="44" width="70" height="52" rx="8" fill="#EAF3DE" stroke="#3B6D11" strokeWidth="1"/>
              <text x="260" y="67" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="500" fill="#27500A">木</text>
              <text x="260" y="87" textAnchor="middle" dominantBaseline="central" fontSize="11" fill="#3B6D11">甲 乙</text>
            </g>
            {/* 火 right (412.2, 180.6) */}
            <g>
              <rect x="377" y="154.6" width="70" height="52" rx="8" fill="#FAECE7" stroke="#993C1D" strokeWidth="1"/>
              <text x="412" y="177.6" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="500" fill="#712B13">火</text>
              <text x="412" y="197.6" textAnchor="middle" dominantBaseline="central" fontSize="11" fill="#993C1D">丙 丁</text>
            </g>
            {/* 土 right-bottom (354, 359.4) */}
            <g>
              <rect x="319" y="333.4" width="70" height="52" rx="8" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1"/>
              <text x="354" y="356.4" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="500" fill="#633806">土</text>
              <text x="354" y="376.4" textAnchor="middle" dominantBaseline="central" fontSize="11" fill="#854F0B">戊 己</text>
            </g>
            {/* 金 left-bottom (166, 359.4) */}
            <g>
              <rect x="131" y="333.4" width="70" height="52" rx="8" fill="#F1EFE8" stroke="#5F5E5A" strokeWidth="1"/>
              <text x="166" y="356.4" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="500" fill="#444441">金</text>
              <text x="166" y="376.4" textAnchor="middle" dominantBaseline="central" fontSize="11" fill="#5F5E5A">庚 辛</text>
            </g>
            {/* 水 left (107.8, 180.6) */}
            <g>
              <rect x="72.8" y="154.6" width="70" height="52" rx="8" fill="#E6F1FB" stroke="#185FA5" strokeWidth="1"/>
              <text x="107.8" y="177.6" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="500" fill="#0C447C">水</text>
              <text x="107.8" y="197.6" textAnchor="middle" dominantBaseline="central" fontSize="11" fill="#185FA5">壬 癸</text>
            </g>

            {/* 图例 */}
            <line x1="340" y1="424" x2="370" y2="424" stroke="#1D9E75" strokeWidth="1.5" markerEnd="url(#a-green)"/>
            <text x="376" y="428" fontSize="11" fill="#0F6E56">相生</text>
            <line x1="420" y1="424" x2="450" y2="424" stroke="#D85A30" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#a-red)"/>
            <text x="456" y="428" fontSize="11" fill="#993C1D">相克</text>
          </svg>

          {/* 生克文字说明 */}
          <div style={{ width: '100%', maxWidth: '440px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: 'var(--teal-fill)', borderRadius: '10px', padding: '12px 14px' }}>
                <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--teal-text)', marginBottom: '6px' }}>相生（顺序）</div>
                <div style={{ fontSize: '13px', color: 'var(--teal-text)', lineHeight: 2 }}>木 → 火 → 土<br/>土 → 金 → 水 → 木</div>
              </div>
              <div style={{ background: 'var(--coral-fill)', borderRadius: '10px', padding: '12px 14px' }}>
                <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--coral-text)', marginBottom: '6px' }}>相克（隔位）</div>
                <div style={{ fontSize: '13px', color: 'var(--coral-text)', lineHeight: 2 }}>木克土 · 土克水<br/>水克火 · 火克金 · 金克木</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 十神详解 */}
      <div className={`bazi-panel ${activeTab === 'shishen' ? 'active' : ''}`}>
        <div className="shishen-grid">
          {SHISHEN_DATA.map((d, i) => (
            <div
              key={i}
              className={`ss-card ${d.color} ${selectedShishen === i ? 'active' : ''}`}
              onClick={() => setSelectedShishen(i)}
            >
              <div className="badge">{d.badge}</div>
              <div className="name">{d.name}</div>
              <div className="rel">{d.rel} · 阴阳{d.yy}</div>
              <div className="meaning">{d.meaning}</div>
            </div>
          ))}
        </div>
        <div className="detail-box">
          {selectedShishen !== null ? (
            <>
              <h3>{SHISHEN_DATA[selectedShishen].name} — {SHISHEN_DATA[selectedShishen].rel}（阴阳{SHISHEN_DATA[selectedShishen].yy}）</h3>
              <p>{SHISHEN_DATA[selectedShishen].detail}</p>
            </>
          ) : (
            <p style={{ color: 'var(--hint)', fontSize: '13px' }}>点击上方卡片查看十神详情</p>
          )}
        </div>
      </div>

      {/* 推导器 */}
      <div className={`bazi-panel ${activeTab === 'calc' ? 'active' : ''}`}>
        <div className="calc-wrap">
          <div className="field">
            <label>日主（日柱天干）</label>
            <select value={rizhu} onChange={e => setRizhu(e.target.value)}>
              <option value="甲">甲（阳木）</option>
              <option value="乙">乙（阴木）</option>
              <option value="丙">丙（阳火）</option>
              <option value="丁">丁（阴火）</option>
              <option value="戊">戊（阳土）</option>
              <option value="己">己（阴土）</option>
              <option value="庚">庚（阳金）</option>
              <option value="辛">辛（阴金）</option>
              <option value="壬">壬（阳水）</option>
              <option value="癸">癸（阴水）</option>
            </select>
          </div>
          <div className="field">
            <label>待判断天干</label>
            <select value={tiangan} onChange={e => setTiangan(e.target.value)}>
              <option value="甲">甲（阳木）</option>
              <option value="乙">乙（阴木）</option>
              <option value="丙">丙（阳火）</option>
              <option value="丁">丁（阴火）</option>
              <option value="戊">戊（阳土）</option>
              <option value="己">己（阴土）</option>
              <option value="庚">庚（阳金）</option>
              <option value="辛">辛（阴金）</option>
              <option value="壬">壬（阳水）</option>
              <option value="癸">癸（阴水）</option>
            </select>
          </div>
        </div>
        <div className="detail-box">
          <div className="result-row">
            {shishenData && (
              <>
                <span
                  className="result-badge"
                  style={{
                    background: `var(--${shishenData.color}-fill)`,
                    color: `var(--${shishenData.color}-text)`,
                    padding: '6px 16px',
                    borderRadius: '8px'
                  }}
                >
                  {calculatedShishen}
                </span>
                <div className="result-desc">
                  日主 <b>{rizhu}</b>（{getYY(rizhu)}{getWuxing(rizhu)}）→ <b>{tiangan}</b>（{getYY(tiangan)}{getWuxing(tiangan)}）<br/>
                  {(() => {
                    const rWx = getWuxing(rizhu), tWx = getWuxing(tiangan);
                    let relText = '';
                    if (rWx === tWx) relText = '同五行';
                    else if (SHENG[rWx] === tWx) relText = `${rWx}生${tWx}，日主所生`;
                    else if (KE[rWx] === tWx) relText = `${rWx}克${tWx}，日主所克`;
                    else if (SHENG[tWx] === rWx) relText = `${tWx}生${rWx}，生日主者`;
                    else if (KE[tWx] === rWx) relText = `${tWx}克${rWx}，克日主者`;
                    const yySame = getYY(rizhu) === getYY(tiangan);
                    return `${relText} · 阴阳${yySame ? '相同（偏）' : '相异（正）'}<br>${shishenData.meaning}`;
                  })()}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 完整对照表 */}
        <div style={{ marginTop: '20px', overflowX: 'auto' }}>
          <table>
            <thead>
              <tr style={{ fontSize: '11px', color: 'var(--muted)' }}>
                <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '0.5px solid var(--border)' }}>天干</th>
                <th style={{ padding: '6px 8px', borderBottom: '0.5px solid var(--border)' }}>五行</th>
                <th style={{ padding: '6px 8px', borderBottom: '0.5px solid var(--border)' }}>阴阳</th>
                <th style={{ padding: '6px 8px', borderBottom: '0.5px solid var(--border)' }}>十神</th>
              </tr>
            </thead>
            <tbody>
              {TIANGAN.map(tg => {
                const ss = getShishen(rizhu, tg);
                const data = SHISHEN_DATA.find(d => d.name === ss);
                return (
                  <tr key={tg} style={{ borderBottom: '0.5px solid var(--border)' }}>
                    <td style={{ padding: '5px 8px', fontWeight: '500' }}>{tg}</td>
                    <td style={{ padding: '5px 8px', textAlign: 'center', color: 'var(--muted)' }}>{getWuxing(tg)}</td>
                    <td style={{ padding: '5px 8px', textAlign: 'center', color: 'var(--muted)' }}>{getYY(tg)}</td>
                    <td style={{ padding: '5px 8px', textAlign: 'center' }}>
                      {data && (
                        <span
                          style={{
                            background: `var(--${data.color}-fill)`,
                            color: `var(--${data.color}-text)`,
                            padding: '2px 8px',
                            borderRadius: '5px',
                            fontSize: '12px'
                          }}
                        >
                          {ss}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 口诀速记 */}
      <div className={`bazi-panel ${activeTab === 'memory' ? 'active' : ''}`}>
        <div className="mnemonic-grid">
          <div className="mn-card" style={{ background: 'var(--purple-fill)', color: 'var(--purple-text)', gridColumn: '1/-1' }}>
            <strong style={{ fontSize: '15px' }}>核心口诀</strong>
            同我比劫，我生食伤，我克财星，克我官杀，生我印绶。<br/>
            <span style={{ opacity: '.7' }}>阴阳相同为"偏"，阴阳相异为"正"。</span>
          </div>
          <div className="mn-card" style={{ background: 'var(--gray-fill)', color: 'var(--gray-text)' }}>
            <strong>同我 → 比/劫</strong>
            同五行同阴阳 = 比肩<br/>同五行异阴阳 = 劫财
          </div>
          <div className="mn-card" style={{ background: 'var(--teal-fill)', color: 'var(--teal-text)' }}>
            <strong>我生 → 食/伤</strong>
            同阴阳 = 食神（福气）<br/>异阴阳 = 伤官（锋芒）
          </div>
          <div className="mn-card" style={{ background: 'var(--amber-fill)', color: 'var(--amber-text)' }}>
            <strong>我克 → 财</strong>
            同阴阳 = 偏财（横财）<br/>异阴阳 = 正财（正收入）
          </div>
          <div className="mn-card" style={{ background: 'var(--coral-fill)', color: 'var(--coral-text)' }}>
            <strong>克我 → 官/杀</strong>
            同阴阳 = 七杀（压力）<br/>异阴阳 = 正官（规范）
          </div>
          <div className="mn-card" style={{ background: 'var(--blue-fill)', color: 'var(--blue-text)' }}>
            <strong>生我 → 印</strong>
            同阴阳 = 偏印（技艺）<br/>异阴阳 = 正印（学业）
          </div>
          <div className="mn-card" style={{ background: 'var(--gray-fill)', color: 'var(--gray-text)' }}>
            <strong>阴阳判断</strong>
            阳干：甲丙戊庚壬<br/>阴干：乙丁己辛癸
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaziShishen;
