import dayjs from 'dayjs';
import moment from 'moment';

export const releaseDateFormat = 'M/D/YY h:mm A';

export const formatTimestamp = (arg: any) =>
  arg ? moment(arg).format(releaseDateFormat) : '';

export const convertUnixTimestamp = (datetime: dayjs.Dayjs | null) =>
  datetime?.toDate() !== undefined
    ? new Date(datetime?.toDate()).getTime()
    : '';
