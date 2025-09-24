<template>
  <div class="terms">
    <!-- header区域 -->
    <div class="header">
      <!-- 左上角logo -->
      <router-link to="/home" class="logo">
        <img src="@/assets/logo.png">
      </router-link>
      <!-- 右上角小导航栏 -->
      <nav class="nav">
        <LoginBackButton to="/home" text="Home" iconClass="el-icon-s-home"></LoginBackButton>
      </nav>
    </div>
    <h1 class="title"><span>[</span> 用户协议与隐私协议 <span>]</span></h1>
    <!-- 协议内容 -->
    <div class="content">
      <section>
        <h2>一、适用范围</h2>
        <p>
          本协议适用于所有访问或使用《新闻之眼：智能新闻伪造检测系统》服务的用户，包括但不限于个人用户、企业用户及合作伙伴。不论您通过网站、移动客户端或其他接入方式使用本服务，本协议均对您具有约束力。
        </p>
      </section>

      <section>
        <h2>二、用户协议</h2>
        <p>
          本协议适用于所有使用《新闻之眼：智能新闻伪造检测系统》服务的用户。通过访问或使用我们的服务，您同意遵守本协议的条款。如果您不同意本协议的任何内容，您应停止使用本服务。
        </p>
        <p>
          1. 用户应提供准确、真实的个人信息，以便我们为您提供个性化的服务。<br>
          2. 用户不得利用本系统发布虚假、误导性信息及其他违法内容。<br>
          3. 用户应妥善保管自己的账号密码，避免账号信息被他人滥用。
        </p>
      </section>

      <section>
        <h2>三、隐私协议</h2>
        <p>
          我们非常重视用户隐私保护，并承诺按照相关法律法规及本隐私协议的规定处理用户的个人数据。我们会采取合理的技术手段，确保您的隐私安全。
        </p>
        <p>
          1. 我们收集的个人信息：为了提供优质的服务，我们可能会收集您的基本信息，如姓名、联系方式及使用行为数据。<br>
          2. 信息的使用：我们将使用您的信息来提升服务质量、优化系统功能、以及通过匿名化数据进行产品改进。<br>
          3. 信息的保护：我们将采取加密措施以及其他合理的技术手段保护您的个人信息，防止数据泄露。
        </p>
      </section>

      <section>
        <h2>四、服务内容与责任</h2>
        <p>
          本系统为新闻伪造检测提供技术支持，帮助用户识别新闻内容的真伪。我们不对用户因误判造成的任何损失负责。
        </p>
        <p>
          1. 系统仅提供自动化检测服务，无法确保百分百准确性。<br>
          2. 用户应对自己使用本服务所发布的内容负责。<br>
          3. 如用户违反相关法律法规，导致系统或他人权益受损，用户应承担相应的法律责任。
        </p>
      </section>

      <section>
        <h2>五、协议修改与终止</h2>
        <p>
          我们保留随时修改本协议的权利。协议修改后，我们将在平台上发布更新通知，修改内容一经发布即生效。您继续使用本服务即表示同意修改后的协议内容。
        </p>
      </section>

      <section>
        <h2>六、联系我们</h2>
        <p>
          如果您对本协议有任何疑问或需要帮助，请通过以下方式联系我们：<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系邮箱：support@newseye.com<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;官方网站：www.newseye.com
        </p>
      </section>

      <h1 class="desc">🔍 新闻之眼，洞察伪真，守护信息安全！</h1>
    </div>
  </div>
</template>

<script>
import LoginBackButton from '@/components/LoginBackButton.vue'
export default {
  name: 'TermsPage',
  components: {
    LoginBackButton
  }
}
</script>

<style scoped>
.terms{
  height: 100vh;
  margin: 0;
  position: relative;
  overflow-y: scroll;
  padding: 0 0 30px 0;
  /* 背景渐变色 */
  background: linear-gradient(to top, #f2fcfe -30%, #a4d1fe94 25%, #a4d1fea7 75%, #f2fcfe 100%);
  /* background: linear-gradient(to top, #e6f2ff 0%, #b3d9ff 35%, #b3d9ff 50%, #b3d9ff 55%, #e6f2ff 90%); */
}

/* 左上角logo */
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 110px;
  padding: 15px 20px;
  /* background-color: skyblue; */
}
.logo{
  display: block;
  position: relative;
}
.logo img {
  mix-blend-mode: multiply; /* 背景混合模式 */
  margin-top: 10px;
  margin-left: -10px;
  height: 90px;
}

/* 右上角导航栏 */
.nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 50px;
  margin-right: 20px;
  margin-top: -5px;
}

.title{
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 45px;
  color: #0095e6;
  text-align: center;
  font-weight: bold;
  letter-spacing: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title span {
  margin-top: -8px;
  font-size: 65px;
  color: transparent;
  -webkit-text-stroke: 1px #0095e6;
  font-weight: normal;
  padding: 0 23px;
}

/* 内容 */
.content{
  width: 50vw;
  min-height: calc(100vh - 120px);
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px 100px 50px;
  border-radius: 8px;
  box-shadow: 0 0px 12px rgba(0, 0, 0, 0.4);
  background-color: #ffffff;
  text-align: center;
}

.content h2 {
  font-size: 28px;
  margin: 35px 0 10px;
  color: #383838;
  /* border-left: 4px solid #4fa5fb; */
  padding-left: 8px;
  transition: all 0.4s;
  cursor: pointer;
}

.content p {
  font-size: 16px;
  line-height: 1.8;
  color: #373737;
  text-align: justify;
  /* text-indent: 2em; */
  /* border: 1px solid #37b2ff; */
  /* box-shadow: 0 0 4px #37b2ff76; */
  border-radius: 5px;
  padding: 5px 1.2em 5px 1.8em;
  /* margin-bottom: 15px; */
  /* margin-top: 5px; */
  transition: all 0.4s;
}
.content section p:first-of-type{
  text-indent: 2em;
}

.content .desc{
  display: inline-block;
  margin-bottom: 0;
  margin-top: 30px;
  padding: 20px 50px;
  border-radius: 20px;
  background: linear-gradient(135deg, #f9f9f9, #e0f2ff);
  box-shadow: 0 8px 24px rgba(0, 149, 230, 0.15);
  font-size: 22px;
  font-weight: 600;
  color: #005a8e;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid rgba(0, 149, 230, 0.2);
}
.content .desc:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 149, 230, 0.25);
}
</style>
