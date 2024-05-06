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

	detail.data("id",item.id)

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

    $(".itemForm").fadeOut(200)
    $(".itemDetail").delay(200).fadeIn(200)
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
$(document).on("click", ".page--itemApp .newItem .openFormAdd", function() {
    $(".itemDetail").fadeOut(200)
    $(".itemForm").delay(200).fadeIn(200)
})

$(document).on("change", '.itemForm .inputWrapper input[type="file"]', function() {
    var input = this;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
       $(".preview").attr('src', e.target.result);
       $(".preview").fadeIn()
      }
      
      reader.readAsDataURL(input.files[0]);
    }
})
$(document).on("submit", '.itemForm', function(e) {
    e.preventDefault(); 

    // Collect form data
    let formData = new FormData();
    formData.append('name', $('input[name="name"]').val());
    formData.append('description', $('input[name="description"]').val());
    formData.append('category', $('input[name="category"]').val());
    formData.append('quality', $('input[name="quality"]').val());
    formData.append('quantity', $('input[name="quantity"]').val());
    formData.append('gemcost', $('input[name="gemcost"]').val());
    formData.append('goldcost', $('input[name="goldcost"]').val());
    formData.append('imageName', $('input[name="imageName"]').val());
    formData.append('imageFile', $('input[name="imageFile"]')[0].files[0]);

    postItemApp(formData);
});

$(document).on("click",'.controls .deleteButton',function(){
    $(".page--itemApp .itemDetail").css({
		opacity:0,
		transform:'scale(0)'
	})
    const id=$(".page--itemApp .itemDetail").data("id")
    if(id){
        deleteItemApp(id)
    }

})

function postItemApp(formData) {
    let url = BE + `/itemApps`;
    $.ajax({
        url: url,
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            console.log(data);
            fetchItemAppList()
        },
        error: function(xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}
function deleteItemApp(id) {
    let url = BE + `/itemApps/`+id;
    $.ajax({
        url: url,
        method: "DELETE",
        success: function(data) {
            console.log(data);
            fetchItemAppList()
        },
        error: function(xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}