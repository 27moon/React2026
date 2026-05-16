const KEY = 'searchedChar';

export function saveLS(item: string): void {
  localStorage.setItem(KEY, item);
}

export function getLS(): string {
  return localStorage.getItem(KEY) || '';
}
