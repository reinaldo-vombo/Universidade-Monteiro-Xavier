export function formatDate(date: Date) {
  const month = date.toLocaleString('pt-PT', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('pt-PT', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${month.charAt(0).toUpperCase() + month.slice(1)} ${day}, ${year} |  ${time}`;
}
