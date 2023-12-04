import { read, write } from '#model';
import { InternalServerError } from '#error';
import path from 'path';
import moment from 'moment';
import { NotFoundError } from '#error';
import fs from 'fs';
import { formatBytes } from '../utils/baytes.js'

moment.locale('uz-latn');

const GET = (req, res, next) => {
  try {
    let videos = read('videos');
    let users = read('users');
    let {
      userId,
      search,
      page = process.DEFAULT.pagination.page,
      limit = process.DEFAULT.pagination.limit,
    } = req.query;

    if (req.url == '/admin/videos') userId = req.userId;

    let data = videos
      .filter((video) => {
        let byUserId = userId ? video.userId == userId : true;
        let bySearch = search ? video.title.includes(search) : true;

        video.user = users.find(
          (user) => user.userId == video.userId && delete user.password
        );

        video.created_at = moment(video.created_at).format('LLLL');
        video.size = formatBytes(video.size)
        delete video.userId;

        return byUserId && bySearch;
      }).slice((page - 1) * limit, page * limit);

    res.send(data);
  } catch (error) {
    return next(new InternalServerError(500, 'InternalServerError'));
  }
};

const POST = (req, res, next) => {
  try {
    let videos = read('videos');
    let { title } = req.body;
    let { video } = req.files;

    let fileName = Date.now() + video.name.replace(/\s/g, '');
    video.mv(path.resolve('uploads', fileName));

    let newVideo = {
      videoId: videos.at(-1)?.videoId + 1 || 1,
      title,
      video: fileName,
      size: video.size,
      created_at: Date.now(),
      userId: req.userId,
    };
    videos.push(newVideo);
    write(videos, 'videos');

    res.status(201).json({
      status: 201,
      message: 'ok',
      data: newVideo,
    });
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const PUT = (req, res, next) => {
  try {
    let videos = read('videos');
    let { videoId } = req.params;

    let video = videos.find(
      (video) => video.videoId == videoId && video.userId == req.userId
    );

    if (!video) {
      return next(new NotFoundError(404, 'video not found'));
    }

    video.title = req.body.title || video.title;

    write(videos, 'videos');

    return res.status(200).json({
      status: 200,
      message: 'video updated',
      data: video,
    });
  } catch (error) {
    return next(new InternalServerError(500, 'InternalServerError'));
  }
};

const DELETE = (req, res, next) => {
  try {
    let videos = read('videos');
    let { videoId } = req.params;

    let videoIndex = videos.findIndex(
      (video) => video.videoId == videoId && video.userId == req.userId
    );

    if (videoIndex == -1) {
      return next(new NotFoundError(404, 'video not found'));
    }

    let [deletedVideo] = videos.splice(videoIndex, 1);
    fs.unlinkSync(path.resolve('uploads', deletedVideo.video));
    write(videos, 'videos');

    return res.status(200).json({
      status: 200,
      message: 'video deleted',
      data: deletedVideo,
    });
  } catch (error) {
    return next(new InternalServerError(500, 'InternalServerError'));
  }
};

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
