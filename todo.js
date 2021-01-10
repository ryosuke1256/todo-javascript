// リストを4つつくる
// checkボタン装飾!!!!
// scssリファクタリング
//boxshadowいれる
//placeholder消えるの直す
//hover入れる
//リファクタリング
//レスポンシブ対応させる
//2分割させて　todoとdone作る!!
//reactで書く
//ハンバーガーメニュー作る
//ユーザー登録作る
//ドラッグ＆ドロップ作る！！
//モジュールでファイル分ける

let i = 0;
const $textForm = document.querySelector('#text_form');

const init = (ev) => {
  const $ul = document.querySelector('ul');

  if (ev === 13) {
    //textを空白にしてtextを投げる
    let $inputText = $textForm.value;
    console.log($textForm.value);
    const $span = document.createElement('span');
    // 中身空ならはじく　作成中
    // if ($textForm.value === '') {
    //   console.log('a');
    //   $tex.innerHTML = 'もう一度入力してください';
    //   return;
    // }
    $textForm.value = '';
    $span.innerHTML = $inputText;

    const $lists = document.querySelectorAll('.todo-container');
    const $dragRanges = document.querySelectorAll('div[name=dragRange]');

    //要素の作成
    const $newLi = document.createElement('li');
    const $newCheckBox = document.createElement('input');
    const $label = document.createElement('label');
    const $div = document.createElement('div');
    const $svg = document.createElement('svg');

    //子要素に追加
    $ul.appendChild($newLi);
    $newLi.appendChild($label);
    $label.appendChild($newCheckBox);
    $label.appendChild($span);
    $newLi.appendChild($div);
    $div.appendChild($svg);

    //属性追加
    $newCheckBox.type = 'checkbox';
    $newCheckBox.id = 'checkboxId';
    $newLi.draggable = 'true'; //drag処理
    $svg.id = 'trashId';
    $span.classList.add('todoText');
    $newLi.classList.add('todo-list-item');
    $div.classList.add('trash'); //クラス名スペースはクオーテーションとピリオドで区切る
    $svg.classList.add('far', 'fa-trash-alt'); //クラス名スペースはクオーテーションとピリオドで区切る
    $newLi.id = `listId${i}`;
    i++;

    const $trash = [...document.querySelectorAll('.trash')];
    const $li = document.querySelectorAll('li');

    for (let i = 0; i < $li.length; i++) {
      const $liItem = $li[i];
      $liItem.addEventListener('dragstart', (event) => {
        console.log('dragstart');
        //ドラッグするデータのid名をDataTransferオブジェクトにセット
        event.dataTransfer.setData('text', event.target.id);
      });
    }

    for (let i = 0; i < $lists.length; i++) {
      const $dragRange = $dragRanges[i];
      //ドラッグ要素がドロップ要素に重なっている間の処理
      $dragRange.addEventListener('dragover', (event) => {
        console.log('dragover');
        //dragoverイベントをキャンセルして、ドロップ先の要素がドロップを受け付けるようにする
        event.preventDefault();
      });
      $dragRange.addEventListener('drop', (event) => {
        console.log('drop');
        //ドラッグされたデータのid名をDataTransferオブジェクトから取得
        const id_name = event.dataTransfer.getData('text');
        //id名からドラッグされた要素を取得
        const drag_elm = document.getElementById(id_name);
        //ドロップ先にドラッグされた要素を追加
        event.currentTarget.appendChild(drag_elm);
        //できれば使いたくない、、
        drag_elm.style.backgroundColor = 'white';
        drag_elm.style.opacity = '0.92';
        drag_elm.style.listStyle = 'none';
        drag_elm.style.width = '90%';
        drag_elm.style.margin = '0 auto';
        drag_elm.style.borderRadius = '5px';
        drag_elm.style.marginBottom = '7px';
        //dragoverイベントをキャンセルして、ドロップ先の要素がドロップを受け付けるようにする
        event.preventDefault();
      });
    }

    $newCheckBox.addEventListener('click', () => {
      $label.classList.toggle('done');
    });

    $trash.forEach((x) => {
      x.addEventListener('click', () => {
        x.closest('li').remove();
      });
    });
  }
};
$textForm.addEventListener('keypress', (e) => {
  init(e.keyCode);
});
