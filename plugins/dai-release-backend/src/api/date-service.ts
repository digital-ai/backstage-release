import { ReleaseFallBackOverview } from '@digital-ai/plugin-dai-release-common';

export const convertIsoToLongDatetime = (dateString: string) => {
  const date = new Date(dateString);
  return date.getTime();
};

export const getEndOrDueDate = (data: ReleaseFallBackOverview) => {
  let date =
    convertIsoToLongDatetime(data.endDate) ||
    convertIsoToLongDatetime(data.dueDate);
  if (
    date &&
    data.type === 'xlrelease.Release' &&
    data.status === 'IN_PROGRESS'
  ) {
    date = Math.max(date, convertIsoToLongDatetime(new Date().toISOString()));
  }
  return date;
};

export const getStartOrScheduledDate = (data: ReleaseFallBackOverview) => {
  const date =
    convertIsoToLongDatetime(data.startDate) ||
    convertIsoToLongDatetime(data.scheduledStartDate);
  return date;
};
