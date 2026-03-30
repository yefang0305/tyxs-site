const Home = () => {
  return (
    <div id="home">
      <div className="title-box">
        <div className="taiji"></div>
        <div className="name">天乙笔记</div>
        <div className="subtitle">让天下没有难做的决策</div>
      </div>

      <div className="card">
        <h2>简介</h2>
        <p>潜心研习道学、命理、风水、八卦五行多年，尊古而不泥古，崇尚天人合一、中正平和。</p>
        <p>以罗盘定方位，以八卦辨阴阳，以易理解世事，致力于传统文化正本清源与通俗传承。</p>
      </div>

      <div className="card">
        <h2>治学理念</h2>
        <p>道生一，一生二，二生三，三生万物。人法地，地法天，天法道，道法自然。</p>
        <p>观天象以明时变，察地理以知吉凶，通人情以晓进退，守初心以传正道。</p>
      </div>

      <div className="business">
        <div className="business-title">业务范围</div>
        <div className="business-items">
          <div className="business-item">
            <strong>八字详批</strong>
            <span>终身格局、流年运势</span>
          </div>
          <div className="business-item">
            <strong>奇门遁甲</strong>
            <span>决策占断、事物预测</span>
          </div>
          <div className="business-item">
            <strong>风水堪舆</strong>
            <span>居家商铺、环境布局</span>
          </div>
          <div className="business-item">
            <strong>符箓法器</strong>
            <span>开光镇宅、护身祈福</span>
          </div>
          <div className="business-item">
            <strong>法事科仪</strong>
            <span>祈福消灾、化解不顺</span>
          </div>
          <div className="business-item">
            <strong>起名择吉</strong>
            <span>宝宝起名、开业择日</span>
          </div>
        </div>
      </div>

      <div className="card cases">
        <h2>客户案例</h2>
        <div className="case-list">
          <div className="case-item">江浙福主｜宝宝起名，五行平衡，一生顺遂</div>
          <div className="case-item">粤东福主｜家居风水调整，事业稳步上升</div>
          <div className="case-item">西南福主｜八字命理指导，职业方向清晰</div>
          <div className="case-item">华北福主｜奇门占断，投资决策避坑</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
