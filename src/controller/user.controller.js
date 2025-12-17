// 控制器负责接收请求并返回响应

const { UserModel } = require("../models/user.model.js");
const { catchAsync } = require("../utils/catchAsync.js");
const { CustomError, MissingFieldError } = require("../utils/error.js");
const { success } = require("../utils/response.js");

// 新增校验函数
async function validateFields(req, next) {
  const { username, password, email, phone, avatar, age, createAt } = req.body;

  // user、password、email、phone 必填字段
  const requiredFields = { username, password, email, phone };
  const missingFields = Object.entries(requiredFields)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return next(new MissingFieldError(missingFields.join(", ")));
  }
  // user 唯一性
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return next(new CustomError("用户名已存在", 400));
  }
  // email 和 phone 唯一性
  const existingEmail = await UserModel.findOne({ email });
  if (existingEmail) {
    return next(new CustomError("邮箱已存在", 400));
  }
  const existingPhone = await UserModel.findOne({ phone });
  if (existingPhone) {
    return next(new CustomError("手机号已存在", 400));
  }
}

// 编辑校验函数
// 优化版本 - 减少数据库查询
async function validateUpdateFields(req, next) {
  const { id, username, password, email, phone, avatar, age, createAt } =
    req.body;

  if (!id) {
    return next(new MissingFieldError("id"));
  }

  // 一次性获取当前用户信息
  const currentUser = await UserModel.findById(id);
  if (!currentUser) {
    return next(new CustomError("用户不存在", 404));
  }

  // 只有当字段被修改时才进行唯一性校验
  if (username && currentUser.username !== username) {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return next(new CustomError("用户名已存在", 400));
    }
  }

  if (email && currentUser.email !== email) {
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return next(new CustomError("邮箱已存在", 400));
    }
  }

  if (phone && currentUser.phone !== phone) {
    const existingPhone = await UserModel.findOne({ phone });
    if (existingPhone) {
      return next(new CustomError("手机号已存在", 400));
    }
  }
}

// 新增用户
async function addUser(req, res, next) {
  try {
    await validateFields(req, next);

    const user = await UserModel.create({
      username,
      password,
      email,
      phone,
      avatar,
      age,
      createAt,
    });

    success(res, "用户创建成功", user);
  } catch (e) {
    // 捕获到 Mongoose 错误后，将其交给 Express 的下一个处理函数。
    // 因为这是异步操作，所以必须显式地调用 next(e)
    return next(e);
  }
}

// 如前所述，在每个异步路由中重复写 try...catch 和 return next(e) 会非常繁琐。最好的方法是使用一个高阶函数（High-Order Function）来包装您的异步路由函数，从而实现错误集中处理。
// 下面是优化后的写法，后面接口都采用优化后的写法

// 新增用户 (现在它不再需要 try...catch 块)
// const addUser = catchAsync(async (req, res, next) => {
//     // 注意：这里不再需要显式使用 next，因为错误会被 catchAsync 捕获
//
//     const { username, password, email, phone, avatar, age, createAt } = req.body;
//
//     // 数据库操作：如果失败 (例如 Mongoose 验证失败)，错误会被自动抛出并被 catchAsync 捕获
//     const user = await UserModel.create({
//         username,
//         password,
//         email,
//         phone,
//         avatar,
//         age,
//         createAt
//     });
//
//     res.json({
//         code: 200,
//         message:'success',
//         data: user
//     });
// });

// 获取所有用户 + 分页
const getUserList = catchAsync(async (req, res, next) => {
  let { page, pageSize } = req.query;

  page = Number(page);
  pageSize = Number(pageSize);

  // 参数校验
  if (page < 1) page = 1;
  if (pageSize < 1 || pageSize > 100) pageSize = 10;

  // 计算总数（排除软删除）
  const total = await UserModel.countDocuments({ isDeleted: false });

  // 分页查询（排除软删除）
  const list = await UserModel.find({ isDeleted: false })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 });

  const data = {
    list,
    total,
    page,
    pageSize,
  };
  success(res, "分页查询成功", data);
});

// 更新用户
const updateUser = catchAsync(async (req, res, next) => {
  await validateUpdateFields(req, next);

  const { id, username, password, email, phone, avatar, age, createAt } =
    req.body;

  const user = await UserModel.findByIdAndUpdate(
    id,
    {
      username,
      password,
      email,
      phone,
      avatar,
      age,
      createAt,
      updateAt: Date.now(),
    },
    // 返回更新后的用户数据，这样做的好处是能够立即获取到更新后的用户信息，而不需要再次查询数据库。
    { new: true },
  );
  success(res, "更新成功", user);
});

// 删除用户
const deleteUser = catchAsync(async (req, res, next) => {
  const { ids } = req.body;

  if (!ids) {
    return next(new MissingFieldError("id"));
  }

  // 物理删除
  // await UserModel.findByIdAndDelete(id);
  // 批量软删除
  const idsArr = ids.split(",");
  await UserModel.updateMany(
    { _id: { $in: idsArr } },
    { isDeleted: true, deleteAt: Date.now() },
  );

  success(res, "删除成功");
});

// 获取用户详情
const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new MissingFieldError("id"));
  }

  const user = await UserModel.findById(id);

  if (!user) {
    return next(new CustomError("用户不存在", 404));
  }
  success(res, "查询成功", user);
});

module.exports = {
  addUser,
  getUserList,
  updateUser,
  deleteUser,
  getUserById,
};
