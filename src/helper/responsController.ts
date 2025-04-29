
export const success = (statusCode: Number, result: any) => {
    return {
      status: "ok",
      statusCode,
      result,
    };
  };
  
  export const error = (statusCode: Number, result: any) => {
    return {
      status: "error",
      statusCode,
      result,
    };
  };
  