import { useCallback, useEffect, useRef } from "react";

const CanvasWidth = Math.floor(
  Math.min(window.innerHeight, window.innerWidth) * (2 / 3)
);
const CanvasHeight = CanvasWidth;

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /**
   * @param deltaTime Time since the last frame in ms
   */
  const onLoop = useCallback((deltaTime: number) => {
    // Do something here
  }, []);

  /**
   * @param deltaTime Time since the last frame in ms
   */
  const draw = useCallback((deltaTime: number) => {
    if (canvasRef.current === null) return;
    const ctx = canvasRef.current.getContext("2d")!;
    ctx.clearRect(0, 0, CanvasWidth, CanvasHeight);
    ctx.save();
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      `FPS: ${Math.round(1000 / deltaTime)}`,
      CanvasWidth / 2,
      CanvasHeight / 2
    );
    ctx.restore();
  }, []);

  useEffect(() => {
    let active = true;
    let lastTime = 0;
    function loop(time: number) {
      const deltaTime = Math.max(50 / 3, time - lastTime);
      if (active) {
        onLoop(deltaTime);
        draw(deltaTime);
        lastTime = time;
        window.requestAnimationFrame(loop);
      }
    }
    loop(0);
    return () => {
      active = false;
    };
  }, [onLoop, draw]);
  return (
    <div className="flex flex-row justify-evenly w-screen">
      <div className="flex flex-col gap-3">
        <canvas
          ref={canvasRef}
          className="rounded-lg bg-white"
          width={CanvasWidth}
          height={CanvasHeight}
        ></canvas>
      </div>
    </div>
  );
}
