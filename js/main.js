'use strict'; 


/*----------------------------------------------------------------------*/
/* =  Preloader & Page Transition Overlay
/*----------------------------------------------------------------------*/

// Create a self-contained transition overlay injected directly by JS
// This avoids ALL conflicts with GSAP, CSS specificity, and filter overrides

var _transitionOverlay = null;

function createTransitionOverlay() {
  if (_transitionOverlay) return _transitionOverlay;
  
  var overlay = document.createElement('div');
  overlay.id = 'page-transition-overlay';
  overlay.style.cssText = [
    'position: fixed',
    'top: 0',
    'left: 0',
    'width: 100vw',
    'height: 100vh',
    'background: #0a0a0f',
    'z-index: 2147483647',   // max z-index
    'display: none',
    'flex-direction: column',
    'align-items: center',
    'justify-content: center',
    'opacity: 0',
    'transition: opacity 0.35s ease',
    'pointer-events: all',
    'filter: none',          // never let parent filter bleed in
  ].join(';');

  // Inner HTML — same design as the #loader preloader
  overlay.innerHTML = [
    '<div style="position:relative;width:80px;height:80px;display:flex;align-items:center;justify-content:center;margin-bottom:30px;">',
      '<div id="pto-ring1" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80px;height:80px;border:3px solid transparent;border-top:3px solid #12c2e9;border-radius:50%;animation:pto-spin 1s linear infinite;"></div>',
      '<div id="pto-ring2" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:88px;height:88px;border:3px solid transparent;border-top:3px solid #c471ed;border-radius:50%;animation:pto-spin 1.5s linear infinite reverse;"></div>',
    '</div>',
    '<div style="display:flex;gap:6px;margin-bottom:20px;">',
      '<span style="width:8px;height:8px;border-radius:50%;background:#12c2e9;animation:pto-dot 1.4s ease-in-out infinite both;animation-delay:-0.32s;"></span>',
      '<span style="width:8px;height:8px;border-radius:50%;background:#12c2e9;animation:pto-dot 1.4s ease-in-out infinite both;animation-delay:-0.16s;"></span>',
      '<span style="width:8px;height:8px;border-radius:50%;background:#12c2e9;animation:pto-dot 1.4s ease-in-out infinite both;animation-delay:0s;"></span>',
    '</div>',
    '<div style="width:200px;height:4px;background:rgba(255,255,255,0.15);border-radius:2px;overflow:hidden;">',
      '<div id="pto-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#12c2e9,#c471ed,#f64f59);border-radius:2px;animation:pto-progress 1.8s ease-in-out infinite;"></div>',
    '</div>',
  ].join('');

  // Inject keyframe animations into <head> (once)
  if (!document.getElementById('pto-styles')) {
    var style = document.createElement('style');
    style.id = 'pto-styles';
    style.textContent = [
      '@keyframes pto-spin { 0%{transform:translate(-50%,-50%) rotate(0deg)} 100%{transform:translate(-50%,-50%) rotate(360deg)} }',
      '@keyframes pto-dot { 0%,80%,100%{transform:scale(0.6);opacity:0.3} 40%{transform:scale(1);opacity:1} }',
      '@keyframes pto-progress { 0%{width:0%;margin-left:0} 50%{width:80%;margin-left:0} 100%{width:0%;margin-left:100%} }',
    ].join('\n');
    document.head.appendChild(style);
  }

  document.body.appendChild(overlay);
  _transitionOverlay = overlay;
  return overlay;
}

function showTransitionLoader() {
  var ov = createTransitionOverlay();
  ov.style.display = 'flex';
  // Force reflow so transition fires
  ov.offsetHeight;
  ov.style.opacity = '1';
  document.body.style.overflow = 'hidden';
}

function hideTransitionLoader() {
  var ov = _transitionOverlay;
  if (!ov) return;
  ov.style.opacity = '0';
  setTimeout(function() {
    ov.style.display = 'none';
    document.body.style.overflow = '';
  }, 380);
}

