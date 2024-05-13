export { transformVKBridgeAdaptivity } from "./transformVKBridgeAdaptivity";

export function doubleArray<T>(arr: T[]): void {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    arr.push(arr[i]);
  }
}

export function shuffleArray<T>(arr: T[]): void {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const j = Math.floor(Math.random() * len);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}
