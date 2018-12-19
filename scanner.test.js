const { scanner, checkSum, report, autofix } = require('./scanner');

describe('scanner', () => {
  it('should read 1', () => {
    const text = '   \n  |\n  |\n   \n';
    expect(scanner(text)).toBe('1');
  });
  it('should read 2', () => {
    const text = ' _ \n _|\n|_ \n   \n';
    expect(scanner(text)).toBe('2');
  });
  it('should read 3', () => {
    const text = ' _ \n _|\n _| \n   \n';
    expect(scanner(text)).toBe('3');
  });
  it('should read 4', () => {
    const text = '   \n|_|\n  |\n   \n';
    expect(scanner(text)).toBe('4');
  });
  it('should read 5', () => {
    const text = ' _ \n|_ \n _|\n   \n';
    expect(scanner(text)).toBe('5');
  });
  it('should read 6', () => {
    const text = ' _ \n|_ \n|_|\n   \n';
    expect(scanner(text)).toBe('6');
  });
  it('should read 7', () => {
    const text = ' _ \n  |\n  |\n   \n';
    expect(scanner(text)).toBe('7');
  });
  it('should read 8', () => {
    const text = ' _ \n|_|\n|_|\n   \n';
    expect(scanner(text)).toBe('8');
  });
  it('should read 9', () => {
    const text = ' _ \n|_|\n _|\n   \n';
    expect(scanner(text)).toBe('9');
  });
  it('should read 0', () => {
    const text = ' _ \n| |\n|_|\n   \n';
    expect(scanner(text)).toBe('0');
  });
  it('should read 1234567890', () => {
    const text = [
      '    _  _     _  _  _  _  _  _ ',
      '  | _| _||_||_ |_   ||_||_|| |',
      '  ||_  _|  | _||_|  ||_| _||_|',
      '                              '
    ].join('\n');
    expect(scanner(text)).toBe('1234567890');
  });
  it('should read 123456?89', () => {
    const text = [
      '    _  _     _  _  _  _  _ ',
      '  | _| _||_||_ |_   ||_||_|',
      '  ||_  _|  | _||_| _ |_| _|',
      '                           '
    ].join('\n');
    expect(scanner(text)).toBe('123456?89');
  });
});

describe('check sum', () => {
  it('should return 0', () => {
    expect(checkSum('711111111')).toBe(0);
  });
  it('should not be 0', () => {
    expect(checkSum('333333333')).not.toBe(0);
  });

  it('should check 123456?89', () => {
    const text = [
      '    _  _     _  _  _  _  _ ',
      '  | _| _||_||_ |_   ||_||_|',
      '  ||_  _|  | _||_| _ |_| _|',
      '                           '
    ].join('\n');
    expect(report(text)).toBe('123456?89 ILL');
  });
  it('should check 000000051?89', () => {
    const text = [
      ' _  _  _  _  _  _  _  _    ',
      '| || || || || || || ||_   |',
      '|_||_||_||_||_||_||_| _|  |',
      '                           '
    ].join('\n');
    expect(report(text)).toBe('000000051');
  });
  it('should check 123456789 ERR', () => {
    const text = [
      ' _  _  _     _  _  _  _  _ ',
      '| | _| _||_||_ |_   ||_||_|',
      '|_||_  _|  | _||_|  ||_| _|',
      '                           '
    ].join('\n');
    expect(report(text)).toBe('023456789 ERR');
  });
});

describe('Autofixing', () => {
  it('should check 000000051?89', () => {
    const text = [
      ' _  _  _  _  _  _  _  _  _ ',
      '|_||_||_||_||_||_||_||_||_|',
      '|_||_||_||_||_||_||_||_||_|',
      '                           '
    ].join('\n');
    expect(autofix(text)).toBe(
      "88888888 AMB ['888886888', '888888880', 888888988']"
    );
  });
});
