"use client";

/*
 * Canvas rendering structure follows YuskaWu/one-piece-wanted-poster's
 * MIT-licensed coordinate/text-compositing approach. The original poster
 * image assets are not bundled here; this component draws our own frame.
 */
import { useEffect, useRef } from "react";
import type { Brother } from "@/types/brother";

const POSTER = {
  width: 760,
  height: 1120,
  photo: { x: 68, y: 250, width: 624, height: 462 },
  name: { x: 78, y: 814, width: 604, height: 118 },
  bounty: { x: 78, y: 940, width: 604, height: 92 },
};

const KOREAN_FONT = "GriunCanvas, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif";
const WESTERN_FONT = "'Times New Roman', Georgia, serif";
const BOUNTY_FONT = "WantedVertiky, Georgia, serif";

type Props = {
  brother: Brother;
  posterNumber: string;
  onFaceError?: () => void;
};

type LoadedImage = HTMLImageElement | null;

export function WantedPosterCanvas({
  brother,
  posterNumber,
  onFaceError,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) {
      return;
    }

    let cancelled = false;
    let photo: LoadedImage = null;
    let frame = 0;

    const draw = () => {
      if (cancelled) {
        return;
      }

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        drawPoster(canvas, {
          brother,
          photo,
          posterNumber,
        });
      });
    };

    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(parent);

    void Promise.all([
      document.fonts?.load(`900 72px ${KOREAN_FONT}`),
      document.fonts?.load(`900 72px ${BOUNTY_FONT}`),
      document.fonts?.ready,
    ]).then(draw);

    if (brother.founderImageUrl) {
      void loadImage(brother.founderImageUrl)
        .then((image) => {
          if (cancelled) {
            return;
          }

          photo = image;
          draw();
        })
        .catch(() => {
          if (cancelled) {
            return;
          }

          onFaceError?.();
          photo = null;
          draw();
        });
    } else {
      draw();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [brother, onFaceError, posterNumber]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full bg-[#d6c295] shadow-[0_24px_80px_rgb(0_0_0/0.35)] [backface-visibility:hidden]"
    />
  );
}

function drawPoster(
  canvas: HTMLCanvasElement,
  {
    brother,
    photo,
    posterNumber,
  }: {
    brother: Brother;
    photo: LoadedImage;
    posterNumber: string;
  },
) {
  const bounds = canvas.getBoundingClientRect();
  const pixelRatio = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  const width = Math.max(1, Math.round(bounds.width));
  const height = Math.max(1, Math.round(bounds.height));
  const scale = Math.min(width / POSTER.width, height / POSTER.height);
  const drawWidth = POSTER.width * scale;
  const drawHeight = POSTER.height * scale;
  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  canvas.width = Math.round(width * pixelRatio);
  canvas.height = Math.round(height * pixelRatio);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  drawPaper(ctx);
  drawTickMarks(ctx);
  drawWantedTitle(ctx);
  drawPhoto(ctx, photo, brother.founderName);
  drawDeadOrAlive(ctx);
  drawFounderName(ctx, brother.founderName);
  drawBounty(ctx, brother.bounty ?? "기업가치 미정");
  drawFooter(ctx, posterNumber);

  ctx.restore();
}

