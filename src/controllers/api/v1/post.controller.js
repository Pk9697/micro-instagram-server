import fs from 'fs'
import { User, Post } from '../../../models/index.js'
import { ApiError } from '../../../utils/ApiError.js'
import { ApiResponse } from '../../../utils/ApiResponse.js'
import { asyncHandler } from '../../../utils/asyncHandler.js'

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.findAll({
    include: [
      {
        model: User,
        as: 'userDetails',
        attributes: ['name', 'mobileNumber'],
      },
    ],
  })
  return res.status(200).json(new ApiResponse(200, posts))
})

const getUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const posts = await Post.findAll({ where: { userId } })
  return res.status(200).json(new ApiResponse(200, posts))
})

const createPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  const { id: userId } = req.user

  if ([title, description].some((field) => !field || field?.trim === '')) {
    throw new ApiError(400, 'Title and Description fields are required')
  }

  const images = req.files.map((file) => file.path)
  if (images.length === 0) {
    throw new ApiError(400, 'At least one image is required')
  }

  const post = await Post.create({
    title,
    description,
    userId,
    images,
  })
  // update post count of the user
  await User.increment({ postCount: 1 }, { where: { id: userId } })

  return res.status(201).json(new ApiResponse(201, post))
})

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params
  const { id: userId } = req.user

  const post = await Post.findByPk(postId)
  if (!post) {
    throw new ApiError(404, 'Post not found')
  }

  if (post.userId !== userId) {
    throw new ApiError(403, 'You are not authorized to delete this post')
  }
  // update post count of the user
  await User.decrement({ postCount: 1 }, { where: { id: post.userId } })

  await post.images.forEach((localFilePath) => {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath)
  })

  await Post.destroy({ where: { id: postId } })

  return res.status(200).json(new ApiResponse(200, 'Post deleted successfully'))
})

const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params
  const { title, description } = req.body
  const { id: userId } = req.user

  const post = await Post.findByPk(postId)
  if (!post) {
    throw new ApiError(404, 'Post not found')
  }

  if (post.userId !== userId) {
    throw new ApiError(403, 'You are not authorized to update this post')
  }
  if (title) {
    post.title = title
  }
  if (description) {
    post.description = description
  }
  await post.save()

  return res.status(200).json(new ApiResponse(200, post))
})

export { getAllPosts, createPost, getUserPosts, deletePost, updatePost }
