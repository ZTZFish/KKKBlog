<template>
  <div class="user">
    <div class="background-img">
      <img src="../assets/images/UserBck.jpg" alt="KKK背景图片">
    </div>
    <div class="info">
      <div class="avatar">
        <img src="../assets/images/avatar.jpg" alt="KKK头像">
      </div>
      <div class="name">
        <span><i>KKK</i></span>
      </div>
      <div class="welcome">
        <span><i>这是KKK的博客，很高兴你能来到这里</i></span>
      </div>
      <div class="social-media">
        <div class="github">
          <a href="https://github.com/ZTZFish" target="_blank">
            <img src="../assets/images/github.png" alt="github" title="github">
          </a>
        </div>
        <div class="wechat">
          <a href="https://x.com/zhangtianzong1" target="_blank">
            <img src="../assets/images/twitter.png" alt="推特" title="推特">
          </a>
        </div>
        <div class="cloud-music">
          <a href="https://music.163.com/#/user/home?id=1371588207" target="_blank">
            <img src="../assets/images/cloudMusic.png" alt="网易云音乐" title="网易云音乐">
          </a>
        </div>
        <div class="email">
          <a href="mailto:1963109104@qq.com" target="_blank">
            <img src="../assets/images/QQMail.png" alt="QQ邮箱" title="1963109104@qq.com">
          </a>
        </div>
        <div class="about">
          <a href="https://about.me/aboutKKK" target="_blank">
            <img src="../assets/images/about.png" alt="关于我" title="关于我">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
  margin: 5vh auto 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .background-img {
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0 0;

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px 10px 0 0;
      object-fit: contain;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;

    .avatar {
      box-sizing: border-box;
      margin-top: -30%;
      width: 50%;
      height: 50%;
      border-radius: 50%;


      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: contain;
        border: 4px solid #e3e5e7;
      }
    }

    .name {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }

    .welcome {
      width: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      color: #666;
      margin-top: 10px;
    }

    .social-media {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: auto;
      margin: 20px 0;

      div {
        margin: 0 10px;
        width: 26px;
        height: 26px;
        cursor: pointer;
        transition: transform 0.3s ease;
        /* 添加过渡效果，持续时间为0.3秒 */

        img {
          width: 100%;
          height: 100%;
        }
      }

      div:hover {
        transform: scale(1.3);
      }
    }
  }
}

@media(max-width: 1024px) {
  .user .info .social-media div {
    margin: 0 5px;
  }
}
</style>