function drawPaper(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 0, POSTER.width, POSTER.height);
  gradient.addColorStop(0, "#ecd8a8");
  gradient.addColorStop(0.38, "#d4bd86");
  gradient.addColorStop(0.72, "#c6a878");
  gradient.addColorStop(1, "#9e805c");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, POSTER.width, POSTER.height);

  ctx.save();
  ctx.globalAlpha = 0.36;
  for (let y = -POSTER.height; y < POSTER.height * 1.4; y += 18) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(POSTER.width, y + POSTER.width);
    ctx.strokeStyle = "#5a3c2a";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.globalAlpha = 0.18;
  for (let x = 0; x < POSTER.width; x += 17) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x - 60, POSTER.height);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.24;
  for (let i = 0; i < 2600; i += 1) {
    const x = seededNoise(i, 11) * POSTER.width;
    const y = seededNoise(i, 29) * POSTER.height;
    const radius = seededNoise(i, 47) * 1.75;
    ctx.fillStyle = seededNoise(i, 71) > 0.52 ? "#332016" : "#ffe8b7";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = "#2c1d15";
  ctx.lineWidth = 1.4;
  for (let i = 0; i < 95; i += 1) {
    const x = seededNoise(i, 91) * POSTER.width;
    const y = seededNoise(i, 113) * POSTER.height;
    const length = 12 + seededNoise(i, 131) * 52;
    const angle = -0.85 + seededNoise(i, 149) * 1.7;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }
  ctx.restore();

  const vignette = ctx.createRadialGradient(
    POSTER.width / 2,
    POSTER.height / 2,
    120,
    POSTER.width / 2,
    POSTER.height / 2,
    680,
  );
  vignette.addColorStop(0, "rgba(255, 244, 205, 0)");
  vignette.addColorStop(0.58, "rgba(67, 42, 27, 0.08)");
  vignette.addColorStop(0.82, "rgba(47, 30, 20, 0.24)");
  vignette.addColorStop(1, "rgba(31, 19, 14, 0.58)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, POSTER.width, POSTER.height);

  ctx.strokeStyle = "rgba(35, 22, 16, 0.75)";
  ctx.lineWidth = 4;
  ctx.strokeRect(9, 9, POSTER.width - 18, POSTER.height - 18);
  ctx.strokeStyle = "rgba(255, 232, 183, 0.18)";
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, POSTER.width - 32, POSTER.height - 32);
}

