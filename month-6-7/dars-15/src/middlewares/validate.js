import { loginSchema, registerSchema, VideoDeltedSchema, VideoPutSchema, VideoSchema } from "../utils/validation.js"

export default (req, res, next) => {
  try {
      if(req.url == '/login' && req.method == 'POST'){
        let { error } = loginSchema.validate(req.body)
        if(error) throw error
      }

      if (req.url == '/register' && req.method == 'POST') {
        let { error } = registerSchema.validate(req.body);
        if (error) throw error;
      }

      if (req.url == '/admin/videos' && req.method == 'POST') {
        let { name, size } = req.files.video
        let { error } = VideoSchema.validate({ ...req.body, video: name, size: size });
        if (error) throw error;
      }
      if (req.url == `/admin/videos/${req.params.videoId}` && req.method == 'PUT') {
        let { videoId } = req.params
        let { error } = VideoPutSchema.validate({body: { title: req.body.title }, params: { videoId: videoId } });
        if (error) throw error;
      }

      if (req.url == `/admin/videos/${req.params.videoId}` && req.method == 'DELETE') {
        let { videoId } = req.params
        let { error } = VideoDeltedSchema.validate({params: { videoId: videoId } });
        if (error) throw error;
      }

      return next()
  } catch (error) {
    res.status(400).json({status: 400, message: error.message})
  }
}

