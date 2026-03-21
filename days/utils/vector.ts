export type Vec2 = { i: number; j: number };

export function create(j: number, i: number): Vec2 {
  return { i, j };
}

export function rotate(vec: Vec2, rad: number): Vec2 {
  return create(
    vec.j * Math.cos(rad) - vec.i * Math.sin(rad),
    vec.j * Math.sin(rad) + vec.i * Math.cos(rad),
  );
}

export function round(vec: Vec2): Vec2 {
  return create(Math.round(vec.j), Math.round(vec.i));
}

export function up(): Vec2 {
  return create(0, -1);
}

export function sum(vec: Vec2, and: Vec2): Vec2 {
  return create(and.j + vec.j, and.i + vec.i);
}

export function stringify(vec: Vec2): string {
  return `${vec.i}-${vec.j}`;
}

export function fromString(stringified: string): Vec2 {
  const [iStr, jStr] = stringified.split("-");
  const vec = { i: parseFloat(iStr), j: parseFloat(jStr) };

  if (Number.isNaN(vec.i) || Number.isNaN(vec.j)) {
    throw new Error("couldnt parse vector from string");
  }

  return vec;
}

export function equals(vec1: Vec2, vec2: Vec2) {
  return vec1.i === vec2.i && vec1.j === vec2.j;
}

export function setToArray(set: VectorSet) {
  return Array.from(set, (item) => fromString(item));
}

export class VectorSet extends Set {
  override has(vec: Vec2) {
    return super.has(stringify(vec));
  }

  override add(vec: Vec2) {
    return super.add(stringify(vec));
  }

  override delete(vec: Vec2) {
    return super.delete(stringify(vec));
  }
}
