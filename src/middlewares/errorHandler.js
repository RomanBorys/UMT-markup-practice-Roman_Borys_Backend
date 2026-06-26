export function errorHandler(error, _req, res, _next) {
  const status = Number.isInteger(error.status)
    ? error.status
    : 500;

  if (status >= 500) {
    console.error(error);
  }

  const message =
    status >= 500
      ? "Internal server error"
      : error.message || "Request failed";

  res.status(status).json({
    message,
  });
}