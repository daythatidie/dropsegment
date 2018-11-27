<?php
    // require_once "../pdo.php";

    // server should keep session data for AT LEAST 1 hour
    ini_set('session.gc_maxlifetime', 3600);

    // each client should remember their session id for EXACTLY 1 hour
    session_set_cookie_params(3600);
    session_start();
// echo "<pre>";
// echo "SESSION:";
// print_r($_SESSION);
// echo "POST:";
// print_r($_POST);
// echo "</pre>";
    $salt = 'XyZzy12*_';
    // echo (date("l dS of F Y H:i:s"));
    if (isset($_POST['password']) ) {
        $password = $_POST['password'];
        $password = mb_strtolower($password);
        echo $password;
        $check = hash('md5', $salt.$password);
        // echo $check;
        // echo "<br>";
        // echo hash('md5', $salt.'крок');
        if (($check === hash('md5', $salt.'крок')) || ($check === hash('md5', $salt.'croc')) && $_POST['password'] !=='') {
           $_SESSION['pwd'] = '8k2cPf7bZo';
           header('Location: ./');
           return;
        } else {
            $_SESSION['error'] = "Неправильное секретное слово\n";
            header('Location: ./');
           return;
        }
    }
?>
<!doctype html>
<html lang="ru">

<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-116232816-2"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-116232816-2');
    </script>

    <title>Создай свой сегмент из файла в Яндекс Аудитории</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#FFEBA0">
    <meta name="description" content="Позволяет создавать свой сегмент из файла с MAC-адресами в Яндекс Аудитории">
    <!-- Meta properties -->
    <meta property="og:title" content="Сегменты из файла в Яндекс Аудитории" />
    <meta property="og:description" content="Создавай свой сегмент из файла с MAC-адресами в Яндекс Аудитории" /> <!-- 50 letters optimal -->
    <meta property="og:url" content="https://www.dropsegment.site/" />
    <meta property="og:image" content="https://dropsegment.site/media/ogimage.png" />
    <!-- Canonical link for Google -->
    <link rel="canonical" href="https://dropsegment.site/" />
	<!-- FAVICON -->
    <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
	<link rel="icon" href="./favicon.ico" type="image/x-icon">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- Optional CSS -->
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <!-- Fastclick -->
    <script type='application/javascript' src='js/fastclick.min.js'></script>
<script type="application/javascript">
	window.addEventListener('load', function () {
		FastClick.attach(document.body);
	}, false);
</script> 
</head>
<body >
    <div id="cover">
        <div class="spinner2" id="loadingSpiner">
        </div>
    </div>
    <div id="wrapper" class="hidden">
    <?php 
