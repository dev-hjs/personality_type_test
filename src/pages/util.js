export const findMostFrequentAdditionalData = (data) => {
  const additionalDataMap = new Map();
  data.forEach((item) => {
    const additionalData = item.additionalData;
    additionalDataMap.set(additionalData, (additionalDataMap.get(additionalData) || 0) + 1);
  });

  let mostFrequentData = '';
  let maxFrequency = 0;
  for (const [data, frequency] of additionalDataMap) {
    if (frequency > maxFrequency) {
      mostFrequentData = data;
      maxFrequency = frequency;
    }
  }

  return mostFrequentData;
};
