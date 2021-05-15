<!doctype html>
<html lang="en">
<%- include('başlık.ejs', {bot, user, path}) %>
<head>
<% if (bot.ayar.has(`karalist_${user.id}`)) return "Botun komutlarını kullanabilme ve siteyi görme hakkınız bulunmamaktadır!";  { %>
 <% } %>
 
  <!-- Required meta tags -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
  <!-- Material Kit CSS -->

<title>
  Merhaba, <%=user.username%>
  </title>
   <link href="/css/site.css" rel="stylesheet" />
    <link href="/css/demo.css" rel="stylesheet" />
  <link rel='icon' href='<%=bot.avatarURL%>'>


</head>

<body class="dark-edition">
  <div class="wrapper ">
    <div class="sidebar" data-color="mor" data-background-color="black" data-image="./css/olsana.png">
      <!--
        Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

        Tip 2: you can also add an image using data-image tag
    -->
      <div class="logo"><a href="https://dash.vortexbot.org/anasayfa" class="simple-text logo-normal">
          Vortex Anasayfa
        </a></div>
      <div class="sidebar-wrapper">
        <ul class="nav">
        
         <li class="nav-item ">
            <a class="nav-link" href="http://dash.vortexbot.org/anasayfa">
              <i class="material-icons">announcement</i>
              <p>Bilgilendirme</p>
            </a>
          </li>
          <li class="nav-item ">
           <a class="nav-link" href="http://dash.vortexbot.org/panel">
              <i class="material-icons">dashboard</i>
              <p>Yönetim Paneli</p>
            </a>
          </li>
            <li class="nav-item active  ">
            <a class="nav-link" href="http://dash.vortexbot.org/kullanici/<%=user.id%>/yonet">
              <i class="material-icons">photo</i>
              <p>Seviye Kartı</p>
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" href="http://dash.vortexbot.org/kullanici/<%=user.id%>">
              <i class="material-icons">person</i>
              <p>Kullanıcı Bilgi</p>
            </a>
          </li>
           <li class="nav-item ">
            <a class="nav-link" href="http://dash.vortexbot.org/komutlar">
              <i class="material-icons">dvr</i>
              <p>Komutlar</p>
            </a>
          </li>
          
         
          <li class="nav-item ">
            <a class="nav-link" href="http://dash.vortexbot.org/botuekle">
              <i class="material-icons">
add</i>
              <p>Botu Sunucuna Ekle</p>
              </a>
          </li>
                        <li class="nav-item ">
            <a class="nav-link" href="./cikis">
              <i class="material-icons">exit_to_app</i>
              <p>Çıkış Yap</p>
              </a>
          </li>
           
        </ul>
      </div>
    </div>
    <div class="main-panel">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top " id="navigation-example">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <a class="navbar-brand" href="javascript:void(0)">Dashboard</a>
          </div>
        <%if(user) {%>
               <%  if(bot.ayar.has(`üyelikk_${user.id}`) === true)  { %>
            <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              <img src="https://cdn.discordapp.com/avatars/<%=user.id%>/<%=user.avatar%>.png?size=32" width="31" height="31" class="d-inline-block align-middle rounded-circle" style="border-style:solid;border-width: 1px;border-color: #eef60e ">
           </a>
          <%  }  %> 
         
      <%}%>
             <%if(user) {%>
               <%  if(!bot.ayar.has(`üyelikk_${user.id}`) === true)  { %>
            <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              <img src="https://cdn.discordapp.com/avatars/<%=user.id%>/<%=user.avatar%>.png?size=32" width="30" height="30" class="d-inline-block align-middle rounded-circle" alt="">
           </a>
          <%  }  %> 
         
      <%}%>
          
             <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation" data-target="#navigation-example">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
          </button>
     
          
      </nav>
          
           
      
          
  <% const db = bot.ayar; %>
<% const u = bot.users.get(user.id); %>

