<template>
  <div>
    <input @click="click" ref="changeInput" type="file" accept="video/*" capture="user" @change="changeVideo" />
    <div>
      <div>视频大小：{{videoSize}}</div>
      <div>视频时长：{{videoLength}}</div>
      <div>
        <video id="myvideo" :src="videoSrc" :width="winWidth" :height="winHeight" ref="videoId" autoplay="true" controls muted></video>
        <canvas id="canvas" :width="winWidth" :height="winHeight"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  import { setInterval, clearInterval } from "timers";
  import GIF from "../../../static/gif.js"
  export default {
    data(){
      return {
        videoSize: '',
        videoSrc: '',
        videoLength: '',
        isAndroid: false,
        fileAndroid: {},
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
        gifSetTime: false,
        gif: '',
      }
    },
    created() {
      //判断终端
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isAndroid){
        console.log('isAndroid')
        this.isAndroid = true;
      }else if(isiOS){
        console.log('isiOS')
        this.isAndroid = false;
      }
    },
    mounted(){
      //初始gif
      this.gif = new GIF({
        workers: 1,
        quality: 1000,
        width: this.winWidth,
        height:this.winHeight,
        workerScript: '../../../static/gif.worker.js',
      });
    },
    methods:{
      //input文件走向
      changeVideo(e){
        var file = e.target.files[0];
         const video = document.getElementById('myvideo');

        if(file !== undefined){
          //判断走向
          if(this.isAndroid){
            //视频开始播放
            video.removeEventListener('play', this.videoPlay, false);
            //视频播放完
            video.removeEventListener('ended', this.videoEnded, false);
            this.androidFile(file);
          }else{
            this.iphoneFile(file);
          }
        }
      },
      //IOS拍摄视频
      iphoneFile(file){
        const that = this;
        //视频字节大小
        this.videoSize = file.size;

        var url = null ;
        //file转换成blob
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        this.videoSrc = url;
        // if(file.size < 2100000 && file.size > 500000){
          this.uploadVideo(file);
        // }else if(file.size >= 2100000){
        //  console.log('视频太大，请限制在10秒内');
        // }else{
        //   console.log('视频录制不能少于5秒');
        // }
      },
      //安卓拍摄视频
      androidFile(file){
        //视频字节大小
        this.videoSize = file.size;

        const that = this;
        const video = document.getElementById('myvideo');
        const canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        this.gifSetTime = true;
        this.gif.abort()
        this.gif.frames = [];

        //file转base64
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          that.videoSrc = this.result;
          video.play();
        }
        //视频开始播放
        video.addEventListener('play', this.videoPlay, false);
        //视频播放完
        video.addEventListener('ended', this.videoEnded, false);

        this.gif.on('finished', function(blob) {
          if(that.fileAndroid.size == blob.size) return;
          console.log("gif的blob文件",blob);
          that.fileAndroid = that.convertBase64UrlToFile(blob);
          that.uploadVideo(that.fileAndroid);
        });
      },
      //视频开始播放
      videoPlay(){
        const that = this;
        const video = document.getElementById('myvideo');
        const canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        console.log("视频时长",video.duration);
        this.videoLength = video.duration;
        //画布上画视频，需要动态地获取它，一帧一帧地画出来
        var times = setInterval(function(){
          context.drawImage(video, 0, 0, that.winWidth, that.winHeight);
          that.gif.addFrame(context, {
            copy: true
          });
          if(that.gifSetTime == false){
            clearInterval(times);
          }
        }, 200);
      },
      //视频播放完
      videoEnded(){
        this.gifSetTime = false;
        console.log("视频播放完毕！")
        this.gif.render();
      },
      //blob to file
      convertBase64UrlToFile(blob) {
        var d = new Date().getTime();
        var type = 'image/gif'
        return new File([blob],"fileGif-" + d + '.gif', {type:type});
      },
      //上传视频
      uploadVideo(file){
        console.log("上传的视频文件", file)
      },
    }
  };
</script>
<style scoped>

</style>
