<script src="../../../../LodopFuncsCommon.js"></script>
<template>
  <div class="face-recognition">
    <div class="commonContainer">
      <div class="commonTitle">人脸识别</div>
      <my-tip></my-tip>
      <div class="body">
        <img class="people" :src="people" alt="点击进行人脸识别">
        <input type="file" ref="input" name="video" class="video" accept="video/*" capture="user" οnchange="videoChange()" />
        <video ref="videos" muted preload="auto"></video>
        <canvas ref="canvas" style="display: none"></canvas>
      </div>
      <div class="tips">
        <div class="item">
        <img class="img" src="../../assets/images/healthcare-and-medical@2x.png" alt="脸无遮挡">
        <p>脸无遮挡</p>
      </div>
        <div class="item">
          <img class="img" src="../../assets/images/smartphone@2x.png" alt="正对手机">
          <p>正对手机</p>
        </div>
        <div class="item">
          <img class="img" src="../../assets/images/snail@2x.png" alt="放慢动作">
          <p>放慢动作</p>
        </div>
      </div>
      <h3>
        确认
        <span class="name">***</span>
        本人操作
      </h3>
      <p class="little-tip">请保持正脸在取景框中根据屏幕指示完成识别</p>

      <div class="button-box">
        <button class="pre-button">
          上一步
        </button>

        <button class="next-button">
          下一步
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import people from '../../assets/images/face@2x.png'
  export default {
    name: "FaceRecognition",
    data() {
      return {
        people
      }
    },
    created() {
      // this.initCamera()
    },
    methods: {
      //初始化摄像头 获取摄像头权限
      initCamera(){
        let self = this;
        navigator.getUserMedia  = navigator.getUserMedia ||navigator.webkitGetUserMedia ||navigator.mozGetUserMedia;
        if (navigator.getUserMedia) {
          //调用用户媒体设备, 访问摄像头
          navigator.getUserMedia({video : {width: 480, height: 320}},(stream) => {
            console.log(stream)
            let video = this.$refs.videos;
            video.srcObject = stream;
            console.log(video.srcObject)
            self.streamPicture = stream; //关闭摄像头需要用
            // video.onloadedmetadata = function(e) {
            //   video.play();
            // };
          }, (err) => {
            console.log(err)
            console.log("访问用户媒体设备失败: " + err.name);
          })
        } else {
          console.log('不支持访问用户媒体');
        }
      },
      videoChange () {
        let file = this.$refs.input.files[0];
        console.log(file)
        let fileSize = (Math.round(file.size / 1024)).toFixed();
        let url = URL.createObjectURL(file);
        console.log(url);
        this.$refs.videos.src = url;
      }
    }
  }
</script>

<style lang="less" scoped>
  .face-recognition {
    .body {
      position: relative;
      .people {
        display: block;
        width: 431px;
        height: 421px;
        margin: 0 auto;
        margin-top: 130px;
      }
      .video {
        position: absolute;
        width: 431px;
        height: 421px;
        opacity: 0;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .tips {
      width: 100%;
      display: flex;
      margin-top: 100px;
      .item {
        flex: 1;
        .img {
          display: block;
          height: 100px;
          margin: 0 auto;
        }
        p {
          text-align: center;
          line-height: 100px;
          opacity: 0.7;
        }
      }
    }
    h3 {
      width: 100%;
      text-align: center;
      font-size: 36px;
      margin-top: 70px;
      .name {
        color: #E74343;
        font-size: 36px;
      }
    }
    .little-tip {
      opacity: 0.7;
      font-size:28px;
      text-align: center;
      line-height: 80px;
    }
  }

</style>