<div class="container">
	
		<div align="center">
<form method="POST">

<h3 id="sssss"></h3>
  <br>
<h2>
  Seviye Kartı Düzenleme 
  
  </h2>

<br>
  <br>

  

    <div class="row">
      <div class="col-25">
          <label for="lvl2">Seviye sistemi</label>
      </div>
      <div class="col-75">
        <% if (bot.ayar.has(`lvl2_${user.id}`) === false) { %>
        <label style="margin-right:80%;" class="switch">
         <input type="checkbox" id="lvl2" name="lvl2" value="aktif">
         <span class="slider round"></span>
        </label>
          <% } %>
					<% if(bot.ayar.has(`lvl2_${user.id}`) === true) { %>
        <label style="margin-right:80%;" class="switch">
         <input type="checkbox" id="lvl2" name="lvl2" value="deaktif" checked>
         <span class="slider round"></span>
        </label>
          <% } %>
      </div>
    </div>
<div class="row">
<div class="col-25">
<label for="renk">Seviye kartı rengi</label>
</div>
<div class="col-75">
<% if (bot.ayar.has(`${user.id}.renk`) === false) { %>
<input type="color" id="renk" name="renk" style="width:87%" value="#84a0ed">
<a href="/kullanici/<%=user.id%>/yonet/renk/sifirla" class="reset-btn" role="button">Sıfırla</a>
<% } else { %>
<input type="color" id="renk" name="renk" style="width:87%" value="<%=bot.ayar.fetch(`${user.id}.renk`)%>">
<a href="/kullanici/<%=user.id%>/yonet/renk/sifirla" class="reset-btn" role="button">Sıfırla</a>
<% } %>
</div>
</div>


<div class="row">
<div class="col-25">
<label for="resim">Seviye kartı arka plan resmi</label>
</div>

<div class="col-75">
<% if (bot.ayar.has(`${user.id}.resim`) === false || bot.ayar.fetch(`${user.id}.resim`) === "https://img.revabot.tk/99kd63vyss.png") { %>
<input type="url" id="resim" name="resim" style="width:87%" placeholder="Bir resim URL'si yazınız.">
<a href="/kullanici/<%=user.id%>/yonet/resim/sifirla" class="reset-btn" role="button">Sıfırla</a>
<% } else { %>
<input type="url" id="resim" name="resim" style="width:87%" placeholder="Bir resim URL'si yazınız resim .png veya .jpg şeklinde olmalıdır ve boyutu çok büyük olmamalıdır." value="<%=bot.ayar.fetch(`${user.id}.resim`)%>">
<a href="/kullanici/<%=user.id%>/yonet/resim/sifirla" class="reset-btn" role="button">Sıfırla</a>
<div align="left" class="col-25">
  


<label for="resim">Resim</label>
 
  
<img src="<%=bot.ayar.fetch(`${user.id}.resim`)%>" width="600px" height="450px"><br><br>
    

</div>
<% } %>
</div>
</div>

