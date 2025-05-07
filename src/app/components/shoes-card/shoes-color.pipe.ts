import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'electronicsColor'
})
export class ElectronicsColorPipe implements PipeTransform {
  transform(value: string): string {
    // Basic color mapping for electronics
    const colorMap: { [key: string]: string } = {
      'silver': '#C0C0C0',
      'black': '#000000',
      'white': '#FFFFFF',
      'gold': '#FFD700',
      'space gray': '#717378'
    };
    
    return colorMap[value.toLowerCase()] || value;
  }
} 