/*----------------------------------------------------------------------*/
/* =  Initial Page Loader (#loader in HTML)
/*----------------------------------------------------------------------*/

$(window).on('load', function () {
  var el = document.getElementById('loader');
  if (el) {
    // Make sure it's visible
    el.style.display = 'flex';
    el.style.opacity = '1';
    el.style.visibility = 'visible';
    // Hide after 2s
    setTimeout(function() {
      el.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
      setTimeout(function() { el.style.display = 'none'; }, 500);
    }, 2000);
  }
  // Pre-create overlay so it's ready
  createTransitionOverlay();
});

function ajaxLoad(){
  header_options();
  testimonialSlider();
  workslider();
  projectsSlider();
  lightbox();
  ContactForm(); 
  videoPlay();
  charts();
  isotope();
  if (typeof contactmap === 'function') contactmap();
  initProjectsPage();
  setTimeout(() => {
    scrollAnimation();
  }, 1000);
  setTimeout(() => {
   typed();
   clientSlider();
  }, 250);
}

// Initialize plugins on direct page load
$(document).ready(function() {
  initInteractiveFavicon();
  setTimeout(() => {
    ajaxLoad();
  }, 1000);
});


/*----------------------------------------------------------------------*/
/* =  BARBA JS Transitions
/*----------------------------------------------------------------------*/

  barba.init({
    transitions: [{
      name: 'default-transition',
      leave(data) {
        return new Promise((resolve) => {
          // Show our JS-injected transition overlay
          showTransitionLoader();

          // Also animate the outgoing page out
          pageTransition();
          
          setTimeout(() => {
            resolve();
          }, 700);
        });
      },
      enter(data) {
        return new Promise((resolve) => {
          ajaxLoad();
          if (typeof scrollbar !== 'undefined') scrollbar.scrollTo(0, 0, 0);
          
          gsap.to(".page-cover", {
            'margin-top': '0px',
            autoAlpha: 1,
            delay: 0.4,
            ease: Power3.easeOut,
            onComplete: () => {
              setTimeout(() => {
                hideTransitionLoader();
                resolve();
              }, 300);
            }
          });
          
          $('.page-cover').addClass('yoket');
          setTimeout(() => {
            $('.page-cover').removeClass('yoket');
          }, 1500);
        });
      }
    }],
  });

  function pageTransition() {
    var tl = new gsap.timeline({ yoyo: false, reversed: false });
    tl.to(".page-cover", .5, {'margin-top': '-50px', autoAlpha:0, ease: Power3.easeOut }, "Start");
  }










// MAGNIFIC POPUP    
function lightbox() {
  if( $('.lightbox').length ){
    $('.lightbox').attr('data-barba-prevent', 'all');
    $('.lightbox').magnificPopup({
          type:'image',
          gallery:{enabled:true},
          zoom:{enabled: true, duration: 300}
      });
  }
}




