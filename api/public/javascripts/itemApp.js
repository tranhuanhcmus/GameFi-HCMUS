function renderItemAppList(data) {
    let list = data.data
    let itemList = $(".page--itemApp .itemList")
    itemList.empty()
    list.forEach(item => {
        let card = `
		<div class="card" style="display:none" data-id="${item.id}">
				<div class="card__img">
					<img src="${item.image}">
				</div>
				<div class="card__info">
					<div class="card__name">${item.name}</div>
					<div class="card__description">${item.description}</div>
				</div>
			</div>
		`
        itemList.append(card)
    });
    itemList.find(".card").fadeIn()
}

function renderItemApp(data) {
    let item = data.data
    let detail = $(".page--itemApp .itemDetail")

	

    detail.find(".itemImg img").attr("src", item.image)

    for (let key of Object.keys(item)) {
        let row = $(`.rowWrapper[data-field=${key}]`)
        row.find(".label").text(key)
        row.find(".content").text(item[key])
    }
    detail.css({
		opacity:1,
		transform:'scale(1)'
	})
}

function fetchItemAppList() {
    let url = BE + '/itemApps'
    $.ajax({
        url: url,
        method: "GET",
        success: renderItemAppList,
        error: function(xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}

function fetchItemApp(id) {
    let url = BE + `/itemApps/${id}`
    $.ajax({
        url: url,
        method: "GET",
        success: renderItemApp,
        error: function(xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}

$(document).on("click", ".page--itemApp .card", function() {
    let id = $(this).data("id")
	$(".page--itemApp .itemDetail").css({
		opacity:0,
		transform:'scale(0)'
	})
	setTimeout(() => {
		fetchItemApp(id)
	}, 200);
})