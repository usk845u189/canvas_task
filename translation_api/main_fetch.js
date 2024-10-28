'use strict'
let translationBtn = document.getElementById('translationBtn');
translationBtn.addEventListener('click', function(e){
    const textInput = document.getElementById('textInput').value;

    // 未入力時のアラート
    if(!textInput){
        alert("翻訳するテキストを入力してください");
        return;
    }

    // APIキーの設定
    const apiKey = 'AIzaSyAHGVsKjDhOU0X09N1ZoTB6nwC_1e07BL8';
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    // リクエストの定義
    const requestBody = {
        q: textInput, 
        source: "ja", 
        target: "en", 
    };

    // 送信方法の設定
    const options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(requestBody)
    };

    // fetch送信
    fetch(url, options)
        .then(response => {
            if(!response.ok) {
                throw new Error('ネットワークエラー');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('textOutPut').textContent = data.data.translations[0].translatedText;
        })
        .catch(error => {
            console.error('エラー', error);
        });

}, false);