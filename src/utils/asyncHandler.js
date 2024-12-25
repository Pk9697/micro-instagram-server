const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    return await requestHandler(req, res, next)
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    })
  }
}

export { asyncHandler }
