import Joi from 'joi'

export const loginSchema = Joi.object({
  username: Joi.string().min(2).required(),
  password: Joi.string().min(8).required()
})

export const registerSchema = Joi.object({
  username: Joi.string().min(2).required(),
  password: Joi.string().min(8).required(),
  avatar: Joi.string().pattern(new RegExp(/\.(gif|jpe?g|png|webp)$/i)).error( new Error('avatar rasm xato') )
})

export const VideoSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  video: Joi.string().pattern(new RegExp(/\.(mp4|mov|mkv|3gp)$/i)).error( new Error('video format xato') ),
  size:  Joi.number().max(50 * 1024 * 1024).error( new Error('video size xato') )
})


export const VideoPutSchema = Joi.object({
  body: {
    title: Joi.string().max(50).required()
  },
  params: {
    videoId: Joi.number().required()
  }
})

export const VideoDeltedSchema = Joi.object({
  params: {
    videoId: Joi.number().required(),
  },
});