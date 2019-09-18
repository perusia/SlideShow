$(function(){
    /*
    Slideshow
    */
   $('.slideshow').each(function(){
       //変数の準備 
       //--------------------------------------------------
       var $container = $(this),
       $slideGroup = $container.find('.slideshow-slides'),
       $slides = $slideGroup.find('.slide'),
       $nav = $container.find('.slideshow-nav'),
       $indicator = $container.find('.slideshow-indicator'),

       slideCount = $slide.lenght,
       indicatorHTML = '',
       currentIndex = 0,
       duration = 500,
       easing = 'easeInOutExpo',
       interval = 7500,
       timer;

       //HTML要素の配置、生成、挿入
       //------------------------------------------------------
       //各スライドの位置を決定し、
       //対応するインジケーターのアンカーを生成
       $slides.each(function(i){
           $(this).css({left:100 * i + '%'});
           indicatorHTML += '<a href="#">' + (i + 1) + '</a>';
       });

       //インジケーターにコンテンツを挿入
       $indicator.html(indicatorHTML);

       //関数の定義
       //------------------------------------------------------------
       //任意のスライドを表示する関数
       function goToSlide(index){
           //スライドグループをターゲットの位置に合わせて移動
           $slideGroup.animate({left:-100 * index + '%'}, duration,easing);

           //現在のスライドのインデックスを上書き
           currentIndex = index;
           //ナビゲーションとインジケーターの状態を更新
           updateNav();
       }

       //スライドの状態に応じてナビゲーションとインジケーターを更新する関数
       function updateNav(){
           var $navPrev = $nav.find('.prev'),//戻る
           $navNext = $nav.find('.next');//進む
           //もし最初のスライドならPrevナビゲーションを無効に
           if(currentIndex===0){
               $navPrev.addClass('disabled');
           }
           else
           {
               $navPrev.removeClass('disabled');
           }
           //もし最後のスライドならNextナビゲーションを無効に
           if(currentIndex===slideCount - 1){
               $navNext.addClass('disabled');
           }
           else
           {
               $navNext.removeClass('disabled');
           }
           //現在のスライドのインジケーターを無効に
           $indicator.find('a').removeClass('active').eq(currentIndex).addClass('active');
       }

       //タイマーを開始する関数
       function startTimer(){
           //変数intervalで設定した時間が経過するごとに処理を実行
           timer=setInterval(function(){
               //現在のスライドのインデックスに応じて次に表示するスライドの決定
               //もし最後のスライドなら最初のスライドへ
               var nextIndex = (currentIndex + 1) % slideCount;
               goToSlide(nextIndex);
           }, interval);
       }

       //タイマーを停止する関数
       function stopTimer(){
           clearInterval(timer);
       }

       //イベントの登録
       //--------------------------------------------------------
       //ナビゲーションのリンクがクリックされたら該当するスライドを表示
       $nav.on('click','a',function(event){
           event.preventDefault();
           if($(this).hasClass('prev')){
               goToSlide(currentIndex - 1);
           }
           else
           {
               goToSlide(currentIndex + 1);
           }
       });
       //インジケーターのリンクがクックされたら該当するスライドを表示
       $indicator.on('click','a',function(event){
           event.preventDefault();
           if (!$(this).hasClass('active')){
               goToSlide($(this).index());
           }
       });
       //マウスが乗ったらタイマーを停止、外れたら開始
       $container.on({
           mouseenter: stopTimer,
           mouseleave: startTimer
       });
       //スライドショーの開始
       //---------------------------------------------------------
       //最初のスライドを表示
       goToSlide(currentIndex);
       //タイマーをスタート
       startTimer();
   });
});