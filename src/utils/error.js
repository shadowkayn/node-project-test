// 根据业务需求扩展更多具体错误类型

const AppError = require("./AppError.js");

class CustomError extends AppError {
  constructor(message, statusCode) {
    super(message, statusCode);
  }
}

// 无权限
class UnauthorizedError extends CustomError {
  constructor(message = "无权限") {
    super(message, 401);
  }
}

// 接口不存在
class NotFoundError extends CustomError {
  constructor(message = "接口不存在") {
    super(message, 404);
  }
}

// 字段缺失
class MissingFieldError extends CustomError {
  constructor(fieldName) {
    super(`${fieldName}字段缺失`, 400);
    this.fieldName = fieldName;
  }
}

module.exports = {
  CustomError,
  UnauthorizedError,
  NotFoundError,
  MissingFieldError,
};
