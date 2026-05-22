import { useEffect, useMemo, useRef, useState } from 'react';

type PaletteEntry = {
  brand: string;
  series: string;
  code: string;
  hex: string;
  rgb: number[];
};

type PaletteFile = {
  name: string;
  entries: PaletteEntry[];
};

type Pattern = {
  width: number;
  height: number;
  cells: PaletteEntry[][];
  counts: Map<string, number>;
};

const getOutputHeight = (image: HTMLImageElement | null, width: number) => {
  if (!image) return width;
  const ratio = image.naturalWidth / image.naturalHeight;
  return Math.max(1, Math.round(width / ratio));
};

const colorDistance = (a: number[], b: number[]) => {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11;
};

const getTextColor = (rgb: number[]) => {
  const brightness = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
  return brightness > 150 ? '#17202a' : '#ffffff';
};

const clampWidth = (value: number) => Math.min(200, Math.max(8, Math.round(value || 64)));

const BeadPatternGenerator = () => {
  const [palette, setPalette] = useState<PaletteEntry[]>([]);
  const [paletteName, setPaletteName] = useState('正在读取色卡...');
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState('');
  const [outputWidth, setOutputWidth] = useState(64);
  const [cellSize, setCellSize] = useState(22);
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [status, setStatus] = useState('请先上传一张像素风图片。');
  const numberedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const plainCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const outputHeight = useMemo(
    () => getOutputHeight(uploadedImage, outputWidth),
    [uploadedImage, outputWidth],
  );

  const paletteByCode = useMemo(() => {
    return new Map(palette.map((entry) => [entry.code, entry]));
  }, [palette]);

  useEffect(() => {
    fetch('/palette.json')
      .then((response) => response.json())
      .then((data: PaletteFile) => {
        setPalette(data.entries);
        setPaletteName(`${data.name} · ${data.entries.length} 色`);
      })
      .catch((error: Error) => {
        setPaletteName(`色卡读取失败：${error.message}`);
      });
  }, []);

  useEffect(() => {
    if (!pattern) return;
    drawPattern(pattern, numberedCanvasRef.current, true);
    drawPattern(pattern, plainCanvasRef.current, false);
  }, [pattern, cellSize]);

  const nearestPaletteColor = (rgb: number[]) => {
    let best = palette[0];
    let bestDistance = Infinity;

    for (const entry of palette) {
      const distance = colorDistance(rgb, entry.rgb);
      if (distance < bestDistance) {
        best = entry;
        bestDistance = distance;
      }
    }

    return best;
  };

  const buildPattern = () => {
    if (!uploadedImage || palette.length === 0) return null;

    const width = clampWidth(outputWidth);
    const height = getOutputHeight(uploadedImage, width);
    const source = document.createElement('canvas');
    source.width = width;
    source.height = height;
    const context = source.getContext('2d', { willReadFrequently: true });
    if (!context) return null;

    context.imageSmoothingEnabled = false;
    context.drawImage(uploadedImage, 0, 0, width, height);

    const data = context.getImageData(0, 0, width, height).data;
    const cells: PaletteEntry[][] = [];
    const counts = new Map<string, number>();

    for (let y = 0; y < height; y += 1) {
      const row: PaletteEntry[] = [];
      for (let x = 0; x < width; x += 1) {
        const index = (y * width + x) * 4;
        const match = nearestPaletteColor([data[index], data[index + 1], data[index + 2]]);
        row.push(match);
        counts.set(match.code, (counts.get(match.code) || 0) + 1);
      }
      cells.push(row);
    }

    return { width, height, cells, counts };
  };

  const drawPattern = (nextPattern: Pattern, canvas: HTMLCanvasElement | null, showCodes: boolean) => {
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const labelSize = Math.max(8, Math.floor(cellSize * 0.34));
    canvas.width = nextPattern.width * cellSize + 1;
    canvas.height = nextPattern.height * cellSize + 1;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = `800 ${labelSize}px "Microsoft YaHei", "SimHei", sans-serif`;

    for (let y = 0; y < nextPattern.height; y += 1) {
      for (let x = 0; x < nextPattern.width; x += 1) {
        const cell = nextPattern.cells[y][x];
        const left = x * cellSize;
        const top = y * cellSize;
        context.fillStyle = cell.hex;
        context.fillRect(left, top, cellSize, cellSize);
        context.strokeStyle = 'rgba(23, 32, 42, 0.45)';
        context.lineWidth = 1;
        context.strokeRect(left + 0.5, top + 0.5, cellSize, cellSize);

        if (showCodes) {
          context.fillStyle = getTextColor(cell.rgb);
          context.fillText(cell.code, left + cellSize / 2, top + cellSize / 2);
        }
      }
    }

    context.strokeStyle = '#17202a';
    context.lineWidth = 2;
    context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
  };

  const handleFile = (file: File) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      setUploadedImage(image);
      setFileName(file.name);
      setPattern(null);
      setStatus(`已上传：${file.name}。可以生成图纸了。`);
      URL.revokeObjectURL(objectUrl);
    };
    image.onerror = () => {
      setStatus('图片读取失败，请换一张图片试试。');
      URL.revokeObjectURL(objectUrl);
    };
    image.src = objectUrl;
  };

  const handleGenerate = () => {
    const nextPattern = buildPattern();
    if (!nextPattern) return;
    setPattern(nextPattern);
    setStatus(`已生成 ${nextPattern.width} x ${nextPattern.height} 图纸，共 ${nextPattern.width * nextPattern.height} 颗豆。`);
  };

  const downloadCanvas = (canvas: HTMLCanvasElement | null, suffix: string) => {
    if (!canvas || !pattern) return;
    const link = document.createElement('a');
    link.download = `拼豆图纸-${suffix}-${pattern.width}x${pattern.height}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const usageRows = pattern
    ? [...pattern.counts.entries()]
        .map(([code, count]) => ({ entry: paletteByCode.get(code), count }))
        .filter((row): row is { entry: PaletteEntry; count: number } => Boolean(row.entry))
        .sort((a, b) => b.count - a.count || a.entry.code.localeCompare(b.entry.code))
    : [];

  return (
    <section className="bead-tool" id="pindou-tool">
      <div className="bead-tool__header">
        <div>
          <p className="bead-tool__eyebrow">像素图纸工具</p>
          <h2>拼豆图纸生成器</h2>
          <p>上传像素风图片，自动匹配 ZAOQU 造趣 221 色，生成可照着拼的色号图纸。</p>
        </div>
        <span>{paletteName}</span>
      </div>

      <div className="bead-tool__controls">
        <label>
          上传图片
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
        <label>
          图纸宽度
          <input
            type="number"
            min="8"
            max="200"
            value={outputWidth}
            onChange={(event) => setOutputWidth(clampWidth(Number(event.target.value)))}
          />
        </label>
        <label>
          格子大小
          <select value={cellSize} onChange={(event) => setCellSize(Number(event.target.value))}>
            <option value="16">小号 16px</option>
            <option value="22">标准 22px</option>
            <option value="30">大号 30px</option>
          </select>
        </label>
        <div className="bead-tool__actions">
          <button type="button" onClick={handleGenerate} disabled={!uploadedImage || palette.length === 0}>
            生成图纸
          </button>
          <button type="button" onClick={() => downloadCanvas(numberedCanvasRef.current, '带色号')} disabled={!pattern}>
            下载带色号
          </button>
          <button type="button" onClick={() => downloadCanvas(plainCanvasRef.current, '纯色')} disabled={!pattern}>
            下载纯色
          </button>
        </div>
      </div>

      <p className="bead-tool__status">
        {uploadedImage
          ? `原图尺寸：${uploadedImage.naturalWidth} x ${uploadedImage.naturalHeight}；将生成 ${outputWidth} x ${outputHeight}，预计 ${outputWidth * outputHeight} 颗豆。`
          : '上传后会按原图比例自动计算高度。'}
        {fileName ? ` 当前文件：${fileName}。` : ''}
      </p>
      <p className="bead-tool__status">{status}</p>

      <div className="bead-tool__preview-grid">
        <div>
          <h3>带色号版</h3>
          <div className="bead-tool__preview">
            {!pattern && <p>生成后，每个像素色块里都会显示对应色号。</p>}
            <canvas ref={numberedCanvasRef} className={pattern ? '' : 'hidden'} />
          </div>
        </div>
        <div>
          <h3>纯色预览版</h3>
          <div className="bead-tool__preview">
            {!pattern && <p>生成后，这里显示不带色号的整体效果。</p>}
            <canvas ref={plainCanvasRef} className={pattern ? '' : 'hidden'} />
          </div>
        </div>
      </div>

      {usageRows.length > 0 && (
        <div className="bead-tool__stats">
          <table>
            <thead>
              <tr>
                <th>色号</th>
                <th>颜色</th>
                <th>数量</th>
              </tr>
            </thead>
            <tbody>
              {usageRows.map(({ entry, count }) => (
                <tr key={entry.code}>
                  <td>
                    <span style={{ background: entry.hex }} />
                    {entry.code}
                  </td>
                  <td>{entry.hex}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default BeadPatternGenerator;
