exports.errorHandler = ((err, req, res, next) => {
    const status = err.status || 500;
  
    // response to client
    return res.status(status).json({
      error: {
        message: err.message,
      },
    });

    next()
  });
  