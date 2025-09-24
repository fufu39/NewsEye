<template>
  <div class="wrapper">
    <!-- 内容区 -->
    <div class="content">
      <h1 class="page-title"><span>「</span> Profile 个人中心 <span>」</span></h1>
    </div>
    <!-- 装饰区 -->
    <div class="decoration">
      <img src="@/assets/user.svg" alt="">
    </div>
    <div class="decoration_global">
      <img src="@/assets/global.svg" alt="">
    </div>
    <!-- 个人信息展示区 -->
    <div class="showInfo">
      <!-- 左侧头像 -->
      <div class="avatar">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <p>更换头像</p>
      </div>
      <!-- 右侧图表(指定类名表头my-label，内容my-content) -->
      <el-descriptions size="medium" :column="12" label-class-name="my-label" content-class-name="my-content">
        <el-descriptions-item label="用户名" :span="3">
          {{ info.username }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱" :span="6">
          {{ info.email }}
        </el-descriptions-item>
        <el-descriptions-item label="实名认证" :span="3">
          <el-tag size="small" type="success">{{ "已认证" }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="所在地" :span="4">
          {{ info.region }}
        </el-descriptions-item>
        <el-descriptions-item label="学校" :span="4">
          {{ info.school }}
        </el-descriptions-item>
        <el-descriptions-item label="专业" :span="4">
          {{ info.major }}
        </el-descriptions-item>
        <el-descriptions-item label="注册时间" :span="6">
          {{ formatTime(info.create_time) }}
          <!-- {{ info.createTime ? formatTime(info.createTime) : 'No Time' }} -->
        </el-descriptions-item>
        <el-descriptions-item label="更新时间" :span="6">
          {{ formatTime(info.update_time) }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 个人信息修改区 -->
    <div class="updateInfo">
      <el-tabs v-model="activeName">
        <el-tab-pane name="first">
          <!-- 标签名称 -->
          <span slot="label">基础信息</span>
          <!-- 标签内容 -->
          <div class="basic-info">
            <!-- 邮箱：禁止修改 -->
            <div class="form-group">
              <label for="email">邮箱</label>
              <input type="text" id="email" name="email" v-model="updateInfo.email" disabled>
            </div>
            <!-- 用户名：字数限制10 -->
            <div class="form-group">
              <label for="username">用户名</label>
              <input type="text" id="username" name="username" placeholder="请输入用户名"
              v-model="updateInfo.username"
              :maxlength="textMax">
              <div class="word-limit">{{ updateInfo.username.length }} / {{ textMax }}</div>
            </div>
            <!-- 所在地：多级select -->
            <div class="form-group">
              <label for="region">所在地</label>
              <!-- <input type="text" id="region" name="region" placeholder="请输入所在地区" v-model="updateInfo.region"> -->
              <el-cascader
                v-model="selectedCity"
                :options="options"
                @change="onCityChange"
                clearable
                filterable
                placeholder="请选择城市">
              </el-cascader>
            </div>
            <div class="form-group">
              <label for="school">学校</label>
              <input type="text" id="school" name="school" placeholder="请输入学校" v-model="updateInfo.school">
            </div>
            <div class="form-group">
              <label for="major">专业</label>
              <input type="text" id="major" name="major" placeholder="请输入专业" v-model="updateInfo.major">
            </div>
            <!-- 保存按钮 -->
            <div class="basic-info-buttons">
              <button class="save-btn" @click="saveInfo">保存</button>
              <button class="clear-btn" @click="clearInfo">取消</button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="second">
          <!-- 标签名称 -->
          <span slot="label">修改密码</span>
          <!-- 标签内容 -->
          <div class="change-pwd">
            <ChangePwdVue></ChangePwdVue>
          </div>
        </el-tab-pane>
        <el-tab-pane name="third">
          <!-- 标签名称 -->
          <span slot="label">实名认证</span>
          <!-- 标签内容 -->
          <div class="real-identity">
            <div class="form-real">
              <label for="identity-card">姓名</label>
              <input type="text" id="identity-card" name="identity-card">
            </div>
            <div class="form-real">
              <label for="identity-name">身份证号</label>
              <input type="text" id="identity-name" name="identity-name">
            </div>
            <div class="real-identity-buttons">
              <button class="real-submit-btn">提交</button>
              <button class="real-clear-btn">取消</button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import store from '@/store'
import dayjs from 'dayjs'
import ChangePwdVue from '@/components/ChangePwd.vue'
// 导入请求方法
import { getInfo, updateInfo } from '@/api/profile'
export default {
  name: 'ProfilePage',
  components: {
    ChangePwdVue
  },
  data () {
    return {
      // 获取进行渲染的数据
      info: {
        email: '',
        username: '',
        school: '',
        major: '',
        region: '',
        edu: '',
        createTime: '',
        updateTime: ''
      },
      // info: {
      //   email: '2207952990@qq.com',
      //   username: 'aaaaa',
      //   school: 'UESTC',
      //   major: '软件工程',
      //   region: '成都',
      //   edu: '本科生',
      //   createTime: '2025-03-31T11:23:48',
      //   updateTime: '2025-04-02T11:23:48'
      // },
      // 提交的数据
      updateInfo: {
        email: store.getters.email,
        username: '',
        school: '',
        major: '',
        region: '',
        edu: ''
      },
      // 信息修改区域数据
      activeName: 'first',
      textMax: 10,
      selectedCity: [],
      options: [
        { value: '北京', label: '北京' },
        { value: '天津', label: '天津' },
        { value: '上海', label: '上海' },
        { value: '重庆', label: '重庆' },
        {
          value: '河北',
          label: '河北',
          children: [
            { value: '石家庄', label: '石家庄' },
            { value: '唐山', label: '唐山' },
            { value: '秦皇岛', label: '秦皇岛' },
            { value: '保定', label: '保定' },
            { value: '邯郸', label: '邯郸' },
            { value: '邢台', label: '邢台' },
            { value: '沧州', label: '沧州' },
            { value: '廊坊', label: '廊坊' },
            { value: '承德', label: '承德' }
          ]
        },
        {
          value: '山西',
          label: '山西',
          children: [
            { value: '太原', label: '太原' },
            { value: '大同', label: '大同' },
            { value: '长治', label: '长治' },
            { value: '晋城', label: '晋城' },
            { value: '运城', label: '运城' },
            { value: '临汾', label: '临汾' }
          ]
        },
        {
          value: '辽宁',
          label: '辽宁',
          children: [
            { value: '沈阳', label: '沈阳' },
            { value: '大连', label: '大连' },
            { value: '鞍山', label: '鞍山' },
            { value: '抚顺', label: '抚顺' },
            { value: '营口', label: '营口' },
            { value: '阜新', label: '阜新' },
            { value: '丹东', label: '丹东' },
            { value: '本溪', label: '本溪' }
          ]
        },
        {
          value: '吉林',
          label: '吉林',
          children: [
            { value: '长春', label: '长春' },
            { value: '吉林市', label: '吉林市' },
            { value: '四平', label: '四平' },
            { value: '通化', label: '通化' }
          ]
        },
        {
          value: '黑龙江',
          label: '黑龙江',
          children: [
            { value: '哈尔滨', label: '哈尔滨' },
            { value: '齐齐哈尔', label: '齐齐哈尔' },
            { value: '牡丹江', label: '牡丹江' },
            { value: '大庆', label: '大庆' }
          ]
        },
        {
          value: '江苏',
          label: '江苏',
          children: [
            { value: '南京', label: '南京' },
            { value: '无锡', label: '无锡' },
            { value: '苏州', label: '苏州' },
            { value: '徐州', label: '徐州' },
            { value: '常州', label: '常州' },
            { value: '南通', label: '南通' },
            { value: '连云港', label: '连云港' },
            { value: '淮安', label: '淮安' },
            { value: '盐城', label: '盐城' },
            { value: '扬州', label: '扬州' },
            { value: '泰州', label: '泰州' },
            { value: '宿迁', label: '宿迁' }
          ]
        },
        {
          value: '浙江',
          label: '浙江',
          children: [
            { value: '杭州', label: '杭州' },
            { value: '宁波', label: '宁波' },
            { value: '温州', label: '温州' },
            { value: '嘉兴', label: '嘉兴' },
            { value: '湖州', label: '湖州' },
            { value: '绍兴', label: '绍兴' },
            { value: '金华', label: '金华' },
            { value: '衢州', label: '衢州' },
            { value: '舟山', label: '舟山' },
            { value: '台州', label: '台州' },
            { value: '丽水', label: '丽水' }
          ]
        },
        {
          value: '安徽',
          label: '安徽',
          children: [
            { value: '合肥', label: '合肥' },
            { value: '芜湖', label: '芜湖' },
            { value: '蚌埠', label: '蚌埠' },
            { value: '淮南', label: '淮南' },
            { value: '马鞍山', label: '马鞍山' },
            { value: '淮北', label: '淮北' },
            { value: '铜陵', label: '铜陵' },
            { value: '安庆', label: '安庆' },
            { value: '黄山', label: '黄山' },
            { value: '滁州', label: '滁州' },
            { value: '阜阳', label: '阜阳' },
            { value: '宿州', label: '宿州' },
            { value: '巢湖', label: '巢湖' },
            { value: '六安', label: '六安' },
            { value: '亳州', label: '亳州' },
            { value: '池州', label: '池州' },
            { value: '宣城', label: '宣城' }
          ]
        },
        {
          value: '福建',
          label: '福建',
          children: [
            { value: '福州', label: '福州' },
            { value: '厦门', label: '厦门' },
            { value: '莆田', label: '莆田' },
            { value: '三明', label: '三明' },
            { value: '泉州', label: '泉州' },
            { value: '漳州', label: '漳州' },
            { value: '南平', label: '南平' },
            { value: '龙岩', label: '龙岩' },
            { value: '宁德', label: '宁德' }
          ]
        },
        {
          value: '江西',
          label: '江西',
          children: [
            { value: '南昌', label: '南昌' },
            { value: '九江', label: '九江' },
            { value: '赣州', label: '赣州' },
            { value: '宜春', label: '宜春' },
            { value: '上饶', label: '上饶' },
            { value: '吉安', label: '吉安' },
            { value: '抚州', label: '抚州' },
            { value: '景德镇', label: '景德镇' },
            { value: '萍乡', label: '萍乡' },
            { value: '新余', label: '新余' }
          ]
        },
        {
          value: '山东',
          label: '山东',
          children: [
            { value: '济南', label: '济南' },
            { value: '青岛', label: '青岛' },
            { value: '淄博', label: '淄博' },
            { value: '枣庄', label: '枣庄' },
            { value: '东营', label: '东营' },
            { value: '烟台', label: '烟台' },
            { value: '潍坊', label: '潍坊' },
            { value: '济宁', label: '济宁' },
            { value: '泰安', label: '泰安' },
            { value: '威海', label: '威海' },
            { value: '日照', label: '日照' },
            { value: '临沂', label: '临沂' },
            { value: '德州', label: '德州' },
            { value: '聊城', label: '聊城' },
            { value: '滨州', label: '滨州' },
            { value: '菏泽', label: '菏泽' }
          ]
        },
        {
          value: '河南',
          label: '河南',
          children: [
            { value: '郑州', label: '郑州' },
            { value: '洛阳', label: '洛阳' },
            { value: '开封', label: '开封' },
            { value: '新乡', label: '新乡' },
            { value: '焦作', label: '焦作' },
            { value: '许昌', label: '许昌' },
            { value: '平顶山', label: '平顶山' },
            { value: '安阳', label: '安阳' },
            { value: '鹤壁', label: '鹤壁' },
            { value: '濮阳', label: '濮阳' },
            { value: '商丘', label: '商丘' },
            { value: '信阳', label: '信阳' },
            { value: '周口', label: '周口' },
            { value: '驻马店', label: '驻马店' }
          ]
        },
        {
          value: '湖北',
          label: '湖北',
          children: [
            { value: '武汉', label: '武汉' },
            { value: '黄石', label: '黄石' },
            { value: '十堰', label: '十堰' },
            { value: '宜昌', label: '宜昌' },
            { value: '襄阳', label: '襄阳' },
            { value: '鄂州', label: '鄂州' },
            { value: '荆门', label: '荆门' },
            { value: '孝感', label: '孝感' },
            { value: '荆州', label: '荆州' },
            { value: '黄冈', label: '黄冈' },
            { value: '咸宁', label: '咸宁' },
            { value: '随州', label: '随州' }
          ]
        },
        {
          value: '湖南',
          label: '湖南',
          children: [
            { value: '长沙', label: '长沙' },
            { value: '株洲', label: '株洲' },
            { value: '湘潭', label: '湘潭' },
            { value: '衡阳', label: '衡阳' },
            { value: '邵阳', label: '邵阳' },
            { value: '岳阳', label: '岳阳' },
            { value: '常德', label: '常德' },
            { value: '张家界', label: '张家界' },
            { value: '益阳', label: '益阳' },
            { value: '郴州', label: '郴州' },
            { value: '永州', label: '永州' },
            { value: '怀化', label: '怀化' },
            { value: '娄底', label: '娄底' }
          ]
        },
        {
          value: '广东',
          label: '广东',
          children: [
            { value: '广州', label: '广州' },
            { value: '深圳', label: '深圳' },
            { value: '汕头', label: '汕头' },
            { value: '佛山', label: '佛山' },
            { value: '韶关', label: '韶关' },
            { value: '惠州', label: '惠州' },
            { value: '梅州', label: '梅州' },
            { value: '汕尾', label: '汕尾' },
            { value: '河源', label: '河源' },
            { value: '阳江', label: '阳江' },
            { value: '清远', label: '清远' },
            { value: '东莞', label: '东莞' },
            { value: '中山', label: '中山' },
            { value: '潮州', label: '潮州' },
            { value: '揭阳', label: '揭阳' },
            { value: '云浮', label: '云浮' }
          ]
        },
        {
          value: '广西',
          label: '广西',
          children: [
            { value: '南宁', label: '南宁' },
            { value: '柳州', label: '柳州' },
            { value: '桂林', label: '桂林' },
            { value: '梧州', label: '梧州' },
            { value: '北海', label: '北海' },
            { value: '防城港', label: '防城港' },
            { value: '钦州', label: '钦州' },
            { value: '贵港', label: '贵港' },
            { value: '玉林', label: '玉林' },
            { value: '百色', label: '百色' },
            { value: '河池', label: '河池' },
            { value: '来宾', label: '来宾' },
            { value: '崇左', label: '崇左' }
          ]
        },
        {
          value: '海南',
          label: '海南',
          children: [
            { value: '海口', label: '海口' },
            { value: '三亚', label: '三亚' },
            { value: '儋州', label: '儋州' }
          ]
        },
        {
          value: '四川',
          label: '四川',
          children: [
            { value: '成都', label: '成都' },
            { value: '自贡', label: '自贡' },
            { value: '泸州', label: '泸州' },
            { value: '德阳', label: '德阳' },
            { value: '绵阳', label: '绵阳' },
            { value: '广元', label: '广元' },
            { value: '遂宁', label: '遂宁' },
            { value: '内江', label: '内江' },
            { value: '乐山', label: '乐山' },
            { value: '南充', label: '南充' },
            { value: '眉山', label: '眉山' },
            { value: '宜宾', label: '宜宾' },
            { value: '广安', label: '广安' },
            { value: '达州', label: '达州' },
            { value: '雅安', label: '雅安' },
            { value: '巴中', label: '巴中' },
            { value: '资阳', label: '资阳' },
            { value: '阿坝', label: '阿坝' },
            { value: '甘孜', label: '甘孜' },
            { value: '凉山', label: '凉山' }
          ]
        },
        {
          value: '贵州',
          label: '贵州',
          children: [
            { value: '贵阳', label: '贵阳' },
            { value: '遵义', label: '遵义' },
            { value: '安顺', label: '安顺' },
            { value: '六盘水', label: '六盘水' },
            { value: '黔东南', label: '黔东南' },
            { value: '黔南', label: '黔南' },
            { value: '铜仁', label: '铜仁' },
            { value: '毕节', label: '毕节' }
          ]
        },
        {
          value: '云南',
          label: '云南',
          children: [
            { value: '昆明', label: '昆明' },
            { value: '曲靖', label: '曲靖' },
            { value: '玉溪', label: '玉溪' },
            { value: '保山', label: '保山' },
            { value: '昭通', label: '昭通' },
            { value: '丽江', label: '丽江' },
            { value: '普洱', label: '普洱' },
            { value: '临沧', label: '临沧' },
            { value: '楚雄', label: '楚雄' },
            { value: '红河', label: '红河' },
            { value: '文山', label: '文山' },
            { value: '西双版纳', label: '西双版纳' },
            { value: '大理', label: '大理' },
            { value: '德宏', label: '德宏' },
            { value: '怒江', label: '怒江' },
            { value: '迪庆', label: '迪庆' }
          ]
        },
        {
          value: '陕西',
          label: '陕西',
          children: [
            { value: '西安', label: '西安' },
            { value: '铜川', label: '铜川' },
            { value: '宝鸡', label: '宝鸡' },
            { value: '咸阳', label: '咸阳' },
            { value: '渭南', label: '渭南' },
            { value: '延安', label: '延安' },
            { value: '汉中', label: '汉中' },
            { value: '榆林', label: '榆林' },
            { value: '安康', label: '安康' }
          ]
        },
        {
          value: '甘肃',
          label: '甘肃',
          children: [
            { value: '兰州', label: '兰州' },
            { value: '嘉峪关', label: '嘉峪关' },
            { value: '金昌', label: '金昌' },
            { value: '白银', label: '白银' },
            { value: '天水', label: '天水' },
            { value: '武威', label: '武威' },
            { value: '张掖', label: '张掖' },
            { value: '平凉', label: '平凉' },
            { value: '酒泉', label: '酒泉' },
            { value: '庆阳', label: '庆阳' },
            { value: '定西', label: '定西' },
            { value: '陇南', label: '陇南' }
          ]
        },
        {
          value: '青海',
          label: '青海',
          children: [
            { value: '西宁', label: '西宁' },
            { value: '海东', label: '海东' },
            { value: '海北', label: '海北' },
            { value: '黄南', label: '黄南' },
            { value: '海南', label: '海南' },
            { value: '果洛', label: '果洛' },
            { value: '玉树', label: '玉树' },
            { value: '海西', label: '海西' }
          ]
        },
        {
          value: '宁夏',
          label: '宁夏',
          children: [
            { value: '银川', label: '银川' },
            { value: '石嘴山', label: '石嘴山' },
            { value: '吴忠', label: '吴忠' },
            { value: '固原', label: '固原' },
            { value: '中卫', label: '中卫' }
          ]
        },
        {
          value: '新疆',
          label: '新疆',
          children: [
            { value: '乌鲁木齐', label: '乌鲁木齐' },
            { value: '克拉玛依', label: '克拉玛依' },
            { value: '吐鲁番', label: '吐鲁番' },
            { value: '哈密', label: '哈密' },
            { value: '昌吉', label: '昌吉' },
            { value: '博尔塔拉', label: '博尔塔拉' },
            { value: '巴音郭楞', label: '巴音郭楞' },
            { value: '阿克苏', label: '阿克苏' },
            { value: '克孜勒苏', label: '克孜勒苏' },
            { value: '喀什', label: '喀什' },
            { value: '和田', label: '和田' },
            { value: '伊犁', label: '伊犁' },
            { value: '塔城', label: '塔城' },
            { value: '阿勒泰', label: '阿勒泰' }
          ]
        },
        {
          value: '香港',
          label: '香港',
          children: [
            { value: '香港', label: '香港' }
          ]
        },
        {
          value: '澳门',
          label: '澳门',
          children: [
            { value: '澳门', label: '澳门' }
          ]
        }
      ]
    }
  },
  methods: {
    // 格式化时间为指定形式
    formatTime (time) {
      return dayjs(time).format('YYYY-M-D HH:mm:ss')
    },
    // 多级select选择后进行保存
    onCityChange (value) {
      this.updateInfo.region = value[value.length - 1]
    },
    // 保存基础信息
    async saveInfo () {
      // 发起请求提交基础信息到后端
      const res = await updateInfo(this.updateInfo)
      console.log(res)
      // 进行调用获取请求进行渲染
      const res2 = await getInfo(store.getters.email)
      this.info = res2.data.data
      this.clearInfo()
    },
    // 清空基础信息
    clearInfo () {
      this.updateInfo = {
        email: store.getters.email,
        username: '',
        school: '',
        major: '',
        region: '',
        edu: ''
      }
      this.selectedCity = []
    }
  },
  async created () {
    // 发起请求对info进行覆盖
    const res = await getInfo(store.getters.email)
    // console.log(res)
    this.info = res.data.data
  }
}
</script>

<style scoped>
.wrapper{
  /* 设置版心高度（可删掉改为内容撑开） */
  min-height: calc(100vh - 156px);
  height: auto;
  margin-bottom: 40px;
  padding: 45px 15vw 40px;
  text-align: center;
  position: relative;
  /* flex布局 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  /* outline: 0.1px solid black;
  outline-offset: -15vw; */
}

/* 内容区 */
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36vw;
}
.content .page-title {
  font-size: 50px;
  font-weight: bold;
  color: #0f6bffcf;
  line-height: 70px;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
}
.content .page-title span {
  font-size: 70px;
  line-height: 70px;
  font-weight: bold;
  color: transparent;
  -webkit-text-stroke: 1.8px #0f6bffc4;
  text-shadow: none;
}

/* 装饰区 */
.decoration{
  position: absolute;
  top: 50px;
  right: 70px;
  pointer-events: none;
}
.decoration img{
  width: 135px;
  animation: floatRotateAnimation 3s linear infinite;
}
.decoration_global{
  position: absolute;
  z-index: 999;
  pointer-events: none;
  top: 50px;
  left: 70px;
}
.decoration_global img{
  width: 150px;
  animation: scaleAnimation 3.5s infinite ease-in-out;
}

@keyframes scaleAnimation {
  0% {
    transform: scale(1); /* 初始大小 */
  }
  50% {
    transform: scale(1.15); /* 放大一点 */
  }
  100% {
    transform: scale(1); /* 恢复原始大小 */
  }
}
@keyframes floatRotateAnimation {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(6deg) scale(1.05);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(-6deg) scale(1.05);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

/* 个人信息展示区 */
.showInfo{
  width: 100%;
  padding: 5px 25px 5px 65px;
  /* border: 1px solid #000; */
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 左侧头像 */
.showInfo .avatar{
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.avatar span.el-avatar{
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 33px;
  background-color: #bbbec4;
  margin-top: 5px;
  margin-bottom: 15px;
  transition: all 0.5s;
}
.avatar span.el-avatar:hover{
  border: 2px solid #5daeff;
}
.avatar p{
  user-select: none;
  font-size: 12px;
  color: rgb(105, 107, 111);
  text-align: center;
  cursor: pointer;
  padding: 2px 6px;
  border: 1.5px solid #bbbec4;
  border-radius: 11px;
  transition: all 0.3s;
}
.avatar p:hover{
  color: #5badff;
  border: 1.5px solid #69b4ff;
  box-shadow: 0px 0px 4px #69b4ff;
}
.avatar p:active{
  transform: scale(0.95);
}
/* 右侧图表 */
.showInfo ::v-deep .el-descriptions__table{
  display: block;
}
/* 微调项内容 */
.showInfo ::v-deep tr .el-descriptions-item__cell{
  /* border: 1.5px solid #a8d2fc; */
  border: 1.5px solid #7bbdff;
  padding: 12px 15px;
}
.showInfo ::v-deep tr td.el-descriptions-item__cell:last-child{
  padding-right: 40px;
}
.showInfo ::v-deep tr td.el-descriptions-item__cell:first-child{
  padding-right: 0px;
}
.showInfo ::v-deep tbody:not(:last-of-type) tr td.el-descriptions-item__cell:nth-child(2){
  padding: 12px 20px;
}
/* 表头、内容 */
::v-deep span.my-label {
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  color: #373737;
}
::v-deep span.my-content {
  font-size: 16px;
  font-family: 'Consolas';
}
::v-deep span {
  display: flex;
  align-items: center;
}

::v-deep .el-descriptions-item{
  transition: all 0.4s;
}
::v-deep .el-descriptions-item:hover{
  background-color: #badcfe;
}

/* 下方修改区 */
.updateInfo{
  width: 100%;
  margin-top: 0px;
}
::v-deep .el-tabs__header{
  margin-bottom: 30px;
}

::v-deep .el-tabs__nav-scroll{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* padding-left: 20px; */
}
::v-deep .el-tabs__nav{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
::v-deep .el-tabs__nav div.el-tabs__item.is-top{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 12px;
}
::v-deep .el-tabs__nav div.el-tabs__item span{
  display: block;
  padding: 10px 15px;
  line-height: 20px;
  transition: all 0.3s;
  font-size: 16px;
  color: #333;
  user-select: none;
}
::v-deep .el-tabs__nav div.el-tabs__item.is-active span{
  background-color: #f4f3f7;
  border-radius: 6px 6px 0 0;
  color: #2578ff;
}

/* 基础信息设置区域 */
.basic-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 255px;
}

.basic-info .form-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  position: relative;
}

.form-group label {
  width: 50px;
  text-align: right;
  font-size: 16px;
  line-height: 24px;
  color: #333;
}

.form-group input {
  flex: 1; /* 让输入框占满剩余空间 */
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s;
  letter-spacing: 0.1em;
}
.form-group input:not(:disabled):hover{
  border: 1px solid #636363;
}
.form-group input:not(:disabled):focus{
  border: 1px solid #409eff;
}

/* 单独样式设置 */
.form-group input:disabled{
  background-color: #dddddd;
  color: #999;
  cursor: not-allowed;
}
.form-group .word-limit {
  position: absolute;
  right: 12px;
  top: 9px;
  font-size: 12px;
  color: #757575;
}
.form-group ::v-deep .el-cascader{
  flex: 1;
}
.form-group ::v-deep .el-cascader .el-input input {
  height: 36px;
  padding: 0 30px 0 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  color: #000;
}
.form-group ::v-deep .el-cascader .el-input input::placeholder{
  color: #757575;
}
.form-group ::v-deep .el-cascader .el-input span{
  height: 36px;
}
.form-group ::v-deep .el-cascader .el-input input:hover{
  border: 1px solid #636363;
}
.form-group ::v-deep .el-cascader .el-input input:focus{
  border: 1px solid #409eff;
}

/* 设置按钮 */
.basic-info .basic-info-buttons{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  margin-top: 5px;
  margin-left: 60px;
}

.basic-info-buttons .save-btn,
.basic-info-buttons .clear-btn {
  padding: 10px 20px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1em;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.3s;
}
.save-btn {
  background-color: #409eff;
  color: white;
}
.clear-btn {
  background-color: #aaaaaa;
  color: white;
}
.save-btn:hover {
  background-color: #5fafff;
}
.clear-btn:hover {
  background-color: #b9b9b9;
}
.save-btn:active {
  transform: scale(0.96);
}
.clear-btn:active {
  transform: scale(0.96);
}

/* 实名认证区域设置 */
.real-identity {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 200px;
  margin-top: 30px;
}

.real-identity .form-real {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  position: relative;
}

.form-real label {
  width: 70px;
  text-align: right;
  font-size: 16px;
  line-height: 24px;
  color: #333;
}

.form-real input {
  flex: 1; /* 让输入框占满剩余空间 */
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s;
  letter-spacing: 0.1em;
}
.form-real input:not(:disabled):hover{
  border: 1px solid #636363;
}
.form-real input:not(:disabled):focus{
  border: 1px solid #409eff;
}

.real-identity .real-identity-buttons{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  margin-top: 0px;
  margin-left: 60px;
}
.real-identity-buttons .real-submit-btn,
.real-identity-buttons .real-clear-btn {
  padding: 10px 20px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1em;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.3s;
}
.real-submit-btn {
  background-color: #409eff;
  color: white;
}
.real-clear-btn {
  background-color: #aaaaaa;
  color: white;
}
.real-submit-btn:hover {
  background-color: #5fafff;
}
.real-clear-btn:hover {
  background-color: #b9b9b9;
}
.real-submit-btn:active {
  transform: scale(0.96);
}
.real-clear-btn:active {
  transform: scale(0.96);
}

/* 修改密码组件 */
.change-pwd{
  display: flex;
  justify-content: center;
}

</style>
