import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true
})
export class ShortenPipe implements PipeTransform {

  transform(val: string, words: number = 10): string {
    const wordsArray = val.split(' ');
    if (wordsArray.length > words) {
      return wordsArray.slice(0, words).join(' ') + '...';
    }
    return val;
  }
  
}