// VIDEO HOVER PLAY
function videoPlay(){
  if($('.video-wrapper').length){
    setTimeout(() => {
      $('video').get(0).pause();
    }, 10);
  }


  if($('.grid-item.grid-video').length){
    $('.grid-video').on("mouseenter",  function() {
      $(this).find('video').get(0).play();
    }).on("mouseleave", function(){
      $(this).find('video').get(0).pause();
    });
  }

  if($('.work-hero').length){
    setTimeout(() => {
      $('.work-hero').find('video').get(0).play();
    }, 10);
  }


}


  
  // SCROLL ANIMATION
  function scrollAnimation() {
  if( $('.scroll-animation-on').length ){

  var controller = new ScrollMagic.Controller();
  $('.classic-animation').each(function(){
  var animationDelay = $(this).data('delay') ? $(this).data('delay') : 0;
  var animationDuration = $(this).data('duration') ? $(this).data('duration')  : 1;


    // build a tween
    var tween = gsap.to($(this), animationDuration, {autoAlpha: 1, y:0, scale:1, delay: animationDelay, ease:"expo.out"});
    // build a scene
    var scene = new ScrollMagic.Scene({
      triggerElement: this,
      duration: 0,
      reverse: false,
      offset: -500,
    })
    .setTween(tween)
    .addTo(controller)
  })

  $('.clip-animation').each(function(){
    var animationDelay = $(this).data('delay') ? $(this).data('delay') : 0;
    var animationDuration = $(this).data('duration') ? $(this).data('duration')  : 1;

    // build a tween
    var tween = gsap.to($(this), animationDuration, { clipPath: "polygon(-2% 0%, 100% 0%, 105% 100%, 0% 100%)", delay: animationDelay, ease:"expo.out"});
    // build a scene
    var scene = new ScrollMagic.Scene({
      triggerElement: this,
      duration: 0,
      reverse: false,
      offset: -650,
    })
    .setTween(tween)
    .addTo(controller)
  })

  $('.scale-animation').each(function(){
    var animationDelay = $(this).data('delay') ? $(this).data('delay') : 0;
    var animationDuration = $(this).data('duration') ? $(this).data('duration')  : 1;

    // build a tween
    var tween = gsap.to($(this), animationDuration, { scaleY:1, autoAlpha:1, y:0, delay: animationDelay, ease:"expo.out"});
    // build a scene
    var scene = new ScrollMagic.Scene({
      triggerElement: this,
      duration: 0,
      reverse: false,
      offset: -500,
    })
    .setTween(tween)
    .addTo(controller)
  })

}

}

//CARTS 
function charts() {

  if( $('.chart').length ){
    if ( $(window).width() >= 991  ){
    $(window).on('resize', function(){
      if ( $(window).width() <= 991  ){
        location.reload();
      }
    });
   }else{
    $(window).on('resize', function(){
      if ( $(window).width() >= 991  ){
        location.reload();
      }
    });
   }
  }

  $(".chart").each(function() {

    if ( $(window).width() >= 991  ){
      var charSize = 150;
      var charLine = 8;
    }else{
      var charSize = 100;
      var charLine = 6;
    }

    var bartrack = '#000';
    if( $('body').hasClass('dark-version') ){
      var bartrack = '#363636';
    }

    $(".chart").easyPieChart({
      barColor:  "#D1ED5D",
      scaleColor: "#D1ED5D",
      trackColor: bartrack,
      size: charSize,
      lineWidth: charLine,
      lineCap: "square",
      onStep: function(a, b, c) {
          $(this.el).find(".percent").text(Math.round(c));
      }
    });
  });
  
  
      $(".skill-list li").each(function() {
        var percentBar = $(this).find('.percentage');
        gsap.to(percentBar, {  'width':percentBar.attr("data-percent"), duration:2, delay:2, ease:Power2.easeOut  });
    });
    
}