if (isset($_SESSION['pwd']) && $_SESSION['pwd'] === '8k2cPf7bZo') {
    // unset($_POST['password']);
    // unset($_SESSION['pwd']);
    // header('Location: logout.php');
    // return;
 ?> 
    <section class="container-fluid text-center">
        <div class="row">
            <div class="col-12 col-sm-12 header">
                <h1>Cегменты из файла<sup>*</sup>в <strong class="yandex"><span style="color: #FF0000">Я</span>ндекс</strong>.Аудитории</h1>
                <h6>*Файл CSV или TXT с MAC-адресами, разделенными запятой</h6>
            </div>
            <div class="col-12 col-sm-12 fileinput btn-full-width" id="fileUploadContainer">
                <div class="step">Шаг <span style=" font-weight: bold;font-size: 2rem;">1</span></div>
                <label id="fileContainer" class="fileContainer btn btn-outline btn-outline-dark btn-outline-blue btn-xl btn-stretch ">
                    Загрузи файл
                    <input type="file" id="fileinput"  />
                </label>
            </div>
            <div id="file-upload-filename" class="col-12 hidden"></div>
            <div class="col-12 col-sm-12 spinner hidden" id="spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
            </div>
            <div class="hidden" id="segmentID"></div>

            <div id="segmentNameContainer" class="col-12 col-sm-12 segmentNameContainer hidden">
                
                <span class="step">Шаг <span style=" font-weight: bold;font-size: 2rem;">2</span></span>
                <input type="text" autocomplete="off" placeholder="Имя сегмента" id="segmentName" class="segmentName col-12 col-sm-12 col-md-2 col-lg-2" >
                <button type="submit" id="sendNameButton" class="sendNameButton btn btn-outline btn-outline-dark btn-outline-blue btn-xl btn-stretch btn-full-width">Далее</button>
                <div class="hint">
                    Напечатай имя сегмента и нажми <strong>Enter</strong> или кнопку <strong>Далее</strong>
                </div>
            </div>

            <div id="userNameContainer" class="col-12 col-sm-12 userNameContainer hidden">
                <span class="step">Шаг <span style=" font-weight: bold;font-size: 2rem;">3</span></span>
                <input type="text" autocomplete="off" placeholder="Твое имя в Yandex" id="userName" class="segmentName col-12 col-sm-12 col-md-2 col-lg-2">
                <button type="submit" id="sendUserNameButton" class="sendNameButton btn btn-outline btn-outline-dark btn-outline-blue btn-xl btn-stretch btn-full-width">Готово</button>
                <div class="hint">
                    Напечатай имя твоей учетной записи в Яндексе (<strong>без @yandex.ru</strong>) и нажми <strong>Enter</strong> или кнопку <strong>Готово</strong>
                </div>
            </div>
            <div class="alert_box col-12 col-sm-12 hidden" id="alert_box">Введи текст</div>
            <div class="col-12 col-sm-12 finalMessage hidden" id="finalMessage">
                <h3>Готово!</h3>
                <span id="finalMessageDetails"></span>
                <br>
                <h5>Список твоих сегментов доступен по ссылке <a href="https://audience.yandex.ru/" style="color:#FF0000;" target="_blank">audience.yandex.ru</a></h5>
                <a href="./"><div role="button" id="again" class="sendNameButton btn btn-outline btn-outline-dark btn-outline-blue btn-xl btn-stretch btn-full-width">Попробовать снова</div></a>
            </div>
        </div>
    </section>
    <!-- Optional JavaScript -->
    <script type="text/javascript" src="js/script.js"></script>
    <script src="js/papaparse.min.js"></script>
    <?php 
} else {
?>
    <section class="container-fluid text-center" >
        <div class="row ">
            <div class="col-12 col-sm-12 header">
                <h1>Cегменты из файла в <strong class="yandex"><span style="color: #FF0000">Я</span>ндекс</strong>.Аудитории</h1>
            </div>
            <div class="col-12 col-sm-12">
                <form class="form-signin loginForm btn-full-width" method="POST">
                    <h3 class="form-signin-heading">Введи секретное слово</h3>
                    <input id="loginPassword" type="password" class="segmentName col-12 col-sm-12 col-md-3 col-lg-3" name="password" placeholder="••••" required="" maxlength="4" autocomplete="off" />
<!--                     <label class="checkbox">
                        <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"> Remember me
                    </label> -->
                    <button class=" sendNameButton btn btn-outline btn-outline-dark btn-outline-blue btn-xl btn-stretch btn-full-width" type="submit">Войти</button>
                </form>
            </div>
            <?php 

    if ( isset($_SESSION['error']) ) {
        echo '<div class="col-12 col-sm-12" style="color: #FF0000;margin-top: 2rem;">'.$_SESSION['error'].'</div>';
        unset($_SESSION['error']);
    }
             ?>
        </div>
    </section>
    <!-- Optional JavaScript -->
    <script type="text/javascript" src="js/login.js"></script>
    <?php
}
 ?>
    </div>
 
    <!-- jQuery-->
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <!-- Bootstrap JS -->
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
</body>

</html>
