import jwt from 'jsonwebtoken'
import { asyncHandler } from '../../../utils/asyncHandler.js'
import { ApiError } from '../../../utils/ApiError.js'
import { ApiResponse } from '../../../utils/ApiResponse.js'
import { User } from '../../../models/index.js'

const registerUser = asyncHandler(async (req, res) => {
  const { name, mobileNumber, password, address = '' } = req.body

  if (
    [name, mobileNumber, password].some((field) => !field || field?.trim === '')
  ) {
    throw new ApiError(
      400,
      'Name, Mobile Number and Password fields are required'
    )
  }

  const isExistingUser = await User.findOne({
    where: { mobileNumber },
  })
  if (isExistingUser) {
    throw new ApiError(409, 'User with this mobileNumber already exists!')
  }

  const user = await User.create({
    name,
    mobileNumber,
    password,
    address,
  })

  return res
    .status(201)
    .json(new ApiResponse(200, user, 'User registered successfully'))
})

const loginUser = asyncHandler(async (req, res) => {
  const { mobileNumber, password } = req.body

  if ([mobileNumber, password].some((field) => !field || field?.trim === '')) {
    throw new ApiError(400, 'Mobile Number and Password fields are required')
  }

  const isExistingUser = await User.findOne({
    where: { mobileNumber },
  })
  if (!isExistingUser) {
    throw new ApiError(404, 'User with this mobileNumber does not exist!')
  }

  if (isExistingUser.password !== password) {
    throw new ApiError(401, 'Password is incorrect!')
  }

  const accessToken = jwt.sign(
    {
      id: isExistingUser.id,
      name: isExistingUser.name,
      mobileNumber: isExistingUser.mobileNumber,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: isExistingUser,
          accessToken,
        },
        'Logged in successfully'
      )
    )
})

const getAllUsers = asyncHandler(async (_, res) => {
  const users = await User.findAll({
    attributes: ['name', 'postCount', 'mobileNumber'],
  })
  return res.status(200).json(new ApiResponse(200, users))
})

export { registerUser, loginUser, getAllUsers }