// HOME TYPED JS
function typed () {
  if ($('.element').length) {
    var animateSpan	= jQuery('.element');
var textWords	= animateSpan.data('values');
var textArray	= textWords.split(',');
var html	=[];
var back_delay = $('.element').data('backdelay') * 1000;

for(var i = 0;i < textArray.length;i++){
html.push(textArray[i]);
}
    
    $('.element').each(function () {
        $(this).typed({
          strings: html,
            loop: $(this).data('loop') ? $(this).data('loop') : false ,
            backDelay: back_delay,               
            typeSpeed: 20,
        });
    });
  }
}

  //CLIENT SLIDER JS
  function clientSlider(){

    $(".bxslider").not('.skills-ticker-1, .skills-ticker-2, .skills-ticker-3').bxSlider({
      minSlides: 1,
      maxSlides: 5,
      slideMargin: 0,
      ticker: true,
      infiniteLoop: true,
      speed: 30000
    });

    // Skills Ticker Rows
    if ($('.skills-ticker-1').length) {
      $('.skills-ticker-1').bxSlider({
        minSlides: 2,
        maxSlides: 8,
        slideWidth: 180,
        slideMargin: 0,
        ticker: true,
        infiniteLoop: true,
        speed: 20000,
        tickerHover: true,
      });
    }

    if ($('.skills-ticker-2').length) {
      $('.skills-ticker-2').bxSlider({
        minSlides: 2,
        maxSlides: 8,
        slideWidth: 200,
        slideMargin: 0,
        ticker: true,
        infiniteLoop: true,
        speed: 25000,
        tickerHover: true,
      });
    }

    if ($('.skills-ticker-3').length) {
      $('.skills-ticker-3').bxSlider({
        minSlides: 2,
        maxSlides: 8,
        slideWidth: 190,
        slideMargin: 0,
        ticker: true,
        infiniteLoop: true,
        speed: 22000,
        tickerHover: true,
      });
    }

  }


  // SMOOTH SCROLL JS


  var onur = 0.5;
  if( $(window).width() <= 1024 ){
    var onur = 0.3;
  }

    var scrollbar = Scrollbar.init(
      document.getElementById('page-scroll'), { 
        damping: onur,
        renderByPixels: true,
        continuousScrolling: true,
      });

  if( $('.onepage').length ){

    $('header nav ul li a').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");            
      $('header nav ul li a').removeClass('active');          
      $(this).addClass('active');
      var target = $(this).attr("href");
      target = $(target);
      scrollbar.scrollTo(0, target.position().top, 1000);
  });

  }

// fixed item
if($('#fixed').length   ){
      scrollbar.addListener(({ offset }) => {  
        if (offset.y >= 45 ){
          fixed.style.top = offset.y + 'px';
        }else{
          $('header').removeAttr('style');
        }
      });
}

if( $('.onepage').length ){
  scrollbar.addListener(({ offset }) => {  
  var scrollPos = offset.y;
  $('header nav ul li a').each(function () {
  var currLink = $(this);
  var refElement = $(currLink.attr("href"));
  if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('header nav ul li a').removeClass("active");
      currLink.addClass("active");
  }
  else{
      currLink.removeClass("active");
  }
  });
});
} 

  function header_options(){
    var headerAnimation = new gsap.timeline({yoyo: false,reversed: true });
    headerAnimation.pause();
    headerAnimation.to($('header nav ul li'), .4, { autoAlpha:1, x:0, stagger:0.05, ease:Power2.easeOut });

    $('.hamburger, header ul li a').on('click', function(){
      headerAnimation.reversed() ? headerAnimation.play() : headerAnimation.reverse();
      $('body').toggleClass('header-is-active');
    });
  }  


      // isotope
      function isotope(){
        if ( $('.masonry').length ){
        var $container = $('.masonry');  
        $container.isotope({
          itemSelector: '.grid-item',
          sortBy : 'parseInt',
          gutter:0,
          transitionDuration: "0.5s",
          columnWidth: '.grid-item'
        });
        $('.projects_filter ul li a').on("click", function(){
          $(".projects_filter ul li a").removeClass("select-cat");
          $(this).addClass("select-cat");        
          var selector = $(this).attr('data-filter');
          $(".masonry").isotope({
              filter: selector,
              animationOptions: {
                  duration: 750,
                  easing: 'linear',
                  queue: false,
        }
      });
          return false;
      });   
          
    }
  }



  // SWIPER JS
function workslider(){
  var swiper = new Swiper(".work-carousel", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
  });
}

// PROJECTS SLIDER
function projectsSlider(){
  var swiper = new Swiper(".projects-carousel", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      },
  });
}


