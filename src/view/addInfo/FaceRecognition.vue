<script src="../../../../LodopFuncsCommon.js"></script>
<template>
  <div class="face-recognition">
    <div class="commonContainer">
      <div class="commonTitle">人脸识别</div>
      <my-tip></my-tip>
      <div class="body">
        <img class="people" :src="people" alt="点击进行人脸识别">
        <input type="file" @change="videoChange"  ref="input"  class="video" accept="video/*" capture="user"  />
        <video id="myVideo" ref="video" preload="auto" webkit-playsinline="true" x-webkit-airplay="true" :src="videoSrc"  width="300" height="300" style="display: none"  autoplay> </video>
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
        <span v-if="is_who === 1" class="name">{{originalName}}</span>
        <span v-if="is_who === 2" class="name">{{currentName}}</span>
        本人操作
      </h3>
      <p class="little-tip">请保持正脸在取景框中根据屏幕指示完成识别</p>

      <div class="button-box">
        <button class="pre-button" :disabled="pre_disabled"  @click="preStep">
          上一步
        </button>

        <button class="next-button" :disabled="next_disabled"  @click="nextStep">
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
        people,
        url: null,
        videoSrc: null,
        myPlayer: null,
        playerOptions: {
          src: null
        },
        next_disabled: false,
        pre_disabled: false,
        currentName: '***',
        originalName: '***',
        is_who: 1
      }
    },
    created() {
      this.$eventBus.$on('getOriginalName',this.getOriginalName)
      this.$eventBus.$on('getCurrentName',this.getCurrentName)
      this.$eventBus.$on('getWhere',this.getWhere)
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
    mounted() {
      this.initVideo()
    },
    methods: {
      initVideo() {
        this.myPlayer = this.$video(this.$refs.video, this.playerOptions)
        //初始化视频方法
        console.log(this.myPlayer)
        //   {
        //   //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        //   controls: true,
        //   //自动播放属性,muted:静音播放
        //   autoplay: "muted",
        //   //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        //   preload: "auto",
        //   //设置视频播放器的显示宽度（以像素为单位）
        //   width: "300px",
        //   //设置视频播放器的显示高度（以像素为单位）
        //   height: "300px"
        // }
      },
      videoChange (e) {
        console.log('拍完了')
        let file = e.target.files[0];
        const video = this.$refs.video

        if(file !== undefined){
          //判断走向
          if(this.isAndroid){
            //视频开始播放
            console.log('Android播放')
          }else{
            this.iphoneFile(file);
          }
        }
      },
      //IOS拍摄视频
      iphoneFile(file){
        console.log('IOS拍摄视频')
        const that = this;
        //视频字节大小
        let videoSize = file.size;
        let url = null ;
        //file转换成blob
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        this.videoSrc = url
        this.myPlayer.src = url
        //  重新调用
        this.myPlayer.load(url)

        if(file.size < 500000 && file.size > 200000){
          this.initCanvas()
          this.$refs.video.play().then(() => {
            console.log('视频播放成功')
          }).catch((error) => {
            console.log(this.myPlayer.duration())
            console.error('此视频不支持预览', error)
          })
          // this.uploadVideo(file);
        }else if(file.size >= 2100000){
         console.log('视频太大，请限制在5秒内');
        }else{
          console.log('视频录制不能少于2秒');
        }
      },
      initCanvas () {
        console.log('我在画图')
        let video = this.$refs.video
        let canvas = this.$refs.canvas
        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 500, 500);
      },
      timer () {
        console.log(1111111, this.$refs.video.duration)
      },
      //上传视频
      uploadVideo(file){
        console.log("上传的视频文件", file)
      },
      //base64转换为Blob
      dataURItoBlob(base64Data) {
        var byteString;
        if (base64Data.split(",")[0].indexOf("base64") >= 0)
          byteString = atob(base64Data.split(",")[1]);
        else byteString = unescape(base64Data.split(",")[1]);
        var mimeString = base64Data
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
      },
      preStep () {
        this.$_mutations.toPre(this.$_store)
        this.pre_disabled = true
        setTimeout(() => this.pre_disabled = false, 500)
      },
      async nextStep () {
        try {
          this.$_mutations.toNext(this.$_store)
          this.next_disabled = true
          setTimeout(() => this.next_disabled = false, 500)
        } catch (e) {
          this.$toast.fail('请填写完整信息')
        }
      },
      getOriginalName (name) {
        if (!name.trim()) return
        let original = name.split('')
        let newArr = []
        original.forEach((item, index) => {
          if (index == original.length -1) {
            newArr.push(item)
          } else {
            newArr.push('*')
          }
        })
        this.originalName = newArr.join('')
      },
      getCurrentName (name) {
        if (!name.trim()) return
        let original = name.split('')
        let newArr = []
        original.forEach((item, index) => {
          if (index == original.length -1) {
            newArr.push(item)
          } else {
            newArr.push('*')
          }
        })
        this.currentName = newArr.join('')
      },
      getWhere (num) {
        this.is_who = num
      }
    }
  }
</script>

<style lang="less" scoped>
  .face-recognition {
    .body {
      position: relative;
      overflow: hidden;
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
