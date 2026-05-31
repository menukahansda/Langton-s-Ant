import { useRef, useState, useEffect } from "react";
import updateGrid from "../rules";
import "../App.css";

const CanvasComponent = (props) => {
  const canvasRef = useRef(null);
  const gridRef = useRef([]);
  const rows = Math.floor(props.height / 10);
  const cols = Math.floor(props.width / 10);

  const [grid, setGrid] = useState(
    Array(props.height / 10)
      .fill()
      .map(() => Array(props.width / 10).fill(0)),
  );

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  function animateGrid(x, y, dir) {
    if (!grid || grid.length === 0) return;

    const { newGrid, nx, ny, ndir } = updateGrid(gridRef.current, x, y, dir);
    setGrid(newGrid);

    requestAnimationFrame(() => animateGrid(nx, ny, ndir));
  }

  function handleClick(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const r = Math.floor(y / 10);
    const c = Math.floor(x / 10);
    requestAnimationFrame(() => animateGrid(r, c, 0));
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        context.strokeStyle = "rgb(209, 209, 209)";
        context.strokeRect(c * 10 + 0.5, r * 10 + 0.5, 9, 9);

        if (grid[r][c] === 1) {
          context.fillStyle = "black";
        }else{
          context.fillStyle = "white";
        }
        context.fillRect(c * 10 + 0.5, r * 10 + 0.5, 8, 8);
      }
    }
  }, [grid, rows, cols]);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      width={props.width}
      height={props.height}
      onClick={handleClick}
    ></canvas>
  );
};

export default CanvasComponent;
