const BE='/'

$(document).ready(function(){
	showPage(pages.itemApp)
})
$(document).on("click","header .navsWrapper .nav",function(){
	let page=$(this).data("page");
	showPage(page)
})

function showPage(page){
	$(".page").hide()
	$(`.page.page--${page}`).fadeIn(200)

	switch (page) {
		case pages.itemApp:
			fetchItemAppList()
			break;
		case pages.itemGame:
			fetchItemGameList()
			break;
	
		default:
			break;
	}
}