function drawTickMarks(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = "rgba(45, 32, 24, 0.58)";
  ctx.lineWidth = 2;

  for (let x = 24; x < POSTER.width; x += 46) {
    ctx.beginPath();
    ctx.moveTo(x, 14);
    ctx.lineTo(x + seededNoise(x, 2) * 6 - 3, 38);
    ctx.moveTo(x, POSTER.height - 14);
    ctx.lineTo(x + seededNoise(x, 4) * 6 - 3, POSTER.height - 38);
    ctx.stroke();
  }

  for (let y = 54; y < POSTER.height - 40; y += 43) {
    ctx.beginPath();
    ctx.moveTo(12, y);
    ctx.lineTo(32, y - 8);
    ctx.moveTo(POSTER.width - 12, y);
    ctx.lineTo(POSTER.width - 32, y - 8);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWantedTitle(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  drawFitInkText(ctx, "WANTED", {
    x: 30,
    y: 34,
    width: POSTER.width - 60,
    height: 170,
    fontFamily: WESTERN_FONT,
    maxFontSize: 166,
    minFontSize: 116,
    weight: 900,
    tracking: 2,
  });
  ctx.restore();
}

function drawPhoto(
  ctx: CanvasRenderingContext2D,
  photo: LoadedImage,
  founderName: string,
) {
  const { x, y, width, height } = POSTER.photo;

  ctx.save();
  ctx.fillStyle = "#b9a078";
  ctx.fillRect(x, y, width, height);

  if (photo) {
    drawCoverImage(ctx, photo, x, y, width, height);
    ctx.fillStyle = "rgba(204, 181, 132, 0.22)";
    ctx.globalCompositeOperation = "multiply";
    ctx.fillRect(x, y, width, height);
    ctx.globalCompositeOperation = "source-over";
  } else {
    drawMangaPortraitPlaceholder(ctx, founderName);
  }

  ctx.strokeStyle = "#2f2119";
  ctx.lineWidth = 5;
  ctx.strokeRect(x, y, width, height);
  ctx.strokeStyle = "rgba(24, 16, 12, 0.38)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x + 7, y + 7, width - 14, height - 14);
  ctx.restore();
}

function drawMangaPortraitPlaceholder(
  ctx: CanvasRenderingContext2D,
  founderName: string,
) {
  const { x, y, width, height } = POSTER.photo;

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "#4b3022";
  ctx.lineWidth = 1.6;
  for (let stripe = -height; stripe < width; stripe += 24) {
    ctx.beginPath();
    ctx.moveTo(x + stripe, y + height);
    ctx.lineTo(x + stripe + height, y);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(39, 26, 18, 0.78)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const cx = x + width / 2;
  const cy = y + height / 2 + 12;
  ctx.beginPath();
  ctx.moveTo(cx - 98, cy - 150);
  ctx.bezierCurveTo(cx - 160, cy - 90, cx - 155, cy + 70, cx - 70, cy + 150);
  ctx.bezierCurveTo(cx - 20, cy + 190, cx + 75, cy + 170, cx + 116, cy + 92);
  ctx.bezierCurveTo(cx + 164, cy - 2, cx + 126, cy - 118, cx + 58, cy - 158);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 134, cy - 158);
  ctx.bezierCurveTo(cx - 80, cy - 210, cx + 30, cy - 204, cx + 120, cy - 150);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - 48, cy - 46);
  ctx.bezierCurveTo(cx - 22, cy - 62, cx + 26, cy - 58, cx + 52, cy - 39);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + 4, cy - 34, 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + 4, cy - 34, 7, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(39, 26, 18, 0.72)";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx - 12, cy - 2);
  ctx.bezierCurveTo(cx - 22, cy + 42, cx - 9, cy + 70, cx + 18, cy + 76);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - 50, cy + 125);
  ctx.bezierCurveTo(cx - 14, cy + 144, cx + 46, cy + 142, cx + 82, cy + 116);
  ctx.stroke();

  for (let i = 0; i < 34; i += 1) {
    const sx = x + 34 + seededNoise(i, 223) * (width - 68);
    const sy = y + 22 + seededNoise(i, 251) * (height - 44);
    const len = 18 + seededNoise(i, 269) * 48;
    const angle = -1.2 + seededNoise(i, 283) * 2.4;
    ctx.globalAlpha = 0.44;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + Math.cos(angle) * len, sy + Math.sin(angle) * len);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.88;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 17px ${KOREAN_FONT}`;
  drawInkAt(ctx, "PORTRAIT PENDING", cx, y + height - 34, {
    font: `700 17px ${KOREAN_FONT}`,
    maxWidth: width * 0.7,
    tracking: 5,
  });
  ctx.font = `900 74px ${KOREAN_FONT}`;
  drawInkAt(ctx, founderName[0] ?? "?", x + 70, y + 72, {
    font: `900 74px ${KOREAN_FONT}`,
    maxWidth: 90,
  });
  ctx.restore();
}

function drawDeadOrAlive(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 50px ${WESTERN_FONT}`;
  drawInkAt(ctx, "DEAD OR ALIVE", POSTER.width / 2, 765, {
    font: `900 50px ${WESTERN_FONT}`,
    maxWidth: 640,
    tracking: 18,
  });
  drawOrnamentalBrace(ctx, "left");
  drawOrnamentalBrace(ctx, "right");
  ctx.restore();
}

function drawFounderName(ctx: CanvasRenderingContext2D, name: string) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  drawFitInkText(ctx, name, {
    ...POSTER.name,
    fontFamily: KOREAN_FONT,
    maxFontSize: 82,
    minFontSize: 42,
    weight: 900,
    tracking: 22,
  });
  ctx.restore();
}

function drawBounty(ctx: CanvasRenderingContext2D, bounty: string) {
  const formatted = formatBounty(bounty);

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  drawInkAt(ctx, "₩", 136, 972, {
    font: `900 74px ${WESTERN_FONT}`,
    maxWidth: 70,
  });
  drawFitInkText(ctx, formatted, {
    x: 172,
    y: POSTER.bounty.y,
    width: 500,
    height: POSTER.bounty.height,
    fontFamily: isNumericBounty(bounty) ? BOUNTY_FONT : KOREAN_FONT,
    maxFontSize: isNumericBounty(bounty) ? 72 : 56,
    minFontSize: 24,
    weight: isNumericBounty(bounty) ? 400 : 900,
    tracking: 2,
  });
  ctx.restore();
}

