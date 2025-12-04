import { Point, Size } from "../types";

export class Box implements Point, Size {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  static from(props: Point & Size): Box {
    return new Box(props.x, props.y, props.width, props.height);
  }
  // static fromPointAndSize(point: Point, size: Size): Box {
  //   return new Box(point.x, point.y, size.width, size.height);
  // }

  // static fromCoordinates(x1: number, y1: number, x2: number, y2: number): Box {
  //   const x = Math.min(x1, x2);
  //   const y = Math.min(y1, y2);
  //   const width = Math.abs(x1 - x2);
  //   const height = Math.abs(y1 - y2);
  //   return new Box(x, y, width, height);
  // }

  get right(): number {
    return this.x + this.width;
  }

  get bottom(): number {
    return this.y + this.height;
  }

  get topLeft(): Point {
    return { x: this.x, y: this.y };
  }

  get topRight(): Point {
    return { x: this.right, y: this.y };
  }

  get bottomLeft(): Point {
    return { x: this.x, y: this.bottom };
  }

  get bottomRight(): Point {
    return { x: this.right, y: this.bottom };
  }

  get center(): Point {
    return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
  }

  get size(): Size {
    return { width: this.width, height: this.height };
  }

  containsPoint(point: Point): boolean {
    return (
      point.x >= this.x &&
      point.x <= this.right &&
      point.y >= this.y &&
      point.y <= this.bottom
    );
  }

  intersects(other: Box): boolean {
    return (
      this.x < other.right &&
      this.right > other.x &&
      this.y < other.bottom &&
      this.bottom > other.y
    );
  }
}
