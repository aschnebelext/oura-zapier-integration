const HOUR_IN_MINUTES = 60;
const MINUTE_IN_SECONDS = 60;

const getTotalMinutes = (timeInSeconds) => Math.round(timeInSeconds / MINUTE_IN_SECONDS);

const getMinutes = (timeInSeconds) => getTotalMinutes(timeInSeconds) % HOUR_IN_MINUTES;

const getHours = (timeInSeconds) => (getTotalMinutes(timeInSeconds) - getMinutes(timeInSeconds)) / HOUR_IN_MINUTES;

const getReadableTime = (timeInSeconds) => `${getHours(timeInSeconds)}h ${getMinutes(timeInSeconds)}m`;

module.exports = {
  getTotalMinutes,
  getMinutes,
  getHours,
  getReadableTime,
};