// SWIPER JS
function testimonialSlider(){
  var swiper = new Swiper(".testimonial-carousel", {
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay:{
          delay: 3000,
      },
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
      breakpoints: {
        1200: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2,
        },
      },
      });
}

  //CONTACT FORM
  function ContactForm() {	
	
    if( jQuery('#contact-form').length > 0 ){
      $('#contact-form').submit(function(e){
        e.preventDefault();
        
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message_text').val();

        $("#message").slideUp(750, function() {
          $('#message').hide();
          $('#submit').attr('disabled', 'disabled');		
          
          // Submit directly to FormSubmit.co secure email delivery API
          $.ajax({
            url: 'https://formsubmit.co/ajax/yashshri682@gmail.com',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
              _captcha: "false", // Disables captcha for a completely seamless, silent AJAX submit
              name: name,
              email: email,
              _subject: subject || "New Portfolio Message!",
              message: message
            }),
            success: function(response) {
              $('#submit').removeAttr('disabled');
              if (response.success === "true" || response.success === true) {
                document.getElementById('message').innerHTML = "<fieldset><div id='success_page'><h2>Message Sent Successfully.</h2><p>Thank you <strong>" + name + "</strong>, your message has been submitted. Please check your inbox (yashshri682@gmail.com) for a <strong>one-time activation email</strong> from FormSubmit to start receiving messages!</p></div></fieldset>";
                $('#message').slideDown('slow');
                $('#contact-form')[0].reset();
                $('#contact-form').slideUp('slow');
              } else {
                document.getElementById('message').innerHTML = "<fieldset><div id='error_page'><h2>Error Sending Message.</h2><p>Something went wrong. Please try again.</p></div></fieldset>";
                $('#message').slideDown('slow');
              }
            },
            error: function() {
              $('#submit').removeAttr('disabled');
              document.getElementById('message').innerHTML = "<fieldset><div id='error_page'><h2>Error Sending Message.</h2><p>Something went wrong. Please check your connection and try again.</p></div></fieldset>";
              $('#message').slideDown('slow');
            }
          });
        });		
        return false;		
      });		
  
        
    $("form .form-group input, form .form-group textarea,  form .form-group select").focus(function(){
      
      
        $(this).parents('.form-group').addClass('in');
      
        $('form .form-group input, form .form-group textarea,  form .form-group select').blur(function()
          {
            if( !$(this).val() ) {
              $(this).parents('.form-group').removeClass('in');
            }
          });
      });
    }
  
  }//End ContactForm

/*----------------------------------------------------------------------*/
/* =  Interactive Dynamic Emoji-Photo Favicon
/*----------------------------------------------------------------------*/

