import HealthGuide from '../tools/HealthGuide';
import BaziShishen from '../tools/BaziShishen';

const LearningTools = () => {
  return (
    <div>
      <h2 style={{ marginBottom: '24px', color: '#4a3f33', fontSize: '28px', fontWeight: '600' }}>学习工具</h2>

      {/* 健康指南 */}
      <div className="health-tool-container">
        <HealthGuide />
      </div>

      {/* 八字十神工具 */}
      <div className="bazi-tool-container">
        <BaziShishen />
      </div>
    </div>
  );
};

export default LearningTools;
