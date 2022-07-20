import { useEffect, useRef } from "react";

type mouseListenerFn = (e: MouseEvent) => void;
type touchListenerFn = (e: TouchEvent) => void;

export type point = {
  x: number;
  y: number;
};

export type onDrawFn = (
    ctx: CanvasRenderingContext2D | null, 
    point: point | null, 
    prevPoint: point | null
  ) => void

function getPrevious<T>(ref: React.MutableRefObject<T>, value: T): T {
  const prev = ref.current;
  ref.current = value;
  return prev;
}

export function useOnDraw(onDraw: onDrawFn, onSaveImage?: (imageURL: string) => void, onSaveBitData?: (bitData: ImageData | undefined) => void) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const prevPointRef = useRef<point | null>(null);

  const mouseMoveListenerRef = useRef<mouseListenerFn | null>(null);
  const touchMoveListenerRef = useRef<touchListenerFn | null>(null);
  const mouseUpListenerRef = useRef<mouseListenerFn | null>(null);
  const touchEndListenerRef = useRef<touchListenerFn | null>(null);

  function triggerOnDraw() {
    isDrawingRef.current = true;
  }

  function onClear(){
    const canvas = canvasRef.current;
    if(canvas != null){
        const context = canvas.getContext('2d');
        context?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  useEffect(() => {
    function computePointInCanvas(clientX: number, clientY: number) {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - boundingRect.left,
          y: clientY - boundingRect.top,
        };
      } else {
        return null;
      }
    }
    function initMouseMoveListener() {
      const mouseMoveListener = (e: MouseEvent) => {
        if (isDrawingRef.current && canvasRef.current) {
          const point = computePointInCanvas(e.clientX, e.clientY);
          const ctx = canvasRef.current.getContext("2d");
          if (onDraw) onDraw(ctx, point, prevPointRef.current);
          prevPointRef.current = point;
        }
      };

      const touchMoveListener = (e: TouchEvent) => {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        mouseMoveListener(mouseEvent);
      }

      mouseMoveListenerRef.current = mouseMoveListener;
      window.addEventListener("mousemove", mouseMoveListener);

      touchMoveListenerRef.current = touchMoveListener;
      window.addEventListener("touchmove", touchMoveListener)
    }

    function initMouseUpListener() {
      const mouseUpListener = () => {
        isDrawingRef.current = false;
        prevPointRef.current = null;
        if(canvasRef !== null && canvasRef.current !== null) {
          const boundingRect = canvasRef.current.getBoundingClientRect();
          const image = canvasRef.current.toDataURL("image/png");
          onSaveImage?.(image);
          //  this method saves the internal application URL to the image on the canvas
          //  for attaching the image to an API request, you will need to get the 'blob'
          //  the blob is the bit data corresponding to an image on an application
          var sizeWidth = (60 * window.innerWidth) / 100,
            sizeHeight = (50 * window.innerHeight) / 100;

          const ctx = canvasRef.current.getContext("2d");
          const bitData: ImageData | undefined =ctx?.getImageData(boundingRect.left, boundingRect.top, sizeWidth, sizeHeight)
          onSaveBitData?.(bitData)
        }
      };

      const touchEndListener = () => {
        mouseUpListener()
      }

      mouseUpListenerRef.current = mouseUpListener;
      window.addEventListener("mouseup", mouseUpListener);

      touchEndListenerRef.current = touchEndListener;
      window.addEventListener("touchend", touchEndListener);
    }

    function cleanup() {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      } 
      if (touchMoveListenerRef.current) {
        window.removeEventListener("touchmove", touchMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener("mouseup", mouseUpListenerRef.current);
      }
      if (touchEndListenerRef.current) {
        window.removeEventListener("touchend", touchEndListenerRef.current);
      }
    }

    initMouseMoveListener();
    initMouseUpListener();
    return () => cleanup();
  }, [onDraw]);

  return {
    canvasRef,
    triggerOnDraw,
    onClear
  };
}
