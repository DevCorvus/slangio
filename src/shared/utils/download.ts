export function downloadJson(filename: string, data: object) {
  const dataStr = JSON.stringify(data);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const dataUrl = URL.createObjectURL(dataBlob);

  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename + '.json';

  a.click();

  URL.revokeObjectURL(dataUrl);
}
