const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // let customError = {
  //   //set default
  // }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later', 
  };
  //for searching for a not found id, especially with wrong number of digits
  if (err.name === 'CastError') {
    customError.msg = `no item found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  //for missing email or password when registering
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(',');
    customError.statusCode = 400;
  }
  //for duplicate emails when registering
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please chosse another value.`;
    customError.statusCode = 400;
  }
  
  return res.status(customError.statusCode).json({msg: customError.msg});

}

module.exports = errorHandlerMiddleware
