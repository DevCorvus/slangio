export function localeDateNow() {
  return new Date().toLocaleDateString().replace(/\//g, '-');
}
