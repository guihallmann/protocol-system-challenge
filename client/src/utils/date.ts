export const formatDate = (date: string) => {
  const dateUTC = new Date(Date.parse(date));
  const localDate = dateUTC.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return localDate;
};
