<template>
 <div>
   <div class="uploadImg" @click="showPicker = true">
     <img :src="imgSrc" alt="">
     <input type="file" class="fileInput" accept="image/*"  @change="afterRead" value="">
   </div>

   <div class="overlay"  v-if="show_overlay" @click="show_overlay = false">
         <div class="wrapper" @click.stop>
           <van-loading color="#1989fa" size="45px" text-size="18px" vertical>{{text}}</van-loading>
         </div>
   </div>

 </div>
</template>

<script>
  import ImageCompressor from '@xkeshi/image-compressor';
  import url_config from "../untils/url_config";
  import uploadImg from '../assets/images/upload@2x.png'
  import uploadImg2 from '../assets/images/upload2.png'
  export default {
    name: "ocr",
      props: {
        parentName: {
            type: String,
            require: true
        },
        card_type: {
          type: Number,
          require: false,
        },
        picture: {
          type: String
        }
      },
    data() {
      return {
        imgSrc: uploadImg,
        show_overlay: false,
        image_type: 6,
        text: '正在上传中，请耐心等待...'
      }
    },
    created() {
        if (this.parentName !== '车辆信息') {
            this.image_type = 1
            this.imgSrc = uploadImg2
        }
    },
    methods: {
      async afterRead (e) {

        try {
            const file = e.target.files[0];

            if (!file) {
              return ;
            }
            this.text = '正在上传中，请耐心等待...'
            this.show_overlay = true
            new ImageCompressor(file, {
              convertSize: 1000000,
              quality: .4,
              success: async (result) => {
                const formData = new FormData();

                formData.append('files', result, result.name);
                formData.append('image_type',this.image_type);
                const res = await this.axios.post('wechat/Uploads/image_upload', formData )
                if (res.code != 200)  {
                  this.show_overlay = false
                  this.$toast.fail(res.msg);
                  return
                }
                this.imgSrc =  url_config.baseURL + '/dataapi/Image/read?image_url=/' + res.data.image_url
                this.text = '正在识别图片信息，请耐心等待...'
                const _res = await this.axios.post('wechat/ocr_sign/aliOcr', { type: this.card_type, image_url: res.data.image_url })
                this.show_overlay = false
                if (_res.code != 200) return this.$toast.fail('识别信息失败！ 请重新上传图片或者手动输入信息');
                if (_res.data.ocr.success == 'false') return this.$toast.fail('识别信息失败！ 请重新上传图片或者手动输入信息');
                if (this.parentName === '车辆信息') this.$emit('carOcr', _res.data)
                if (this.parentName === '原车主信息') this.$emit('originalOcr', _res.data)
                if (this.parentName === '现车主信息') this.$emit('currentOcr', _res.data)

              },
              error(e) {
                this.show_overlay = false
                this.$toast.fail(e.message);
              },
            });

          } catch (e) {
            this.show_overlay = false
            this.$toast.fail('识别信息失败！ 请重新上传图片或者手动输入信息');
          }

      },
    },
    watch: {
      picture () {
        if (this.picture) {
          this.imgSrc =  url_config.baseURL + '/dataapi/Image/read?image_url=/' + this.picture
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
