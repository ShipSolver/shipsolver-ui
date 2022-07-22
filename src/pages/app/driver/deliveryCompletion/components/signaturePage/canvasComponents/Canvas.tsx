import { useRef, useEffect } from "react";
import { useOnDraw, point } from "./Hooks";
import "./Canvas.css";

const Canvas = ({
  width,
  height,
  onSaveImage,
  onSaveBitData,
  onClearTrigger
}: {
  width: string;
  height: string;
  onSaveImage?: (imageURL: string) => void;
  onSaveBitData?: (bitData: ImageData | undefined) => void;
  onClearTrigger?: boolean;
}) => {
  function drawLine(
    start: point | null,
    end: point | null,
    ctx: CanvasRenderingContext2D | null,
    color: string,
    width: number
  ) {
    if (ctx == null || end == null) return;
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  function onDraw(
    ctx: CanvasRenderingContext2D | null,
    point: point | null,
    prevPoint: point | null
  ) {
    drawLine(prevPoint, point, ctx, "#000000", 5);
  }

  const { canvasRef, triggerOnDraw, onClear } = useOnDraw(onDraw, onSaveImage, onSaveBitData);

  useEffect(() => {
    onClear()
  }, [onClearTrigger])  

  var sizeWidth = (60 * window.innerWidth) / 100,
    sizeHeight = (50 * window.innerHeight) / 100;

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      width={sizeWidth}
      height={sizeHeight}
      onMouseDown={triggerOnDraw}
      onTouchStart={triggerOnDraw}
      style={canvasStyle}
    />
  );
};

export default Canvas;

const canvasStyle = {
  border: "1px solid black",
};
