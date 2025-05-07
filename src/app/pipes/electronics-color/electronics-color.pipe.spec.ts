import { ElectronicsColorPipe } from './electronics-color.pipe';

describe('ElectronicsColorPipe', () => {
  let pipe: ElectronicsColorPipe;

  beforeEach(() => {
    pipe = new ElectronicsColorPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform electronics colors correctly', () => {
    expect(pipe.transform('SILVER')).toBe('#C0C0C0');
    expect(pipe.transform('BLACK')).toBe('#000000');
    expect(pipe.transform('WHITE')).toBe('#FFFFFF');
    expect(pipe.transform('GOLD')).toBe('#FFD700');
    expect(pipe.transform('SPACE_GRAY')).toBe('#717378');
    expect(pipe.transform('ROSE_GOLD')).toBe('#B76E79');
    expect(pipe.transform('BLUE')).toBe('#0000FF');
    expect(pipe.transform('RED')).toBe('#FF0000');
  });

  it('should return the original value for unknown colors', () => {
    expect(pipe.transform('UNKNOWN_COLOR')).toBe('UNKNOWN_COLOR');
  });

  it('should handle case-insensitive color names', () => {
    expect(pipe.transform('silver')).toBe('#C0C0C0');
    expect(pipe.transform('Silver')).toBe('#C0C0C0');
    expect(pipe.transform('SILVER')).toBe('#C0C0C0');
  });
}); 