function drawOrnamentalBrace(
  ctx: CanvasRenderingContext2D,
  side: "left" | "right",
) {
  ctx.save();
  const x = side === "left" ? 37 : POSTER.width - 37;
  const sign = side === "left" ? 1 : -1;
  const top = 802;

  ctx.translate(x, top);
  ctx.scale(sign * 0.72, 0.78);

  const brace = new Path2D(
    "M26 0 C-16 18 -7 69 18 91 C34 105 34 123 8 136 C34 149 34 167 18 181 C-7 203 -16 254 26 272 C-4 260 -1 216 28 192 C49 174 48 151 23 136 C48 121 49 98 28 80 C-1 56 -4 12 26 0 Z",
  );
  const topCurl = new Path2D(
    "M20 39 C-7 35 -12 5 12 1 C39 -2 45 31 20 39 Z M20 26 C30 23 29 11 18 11 C6 12 7 25 20 26 Z",
  );
  const bottomCurl = new Path2D(
    "M20 233 C-7 237 -12 267 12 271 C39 274 45 241 20 233 Z M20 246 C30 249 29 261 18 261 C6 260 7 247 20 246 Z",
  );

  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "rgba(54, 32, 24, 0.88)";
  ctx.fill(brace);
  ctx.fill(topCurl);
  ctx.fill(bottomCurl);

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(255, 230, 180, 0.08)";
  ctx.translate(3, 0);
  ctx.scale(0.82, 1);
  ctx.fill(brace);
  ctx.restore();
}

function drawFooter(ctx: CanvasRenderingContext2D, posterNumber: string) {
  ctx.save();
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.font = `700 12px ${KOREAN_FONT}`;
  ctx.fillStyle = "rgba(63, 44, 34, 0.78)";
  wrapCanvasText(
    ctx,
    "KONO SAKUHIN HA FICTION DETHINQUE JITSUZATSURU JINBUTSU DANTAI SONOTA NO SOSHIKI TO DOUTSU NO NASHOU GA GEKICHI NI TOUYOU",
    70,
    1032,
    430,
    13,
  );
  ctx.font = `700 12px ${KOREAN_FONT}`;
  drawInkAt(ctx, `DOSSIER #${posterNumber} / GWANGIN HALL GRAND LINE`, 70, 1080, {
    font: `700 12px ${KOREAN_FONT}`,
    maxWidth: 430,
    align: "left",
    baseline: "top",
  });

  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  drawInkAt(ctx, "HALL", POSTER.width - 56, POSTER.height - 48, {
    font: `900 56px ${WESTERN_FONT}`,
    maxWidth: 170,
    align: "right",
    baseline: "bottom",
  });
  ctx.restore();
}

function drawFitInkText(
  ctx: CanvasRenderingContext2D,
  text: string,
  {
    x,
    y,
    width,
    height,
    fontFamily,
    maxFontSize,
    minFontSize,
    weight,
    tracking,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
    fontFamily: string;
    maxFontSize: number;
    minFontSize: number;
    weight: number;
    tracking: number;
  },
) {
  let fontSize = maxFontSize;

  while (fontSize > minFontSize) {
    ctx.font = `${weight} ${fontSize}px ${fontFamily}`;
    const metrics = ctx.measureText(text);
    const textWidth = measureTrackedText(ctx, text, tracking);
    const textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    if (textWidth <= width && textHeight <= height) {
      break;
    }

    fontSize -= 2;
  }

  ctx.font = `${weight} ${fontSize}px ${fontFamily}`;
  drawInkAt(ctx, text, x + width / 2, y + height / 2, {
    font: `${weight} ${fontSize}px ${fontFamily}`,
    maxWidth: width,
    tracking,
  });
}

