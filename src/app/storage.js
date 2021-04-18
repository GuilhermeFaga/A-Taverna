export function checkStorage(key) {
  return !!localStorage.getItem(key);
}

export function writeToStorage(key, data) {
  localStorage.setItem(
    key,
    typeof data == "object" ? JSON.stringify(data) : data
  );
}

export function readFromStorage(key) {
  let data = localStorage.getItem(key);
  try {
    data = JSON.parse(data);
  } catch (e) {}
  return data;
}
