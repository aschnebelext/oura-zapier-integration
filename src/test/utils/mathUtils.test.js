const { getPercentOf } = require('../../utils/mathUtils')

describe('mathUtils', () => {
  describe('getPercentOf', () => {
    it('should calculate percentage', () => {
      // Arrange
      const sub = 30
      const sum = 100
      // Act
      const result = getPercentOf(sub, sum)
      // Assert
      expect(result).toEqual(0.3)
    })

    it('should round percentage to 2 decimal places', () => {
      // Arrange
      const sub = 33
      const sum = 100
      // Act
      const result = getPercentOf(sub, sum)
      // Assert
      expect(result).toEqual(0.33)
    })

    it('should return 0 if sub is null', () => {
      // Arrange
      const sub = null
      const sum = 100
      // Act
      const result = getPercentOf(sub, sum)
      // Assert
      expect(result).toEqual(0)
    })

    it('should return 0 if sub is undefined', () => {
      // Arrange
      const sub = undefined
      const sum = 100
      // Act
      const result = getPercentOf(sub, sum)
      // Assert
      expect(result).toEqual(0)
    })

    it('should return 0 if sum is 0', () => {
      // Arrange
      const sub = 30
      const sum = 0
      // Act
      const result = getPercentOf(sub, sum)
      // Assert
      expect(result).toEqual(0)
    })
  })
})
