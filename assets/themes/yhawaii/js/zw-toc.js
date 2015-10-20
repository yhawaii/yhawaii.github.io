//
// This TOC implementation is inspired by Janko Jovanovic,
// http://www.jankoatwarpspeed.com/post/2009/08/20/Table-of-contents-using-jQuery.aspx
//
var G_SHOW_TOC_IF_HEADERS_COUNT = 2;



if ( ! ( !-[1,] && !window.XMLHttpRequest ) ) {  //非IE6浏览器
	$('#toc').css( 'left', ( $(window).width() - 180 ) / 2 );
	$(window).scroll(function(){
		if($('#toc').height() > $(window).scrollTop())
		{
			if($('#toc').height() < $(window).height())
			{
				$('#toc').css( 'top', 80);
			}
			else
			{
				$('#toc').css( 'top', 180 - $(window).scrollTop() );
			}
		}
	});
}
function showCatalog()
{
		$("#toc ul").slideDown();
		$("#toc").toggleClass("showCls");
		$("#toc").toggleClass("hideCls");
		$("#toc .bolder").slideDown();
		$("#hideBtn").show();
		$("#showBtn").hide();
}

function hideCatalog()
{
		$("#toc ul").slideUp();
		$("#toc").toggleClass("showCls");
		$("#toc").toggleClass("hideCls");
		$("#toc .bolder").slideUp();
		$("#hideBtn").hide();
		$("#showBtn").show();
}
var auto_generate_toc = function () {
  var headers_list = document.querySelectorAll('h2, h3, h4, h5, h6');
  if (!headers_list.length || (headers_list.length < G_SHOW_TOC_IF_HEADERS_COUNT)) {
    return;
  }

  //added by yhawaii
  var yhawaiiPostEl = document.getElementById("yhawaiiPost");
  if (!yhawaiiPostEl) 
  {
    return;
  }


  var toc_element = $("#toc");
  if (!toc_element.length && headers_list.length) {
  	
    //modified by yhawaii
    var draggableEle = '<div id="toc" class="draggable showCls" />';
    
    $("#yhawaiiPost").append(draggableEle);
    var ulEle = '<p class="bolder">目录</p><ul />';
    $("#toc").append(ulEle);
    // $("#yhawaiiPost").append();

   	// $(".draggable").draggable();
  }
	
	var btnEle = '<div><button id="showBtn" type="button" onclick="showCatalog();">显示目录</button><button id="hideBtn" type="button" onclick="hideCatalog();">隐藏目录</button></div>';
	$("#yhawaiiPost").append(btnEle);
	$("#showBtn").hide();
  $("#hideBtn").hide();

  $("h2, h3, h4, h5, h6").each(function (i) {
    var cur = $(this);
    var new_anchor = cur.text().replace(/ /g, '-').toLowerCase();
    cur.attr("id", new_anchor);

    // var pos = cur.position().top / $("#content").height() * $(window).height();

    var id_ = "link" + i;
    var class_ = cur[0].tagName.toLowerCase();
    var href_ = "#" + new_anchor;
    var title = cur.html();
    var text = cur.html();
    var element = '<li><a id="' + id_ + '" class="' + class_ + '" href="' + href_ + '" title="' + title + '">' + text + '</a></li>';

    $("#toc ul").append(element);

    // $("#link" + i).css("top", pos);
  });
  // var zIndexNumber = 10000;
  // $("#toc").css('zIndex', zIndexNumber)
  //   .attr("title", "this is draggable and resizable");
}

$(document).ready(function () {
  auto_generate_toc();
});
