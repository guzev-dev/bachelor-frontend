
export function numberWithSpaces(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function toUADateFormat(date: Date) {
  date = new Date(date);
  let array: string[] = date.toLocaleDateString().split('/');
  return [array[1].padStart(2, '0'), array[0].padStart(2, '0'), array[2]].join('.');
}
