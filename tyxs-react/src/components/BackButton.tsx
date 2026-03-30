import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="float-back">
      <button className="float-back-btn" onClick={() => navigate(-1)}>
        ← 返回
      </button>
    </div>
  );
};

export default BackButton;
