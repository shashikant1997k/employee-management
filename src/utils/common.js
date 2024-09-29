import { message } from "antd";
import {
  ERROR_MESSAGE_400,
  ERROR_MESSAGE_404,
  ERROR_MESSAGE_500,
  ERROR_MSG_TYPE,
  INFO_MSG_TYPE,
  SUCCESS_MSG_TYPE,
  WARNING_MSG_TYPE,
} from "@/constants/hardData";

export const interpolate = function (theString, argumentArray) {
  const regex = /%s/;
  const _r = function (p, c) {
    return p.replace(regex, c);
  };
  return argumentArray.reduce(_r, theString);
};

export const displayMessage = function (type, msg) {
  if (type === SUCCESS_MSG_TYPE)
    message.success({
      content: msg,
      duration: 5,
      style: {
        marginTop: "10vh",
      },
    });
  else if (type === INFO_MSG_TYPE)
    message.info({
      content: msg,
      style: {
        marginTop: "10vh",
      },
    });
  else if (type === WARNING_MSG_TYPE)
    message.warning({
      content: msg,
      style: {
        marginTop: "10vh",
      },
    });
  else if (type === ERROR_MSG_TYPE)
    message.error({
      content: msg,
      style: {
        marginTop: "10vh",
      },
    });
};

export const handleErrorResponse = function (error) {
  const { response } = error;
  if (response) {
    const { status } = response;
    if (status === 400) {
      if (response.data.message) {
        message.error(response.data.message);
      } else {
        message.error(ERROR_MESSAGE_400);
      }
    } else if (status === 404) {
      if (response.data.message) {
        message.error(response.data.message);
      } else {
        message.error(ERROR_MESSAGE_404);
      }
    } else if (status === 500) {
      message.error(ERROR_MESSAGE_500);
    }
  } else {
    // message.error(ERROR_INTERNET_CONNECTIVITY);
  }
};

export const stringCapitalize = (stringValue) => {
  if (stringValue) {
    return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
  } else {
    return " ";
  }
};