function initInteractiveFavicon() {
  // Detect path dynamically for subdirectory pages
  let profileImgSrc = 'images/profile-pic.jpg';
  const path = window.location.pathname;
  if (path.includes('/projects/') || path.includes('/blogs/')) {
    profileImgSrc = '../images/profile-pic.jpg';
  }

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = profileImgSrc;

  // Create canvas for favicon rendering (128x128 for razor-sharp display)
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  let activeAngle = 0;
  let mouseX = 0.5;
  let mouseY = 0.5;
  let targetX = 0.5;
  let targetY = 0.5;
  let isTabActive = true;

  // Locate or create favicon link element
  let faviconLink = document.querySelector("link[rel*='icon']");
  if (!faviconLink) {
    faviconLink = document.createElement('link');
    faviconLink.rel = 'shortcut icon';
    document.head.appendChild(faviconLink);
  }

  // Handle Tab visibility change
  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
    drawFavicon();
  });

  // Smooth mouse coordinates interpolation
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX / window.innerWidth;
    targetY = e.clientY / window.innerHeight;
  });

  img.onload = () => {
    drawFavicon();
    // Run continuous lightweight animation loop
    animate();
  };

  // Fallback in case of loading error (displays stylized letters)
  img.onerror = () => {
    drawFavicon();
  };

  function drawFavicon() {
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, 128, 128);

    const center = 64;
    const radius = 54;

    // Smoothly transition mouse position
    mouseX += (targetX - mouseX) * 0.1;
    mouseY += (targetY - mouseY) * 0.1;

    // 3D parallax shifts
    const shiftX = (mouseX - 0.5) * 10;
    const shiftY = (mouseY - 0.5) * 10;

    // Step 1: Draw the glowing outer ring (vibrant emoji yellow/gradient gold)
    ctx.save();
    
    // Ambient drop shadow for favicon depth
    ctx.shadowColor = isTabActive ? 'rgba(255, 180, 0, 0.5)' : 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = isTabActive ? 8 + Math.sin(activeAngle * 4) * 3 : 4;
    ctx.shadowOffsetX = -shiftX * 0.3;
    ctx.shadowOffsetY = -shiftY * 0.3;

    let outerGrad = ctx.createRadialGradient(center - shiftX * 0.2, center - shiftY * 0.2, 40, center, center, 60);
    if (isTabActive) {
      // Golden yellow gradient for active emoji feel
      outerGrad.addColorStop(0, '#ffd700'); 
      outerGrad.addColorStop(0.7, '#ffaa00'); 
      outerGrad.addColorStop(1, '#e65c00');  
    } else {
      // Sleek glassmorphic grey for inactive/sleep state
      outerGrad.addColorStop(0, '#888888');
      outerGrad.addColorStop(1, '#333333');
    }
    
    ctx.fillStyle = outerGrad;
    ctx.beginPath();
    // Add a micro-pulse animation to the ring radius
    const pulseRadius = radius + (isTabActive ? Math.sin(activeAngle * 2) * 1.5 : 0);
    ctx.arc(center, center, pulseRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Step 2: Draw circular clipped photo with interactive parallax shift
    ctx.save();
    ctx.beginPath();
    ctx.arc(center + shiftX * 0.2, center + shiftY * 0.2, radius - 4, 0, Math.PI * 2);
    ctx.clip();

    if (img.complete && img.naturalWidth !== 0) {
      // Draw zoomed & centered Yash photo
      ctx.drawImage(img, center - radius + 4 + shiftX * 0.4, center - radius + 4 + shiftY * 0.4, (radius - 4) * 2, (radius - 4) * 2);
    } else {
      // Fallback text initials in case of image load error
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, 128, 128);
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 36px Outfit, Poppins';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('YS', center, center);
    }
    
    // Overlay dark sleeping filter if inactive
    if (!isTabActive) {
      ctx.fillStyle = 'rgba(10, 10, 25, 0.55)';
      ctx.fillRect(0, 0, 128, 128);
    }
    ctx.restore();

    // Step 3: Draw glossy 3D highlight (makes it look like a shiny dome/bubble badge!)
    ctx.save();
    let glossGrad = ctx.createLinearGradient(0, 0, 0, 128);
    glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    glossGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.15)');
    glossGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    glossGrad.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    ctx.fillStyle = glossGrad;
    ctx.beginPath();
    ctx.arc(center + shiftX * 0.2, center + shiftY * 0.2, radius - 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Step 4: Overlay active badge/emoji in bottom-right corner
    ctx.save();
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;

    const emojiX = 96;
    const emojiY = 96;

    if (isTabActive) {
      // Developer laptop emoji (💻) that pulses gently
      const emojiPulse = 1 + Math.sin(activeAngle * 3) * 0.08;
      ctx.translate(emojiX, emojiY);
      ctx.scale(emojiPulse, emojiPulse);
      ctx.fillText('💻', 0, 0);
    } else {
      // Sleep emoji (💤) when tab is backgrounded
      ctx.fillText('💤', emojiX, emojiY);
    }
    ctx.restore();

    // Apply base64 canvas rendering to the favicon link element
    faviconLink.href = canvas.toDataURL('image/png');
  }

  function animate() {
    if (isTabActive) {
      activeAngle += 0.05;
      drawFavicon();
    }
    requestAnimationFrame(animate);
  }
}

