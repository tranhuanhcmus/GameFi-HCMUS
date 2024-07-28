export const getFilenameFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/");
  return parts[parts.length - 1];
};
export const calculateTimeDifference = (givenTimeStr) => {
  const givenTime = new Date(givenTimeStr);
  const adjustedGivenTime = new Date(givenTime.getTime() + 4 * 60 * 60 * 1000);
  const currentTime = new Date();

  if (currentTime > adjustedGivenTime) {
    return { hours: 0, minutes: 0, timeDifference: 0 };
  }

  const timeDifference = adjustedGivenTime - currentTime;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { hours: hours, minutes: minutes, timeDifference: timeDifference };
};
