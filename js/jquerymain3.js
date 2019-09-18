$(function(){
    $('#gallery').each(function(){
        //#gollery要素がギャラリーのコンテナーになる
        var $container=$(this);

        //オプションを設定しMasonryを準備
        $container.masonry({
            columnWidth: 230,
            gutter: 10,
            itemSelector: '.gallery-item'
        });
        //JSONファイルをリクエストし、成功したら関数を実行
        $.getJSON('./data/content.json',function(data){
            //ループで生成したDOM要素(item)ごとにループ処理
            var element = [];
            //JSONの配列(data)の要素(item)ごとにループ処理
            $.each(data,function(i,item){
                //配列の要素からHTML文字列を生成
                var itemHTML='<li class="gallery-item is-loading">'+'<a href="' + item.images.large + '">' + '<img src="' + item.images.thumb + '"alt="' + item.title + '">' + '</a>' + '</li>';
                //HTML文字列をDOM要素化し、配列を追加
                elements.push($(itemHTML).get(0));
            });
            //DOMを挿入
            $container.append(elements);
            //画像の読み込みが完了したらMasonryレイアウト
            $container.imagesLoaded(function(){
                $(elements).removeClass('is-loading');
                $container.masonry('appended',elements);
            });
        });
    });
});