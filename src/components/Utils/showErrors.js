import { message } from "antd";

const ERROR_DURATION = 3;

export default (exception, duration = ERROR_DURATION) => {
  console.log("[showErrors.js] exception:", JSON.stringify(exception, null, 2));
  if (exception.graphQLErrors && exception.graphQLErrors.length > 0) {
    const errorMessage = exception.graphQLErrors[0].message;
    if (errorMessage) {
      if (errorMessage.indexOf("duplicate key") > -1) {
        message.error(
          "User already exist with this email! Please try to Login.",
          duration
        );
      } else {
        message.error(errorMessage, duration);
      }
    }
  } else {
    message.error(exception.message, duration);
  }
};
