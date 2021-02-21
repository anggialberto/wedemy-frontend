import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        return 'Baru saja';
      const intervals = {
        'tahun': 31536000,
        'bulan': 2592000,
        'minggu': 604800,
        'hari': 86400,
        'jam': 3600,
        'menit': 60,
        'detik': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) return counter + ' ' + i + ' yang lalu';
      }
    }
    return value;
  }

}
