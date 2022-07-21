import {useOnDraw} from './Hooks';
import './Canvas.css'

const Canvas = ({
    width,
    height
}:{width: string, height: string}) => {

    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);

    function onDraw(ctx: any, point: any, prevPoint: any) {
        drawLine(prevPoint, point, ctx, '#000000', 5);
    }

    function drawLine(
        start: any,
        end: any,
        ctx: any,
        color: any,
        width: any
    ) {
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

    var sizeWidth = 60 * window.innerWidth / 100,
    sizeHeight = 50 * window.innerHeight / 100;

    return(
        <canvas
            className='canvas'
            width={sizeWidth}
            height={sizeHeight}
            onMouseDown={onCanvasMouseDown}
            style={canvasStyle}
            ref={setCanvasRef}
        />
    );

}

export default Canvas;

const canvasStyle = {
    border: "1px solid black"
    
}