<template>
  <div class="about">
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
    <h1 class="title"><span>[</span> 说明文档 <span>]</span></h1>
    <!-- 文档内容 -->
    <div class="content">
      <div class="name">NewsEye 新闻之眼</div>
      <h1>面向新闻场景的伪造检测系统</h1>
      <section>
        <h2>关于我们</h2>
        <p>
          本项目名为<span style="font-weight: bold;">《新闻之眼：智能新闻伪造检测系统》</span>，致力于借助自然语言处理与深度学习技术，对新闻内容进行自动化、精准的真伪检测与分析。系统融合多模态数据分析，针对文本、图像和视频等多种伪造手段，提供高效的风险识别和防控方案。
        </p>
      </section>
      <section>
        <h2>项目背景</h2>
        <p>
          在全球化和信息化浪潮的推动下，新闻传播已突破了传统媒体的局限，社交平台与自媒体的迅速发展使得新闻内容生成和传播变得更加便捷，同时也为虚假信息的扩散提供了温床。伪造新闻不仅对社会舆论、经济决策和国家安全构成威胁，而且利用深度学习生成的虚假视频、图像以及高仿真文本，使得新闻真伪检测难度大幅提升。
        </p>
      </section>
      <section>
        <h2>业务背景</h2>
        <p>
          新闻行业作为信息传播的重要枢纽，正面临着伪造新闻对公信力的挑战。<br>针对文本伪造、图像篡改和视频深度伪造等多种形式的虚假内容，传统检测方式已难以应对。本平台通过大语言模型和多模态分析技术，自动对新闻内容进行真实性检测，提供清晰的检测结果解释，并能够支持单篇实时检测及海量数据的快速处理。
        </p>
      </section>
      <section>
        <h2>核心技术方案</h2>
        <p>
          平台后端主要采用 Java 与 Spring Boot 构建微服务架构，同时针对深度学习部分使用Python和Torch实现伪造检测算法，并利用Sanic框架提供内部异步接口服务。前端则基于Vue.js开发，集成Element UI提升交互体验。整个系统通过Docker实现容器化部署，并依托Kubernetes完成服务器集群管理，配合MySQL、Redis等数据库实现高效数据存储与流转。此外，Nginx、Nacos、Seata等组件确保服务负载均衡、注册发现以及分布式事务管理，Logback等日志系统提供全面日志分析支持。
        </p>
      </section>
      <section>
        <h2>预期效果</h2>
        <p>
          本项目致力于实现对伪造新闻的高精度识别与可解释性分析，面向媒体机构、社交平台及监管部门等多类用户，提供集成化的风险识别与防护方案，助力构建健康、安全的信息传播生态。
        </p>
      </section>
      <h1 class="desc">🔍 新闻之眼，洞察伪真，守护信息安全！</h1>
    </div>
  </div>
</template>

<script>
import LoginBackButton from '@/components/LoginBackButton.vue'
export default {
  name: 'AboutPage',
  components: {
    LoginBackButton
  }
}
</script>

<style scoped>
.about{
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
.content .name{
  font-size: 50px;
  /* margin-bottom: 16px; */
  color: #333;
  letter-spacing: 0.06em;
  text-align: center;
  font-weight: bold;
}
.content h1 {
  font-size: 26px;
  margin-top: 4px;
  margin-bottom: 35px;
  color: #333333d9;
  font-weight: normal;
  text-align: center;
}

.content h2 {
  font-size: 22px;
  margin: 20px 0 12px;
  color: #383838;
  border-left: 4px solid #4fa5fb;
  padding-left: 8px;
  transition: all 0.4s;
  cursor: pointer;
}
.content h2:hover{
  background-color: #eeeeeed2;
}

.content p {
  font-size: 16px;
  line-height: 1.8;
  color: #373737;
  text-align: justify;
  /* text-indent: 2em; */
  border: 1px solid #37b2ff;
  box-shadow: 0 0 4px #37b2ff76;
  border-radius: 5px;
  padding: 10px 1.2em;
  margin-bottom: 55px;
  margin-top: 20px;
  transition: all 0.4s;
}
.content p:hover{
  box-shadow: 0 0 8px #37b2ffde;
}

.content .desc{
  display: inline-block;
  margin-bottom: 0;
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
