/**
 * @author liyixin5
 * @date 2015-10-22
 * @desc 视频内嵌页模板
 */

/**
 * @author liyixin5
 * @date 2015-10-22
 * @desc 内嵌视频模板
 */

    var VOD = {
      doc: window.document, 
      docElem: window.document.documentElement, 
      container: document.querySelector('.mod_container'), 
      videoWrap: document.querySelector('.video'),      // 视频容器
      video: document.getElementById('video'),          // 视频
      andVideo: document.getElementById('video_and'), 	// 安卓版视频
      videoRatio: 750/1208,                             // 视频宽高比

      aud: document.getElementById('aud'),              // 音频

      loading: document.getElementById('loading'),      // 加载
      loadingClass: 'loading', 							// 加载模块类名
      loadedClass: 'loaded', 							// 已加载类名
      loadingPer: 0,                                    // 加载百分比
      per: document.getElementById('vper'),             // 进度百分比数值
      bar: document.querySelector('.loading_bar'),      // 进度条
      barClass: 'loading_bar', 							// 进度条类名
      barLoadingClass: 'loading_bar_loading', 			// 进度条出现类名

      muteBtn: document.getElementById('muteBtn'),      // 静音按钮
      muteBtnClass: 'mute_btn', 						// 静音按钮类名
      muteBtnOnClass: 'mute_btn_on', 					// 已静音样式类名

      playBtn: document.getElementById('playBtn'),      // 播放按钮
      replayBtn: document.getElementById('replayBtn'),  // 重播按钮
      replayTime: 27, 									// 重播按钮出现时间点

      stalled: document.getElementById('stalled'),      // 停止加载提示
      juhua: document.getElementById('modLoading'),     // 缓冲未完成菊花
      pageWidth: 0,                                     // 页面宽
      pageHeight: 0,                                    // 页面高

      init: function(and){
        var self = this, 
            timer2 = null, 
            perTemp = 0, 
            loadPercentage = 0, 
            and = and?1:0;

        self.initAnd(and);
        // 设置宽高
        self.setSize();
          
        self.video.addEventListener('play', function(){
          self.per.innerText = 100;
          var a = setInterval(function(){
            var time = self.video.currentTime;
            if(time > 0){
              self.per.innerText = 100;
              self.loading.setAttribute('class', self.loadingClass + ' ' + self.loadedClass);
              setTimeout(function(){
                self.loading.style.display='none';
              }, 1000);
              if(!and){
                self.aud.play();
              }
              clearInterval(a);
            }
          }, 200);

          self.play();

          // 重播按钮出现设置
          (function loop(){
            if(self.video.currentTime.toFixed(2) > 0 && and){
              self.video.style.left = '0';
            }

            if(self.video.currentTime>=self.replayTime){
              self.replayBtn.style.display='';
            }else{
              self.replayBtn.style.display='none';
            }

            self.replay(and);

            setTimeout(loop, 1000/30);
          })();
        }, 0);

        // 视频停止
        self.video.addEventListener('stalled', function(){
          self.video.play();
          self.stalled();
        }, 0);

        // 进度条数值递增
        timer2 = setInterval(function(){
          perTemp += 5;
          var loadPer = loadPercentage || 0;
          if(perTemp/100 > 0.98){
            perTemp = 98;
          }
          self.per.innerText = perTemp;
        }, 20);

        // 音频控制
        if(!and){
          self.muteBtn.addEventListener('click', function(){
            var muted = self.aud.paused;
            if(!muted){
              self.aud.pause();
            }else{
              self.aud.play();
            }
            muted = self.aud.paused;
            if(muted){
              this.setAttribute('class', self.muteBtnClass+' '+self.muteBtnOnClass);
            }else{
              this.setAttribute('class', self.muteBtnClass);
            }

            self.mute();
          }, 0);
        }

        self.playBtn.addEventListener('click', function(){
          if(and){
            self.video.style.display = 'block';
          }
          self.video.play();
          self.playBtn.style.display = 'none';
          self.bar.setAttribute('class', self.barClass + ' ' + self.barLoadingClass);

          self.startPlay();
        }, 0);

        // 重播控制
        self.replayBtn.addEventListener('click', function(){
          self.video.currentTime = '0';
          if(!and){
            if(!self.aud.paused){
              self.aud.play();
            }
          }else{
            self.video.style.display = 'block';
            self.video.currentTime = 0;
          }
          self.video.play();
          this.style.display='none';

          self.startReplay();
        }, 0);

        self.doc.addEventListener('touchmove', function(e){
          e.preventDefault();
        }, 0);
      }, 

      // 设置宽高
      setSize: function(){
        var self = this, 
            s;
        self.pageWidth = (s = self.docElem.clientWidth)>640? 640:s;
        self.pageHeight = self.docElem.clientHeight;

        self.videoWrap.style.width = self.pageWidth + 'px';
        self.videoWrap.style.height = self.pageHeight + 'px';
        self.video.style.width = self.pageWidth + 'px';
        self.video.style.height = self.pageWidth/self.videoRatio + 'px';
      }, 

      initAnd: function(and){}, 

      // 视频播放时
      play: function(){}, 

      // 视频循环播放设置
      replay: function(and){}, 

      // 视频暂停时，各终端对应状态不同
      stalled: function(){}, 

      // 静音按钮点击事件
      mute: function(){},

      // 播放按钮点击事件
      startPlay: function(){}, 

      // 重播按钮点击事件
      startReplay: function(){}, 

      extend: function(obj){
      	var self = this, 
      		obj = obj;
      	for(key in obj){
      		self[key] = obj[key];
      	}
      }
    }