<button id="formbtn" class="save-btn" type="submit"><i class="fa fa-save fa-fw"></i> Değişiklikleri Kaydet</button>

      </form>
    </div>
  </div>
  </div>
    
  
  <script src="/css/js/jquery.min.js"></script>
  <script src="/css/js/popper.min.js"></script>
  <script src="/css/js/bootstrap-material-design.min.js"></script>
  <script src="https://unpkg.com/default-passive-events"></script>
  <script src="/css/js/perfect-scrollbar.jquery.min.js"></script>
  <!-- Place this tag in your head or just before your close body tag. -->
  <script async defer src="https://buttons.github.io/buttons.js"></script>
  <!--  Google Maps Plugin    -->

  <!-- Chartist JS -->
  <script src="/css/js/chartist.min.js"></script>
  <!--  Notifications Plugin    -->
  <script src="/css/js/bootstrap-notify.js"></script>
  <!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="/css/js/material-dashboard.js?v=2.1.0"></script>
    
  <!-- Material Dashboard DEMO methods, don't include it in your project! -->
  <script src="/css/js/demo.js"></script>

 <!--   Core JS Files   -->
  
  <script>
    $(document).ready(function() {
      $().ready(function() {
        $sidebar = $('.sidebar');

        $sidebar_img_container = $sidebar.find('.sidebar-background');

        $full_page = $('.full-page');

        $sidebar_responsive = $('body > .navbar-collapse');

        window_width = $(window).width();

        $('.fixed-plugin a').click(function(event) {
          // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
          if ($(this).hasClass('switch-trigger')) {
            if (event.stopPropagation) {
              event.stopPropagation();
            } else if (window.event) {
              window.event.cancelBubble = true;
            }
          }
        });

        $('.fixed-plugin .active-color span').click(function() {
          $full_page_background = $('.full-page-background');

          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('color');

          if ($sidebar.length != 0) {
            $sidebar.attr('data-color', new_color);
          }

          if ($full_page.length != 0) {
            $full_page.attr('filter-color', new_color);
          }

          if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.attr('data-color', new_color);
          }
        });

        $('.fixed-plugin .background-color .badge').click(function() {
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('background-color');

          if ($sidebar.length != 0) {
            $sidebar.attr('data-background-color', new_color);
          }
        });

        $('.fixed-plugin .img-holder').click(function() {
          $full_page_background = $('.full-page-background');

          $(this).parent('li').siblings().removeClass('active');
          $(this).parent('li').addClass('active');


          var new_image = $(this).find("img").attr('src');

          if ($sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            $sidebar_img_container.fadeOut('fast', function() {
              $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
              $sidebar_img_container.fadeIn('fast');
            });
          }

          if ($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $full_page_background.fadeOut('fast', function() {
              $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
              $full_page_background.fadeIn('fast');
            });
          }

          if ($('.switch-sidebar-image input:checked').length == 0) {
            var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
            $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
          }

          if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
          }
        });

        $('.switch-sidebar-image input').change(function() {
          $full_page_background = $('.full-page-background');

          $input = $(this);

          if ($input.is(':checked')) {
            if ($sidebar_img_container.length != 0) {
              $sidebar_img_container.fadeIn('fast');
              $sidebar.attr('data-image', '#');
            }

            if ($full_page_background.length != 0) {
              $full_page_background.fadeIn('fast');
              $full_page.attr('data-image', '#');
            }

            background_image = true;
          } else {
            if ($sidebar_img_container.length != 0) {
              $sidebar.removeAttr('data-image');
              $sidebar_img_container.fadeOut('fast');
            }

            if ($full_page_background.length != 0) {
              $full_page.removeAttr('data-image', '#');
              $full_page_background.fadeOut('fast');
            }

            background_image = false;
          }
        });

        $('.switch-sidebar-mini input').change(function() {
          $body = $('body');

          $input = $(this);

          if (md.misc.sidebar_mini_active == true) {
            $('body').removeClass('sidebar-mini');
            md.misc.sidebar_mini_active = false;

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

          } else {

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar('destroy');

            setTimeout(function() {
              $('body').addClass('sidebar-mini');

              md.misc.sidebar_mini_active = true;
            }, 300);
          }

          // we simulate the window Resize so the charts will get updated in realtime.
          var simulateWindowResize = setInterval(function() {
            window.dispatchEvent(new Event('resize'));
          }, 180);

          // we stop the simulation of Window Resize after the animations are completed
          setTimeout(function() {
            clearInterval(simulateWindowResize);
          }, 1000);

        });
      });
    });
  </script>
  <script>
    $(document).ready(function() {
      // Javascript method's body can be found in assets/js/demos.js
      md.initDashboardPageCharts();

    });
  </script>
</body>

</html>
<%- include('footer.ejs', {bot, user, path}) %>