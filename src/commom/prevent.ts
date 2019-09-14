export function ignoreFavicon(req:any, res:any, next:any) {
    if (req.originalUrl === '/favicon.ico') {
      res.status(204).json({nope: true});
    } else {
      next();
    }
  }