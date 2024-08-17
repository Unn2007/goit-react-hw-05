import { format } from "date-fns";

const formatFotoCreateDate = (date) => {
  return format(Date.parse(date), `dd MMMM yyyy, HH:mm`);
};

export default formatFotoCreateDate;
