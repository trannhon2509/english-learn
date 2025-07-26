// Trả về chuỗi gợi ý với các ký tự bị ẩn ngẫu nhiên (không liền kề)
export function getHint(text, hideRatio = 0.5) {
  const chars = text.split('');
  const totalToHide = Math.max(1, Math.floor(chars.length * hideRatio));
  const indices = [];
  while (indices.length < totalToHide) {
    const idx = Math.floor(Math.random() * chars.length);
    if (
      chars[idx].trim() &&
      !indices.includes(idx) &&
      (indices.length === 0 || Math.abs(idx - indices[indices.length - 1]) > 1)
    ) {
      indices.push(idx);
    }
  }
  return chars.map((c, i) => {
    if (c === ' ') return '';
    return indices.includes(i) ? '_ ' : c + ' ';
  }).join('').trim();
}

// Gợi ý cho từ tiếng Anh: chỉ hiện chữ cái đầu, còn lại là dấu gạch dưới
export function getFirstCharHint(text) {
  if (!text || text.length === 0) return '';
  return text[0] + Array(text.length - 1).fill('_').join('');
}
