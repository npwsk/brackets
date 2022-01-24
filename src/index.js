module.exports = function check(str, bracketsConfig) {
  const sameBrackets = new Set(
    bracketsConfig.filter(([opening, closing]) => opening === closing).map(([bracket]) => bracket)
  );

  const differentBrackets = bracketsConfig.filter(([opening, closing]) => opening !== closing);

  const openingBrackets = new Set(differentBrackets.map(([opening]) => opening));
  const openingToClosing = differentBrackets.reduce(
    (acc, [opening, closing]) => ({ ...acc, [opening]: closing }),
    {}
  );

  const stack = [];
  for (const current of str) {
    if (sameBrackets.has(current)) {
      if (stack.length === 0 || stack[stack.length - 1] !== current) {
        stack.push(current);
        continue;
      }
      stack.pop();
      continue;
    }

    if (openingBrackets.has(current)) {
      stack.push(current);
      continue;
    }

    const latest = stack.pop();
    if (openingToClosing[latest] !== current) {
      return false;
    }
  }

  return stack.length === 0;
};
