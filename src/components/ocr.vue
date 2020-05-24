<template>
 <div>
   <div class="uploadImg" @click="showPicker = true">
     <img :src="uploadImg" alt="">
   </div>
   <van-popup v-model="showPicker" round position="bottom">
     <van-picker
       show-toolbar
       title="选择上传方式"
       :columns="columns"
       @cancel="showPicker = false"
       @change="onChange"
    >
       <template name="default">
         <van-uploader
           v-if="!is_media"
           :max-count="1"
           :after-read="afterRead"
           style="position: absolute; right: 10px"
         >
           <van-icon name="share" color="#FF5C5C" />
           <span style="color: #FF5C5C">选择图片</span>
         </van-uploader>

         <van-uploader
           v-else
           capture="camera"
           :after-read="afterRead"
           style="position: absolute; right: 10px"
         >
           <van-icon name="share" color="#FF5C5C" />
           <span style="color: #FF5C5C">拍照上传</span>
         </van-uploader>
       </template>
     </van-picker>
   </van-popup>
     <van-overlay :show="show_overlay" @click="show_overlay = false">
         <div class="wrapper" @click.stop>
           <van-loading color="#1989fa" size="45px">正在上传中，请耐心等待...</van-loading>
         </div>
     </van-overlay>
 </div>
</template>

<script>
  import uploadImg from '../assets/images/upload@2x.png'
  export default {
    name: "ocr",
      props: {
        parentName: {
            type: String,
            require: true
        }
      },
    data() {
      return {
        uploadImg,
        columns: ['本地图片上传', '拍照上传'],
        showPicker: false,
        is_media: false,
        fileList: [],
        show_overlay: false,
        image_type: 6,
        type: 7,
      }
    },
    created() {
      console.log(this.parentName)
        if (this.parentName !== '车辆信息') {
            this.image_type = 1
            this.type = 0
        }
    },
    methods: {
      onChange (picker, values) {
        if (values === '本地图片上传') {
          this.is_media = false
        } else {
          this.is_media = true
        }
      },
      async afterRead (file) {
          try {
              this.showPicker = false
              this.show_overlay = true
              const res = await this.axios.post('api/wechat/Uploads/imageBase64_upload', { image_type: this.image_type, image_url: file.content })
              console.log(res)
              const _res = await this.axios.post('api/wechat/ocr_sign/aliOcr', { type: this.type, image_url: res.data.image_url })
              // this.uploadImg = 'http://testcarapi.hileader.com/' + res.data.image_url
              // console.log(this.uploadImg)
              console.log(_res)
              if (this.parentName === '车辆信息') this.$emit('carOcr', _res.data.ocr)
              if (this.parentName === '原车主信息') this.$emit('originalOcr', _res.data.ocr)
              if (this.parentName === '现车主信息') this.$emit('currentOcr', _res.data.ocr)

          } catch (e) {
              console.error(e)
          } finally {
              this.show_overlay = false
          }

      }
    }
  }
</script>

<style scoped>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .block {
        width: 120px;
        height: 120px;
        background-color: #fff;
    }
</style>
