import { categorizeEvent } from "./utils/categorize";


describe('categorizeEvent', () => {
  it('should categorize as Work', () => {
    expect(categorizeEvent('Client Meeting')).toBe('Work');
    expect(categorizeEvent('Submit Project')).toBe('Work');
  });

  it('should categorize as Personal', () => {
    expect(categorizeEvent('Birthday party')).toBe('Personal');
    expect(categorizeEvent('Family vacation')).toBe('Personal');
  });

  it('should categorize as Other', () => {
    expect(categorizeEvent('Go shopping')).toBe('Other');
    expect(categorizeEvent('Visit museum')).toBe('Other');
  });

  it('should check notes if title doesn\'t match', () => {
    expect(categorizeEvent('Just a random title', 'I have a meeting')).toBe('Work');
    expect(categorizeEvent('Nothing special', 'Birthday reminder')).toBe('Personal');
  });
});
