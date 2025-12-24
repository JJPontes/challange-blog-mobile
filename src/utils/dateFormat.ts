const formatDate = (data: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(data);
};

const formatStringForDate = (str: string): string => {
  const data = new Date(str);

  return data.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export { formatDate, formatStringForDate };
