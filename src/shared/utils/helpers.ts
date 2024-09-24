export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts!.pop()!.split(';').shift();
}

export function assign<T extends object = object, K extends keyof T = keyof T>(
  obj: T,
  key: K,
  value: T[K]
) {
  obj[key] = value;
}

export function ucFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
