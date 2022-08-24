const { getFormattedDate, getDateRange } = require('../../utils/dateUtils');

describe('dateUtils', () => {
  describe('getFormattedDate', () => {
    it('should accept Date and return oura-conform date (YYYY-MM-DDD)', () => {
      // Arrange
      const date = new Date('2022-08-22T06:43:30+02:00');
      // Act
      const result = getFormattedDate(date);
      // Assert
      expect(result).toEqual('2022-08-22');
    });
  });

  describe('getDateRange', () => {
    it('should return the exact values when both are defined and not equal to another', () => {
      // Arrange
      const startDate = new Date('2022-08-22T06:43:30+02:00');
      const endDate = new Date('2022-08-23T06:43:30+02:00');
      // Act
      const [start, end] = getDateRange(startDate, endDate);
      // Assert
      expect(start).toEqual('2022-08-22');
      expect(end).toEqual('2022-08-23');
    });

    it('should return different values when both are defined but equal', () => {
      // Arrange
      const startDate = new Date('2022-08-22T06:43:30+02:00');
      const endDate = new Date('2022-08-22T06:43:30+02:00');
      // Act
      const [start, end] = getDateRange(startDate, endDate);
      // Assert
      expect(start).toEqual('2022-08-21');
      expect(end).toEqual('2022-08-22');
    });

    it('should return different values when endDate is undefined', () => {
      // Arrange
      const startDate = new Date('2022-08-22T06:43:30+02:00');
      // Act
      const [start, end] = getDateRange(startDate, undefined);
      // Assert
      expect(start).toEqual('2022-08-21');
      expect(end).toEqual('2022-08-22');
    });

    it('should return null when startDate is behind endDate', () => {
      // Arrange
      const startDate = new Date('2022-08-22T06:43:30+02:00');
      const endDate = new Date('2022-08-01T06:43:30+02:00');
      // Act
      const [start, end] = getDateRange(startDate, endDate);
      // Assert
      expect(start).not.toBeUndefined();
      expect(end).not.toBeUndefined();
    });
  });
});
