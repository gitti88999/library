// import { useEffect, useRef } from "react";

// type Point = {
//   x: number;
//   y: number;
//   label?: string;
// };

// type Props = {
//   user: Point;
//   owner: Point;
//   active?: boolean;
// };

// const BookLiveMap = ({ user, owner, active = true }: Props) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
// const animationRef = useRef<number>(0);
//   const draw = (ctx: CanvasRenderingContext2D, t: number) => {
//     const { width, height } = ctx.canvas;

//     ctx.clearRect(0, 0, width, height);

//     // background
//     ctx.fillStyle = "#0f172a";
//     ctx.fillRect(0, 0, width, height);

//     // user point
//     ctx.beginPath();
//     ctx.arc(user.x, user.y, 8, 0, Math.PI * 2);
//     ctx.fillStyle = "#38bdf8";
//     ctx.fill();

//     // owner point
//     ctx.beginPath();
//     ctx.arc(owner.x, owner.y, 8, 0, Math.PI * 2);
//     ctx.fillStyle = "#22c55e";
//     ctx.fill();

//     // line between
//     ctx.beginPath();
//     ctx.moveTo(user.x, user.y);
//     ctx.lineTo(owner.x, owner.y);
//     ctx.strokeStyle = active ? "#60a5fa" : "#64748b";
//     ctx.lineWidth = 2;
//     ctx.stroke();

//     // animated pulse dot
//     if (active) {
//       const px = user.x + (owner.x - user.x) * t;
//       const py = user.y + (owner.y - user.y) * t;

//       ctx.beginPath();
//       ctx.arc(px, py, 5, 0, Math.PI * 2);
//       ctx.fillStyle = "#fbbf24";
//       ctx.fill();
//     }

//     // labels
//     ctx.fillStyle = "#fff";
//     ctx.font = "12px Arial";
//     ctx.fillText("אתה", user.x + 10, user.y - 10);
//     ctx.fillText("בעל הספר", owner.x + 10, owner.y - 10);
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let start: number | null = null;

//     const animate = (time: number) => {
//       if (!start) start = time;
//       const t = ((time - start) % 2000) / 2000;

//       draw(ctx, t);

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [user, owner, active]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={500}
//       height={300}
//       style={{
//         borderRadius: "12px",
//         width: "100%",
//         height: "300px",
//       }}
//     />
//   );
// };

// export default BookLiveMap;