export function doubled<T>(arr: T[]): T[] {
  const result = [...arr];
  const len = result.length;
  for (let i = 0; i < len; i++) {
    result.push(result[i]);
  }
  return result;
}

export function shuffled<T>(arr: T[]): T[] {
  const result = [...arr];
  const len = result.length;
  for (let i = 0; i < len; i++) {
    const j = Math.floor(Math.random() * len);
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}
