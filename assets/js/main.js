	// JavaScript Document

/****-- sticky header --****/
/****-- https://codepen.io/hellolowek/pen/zYvXeBa  --***/
var header = document.querySelector('.header');


onScroll = () => {
    var scrolledPage = Math.round(window.pageYOffset);
    if (scrolledPage > 350) {
        header.classList.add('sticky-top');
    } else {
        header.classList.remove('sticky-top');
    }
}

document.addEventListener('scroll', onScroll);

/****-- sticky header end --****/


/****-- accordian top ---****/
/****-- https://jsfiddle.net/hLzg0n2y/2/ --****/
/*$('.collapse').on('shown.bs.collapse', function(e) {

  var $card = $(this).closest('.accordion-item');
  var $open = $($(this).data('parent')).find('.collapse.show');
  
  var additionalOffset = 0;
  if($card.prevAll().filter($open.closest('.accordion-item')).length !== 0)
  {
		additionalOffset =  $open.height();
  }
  $('html,body').animate({
    scrollTop: $card.offset().top -150 - additionalOffset
  }, 500);
	
  mainAccordionClicked = false;
	
	
});*/


/**** accordian top end ---*/


var customOffset = 170;
var mainAccordionClicked = false;

$('.accordion-item .collapse').on('shown.bs.collapse', function () {
    if (mainAccordionClicked) {
        var offset = $(this).offset();
        $('html, body').animate({
            scrollTop: offset.top - customOffset
        }, 500);
    }
    mainAccordionClicked = false;
});

$('.accordion-item-sub .collapse').on('shown.bs.collapse', function () {
    var offset = $(this).offset();
    $('html, body').animate({
        scrollTop: offset.top - customOffset
    }, 500);
});


$('.accordion-item').on('click', function () {
    mainAccordionClicked = true;
});


/**** accordian top end ---*/


/*window.addEventListener("resize", function () {
    "use strict";
    window.location.reload();
});*/
document.addEventListener("DOMContentLoaded", function () {
    /////// Prevent closing from click inside dropdown
    document.querySelectorAll('.dropdown-menu').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    })
    // make it as accordion for smaller screens
    if (window.innerWidth < 992) {
        // close all inner dropdowns when parent is closed
        document.querySelectorAll('.navbar .dropdown').forEach(function (everydropdown) {
            everydropdown.addEventListener('hidden.bs.dropdown', function () {
                // after dropdown is hidden, then find all submenus
                this.querySelectorAll('.submenu')
                    .forEach(function (everysubmenu) {
                        // hide every submenu as well
                        everysubmenu
                            .style
                            .display =
                            'none';
                    });
            })
        });
        document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
            element.addEventListener('click', function (e) {
                let nextEl = this.nextElementSibling;
                if (nextEl && nextEl.classList
                    .contains('submenu')) {
                    // prevent opening link if link needs to open dropdown
                    e.preventDefault();
                    console.log(nextEl);
                    if (nextEl.style.display
                        == 'block') {
                        nextEl.style.display =
                            'none';
                    } else {
                        nextEl.style.display =
                            'block';
                    }
                }
            });
        })
    }
    // end if innerWidth
});
// DOMContentLoaded  end



/*** animated text strat ***/


var animationDelay = 3500;
 
animateHeadline($('.cd-headline'));
 
function animateHeadline($headlines) {
	$headlines.each(function(){
		var headline = $(this);
		//trigger animation
		setTimeout(function(){ hideWord( headline.find('.is-visible') ) }, animationDelay);
		//other checks here ...
	});
}

function hideWord($word) {
	var nextWord = takeNext($word);
	switchWord($word, nextWord);
	setTimeout(function(){ hideWord(nextWord) }, animationDelay);
}
 
function takeNext($word) {
	return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
}
 
function switchWord($oldWord, $newWord) {
	$oldWord.removeClass('is-visible').addClass('is-hidden');
	$newWord.removeClass('is-hidden').addClass('is-visible');
}

singleLetters($('.cd-headline.letters').find('b'));
 
function singleLetters($words) {
	$words.each(function(){
		var word = $(this),
			letters = word.text().split(''),
			selected = word.hasClass('is-visible');
		for (i in letters) {
			letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
		}
	    var newLetters = letters.join('');
	    word.html(newLetters);
	});
}

/*** animated text end ***/