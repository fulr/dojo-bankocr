const lookup = {
  '   ,  |,  |,   ': '1',
  ' _ , _|,|_ ,   ': '2',
  ' _ , _|, _|,   ': '3',
  '   ,|_|,  |,   ': '4',
  ' _ ,|_ , _|,   ': '5',
  ' _ ,|_ ,|_|,   ': '6',
  ' _ ,  |,  |,   ': '7',
  ' _ ,|_|,|_|,   ': '8',
  ' _ ,|_|, _|,   ': '9',
  ' _ ,| |,|_|,   ': '0'
};

const checkSum = text => {
  return (
    Array.from(text)
      .map((char, index) => {
        return (char - '0') * (9 - index);
      })
      .reduce((sum, x) => sum + x, 0) % 11
  );
};

const getRecursive = lines => {
  if (lines[0].length === 0) return '';

  const digit = lines.map(line => line.slice(0, 3)).join(',');
  return (
    (lookup[digit] || '?') + getRecursive(lines.map(line => line.slice(3)))
  );
};

const scanner = text => {
  const lines = text.split('\n').slice(0, 4);

  return getRecursive(lines);
};

const checkIllegal = digits => digits.includes('?');

const fullCheck = text => {
  const digits = scanner(text);
  return checkIllegal(digits) || checkSum(digits) !== 0;
};

const report = text => {
  const digits = scanner(text);
  const illegal = checkIllegal(digits);
  const illegalStr = illegal ? ' ILL' : '';
  const err = !illegal && checkSum(digits) !== 0 ? ' ERR' : '';

  return `${digits}${illegalStr}${err}`;
};

const generateAlternatives = text => {};

const autofix = text => {
  return fullCheck(text) ? text : generateAlternatives(text);
};

module.exports = {
  checkSum,
  scanner,
  report,
  autofix
};
