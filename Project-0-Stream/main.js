import Koa from 'koa';
import fs from 'fs';
import Minio from 'minio'
import { PassThrough } from 'stream';
import router from 'koa-router'


const app = new Koa();
const endPoint = "minio-service"


// defines the route
console.log(endPoint)


var minioClient = new Minio.Client({
    endPoint: endPoint,
    useSSL: false,
    accessKey: 'minio',
    secretKey: 'minio123'
});


app.use(async ({request, response}, next) => {
  if(request.url.includes('/stream')) {
    response.body = "HELLo"
  }
  if(
    !request.url.startsWith('/api/video') ||
    !request.query.video 
   
  ) {
    console.log('Invalid request');
    return next();
  }
  // const videoID = request.query.video
  // console.log(videoID)
  // const vieooExists = minioClient.statObject('stream-bucket', `${videoID}.mp4`, function(err, stat) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log(stat)
  // })

  const range = request.headers.range;

  const parts = range.replace("bytes=", "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : 12100115 - 1; //size
  
  response.set("Content-Range", `bytes ${start}-${end}/${12100115}`);
  response.set("Accept-Ranges", "bytes");
  response.set("Content-Length", end - start + 1);
  response.status = 206;
  const str = getStream(start, end);
  // response.body = fs.createReadStream(videoTest, {start, end});

  response.body = str

});
app.on('error', (err, ctx) => {
  // console.log(err)

})



app.listen(3000);
console.log('Listening on port 3000');


const getStream = (start, end, title='Petit Biscuit - Sunset Lover (Official Video).mp4') => {
  const stream = new PassThrough();
  minioClient.getPartialObject('stream-bucket', title, start, end, function(err, dataStream) {
    if (err) {
      return console.log(err)
    }
    dataStream.on('error', function(err) {
      console.log(err)
    })

    dataStream.pipe(stream)
  })
  
  return stream

  
}


