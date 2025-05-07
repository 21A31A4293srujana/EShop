import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'electronicsColor',
  standalone: true
})
export class ElectronicsColorPipe implements PipeTransform {
  transform(value: string): string {
    // Basic color mapping for electronics
    const colorMap: { [key: string]: string } = {
      'SILVER': '#C0C0C0',
      'BLACK': '#000000',
      'WHITE': '#FFFFFF',
      'GOLD': '#FFD700',
      'SPACE_GRAY': '#717378',
      'ROSE_GOLD': '#B76E79',
      'BLUE': '#0000FF',
      'RED': '#FF0000'
    };
    
    // Convert input to uppercase for case-insensitive matching
    const upperValue = value.toUpperCase();
    return colorMap[upperValue] || value;
  }
} 