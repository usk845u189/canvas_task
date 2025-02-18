'use strict'
let translationBtn = document.getElementById('translationBtn');
translationBtn.addEventListener('click', function(e){
    const textInput = document.getElementById('textInput').value;

    if (!textInput){
        alert("翻訳するテキストを入力してください")
        return
    }

    //Google Translation APIのキーとURLを設定する必要がある
    const apiKey = 'AIzaSyAHGVsKjDhOU0X09N1ZoTB6nwC_1e07BL8';
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const requestBody = {
        q: textInput,
        source: "ja",
        target: "en",
        format: "text"
    };

    const ajax = new XMLHttpRequest();
    ajax.open('POST',url, true);
    ajax.setRequestHeader('Content-Type', 'application/json');

    ajax.onreadystatechange = function(e) {
        if (ajax.readyState === 4 && ajax.status === 200) {
            const response = JSON.parse(ajax.responseText);
            const translatedText = response.data.translations[0].translatedText;

            document.getElementById('textOutPut').textContent = translatedText;
        } else if (ajax.readyState === 4){
            console.error('テキストの翻訳に失敗しました', ajax.statusText);
        }

    };

    ajax.send(JSON.stringify(requestBody));
}, false);

