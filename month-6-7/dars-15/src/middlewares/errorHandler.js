import fs from 'fs';
import path from 'path';

export default (error, req, res, next) => {
  if (error.status != 500) {
    return res
      .status(error.status)
      .json({ status: error.status, name: error.name, message: error.message });
  }

  res.status(500).json({
    status: 500,
    message: error.name,
  });
};
