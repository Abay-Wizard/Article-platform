// utils/DateConverter.js
const DateConverter = (date) => {
  if (!date) return "";

  const newDate = new Date(date);
  
  return newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", // e.g., "Nov"
    day: "numeric", // e.g., "5"
  });
};

export default DateConverter;
