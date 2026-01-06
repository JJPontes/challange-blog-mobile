const maskPhone = (value: string) => {
  const digits = value.replace(/\D/g, '');

  const limited = digits.slice(0, 11);

  if (limited.length <= 2) {
    return limited.replace(/^(\d{0,2})/, '($1');
  }
  if (limited.length <= 6) {
    return limited.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
  }
  if (limited.length <= 10) {
    return limited.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }
  return limited.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export { maskPhone };
