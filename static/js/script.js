   const brandFilter = [];
   let category_name, minValue, maxValue;

   const filter = {
     brandList: [],
     categoryName: null,
     minValue: null,
     maxValue: null,
   }


    $(document).ready(function() {

    $('#category-list').on('click', '.category-link', function(event) {
    event.preventDefault();
    filter.categoryName = $(this).text();
    console.log({ brandFilter,category_name, minValue, maxValue})
    filterProducts();
      console.log(filter)

   });

  $('.form-check-input').on('change', function() {
    var brandName = $(this).val().trim();

    if ($(this).is(':checked')) {
      filter.brandList.push(brandName);

    } else {
      var index = filter.brandList.indexOf(brandName);
      if (index !== -1) {
        filter.brandList.splice(index, 1);
      }
    }

     console.log(filter)
    filterProducts();
  });

  $('#price-filter').on('click', function() {
    filter.minValue = $('#typeNumber1').val();
    filter.maxValue = $('#typeNumber2').val();

    // Do something with the values
     console.log(filter)
    filterProducts();

  });



  function filterProducts() {

// Serialize the object
var params = $.param(filter);

// Get the current URL
var currentUrl = window.location.href;

// Append the parameters to the URL
var urlWithParams = currentUrl + '?' + params;

    $.ajax({
      url: 'search/',

      data: {
        'category_name': filter.categoryName,
        'brand_names[]': filter.brandList,
        'min_price': filter.minValue,
        'max_price': filter.maxValue
      },
      success: function(response) {
        // Process the response and update the product list
        var productData = response.products;
        var productList = $('#product-list');
        productList.empty();
        for (var i = 0; i < productData.length; i++) {
          var product = productData[i];
          // Create card elements and append them to productList
          var card = $('<div class="col-lg-4 col-md-6 col-sm-6 d-flex"></div>');
          var cardContent = $('<div class="card w-100 my-2 shadow-2-strong"></div>');
          var cardImage = $('<img class="card-img-top">').attr('src', product.image);
          var cardBody = $('<div class="card-body d-flex flex-column"></div>');

          var priceDiv = $('<div class="d-flex flex-row"></div>');
          var price = $('<h5 class="mb-1 me-1"></h5>').text('$' + product.price);
          var oldPrice = $('<span class="text-danger"><s>$49.99</s></span>');

          var title = $('<p class="card-text"></p>').text(product.title);

          var cardFooter = $('<div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto"></div>');
          var addToCartBtn = $('<a href="#!" class="btn btn-primary shadow-0 me-1">Add to cart</a>');
          var wishlistBtn = $('<a href="#!" class="btn btn-light border icon-hover px-2 pt-2"><i class="fas fa-heart fa-lg text-secondary px-1"></i></a>');

          priceDiv.append(price);
          cardBody.append(priceDiv, oldPrice, title);
          cardFooter.append(addToCartBtn, wishlistBtn);

          cardContent.append(cardImage, cardBody, cardFooter);
          card.append(cardContent);
          productList.append(card);

        }
      },

    });
  }

});