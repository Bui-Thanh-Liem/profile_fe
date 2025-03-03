export class ConvertTime {
  static getSecond(type: 'DAY' | 'HOURS' | 'MINUS', value: number): number {
    let second = 60;

    if (type === 'DAY') {
      second *= 60 * 60 * 24 * value; // Chuyển đổi ngày sang giây
    } else if (type === 'HOURS') {
      second *= 60 * 60 * value; // Chuyển đổi giờ sang giây
    } else if (type === 'MINUS') {
      second *= value; // Chuyển đổi phút sang giây
    }

    return second;
  }
}
