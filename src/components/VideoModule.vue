<template>
  <div style="min-height: 78.8vh;" id="videoModule">
    <Layout>
      <Sider style="min-width: 200px; background: #fff;">
        <div id="anchorContent">
          <Anchor show-ink style="margin: 5px;">
            <AnchorLink href="#demovideo" title="演示视频">
              <AnchorLink href="#pcvideo" title="PC端">
                <AnchorLink href="#pcvideo1" title="功能类" />
                <AnchorLink href="#pcvideo2" title="应用类" />
              </AnchorLink>
              <!-- <AnchorLink href="#mobilevideo" title="移动端">
                <AnchorLink href="#mobilevideo1" title="功能类" />
                <AnchorLink href="#mobilevideo2" title="应用类" />
              </AnchorLink> -->
            </AnchorLink>
          </Anchor>
        </div>
      </Sider>
      <Layout>
        <Content>
          <div>
            <H3 id="demovideo">演示视频</H3>
            <Divider dashed orientation="left" id="pcvideo">PC端</Divider>
            <Divider dashed orientation="left" id="pcvideo1">功能类</Divider>
            <div v-for="(item, index) in pcFunction" :key="item.id">
              <Card style="width:500px;cursor:pointer;float:left;margin:20px;">
                <div style="text-align:center;" @click="playVidel(item, item.source, item.type, index)" @mouseover="previewImg(item, index)" @mouseout="backBgImg(item)">
                  <!-- <video v-if="item.titlepage" :poster="item.titlepage" id="video">
                    <source :src="item.fileurl" type="video/mp4">
                  </video> -->
                  <img v-if="item.titlepage" :src="item.titlepage" class="cover-img">
                  <img v-else-if="mouseoverFlag1 && mouseoverIndex1 === index" src="../assets/mengceng.png" class="cover-img">
                  <img v-else src="../assets/bg.jpg" class="cover-img">
                  <h3>{{item.title}}</h3>
                </div>
              </Card>
            </div>
            <Divider dashed orientation="left" id="pcvideo2">应用类</Divider>
            <div v-for="(item, index) in pcApplication" :key="item.id">
              <Card style="width:500px;cursor:pointer;float:left;margin:20px;">
                <div style="text-align:center;" @click="playVidel(item, item.source, item.type, index)" @mouseover="previewImg(item, index)" @mouseout="backBgImg(item)">
                  <img v-if="item.titlepage" :src="item.titlepage" class="cover-img">
                  <img v-else-if="mouseoverFlag2 && mouseoverIndex2 === index" src="../assets/mengceng.png" class="cover-img">
                  <img v-else src="../assets/bg.jpg" class="cover-img">
                  <h3>{{item.title}}</h3>
                </div>
              </Card>
            </div>
            <!-- <Divider dashed orientation="left" id="mobilevideo">移动端</Divider>
            <div>
              <Card>
                <div style="text-align:left;margin:20px;">
                  该功能暂时未开放
                </div>
              </Card>
            </div> -->
          </div> 
        </Content>
      </Layout>
    </Layout>
    <Modal v-model="modal11" class-name="modal-warp" :title="showPlayVideoTitle" fullscreen footer-hide>
      <Row class-name="modalStyle">
        <Col span="20">
          <div :style="changeVideoStyle">
            <video id="video" :src="playFileurl" controls="controls" autoplay="autoplay" preload='auto'></video>
          </div>
        </Col>
        <Col span="4" :style="menuList">
          <div :style="menuTabs">
            <p :style="[menuTab,{borderBottom: (videoPcType === 1 ? '2px solid #F0691C' : '2px solid #fff')},{color: (videoPcType === 1 ? '#F0691C' : '#fff')}]" @click="changeTab(1)">功能类</p>
            <p :style="[menuTab,{borderBottom: (videoPcType === 2 ? '2px solid #F0691C' : '2px solid #fff')},{color: (videoPcType === 2 ? '#F0691C' : '#fff')}]" @click="changeTab(2)">应用类</p>
          </div>
          <div :style="menuListContent">
            <div v-if="videoPcType === 1">
              <div v-for="(item, index) in pcFunction" :key="item.id"
                :style="[menuListContentItem, {color: (playFunVideoIndex === index ? '#F0691C' : '#fff')}, {background: (playFunVideoIndex === index ? '#1B222E' : (mouseoverFlagTab1 && playFunVideoIndex !== mouseoverIndexTab1 && mouseoverIndexTab1 === index ? '#263041' : ''))}]"
                @mouseover="videoHoverStyle(item, index)"
                @mouseout="videoOutStyle(item)"
                @click="playVideo(item, index)"
              >
                <p v-if="playFunVideoIndex === index && watchVideoPlayOrStop"><img :style="[playImg, {width: '16px'}, {height: '16px'}, {marginRight: '9px'}]" src="../assets/2.gif" alt=""></p>
                <p v-else-if="playFunVideoIndex === index && !watchVideoPlayOrStop"><img :style="playImg" src="../assets/stop.png" alt=""></p>
                <p v-else><img :style="playImg" src="../assets/play.png" alt=""></p>
                <p :style="menuTitle">{{item.title}}</p>
              </div>
            </div>
            <div v-if="videoPcType === 2">
              <div v-for="(item, index) in pcApplication" :key="item.id"
                :style="[menuListContentItem, {color: (playAppVideoIndex === index ? '#F0691C' : '#fff')}, {background: (playAppVideoIndex === index ? '#1B222E' : (mouseoverFlagTab2 && playAppVideoIndex !== mouseoverIndexTab2 && mouseoverIndexTab2 === index ? '#263041' : ''))}]"
                @mouseover="videoHoverStyle(item, index)"
                @mouseout="videoOutStyle(item)"
                @click="playVideo(item, index)"
              >
                <p v-if="playAppVideoIndex === index && watchVideoPlayOrStop"><img :style="[playImg, {width: '16px'}, {height: '16px'}, {marginRight: '9px'}]" src="../assets/2.gif" alt=""></p>
                <p v-else-if="playAppVideoIndex === index && !watchVideoPlayOrStop"><img :style="playImg" src="../assets/stop.png" alt=""></p>
                <p v-else><img :style="playImg" src="../assets/play.png" alt=""></p>
                <p :style="menuTitle">{{item.title}}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoLists: [
        {
          id:1,
          title: '智能分屏',
          fileurl: 'http://video.holywiser.com/play/smartstab.mp4',
          titlepage: '',
          type: 1,
          index: 1,
          source: 1
        },
        {
          id:2,
          title: '税法应用智能化模块',
          fileurl: 'http://video.holywiser.com/play/smartmodules.mp4',
          titlepage: '',
          type: 1,
          index: 2,
          source: 1
        },
        {
          id:3,
          title: '时间与关键字再次检索框',
          fileurl: 'http://video.holywiser.com/play/nextsearch.mp4',
          titlepage: '',
          type: 1,
          index: 3,
          source: 1
        },
        {
          id:4,
          title: '独特的实用性文件分类',
          fileurl: 'http://video.holywiser.com/play/smartfiles.mp4',
          titlepage: '',
          type: 1,
          index: 4,
          source: 1
        },
        {
          id:5,
          title: '文件页面的全新设计',
          fileurl: 'http://video.holywiser.com/play/newfilesdesign.mp4',
          titlepage: '',
          type: 1,
          index: 5,
          source: 1
        },
        {
          id:6,
          title: '行业检索',
          fileurl: '',
          titlepage: '',
          type: 1,
          index: 6,
          source: 1
        },
        {
          id:7,
          title: '税收优惠检索',
          fileurl: '',
          titlepage: '',
          type: 1,
          index: 7,
          source: 1
        },
        {
          id:8,
          title: '税收条约检索',
          fileurl: '',
          titlepage: '',
          type: 1,
          index: 8,
          source: 1
        },
        {
          id:9,
          title: '进出口税收检索',
          fileurl: '',
          titlepage: '',
          type: 1,
          index: 9,
          source: 1
        },
        {
          id:10,
          title: '检索结果一键上传与检索结果选择上传',
          fileurl: 'http://video.holywiser.com/play/filesupload.mp4',
          titlepage: '',
          type: 1,
          index: 10,
          source: 1
        },
        {
          id:11,
          title: '智慧云端—上传文件库，全新的工作方式',
          fileurl: '',
          titlepage: '',
          type: 1,
          index: 11,
          source: 1
        },
        {
          id:12,
          title: '我的秘书—云端变动提醒，实时在线的智能管家',
          fileurl: '',
          titlepage: '',
          type: 1,
          index: 12,
          source: 1
        },
        {
          id:13,
          title: '如何查找应用现行个人所得税政策？',
          fileurl: '',
          titlepage: '',
          type: 2,
          index: 1,
          source: 1
        },
        {
          id:14,
          title: '如何查找应用现行增值税优惠政策？',
          fileurl: '',
          titlepage: '',
          type: 2,
          index: 2,
          source: 1
        },
        {
          id:15,
          title: '建筑公司如何查找应用现行税收政策？',
          fileurl: 'http://video.holywiser.com/play/buildingfirm.mp4',
          titlepage: '',
          type: 2,
          index: 3,
          source: 1
        }
      ],
      pcFunction: [],
      pcApplication: [],
      modal11: false,
      videoPcType: 1,
      playFileurl: '',
      playFunVideoIndex: -1,
      playAppVideoIndex: -1,
      showPlayVideoTitle: '',
      mouseoverFlag1: false,
      mouseoverFlag2: false,
      mouseoverIndex1: -1,
      mouseoverIndex2: -1,
      mouseoverFlagTab1: false,
      mouseoverFlagTab2: false,
      mouseoverIndexTab1: -1,
      mouseoverIndexTab2: -1,
      watchVideoPlayOrStop: true,

      changeVideoStyle: {
        width: '97.8%'
      },
      menuList: {
        height: '100%',
        background: '#39455F'
      },
      menuTabs: {
        display: 'flex',
        height: '5%'
      },
      menuTab: {
        flex: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderBottom: '2px solid #fff'
      },
      menuListContent: {
        height: '95%',
        overflowY: 'auto'
      },
      menuListContentItem: {
        display: 'flex',
        height: '50px',
        lineHeight: '50px',
        cursor: 'pointer',
        borderBottom: '1px solid #465269',
        fontSize: '14px'
      },
      playImg: {
        flex: '0 0 20px',
        height: '20px',
        marginRight: '4px',
        marginLeft: '4px',
        marginTop: '15px'
      },
      menuTitle: {
        flex: '1',
        width: '238px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    }
  },
  mounted() {
    this.getVideoList()
    this.watchControlsClick()
  },
  methods: {
    getVideoList() {
      this.videoLists.forEach(item => {
        if (item.source === 1 && item.type === 1) {
          this.pcFunction.push(item)
        } else if (item.source === 1 && item.type === 2) {
          this.pcApplication.push(item)
        }
      })
    },
    // 鼠标移入显示预览图片
    previewImg(item, index) {
      if (item.type === 1) {
        this.mouseoverFlag1 = true
        this.mouseoverIndex1 = index
      } else if (item.type === 2) {
        this.mouseoverFlag2 = true
        this.mouseoverIndex2 = index
      }
    },
    // 鼠标移出
    backBgImg(item) {
      if (item.type === 1) {
        this.mouseoverFlag1 = false
      } else if (item.type === 2) {
        this.mouseoverFlag2 = false
      }
    },
    // 点击视频跳转播放页面
    playVidel(item, source, type, index) {
      this.videoPcType = type
      this.showPlayVideoTitle = item.title
      if (item.fileurl) {
        this.watchVideoPlayOrStop = true
      } else {
        this.$Message.warning({
          content: '此视频暂时无法播放，请观看其他视频！！！',
          duration: 3
        })
        this.watchVideoPlayOrStop = false
      }
      if (source === 1 && type === 1) {
        this.modal11 = true
        this.playFileurl = item.fileurl
        this.playFunVideoIndex = index
        this.playAppVideoIndex = -1
      } else if (source === 1 && type === 2) {
        this.modal11 = true
        this.playFileurl = item.fileurl
        this.playAppVideoIndex = index
        this.playFunVideoIndex = -1
      }
    },
    // 切换tab
    changeTab(type) {
      this.videoPcType = type
      if (type === 1 && this.playFunVideoIndex === -1) {
        this.playFunVideoIndex = -1
      } else if (type === 2 && this.playAppVideoIndex === -1) {
        this.playAppVideoIndex = -1
      }
    },
    // 点击播放列表播放视频
    playVideo(item, index) {
      if (item.type === 1 && item.fileurl) {
        this.playFunVideoIndex = index
        this.playAppVideoIndex = -1
        this.playFileurl = item.fileurl
        this.showPlayVideoTitle = item.title
        this.watchVideoPlayOrStop = true
      } else if (item.type === 2 && item.fileurl) {
        this.playAppVideoIndex = index
        this.playFunVideoIndex = -1
        this.playFileurl = item.fileurl
        this.showPlayVideoTitle = item.title
        this.watchVideoPlayOrStop = true
      } else {
        this.$Message.warning({
          content: '此视频暂时无法播放，请观看其他视频！！！',
          duration: 3
        })
        this.watchVideoPlayOrStop = false
        if (item.type === 1) {
          this.playFunVideoIndex = index
          this.playAppVideoIndex = -1
          this.playFileurl = item.fileurl
          this.showPlayVideoTitle = item.title
        } else if (item.type === 2) {
          this.playAppVideoIndex = index
          this.playFunVideoIndex = -1
          this.playFileurl = item.fileurl
          this.showPlayVideoTitle = item.title
        }
      }
    },
    // 监听视频是播放还是暂停状态
    watchControlsClick() {
      let video = document.getElementById('video')
      const that = this
      video.addEventListener('play', function() {
        that.watchVideoPlayOrStop = true
      })
      video.addEventListener('pause', function() {
        that.watchVideoPlayOrStop = false
      })
    },
    // 鼠标移入
    videoHoverStyle(item, index) {
      if (item.type === 1) {
        this.mouseoverFlagTab1 = true
        this.mouseoverIndexTab1 = index
        this.mouseoverIndexTab2 = -1
      } else if (item.type === 2) {
        this.mouseoverFlagTab2 = true
        this.mouseoverIndexTab2 = index
        this.mouseoverIndexTab1 = -1
      }
    },
    // 鼠标移出
    videoOutStyle(item) {
      if (item.type === 1) {
        this.mouseoverFlagTab1 = false
      } else if (item.type === 2) {
        this.mouseoverFlagTab2 = false
      }
    }
  }
}
</script>

<style lang="scss">
#videoModule {
  .cover-img {
    width: 450px;
    height: 220px;
  }
}
.modalStyle {
  height: 100%;
}
.modal-warp {
  .ivu-modal {
    .ivu-modal-content {
      color: #fff;
      background: #1B212D;
      .ivu-modal-header {
        border-bottom: 1px solid transparent;
        .ivu-modal-header-inner {
          color: #fff;
          font-size: 25px;
          height: 25px;
          line-height: 25px;
        }
      }
      .ivu-modal-body{
        padding: 0;
      }
    }
  }
}
#video {
  min-width: 600px;
  width: 100%;
  height: 100%;
  object-fit: fill;
  margin-left: 16px;
  &:focus {
    outline: none;
  }
}
</style>
