import { format } from "date-fns";

const formatCreateDate = (date) => {
  if (date) { return format(Date.parse(date), `yyyy`); }
  return "";
 
};

export default formatCreateDate;
