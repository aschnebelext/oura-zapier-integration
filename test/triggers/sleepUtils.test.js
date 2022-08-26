const { getRestingHeartRate, getRestfulness } = require('../../triggers/nightSleep/sleepUtils');

describe('sleepUtils', () => {
  describe('getRestingHeartRate', () => {
    it('should return the lowest measured heart rate', () => {
      // Arrange
      const heartRates = [78, 65, 54, 88];
      // Act
      const result = getRestingHeartRate(heartRates);
      // Assert
      expect(result).toEqual(54);
    });

    it('should return the lowest measured heart rate even with null/undefined values', () => {
      // Arrange
      const heartRates = [78, 65, null, 54, undefined, 88];
      // Act
      const result = getRestingHeartRate(heartRates);
      // Assert
      expect(result).toEqual(54);
    });

    it('should return 0 when heart rates are empty', () => {
      // Arrange
      const heartRates = [];
      // Act
      const result = getRestingHeartRate(heartRates);
      // Assert
      expect(result).toEqual(0);
    });
  });

  describe('getRestfulness', () => {
    it('should return OPTIMAL when score is 85', () => {
      // Arrange
      const score = 85;
      // Act
      const result = getRestfulness(score);
      // Assert
      expect(result).toEqual('OPTIMAL');
    });

    it('should return GOOD when score is 84', () => {
      // Arrange
      const score = 84;
      // Act
      const result = getRestfulness(score);
      // Assert
      expect(result).toEqual('GOOD');
    });

    it('should return GOOD when score is 70', () => {
      // Arrange
      const score = 70;
      // Act
      const result = getRestfulness(score);
      // Assert
      expect(result).toEqual('GOOD');
    });

    it('should return PAY_ATTENTION when score is below 70', () => {
      // Arrange
      const score = 69;
      // Act
      const result = getRestfulness(score);
      // Assert
      expect(result).toEqual('PAY_ATTENTION');
    });

    it('should return NOT_APPLICABLE when score is null or undefined', () => {
      // Arrange
      const score = undefined;
      // Act
      const result = getRestfulness(score);
      // Assert
      expect(result).toEqual('NOT_APPLICABLE');
    });
  });
});
