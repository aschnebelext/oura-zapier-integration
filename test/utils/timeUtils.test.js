const { getTotalMinutes, getMinutes, getHours, getReadableTime } = require('../../utils/timeUtils')

describe('timeUtils', () => {
  describe('getTotalMinutes', () => {
    it('calculates total minutes', () => {
      // Arrange
      const timeInSeconds = 40860
      // Act
      const result = getTotalMinutes(timeInSeconds)
      // Assert
      expect(result).toEqual(681)
    })

    it('calculates total minutes accepting a discrepancy of 29 seconds (round down)', () => {
      // Arrange
      const timeInSeconds = 40889
      // Act
      const result = getTotalMinutes(timeInSeconds)
      // Assert
      expect(result).toEqual(681)
    })

    it('calculates total minutes adding an additional minute by 30 seconds (rounding up)', () => {
      // Arrange
      const timeInSeconds = 40890
      // Act
      const result = getTotalMinutes(timeInSeconds)
      // Assert
      expect(result).toEqual(682)
    })
  })

  describe('getMinutes', () => {
    it('should return the minutes correctly', () => {
      // Arrange
      const timeInSeconds = 40860
      // Act
      const result = getMinutes(timeInSeconds)
      // Assert
      expect(result).toEqual(21)
    })
  })

  describe('getHours', () => {
    it('should return the hours correctly', () => {
      // Arrange
      const timeInSeconds = 40860
      // Act
      const result = getHours(timeInSeconds)
      // Assert
      expect(result).toEqual(11)
    })
  })

  describe('getReadableTime', () => {
    it('should return the reable time correctly', () => {
      // Arrange
      const timeInSeconds = 40860
      // Act
      const result = getReadableTime(timeInSeconds)
      // Assert
      expect(result).toEqual('11h 21m')
    })
  })
})
