// get the formatted date in dd/mm/yy format
export const formattedDateInSlashFormat = (d = new Date()) => {
  let month = String(d.getUTCMonth() + 1);
  let day = String(d.getUTCDate());
  const year = String(d.getUTCFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${day}/${month}/${year}`;
};
