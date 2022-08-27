// triggers on a new sleep with a certain tag
const { getDateRange } = require('../../utils/dateUtils')
const { getTotalMinutes, getMinutes, getHours, getReadableTime } = require('../../utils/timeUtils')
const { getRestingHeartRate, getRestfulness } = require('./sleepUtils')
const { getPercentOf } = require('../../utils/mathUtils')

const perform = async (z) => {
  const [start_date, end_date] = getDateRange()

  const getSleepSummary = async (start_date) => {
    const response = await z.request('https://api.ouraring.com/v2/usercollection/daily_sleep', { params: { start_date } })
    return response.json.data?.[0] || null
  }

  const mapToOutputField = async (sleepEntry) => {
    const sleepSummary = await getSleepSummary(sleepEntry.day)

    return {
      id: sleepEntry.day,
      bedtimeStart: new Date(sleepEntry.bedtime_start).toISOString(),
      bedtimeEnd: new Date(sleepEntry.bedtime_end).toISOString(),
      bedtimeEnd4HoursThreshold: new Date(sleepEntry.bedtime_end).addHours(4).toISOString(),
      sleepScore: sleepSummary?.score,
      restingHeartRate: getRestingHeartRate(sleepEntry.heart_rate.items || []),
      averageHeartRate: sleepEntry.average_heart_rate,
      sleepEfficiency: sleepEntry.efficiency / 100,
      restfulness: getRestfulness(sleepSummary?.score),
      latency: getTotalMinutes(sleepEntry.latency),
      sleepTimeSeconds: sleepEntry.total_sleep_duration,
      sleepTimeMinutes: getMinutes(sleepEntry.total_sleep_duration),
      sleepTimeHours: getHours(sleepEntry.total_sleep_duration),
      readableSleepTime: getReadableTime(sleepEntry.total_sleep_duration),
      timeInBedSeconds: sleepEntry.time_in_bed,
      timeInBedMinutes: getMinutes(sleepEntry.time_in_bed),
      timeInBedHours: getHours(sleepEntry.time_in_bed),
      readableTimeInBed: getReadableTime(sleepEntry.time_in_bed),
      awakeTimeSeconds: sleepEntry.awake_time,
      awakeTimeMinutes: getMinutes(sleepEntry.awake_time),
      awakeTimeHours: getHours(sleepEntry.awake_time),
      readableAwakeTime: getReadableTime(sleepEntry.awake_time),
      remSleepSeconds: sleepEntry.rem_sleep_duration,
      remSleepMinutes: getMinutes(sleepEntry.rem_sleep_duration),
      remSleepHours: getHours(sleepEntry.rem_sleep_duration),
      remSleepPercent: getPercentOf(sleepEntry.rem_sleep_duration, sleepEntry.total_sleep_duration),
      readableRemSleep: getReadableTime(sleepEntry.rem_sleep_duration),
      lightSleepSeconds: sleepEntry.light_sleep_duration,
      lightSleepMinutes: getMinutes(sleepEntry.light_sleep_duration),
      lightSleepHours: getHours(sleepEntry.light_sleep_duration),
      lightSleepPercent: getPercentOf(sleepEntry.light_sleep_duration, sleepEntry.total_sleep_duration),
      readableLightSleep: getReadableTime(sleepEntry.light_sleep_duration),
      deepSleepSeconds: sleepEntry.deep_sleep_duration,
      deepSleepMinutes: getMinutes(sleepEntry.deep_sleep_duration),
      deepSleepHours: getHours(sleepEntry.deep_sleep_duration),
      deepSleepPercent: getPercentOf(sleepEntry.deep_sleep_duration, sleepEntry.total_sleep_duration),
      readableDeepSleep: getReadableTime(sleepEntry.deep_sleep_duration),
    }
  }

  const mapToOutputFields = async (sleepArray) => {
    const sleep = []
    for (const sleepEntry of sleepArray) {
      sleep.push(await mapToOutputField(sleepEntry))
    }
    return sleep
  }

  const response = await z.request('https://api.ouraring.com/v2/usercollection/sleep', { params: { start_date, end_date } })

  return mapToOutputFields(response.json.data)
}

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#triggerschema
  key: 'sleep',
  noun: 'Sleep',

  display: {
    label: 'Create Night Sleep Record',
    description: 'Triggers when a sleep entry from last night is processed.',
  },

  operation: {
    perform,
    sample: {
      id: '2022-08-22',
      bedtimeStart: '2022-08-21T22:05:30Z',
      bedtimeEnd: '2022-08-22T06:43:30Z',
      bedtimeEnd4HoursThreshold: '2022-08-22T10:43:30Z',
      sleepScore: 75,
      restingHeartRate: 54,
      averageHeartRate: 72.75,
      sleepEfficiency: 0.75,
      restfulness: 'PAY_ATTENTION',
      latency: 10,
      sleepTimeSeconds: 23340,
      sleepTimeMinutes: 29,
      sleepTimeHours: 6,
      readableSleepTime: '6h 29m',
      timeInBedSeconds: 31080,
      timeInBedMinutes: 38,
      timeInBedHours: 8,
      readableTimeInBed: '8h 38m',
      awakeTimeSeconds: 7740,
      awakeTimeMinutes: 9,
      awakeTimeHours: 2,
      readableAwakeTime: '2h 9m',
      remSleepSeconds: 5520,
      remSleepMinutes: 32,
      remSleepHours: 1,
      remSleepPercent: 0.22,
      readableRemSleep: '1h 32m',
      lightSleepSeconds: 13500,
      lightSleepMinutes: 45,
      lightSleepHours: 3,
      lightSleepPercent: 0.53,
      readableLightSleep: '3h 45m',
      deepSleepSeconds: 6300,
      deepSleepMinutes: 45,
      deepSleepHours: 1,
      deepSleepPercent: 0.25,
      readableDeepSleep: '1h 45m',
    },
    outputFields: [
      {
        key: 'id',
        label: 'Date of Day',
        type: 'string',
      },
      // Bed Time Start
      {
        key: 'bedtimeStart',
        label: 'Bed Time Start',
        helpText: 'Bed Time Start in ISO-8601 format (e.g. 2022-08-21T22:05:30+02:00)',
        type: 'string',
      },
      // Bed Time End
      {
        key: 'bedtimeEnd',
        label: 'Bed Time End',
        helpText: 'Bed Time End in ISO-8601 format (e.g. 2022-08-22T06:43:30+02:00)',
        type: 'string',
      },
      // Bed Time End 4 Hours Threshold
      {
        key: 'bedtimeEnd4HoursThreshold',
        label: 'Bed Time End Threshold',
        helpText:
          'Use this value in combination with condition in Zapier to only trigger event after 4 hours. Oura usually needs at least 4 hours to process the last night.',
        type: 'string',
      },
      // Sleep Score
      {
        key: 'sleepScore',
        label: 'Sleep Score',
        helpText: 'Sleep score as integer (e.g. 75)',
        type: 'integer',
      },
      // Resting Heart Rate
      {
        key: 'restingHeartRate',
        label: 'Resting Heart Rate',
        helpText: 'Resting heart rate as integer (e.g. 54)',
        type: 'integer',
      },
      // Average Heart Rate
      {
        key: 'averageHeartRate',
        label: 'Average Heart Rate',
        helpText: 'Average heart rate as integer (e.g. 72.75)',
        type: 'number',
      },
      // Sleep Efficiency
      {
        key: 'sleepEfficiency',
        label: 'Sleep Efficiency',
        helpText: 'Sleep Efficiency in percent (e.g. 75% -> 0.75)',
        type: 'number',
      },
      // Restfulness
      {
        key: 'restfulness',
        label: 'Restfulness',
        helpText: "Restfulness (e.g. 'Pay attention')",
        choices: ['OPTIMAL', 'GOOD', 'PAY_ATTENTION', 'NOT_APPLICABLE'],
      },
      // Latency
      {
        key: 'latency',
        label: 'Latency',
        helpText: 'The Latency in m (e.g. 20)',
        type: 'integer',
      },
      // Sleep Time
      {
        key: 'sleepTimeSeconds',
        label: 'Total Sleep Time (seconds)',
        helpText: 'Total Sleep Time (e.g. 6:29 -> 23340)',
        type: 'integer',
      },
      {
        key: 'sleepTimeMinutes',
        label: 'Sleep Time (Minutes)',
        helpText: 'Minutes having slept (e.g. 6:29 -> 29)',
        type: 'integer',
      },
      {
        key: 'sleepTimeHours',
        label: 'Sleep Time (Hours)',
        helpText: 'Hours having slept (e.g. 6:29 -> 6)',
        type: 'integer',
      },
      {
        key: 'readableSleepTime',
        label: 'Total Sleep Time in readable form',
        helpText: 'Time having slept in total (e.g. 6:29 -> 6h 29m)',
        type: 'string',
      },
      // Time In Bed
      {
        key: 'timeInBedSeconds',
        label: 'Time In Bed (seconds)',
        helpText: 'Total time being in bed (e.g. 8:38 -> 31080)',
        type: 'integer',
      },
      {
        key: 'timeInBedMinutes',
        label: 'Time In Bed (Minutes)',
        helpText: 'Minutes being in bed (e.g. 8:38 -> 38)',
        type: 'integer',
      },
      {
        key: 'timeInBedHours',
        label: 'Time In Bed (Hours)',
        helpText: 'Hours being in bed (e.g. 8:38 -> 8)',
        type: 'integer',
      },
      {
        key: 'readableTimeInBed',
        label: 'Total Time In Bed Readable Form',
        helpText: 'Time having slept in total (e.g. 8:38 -> 8h 38m)',
        type: 'string',
      },
      // Awake Time
      {
        key: 'awakeTimeSeconds',
        label: 'Total Awake Time (seconds)',
        helpText: 'Total Awake Time (e.g. 2:09 -> 7740)',
        type: 'integer',
      },
      {
        key: 'awakeTimeMinutes',
        label: 'Awake Time (Minutes)',
        helpText: 'Minutes being awake (e.g. 2:09 -> 9)',
        type: 'integer',
      },
      {
        key: 'awakeTimeHours',
        label: 'Awake Time (Hours)',
        helpText: 'Hours being awake (e.g. 2:09 -> 2)',
        type: 'integer',
      },
      {
        key: 'readableAwakeTime',
        label: 'Time awake (total) in readable form',
        helpText: 'Time being awake in total (e.g. 6:29 -> 6h 29m)',
        type: 'string',
      },
      // REM Sleep
      {
        key: 'remSleepSeconds',
        label: 'Total REM Sleep (seconds)',
        helpText: 'Total Awake Time (e.g. 1:32 -> 5520)',
        type: 'integer',
      },
      {
        key: 'remSleepMinutes',
        label: 'REM Sleep (Minutes)',
        helpText: 'REM Sleep in minutes (e.g. 1:32 -> 32)',
        type: 'integer',
      },
      {
        key: 'remSleepHours',
        label: 'REM Sleep (Hours)',
        helpText: 'REM Sleep in hours (e.g. 1:32 -> 1)',
        type: 'integer',
      },
      {
        key: 'remSleepPercent',
        label: 'REM Sleep (Percent)',
        helpText: 'REM Sleep in percent (e.g. 0.22)',
        type: 'number',
      },
      {
        key: 'readableRemSleep',
        label: 'REM Sleep in readable form',
        helpText: 'REM Sleep in total (e.g. 1:32 -> 1h 32m)',
        type: 'string',
      },
      // Light Sleep
      {
        key: 'lightSleepSeconds',
        label: 'Total Light Sleep (seconds)',
        helpText: 'Total Light Sleep Time (e.g. 3:45 -> 13500)',
        type: 'integer',
      },
      {
        key: 'lightSleepMinutes',
        label: 'Light Sleep (Minutes)',
        helpText: 'Light Sleep in minutes (e.g. 3:45 -> 45)',
        type: 'integer',
      },
      {
        key: 'lightSleepHours',
        label: 'Light Sleep (Hours)',
        helpText: 'Light Sleep in hours (e.g. 3:45 -> 3)',
        type: 'integer',
      },
      {
        key: 'lightSleepPercent',
        label: 'Light Sleep (Percent)',
        helpText: 'Light Sleep in percent (e.g. 0.53)',
        type: 'number',
      },
      {
        key: 'readableLightSleep',
        label: 'Light Sleep in readable form',
        helpText: 'Light Sleep in total (e.g. 3:45 -> 3h 45m)',
        type: 'string',
      },
      // Deep Sleep
      {
        key: 'deepSleepSeconds',
        label: 'Total Deep Sleep (seconds)',
        helpText: 'Total Deep Sleep Time (e.g. 1:45 -> 6300)',
        type: 'integer',
      },
      {
        key: 'deepSleepMinutes',
        label: 'Deep Sleep (Minutes)',
        helpText: 'Deep Sleep in minutes (e.g. 1:45 -> 45)',
        type: 'integer',
      },
      {
        key: 'deepSleepHours',
        label: 'Deep Sleep (Hours)',
        helpText: 'Deep Sleep in hours (e.g. 1:45 -> 1)',
        type: 'integer',
      },
      {
        key: 'deepSleepPercent',
        label: 'Deep Sleep (Percent)',
        helpText: 'Deep Sleep in percent (e.g. 0.25)',
        type: 'number',
      },
      {
        key: 'readableDeepSleep',
        label: 'Deep Sleep in readable form',
        helpText: 'Deep Sleep in total (e.g. 1:45 -> 1h 45m)',
        type: 'string',
      },
    ],
  },
}
