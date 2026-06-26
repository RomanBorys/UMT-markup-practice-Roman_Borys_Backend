export function notFoundHandler(req, _res, next) {
  const error = new Error(
    `Route ${req.method} ${req.originalUrl} not found`,
  );

  error.status = 404;

  next(error);
}