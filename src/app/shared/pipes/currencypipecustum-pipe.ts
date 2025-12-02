
import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencypipecustum',
})
export class CurrencypipecustumPipe implements PipeTransform {

   constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: number, currency: string = 'NPR'): string | null {
    const formatted = this.currencyPipe.transform(value, currency, 'code', '1.2-2');
    return formatted ? formatted.replace(currency, currency + ' ') : null;
  }

}
