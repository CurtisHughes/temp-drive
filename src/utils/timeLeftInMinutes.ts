import { DateTime, DurationLike } from 'luxon';

export const calculateTimeLeftInMinutes = (
  createdDateTime: DateTime,
  currentDateTime: DateTime = DateTime.now(),
  duration: DurationLike = { minutes: 15 },
) => createdDateTime.plus(duration).diff(currentDateTime, 'minutes').minutes;
