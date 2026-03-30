import { useState } from 'react';

const FloatButton = () => {
  const [copied, setCopied] = useState(false);

  const copyWx = () => {
    navigator.clipboard.writeText('tyxs027').then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="float-contact">
      <div className={`float-wx ${copied ? 'copied' : ''}`} onClick={copyWx}>
        <strong>{copied ? '复制成功' : '咨询微信'}</strong>
        {copied ? '已复制到剪贴板' : 'tyxs027'}
      </div>
    </div>
  );
};

export default FloatButton;
