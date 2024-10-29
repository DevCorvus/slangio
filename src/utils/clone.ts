export function cloneObject<T extends object>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
