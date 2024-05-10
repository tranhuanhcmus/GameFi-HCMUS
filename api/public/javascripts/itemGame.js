function renderItemGameList(data) {
    let list = data.data
    let itemList = $(".page--itemGame .itemList")
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

function renderItemGame(data) {
    let item = data.data
    let detail = $(".page--itemGame .itemDetail")

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

function fetchItemGameList() {
    let url =  '/ItemGames'
    $.ajax({
        url: url,
        method: "GET",
        success: renderItemGameList,
        error: function(xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}

function fetchItemGame(id) {
    let url =  `/ItemGames/${id}`
    $.ajax({
        url: url,
        method: "GET",
        success: renderItemGame,
        error: function(xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}

$(document).on("click", ".page--itemGame .card", function() {
    let id = $(this).data("id")
    $(".page--itemGame .itemDetail").css({
        opacity: 0,
        transform: 'scale(0)'
    })
    setTimeout(() => {
        fetchItemGame(id)
    }, 200);
    $(".controllers .openFormEdit").fadeIn()
})
$(document).on("click", ".page--itemGame .openFormAdd", function() {
    $(".itemForm .itemForm_title").text("Add new item")
    $(".itemForm .button").hide()
    $(".itemForm .itemForm__button--add").show()

    $(".controllers .openFormEdit").fadeOut()

    $(".itemDetail").fadeOut(200)
    $(".itemForm").delay(200).fadeIn(200)
})
$(document).on("click", ".page--itemGame .openFormEdit", function() {
    $(".itemForm .itemForm_title").text("Edit item")
    $(".itemForm .button").hide()
    $(".itemForm .itemForm__button--edit").show()

    $('.page--itemGame .itemDetail .rowWrapper').each(function() {
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

$(document).on("click", '.page--itemGame .itemForm .itemForm__button--add', function(e) {
    e.preventDefault();

    // Collect form data
    let formData = new FormData();
    formData.append('name', $('.page--itemGame input[name="name"]').val());
    formData.append('description', $('.page--itemGame input[name="description"]').val());
    formData.append('category', $('.page--itemGame input[name="category"]').val());
    formData.append('quality', $('.page--itemGame input[name="quality"]').val());
    formData.append('quantity', $('.page--itemGame input[name="quantity"]').val());
    formData.append('gemcost', $('.page--itemGame input[name="gemcost"]').val());
    formData.append('goldcost', $('.page--itemGame input[name="goldcost"]').val());
    formData.append('imageName', $('.page--itemGame input[name="imageName"]').val());
    formData.append('imageFile', $('.page--itemGame input[name="imageFile"]')[0].files[0]);

    postItemGame(formData, function(data) {
        $(this).trigger('reset')
    });
});
$(document).on("click", '.page--itemGame .itemForm  .itemForm__button--edit', function(e) {
    e.preventDefault();

    // Collect form data
    let formData = {};
    formData['name'] = $('.page--itemGame input[name="name"]').val()
    formData['description'] = $('.page--itemGame input[name="description"]').val()
    formData['category'] = $('.page--itemGame input[name="category"]').val()
    formData['quality'] = $('.page--itemGame input[name="quality"]').val()
    formData['quantity'] = $('.page--itemGame input[name="quantity"]').val()
    formData['gemcost'] = $('.page--itemGame input[name="gemcost"]').val()
    formData['goldcost'] = $('.page--itemGame input[name="goldcost"]').val()

    let itemId = $('.page--itemGame .itemDetail').data("id")
    editItemGame(formData, itemId, function(data) {
        $(this).trigger('reset')
    });
});

$(document).on("click", '.page--itemGame .controls .deleteButton', function() {
    $(".page--itemGame .itemDetail").css({
        opacity: 0,
        transform: 'scale(0)'
    })
    const id = $(".page--itemGame .itemDetail").data("id")
    if (id) {
        deleteItemGame(id)
    }

})

function editItemGame(formData, id, callback) {
    if (!id) {
        alert("There is no id Item")
        return
    }
    let url =  `/ItemGames` + `/${id}`;
    $.ajax({
        url: url,
        method: "PUT",
        data: formData,
        success: function(data) {
            if (callback) {
                callback(data)
            }
            fetchItemGameList()
            $(".page--itemGame .itemForm__message").text(data.data.message)
            $(".page--itemGame .itemForm__message").fadeIn()
            $(".page--itemGame .itemForm__message").delay(3000).fadeOut()
        },
        error: function(xhr, status, error) {
            $(".page--itemGame .itemForm__message").text(error)
            $(".page--itemGame .itemForm__message").fadeIn()
            $(".page--itemGame .itemForm__message").delay(3000).fadeOut()
        }
    });
}

function postItemGame(formData, callback) {
    let url =  `/ItemGames`;
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
            fetchItemGameList()
            $(".page--itemGame .itemForm__message").text(data.data.message)
            $(".page--itemGame .itemForm__message").fadeIn()
            $(".page--itemGame .itemForm__message").delay(3000).fadeOut()
        },
        error: function(xhr, status, error) {
            $(".page--itemGame .itemForm__message").text(error)
            $(".page--itemGame .itemForm__message").fadeIn()
            $(".page--itemGame .itemForm__message").delay(3000).fadeOut()
        }
    });
}

function deleteItemGame(id, callback) {
    let url =  `/ItemGames/` + id;
    $.ajax({
        url: url,
        method: "DELETE",
        success: function(data) {
            if (callback) {
                callback(data)
            }
            fetchItemGameList()
        },
        error: function(xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}