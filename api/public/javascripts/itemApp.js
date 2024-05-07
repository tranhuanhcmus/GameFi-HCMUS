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

    detail.data("id", item.id)

    detail.find(".itemImg img").attr("src", item.image)

    for (let key of Object.keys(item)) {
        let row = $(`.rowWrapper[data-field=${key}]`)
        row.find(".label").text(key)
        row.find(".content").text(item[key])
    }
    detail.css({
        opacity: 1,
        transform: 'scale(1)'
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
        opacity: 0,
        transform: 'scale(0)'
    })
    setTimeout(() => {
        fetchItemApp(id)
    }, 200);
    $(".controllers .openFormEdit").fadeIn()
})
$(document).on("click", ".page--itemApp .openFormAdd", function() {
    $(".itemForm .itemForm_title").text("Add new item")
    $(".itemForm .button").hide()
    $(".itemForm .itemForm__button--add").show()

    $(".controllers .openFormEdit").fadeOut()

    $(".itemDetail").fadeOut(200)
    $(".itemForm").delay(200).fadeIn(200)
})
$(document).on("click", ".page--itemApp .openFormEdit", function() {
    $(".itemForm .itemForm_title").text("Edit item")
    $(".itemForm .button").hide()
    $(".itemForm .itemForm__button--edit").show()

    $('.page--itemApp .itemDetail .rowWrapper').each(function() {
        let field = $(this).data("field");

        $(`input[name="${field}"]`).val($(this).find(".content").text());
    });


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

$(document).on("click", '.page--itemApp .itemForm .itemForm__button--add', function(e) {
    e.preventDefault();

    // Collect form data
    let formData = new FormData();
    formData.append('name', $('.page--itemApp input[name="name"]').val());
    formData.append('description', $('.page--itemApp input[name="description"]').val());
    formData.append('category', $('.page--itemApp input[name="category"]').val());
    formData.append('quality', $('.page--itemApp input[name="quality"]').val());
    formData.append('quantity', $('.page--itemApp input[name="quantity"]').val());
    formData.append('gemcost', $('.page--itemApp input[name="gemcost"]').val());
    formData.append('goldcost', $('.page--itemApp input[name="goldcost"]').val());
    formData.append('imageName', `itemApp-`+$('.page--itemApp input[name="imageName"]').val());
    formData.append('imageFile', $('.page--itemApp input[name="imageFile"]')[0].files[0]);

    postItemApp(formData, function(data) {
        $(this).trigger('reset')
    });
});
$(document).on("click", '.page--itemApp .itemForm  .itemForm__button--edit', function(e) {
    e.preventDefault();

    // Collect form data
    let formData = {};
    formData['name'] = $('.page--itemApp input[name="name"]').val()
    formData['description'] = $('.page--itemApp input[name="description"]').val()
    formData['category'] = $('.page--itemApp input[name="category"]').val()
    formData['quality'] = $('.page--itemApp input[name="quality"]').val()
    formData['quantity'] = $('.page--itemApp input[name="quantity"]').val()
    formData['gemcost'] = $('.page--itemApp input[name="gemcost"]').val()
    formData['goldcost'] = $('.page--itemApp input[name="goldcost"]').val()

    let itemId = $('.page--itemApp .itemDetail').data("id")
    editItemApp(formData, itemId, function(data) {
        $(this).trigger('reset')
    });
});

$(document).on("click", '.page--itemApp .controls .deleteButton', function() {
    $(".page--itemApp .itemDetail").css({
        opacity: 0,
        transform: 'scale(0)'
    })
    const id = $(".page--itemApp .itemDetail").data("id")
    if (id) {
        deleteItemApp(id)
    }

})

function editItemApp(formData, id, callback) {
    if (!id) {
        alert("There is no id Item")
        return
    }
    let url = BE + `/itemApps` + `/${id}`;
    $.ajax({
        url: url,
        method: "PUT",
        data: formData,
        success: function(data) {
            if (callback) {
                callback(data)
            }
            fetchItemAppList()
            $(".page--itemApp .itemForm__message").text(data.data.message)
            $(".page--itemApp .itemForm__message").fadeIn()
            $(".page--itemApp .itemForm__message").delay(3000).fadeOut()
        },
        error: function(xhr, status, error) {
            $(".page--itemApp .itemForm__message").text(error)
            $(".page--itemApp .itemForm__message").fadeIn()
            $(".page--itemApp .itemForm__message").delay(3000).fadeOut()
        }
    });
}

function postItemApp(formData, callback) {
    let url = BE + `/itemApps`;
    $.ajax({
        url: url,
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            if (callback) {
                callback(data)
            }
            fetchItemAppList()
            $(".page--itemApp .itemForm__message").text(data.data.message)
            $(".page--itemApp .itemForm__message").fadeIn()
            $(".page--itemApp .itemForm__message").delay(3000).fadeOut()
        },
        error: function(xhr, status, error) {
            $(".page--itemApp .itemForm__message").text(error)
            $(".page--itemApp .itemForm__message").fadeIn()
            $(".page--itemApp .itemForm__message").delay(3000).fadeOut()
        }
    });
}

function deleteItemApp(id, callback) {
    let url = BE + `/itemApps/` + id;
    $.ajax({
        url: url,
        method: "DELETE",
        success: function(data) {
            if (callback) {
                callback(data)
            }
            fetchItemAppList()
        },
        error: function(xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}