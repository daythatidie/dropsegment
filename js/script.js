window.onload = function() {

    const wrapper = document.getElementById("wrapper");
    const input = document.getElementById('fileinput');
    const spinner = document.getElementById('spinner');
    const segmentID = document.getElementById('segmentID');

    const fileUploadContainer = document.getElementById('fileUploadContainer');
    const fileContainer = document.querySelector('.fileContainer');
    const fileUploadFilename = document.querySelector('#file-upload-filename');

    const segmentNameContainer = document.getElementById('segmentNameContainer');
    const segmentName = document.getElementById('segmentName');
    const sendNameButton = document.getElementById('sendNameButton');

    const userNameContainer = document.getElementById('userNameContainer');
    const userName = document.getElementById('userName');
    const userNameButton = document.getElementById('sendUserNameButton');

    const finalMessage = document.getElementById('finalMessage');
    const finalMessageLink = document.querySelector('a[href="https://audience.yandex.ru/"]');
    const finalMessageDetails = document.getElementById('finalMessageDetails');

    const alert_box = document.querySelector('#alert_box');

    const corsurl = 'https://cors-anywhere.herokuapp.com/';
    const yauploadurl = 'https://api-audience.yandex.ru/v1/management/segments/upload_file';

    wrapper.classList.remove("hidden");
    $('#cover').fadeOut(1000);

    const preUpload = async function(file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('./upload.php', {
                method: 'POST',
                headers: {
                    // "Authorization": "OAuth AQAAAAAtn4Y1AAVJHlw9HiEGUU6NpwS_kK2TiyI",
                    // "Content-Type": "multipart/form-data;boundary="+boundary,
                    // "Content-Type": "application/octet-stream",
                    'origin': '*',
                    'x-requested-with': '*',
                    "Access-Control-Allow-Origin": "*"
                },
                body: formData // This is your file object
            })
            console.log(response);
            const data = await response.text();
            console.log('data is ', data);
            // console.log(data);
        } catch (error) {
            console.log('error is ', error);
            // status.innerHTML(error);
            // Handle the error response object
        }
    }

    const upload = async function(file) {
        // console.log(file.type);
        if ((file.type !== 'text/plain') && (file.type !== 'application/vnd.ms-excel')) {
            let message = 'Формат файл должен быть <strong>TXT</strong> или <strong>CSV</strong>';
            displayAlert(message);
        } else {
            alert_box.classList.add('hidden');
            fileUploadContainer.classList.add('hidden');
            fileUploadFilename.innerHTML = 'Имя твоего файла - <strong style="font-size:1.1rem;">' + file.name + '</strong>';
            fileUploadFilename.classList.remove('hidden');
            spinner.classList.remove('hidden');

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(corsurl + yauploadurl, {
                    method: 'POST',
                    headers: {
                        "Authorization": "OAuth AQAAAAAtn4Y1AAVJHlw9HiEGUU6NpwS_kK2TiyI",
                        // "Content-Type": "multipart/form-data;boundary="+boundary,
                        // "Content-Type": "application/octet-stream",
                        'origin': '*',
                        'x-requested-with': '*',
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: formData // This is your file object
                })
                const data = await response.json();
                // console.log(data);
                segmentID.innerHTML = data.segment.id;
                // console.log(segmentID.innerHTML);
                spinner.classList.add('hidden');
                segmentNameContainer.classList.remove('hidden');
                segmentName.focus();
                fileUploadContainer.classList.add('hidden');
                fileUploadFilename.classList.add('mt-5');

                // return data.message;
            } catch (error) {
                console.log('error is ', error);
                // status.innerHTML(error);
                // Handle the error response object
            }
        }
    }

    // const upload = (file) => {
    //     spinner.classList.remove('hidden');
    //     const xhr = new XMLHttpRequest();

    //     const boundary = String(Math.random()).slice(2);
    //     xhr.responseType = 'json';
    //     xhr.open('post', corsurl+yauploadurl, true);
    //     const form_data = new FormData();
    //     form_data.append('thefile', file);
    //     xhr.setRequestHeader("Content-Type", "multipart/form-data;boundary="+boundary);
    //     xhr.setRequestHeader('Authorization','OAuth AQAAAAAgSmEIAAVIm57wDGJDoEQdrULxJonV7Uc');
    //     xhr.send(form_data);


    //     xhr.onreadystatechange = function() {
    //         // Only run if the request is complete
    //         if (xhr.readyState !== 4) {
    //             spinner.classList.add('hidden');
    //             return
    //         };
    //         // Process our return data
    //         if (xhr.status >= 200 && xhr.status < 300) {
    //             // What do when the request is successful
    //             spinner.classList.add('hidden');
    //             status.innerHTML = JSON.parse(xhr.responseText);
    //         } else {
    //         // What to do when the request has failed
    //         console.log('error', xhr);
    //         }
    //     };
    // }

    // Event handler executed when a file is selected


    const nameSegment = async function(name, id) {
        segmentNameContainer.classList.add('hidden');
        spinner.classList.remove('hidden');
        let payload = {
            "segment": {
                "id": id,
                "name": name,
                "hashed": 0,
                "content_type": "mac"
            }
        };
        // console.log(JSON.stringify(payload));
        // const fData = new FormData();
        // fData.append("json", JSON.stringify(payload));

        try {
            const response = await fetch(corsurl + 'https://api-audience.yandex.ru/v1/management/segment/' + id + '/confirm', {
                method: 'POST',
                headers: {
                    "Authorization": "OAuth AQAAAAAtn4Y1AAVJHlw9HiEGUU6NpwS_kK2TiyI",
                    // "Content-Type": "multipart/form-data;boundary="+boundary,
                    "Content-Type": "application/json"
                },
                // body:fData
                body: JSON.stringify(payload)
            })
            const data = await response.json();
            // console.log(data);
            spinner.classList.add('hidden');
            userNameContainer.classList.remove('hidden');
            // userName.value= '@yandex.ru';
            userName.focus();
            // userName.setSelectionRange(this.value[0],this.value[0]);

            // return data.message;
        } catch (error) {
            console.log('error is ', error);
            // status.innerHTML(error);
            // Handle the error response object
        }
    }



    const sendUserName = async function(uname, id, name) {
        userNameContainer.classList.add('hidden');
        spinner.classList.remove('hidden');
        let payload = {
            "grant": {
                "user_login": uname,
                "comment": ""
            }
        };
        // console.log(JSON.stringify(payload));
        // const fData = new FormData();
        // fData.append("json", JSON.stringify(payload));

        try {
            const response = await fetch(corsurl + 'https://api-audience.yandex.ru/v1/management/segment/' + id + '/grant', {
                method: 'PUT',
                headers: {
                    "Authorization": "OAuth AQAAAAAtn4Y1AAVJHlw9HiEGUU6NpwS_kK2TiyI",
                    // "Content-Type": "multipart/form-data;boundary="+boundary,
                    "Content-Type": "application/json"
                },
                // body:fData
                body: JSON.stringify(payload)
            })
            const data = await response.json();
            // console.log(data);
            spinner.classList.add('hidden');
            userNameContainer.classList.add('hidden');
            finalMessageDetails.innerHTML = ('Cегмент <strong>' + name + '</strong> создан. <br> Права на его испольвание предоставлены твоей учетной записи <strong>' + uname + '@yandex.ru</strong><br>');
            finalMessage.classList.remove('hidden');
            // return data.message;
        } catch (error) {
            console.log('error is ', error);
            // status.innerHTML(error);
            // Handle the error response object
        }
    }

    function onClickSendButton() {
        if (segmentName.value.length > 0) {
            nameSegment(segmentName.value, segmentID.innerHTML);
            alert_box.classList.add('hidden');
        } else if (segmentName.value.length === 0) {
            let message = 'Введи текст';
            displayAlert(message);
        }
        return false;
    }

    function sendNameAfterKeyPress(event) {
        // console.log(event); //for Debugging stuff
        // console.log(event.keyCode); //for Debugging stuff
        if (this.value.length > 0 && event.keyCode === 13) {
            nameSegment(segmentName.value, segmentID.innerHTML);
            alert_box.classList.add('hidden');
        } else if (this.value.length === 0 && event.keyCode === 13) {
            let message = 'Введи текст';
            displayAlert(message);
        }
        return false;
    }

    function onClickUserButton() {
        if (userName.value.length > 0) {
            sendUserName(userName.value, segmentID.innerHTML, segmentName.value);
            alert_box.classList.add('hidden');
        } else if (userName.value.length === 0) {
            let message = 'Введи текст';
            displayAlert(message);
        }
        return false;
    }

    function sendUserAfterKeyPress(event) {
        // console.log(event); //for Debugging stuff
        // console.log(event.keyCode); //for Debugging stuff
        if (this.value.length > 0 && event.keyCode === 13) {
            sendUserName(userName.value, segmentID.innerHTML, segmentName.value);
            alert_box.classList.add('hidden');
        } else if (this.value.length === 0 && event.keyCode === 13) {
            let message = 'Введи текст';
            displayAlert(message);
        }
        return false;
    }

    function displayAlert(alertMessage) {
        // segmentName.classList.add('hidden');
        // userName.classList.add('hidden');
        alert_box.innerHTML = alertMessage;
        alert_box.classList.remove('hidden');
        return false;
    }

    const onSelectFile = () => upload(input.files[0]);
    // const onSelectFile = () => preUpload(input.files[0]);

    // Add a listener on your input
    // It will be triggered when a file will be selected
    input.addEventListener('change', onSelectFile, false);

    sendNameButton.addEventListener('click', onClickSendButton, false);
    segmentName.addEventListener('keypress', sendNameAfterKeyPress, false);
    segmentName.addEventListener('input', function() {
        alert_box.classList.add('hidden');
    }, false);

    userNameButton.addEventListener('click', onClickUserButton, false);
    userName.addEventListener('keypress', sendUserAfterKeyPress, false);
    userName.addEventListener('input', function() {
        alert_box.classList.add('hidden');
    }, false);


    // finalMessageLink.addEventListener('click', function() {
    //     finalMessage.classList.add('hidden');
    //     fileUploadFilename.classList.add('hidden');
    //     fileUploadContainer.classList.remove('hidden');
    // }, false);
}