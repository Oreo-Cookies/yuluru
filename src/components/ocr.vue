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

 </div>
</template>

<script>
  import uploadImg from '../assets/images/upload@2x.png'
  export default {
    name: "ocr",
    data() {
      return {
        uploadImg,
        columns: ['本地图片上传', '拍照上传'],
        showPicker: false,
        is_media: false,
        fileList: []
      }
    },
    created() {

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
        console.log(file)
        const res = await this.axios.post('/api/wechat/Uploads/imageBase64_upload', { image_type: 6, image_url: file.content })
        console.log(res)
        const _res = await this.axios.post('api/wechat/ocr_sign/aliOcr', { type: 7, image_url: res.data.image_url })
        console.log(_res)
      }
    }
  }
</script>

<style scoped>
</style>
