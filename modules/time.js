import {timeIndicator,
} from "./Valuables.js";
import { DateTime } from './luxon.min.js';

const getLocalTime = () => {
    const currentTimeDate = DateTime.now()
    const time = currentTimeDate.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
    return time;
  };

const getTime = () => {
    setInterval(() => {
      timeIndicator.innerHTML = getLocalTime();
    }, 1000);
  };

  export default getTime
