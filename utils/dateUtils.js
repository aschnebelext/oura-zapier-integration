const getFormattedDate = (date) => date && new Intl.DateTimeFormat('fr-ca').format(date);

const getDateRange = (startDate, endDate) => {
  let start_date = startDate && new Date(startDate);
  let end_date = endDate && new Date(endDate);

  if (end_date && (start_date > end_date)) {
    return [null, null];
  }

  start_date = getFormattedDate(start_date);
  end_date = getFormattedDate(end_date);

  if (end_date == null || end_date === start_date) {
    const yesterday = new Date(startDate);
    yesterday.setDate(yesterday.getDate() - 1);
    start_date = getFormattedDate(yesterday);
    end_date = getFormattedDate(new Date(startDate));
  }

  return [start_date, end_date];
};

module.exports = {
  getFormattedDate,
  getDateRange,
};