function drawInkAt(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  {
    font,
    maxWidth,
    align = "center",
    baseline = "middle",
    tracking = 0,
  }: {
    font: string;
    maxWidth: number;
    align?: CanvasTextAlign;
    baseline?: CanvasTextBaseline;
    tracking?: number;
  },
) {
  const previousAlign = ctx.textAlign;
  const previousBaseline = ctx.textBaseline;
  const previousComposite = ctx.globalCompositeOperation;
  const previousFill = ctx.fillStyle;
  const previousFont = ctx.font;
  const previousLetterSpacing = ctx.letterSpacing;

  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.letterSpacing = "0px";

  ctx.fillStyle = "rgba(0, 0, 0, 0.78)";
  ctx.globalCompositeOperation = "multiply";
  fillTrackedText(ctx, text, x, y, maxWidth, tracking, align);
  fillTrackedText(ctx, text, x, y, maxWidth, tracking, align);

  ctx.fillStyle = "rgba(255, 232, 180, 0.1)";
  ctx.globalCompositeOperation = "source-atop";
  fillTrackedText(ctx, text, x + 1.3, y - 1.3, maxWidth, tracking, align);

  ctx.fillStyle = "rgba(0, 0, 0, 0.68)";
  ctx.globalCompositeOperation = "soft-light";
  fillTrackedText(ctx, text, x, y, maxWidth, tracking, align);
  fillTrackedText(ctx, text, x, y, maxWidth, tracking, align);
  fillTrackedText(ctx, text, x, y, maxWidth, tracking, align);

  ctx.fillStyle = "rgba(84, 60, 48, 1)";
  ctx.globalCompositeOperation = "color";
  fillTrackedText(ctx, text, x, y, maxWidth, tracking, align);

  ctx.fillStyle = "rgba(35, 22, 16, 0.24)";
  ctx.globalCompositeOperation = "source-over";
  fillTrackedText(ctx, text, x, y, maxWidth, tracking, align);

  ctx.globalCompositeOperation = previousComposite;
  ctx.fillStyle = previousFill;
  ctx.font = previousFont;
  ctx.letterSpacing = previousLetterSpacing;
  ctx.textAlign = previousAlign;
  ctx.textBaseline = previousBaseline;
}

function measureTrackedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  tracking: number,
) {
  const chars = Array.from(text);
  const glyphWidth = chars.reduce(
    (sum, char) => sum + ctx.measureText(char).width,
    0,
  );
  return glyphWidth + Math.max(0, chars.length - 1) * tracking;
}

function fillTrackedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  tracking: number,
  align: CanvasTextAlign,
) {
  if (tracking <= 0) {
    ctx.fillText(text, x, y, maxWidth);
    return;
  }

  const chars = Array.from(text);
  const totalWidth = measureTrackedText(ctx, text, tracking);
  const scale = totalWidth > maxWidth ? maxWidth / totalWidth : 1;
  const effectiveTracking = tracking * scale;
  let currentX = x;

  if (align === "center") {
    currentX = x - Math.min(totalWidth, maxWidth) / 2;
  } else if (align === "right" || align === "end") {
    currentX = x - Math.min(totalWidth, maxWidth);
  }

  const previousAlign = ctx.textAlign;
  ctx.textAlign = "left";

  for (const char of chars) {
    const glyphWidth = ctx.measureText(char).width * scale;

    if (scale !== 1) {
      ctx.save();
      ctx.translate(currentX, y);
      ctx.scale(scale, 1);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    } else {
      ctx.fillText(char, currentX, y);
    }

    currentX += glyphWidth + effectiveTracking;
  }

  ctx.textAlign = previousAlign;
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();
  ctx.filter = "grayscale(1) sepia(0.28) contrast(1.08)";
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  ctx.restore();
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let lineY = y;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, lineY);
      line = word;
      lineY += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line) {
    ctx.fillText(line, x, lineY);
  }
}

function formatBounty(bounty: string) {
  const normalized = bounty.replace(/[^\d.]/g, "");
  const amount = Number.parseFloat(normalized);

  if (!Number.isNaN(amount) && normalized) {
    return `${new Intl.NumberFormat("ko-KR").format(amount)}-`;
  }

  return bounty;
}

function isNumericBounty(bounty: string) {
  const normalized = bounty.replace(/[^\d.]/g, "");
  return !!normalized && !Number.isNaN(Number.parseFloat(normalized));
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function seededNoise(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}
