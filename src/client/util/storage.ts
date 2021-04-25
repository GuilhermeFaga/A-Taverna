export function checkStorage(key: string) {
  if (typeof window !== "undefined") {
    return !!window.localStorage.getItem(key);
  }
  return false;
}

export function writeToStorage(key: string, data: any) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      key,
      typeof data == "object" ? JSON.stringify(data) : data
    );
  }
}

export function readFromStorage(key: string) {
  if (typeof window !== "undefined") {
    let data = window.localStorage.getItem(key);
    try {
      if (data) data = JSON.parse(data);
    } catch (e) {}
    return data;
  }
  return null;
}