/*----------------------------------------------------------------------*/
/* =  Projects Page Filtering, Modal & Drag-to-Scroll Setup
/*----------------------------------------------------------------------*/

function initProjectsPage() {
  const filterBtns = document.querySelectorAll('.premium-filters a');
  const projects = document.querySelectorAll('.project-card');
  const modalOverlay = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalMedia = document.getElementById('modalMedia');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalDescription = document.getElementById('modalDescription');
  const modalLink = document.getElementById('modalLink');
  const slider = document.getElementById('scrollWrapper');

  // Guard: Check if we are on the projects page
  if (!projects.length) return;

  // 1. Filtering Logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');

      const filter = btn.getAttribute('data-filter');

      // First hide everything instantly
      projects.forEach(p => {
        p.classList.add('hide');
        p.style.transition = '';
        p.style.opacity = '';
        p.style.transform = '';
      });

      // Then reveal matching cards with staggered animation
      let delay = 0;
      projects.forEach(p => {
        if (filter === '*' || p.classList.contains(filter.replace('.', ''))) {
          setTimeout(() => {
            p.classList.remove('hide');
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            p.style.transition = 'none';
            
            // Force browser reflow to register the display state change
            p.offsetHeight;
            
            // Apply smooth transition styles
            p.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
            
            // Clean up inline styles after animation
            setTimeout(() => {
              p.style.transition = '';
              p.style.opacity = '';
              p.style.transform = '';
            }, 450);
          }, delay);
          delay += 80;
        }
      });
    });
  });

  // 2. Modal Logic
  projects.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      if (!modalOverlay) return;

      // Extract Data
      const title = card.getAttribute('data-title');
      const category = card.getAttribute('data-category');
      const desc = card.getAttribute('data-desc');
      const techStr = card.getAttribute('data-tech');
      const type = card.getAttribute('data-type');
      const src = card.getAttribute('data-src');
      const link = card.getAttribute('href');

      // Populate Data
      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) modalCategory.textContent = category;
      if (modalDescription) modalDescription.textContent = desc;
      if (modalLink) {
        modalLink.href = link;
        // Dynamic Link Text
        if (link.includes('github.com')) {
          modalLink.innerHTML = 'View on GitHub <i class="fa-brands fa-github"></i>';
        } else {
          modalLink.innerHTML = 'View Project <i class="fa-solid fa-arrow-right"></i>';
        }
      }
      
      // Populate Tech Tags
      if (modalMeta) {
        modalMeta.innerHTML = '';
        if (techStr) {
          techStr.split(',').forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech.trim();
            modalMeta.appendChild(span);
          });
        }
      }

      // Populate Media
      if (modalMedia) {
        modalMedia.innerHTML = '';
        if (type === 'video') {
          const video = document.createElement('video');
          video.src = src;
          video.autoplay = true;
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          modalMedia.appendChild(video);
        } else {
          const img = document.createElement('img');
          img.src = src;
          img.alt = title;
          modalMedia.appendChild(img);
        }
      }

      // Show Modal with Animation
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close Modal Logic
  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Pause video if playing to save resources
    if (modalMedia) {
      const video = modalMedia.querySelector('video');
      if (video) video.pause();
    }
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalLink) modalLink.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) closeModal();
  });

  // 3. Drag to Scroll Logic
  let isDown = false;
  let startX;
  let scrollLeft;
  let isDragging = false;

  if (slider) {
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      isDragging = false;
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      
      if (Math.abs(x - startX) > 5) {
        isDragging = true;
      }
      
      if (isDragging) {
        e.preventDefault();
        slider.scrollLeft = scrollLeft - walk;
      }
    });
  }

  // Prevent card clicks while dragging
  projects.forEach(card => {
    card.addEventListener('click', (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, true);
  });
}





