import { format } from "date-fns";

const formatCreateDate = (date) => {
  return format(Date.parse(date), `yyyy`);
};

export default formatCreateDate;
