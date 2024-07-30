import { ReadablePipe } from './readable.pipe';

describe('Readable Pipe', () => {
  const pipe = new ReadablePipe();

  it('transforms "member_magazine" to "Member Magazine"', () => {
    expect(pipe.transform('member_magazine')).toBe('Member Magazine');
  });


  it('transforms "member-magazine" to "Member Magazine"', () => {
    expect(pipe.transform('member-magazine')).toBe('Member Magazine');
  });


  it('transforms "another_example_text" to "Another Example Text"', () => {
    expect(pipe.transform('another_example_text')).toBe('Another Example Text');
  });

  it('returns empty string for empty input', () => {
    expect(pipe.transform('')).toBe('');
  });
});
