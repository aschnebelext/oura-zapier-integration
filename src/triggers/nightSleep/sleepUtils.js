const getRestingHeartRate = (heartRates) => {
  const sanitizedHeartRates = heartRates.filter((rate) => rate != null)

  if (sanitizedHeartRates.length === 0) {
    return 0
  }

  return Math.min(...sanitizedHeartRates)
}

const getRestfulness = (score) => {
  if (score == null) return 'NOT_APPLICABLE'

  if (score >= 85) {
    return 'OPTIMAL'
  }
  if (score >= 70) {
    return 'GOOD'
  }
  return 'PAY_ATTENTION'
}

module.exports = {
  getRestingHeartRate,
  getRestfulness,
}
