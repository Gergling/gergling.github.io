export const mapPolygonPoints = ([x, y]: number[]) => `${x},${y}`;

export const mapPolygons = (polygons: number[][]) => polygons.map(mapPolygonPoints).join(' ');
