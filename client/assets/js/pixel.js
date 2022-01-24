$().ready(function(){
    if ($('#propertyId').length) {
        var id = $("#propertyId").html().split(' ')[1]
        fbq('track', 'ViewContent', {content_ids: id})
        // debugging
        // console.log("This page is product page", id)

    }else if ($('#PropertySearchResults').length) {
        fbq('track', 'Search')
        // debugging
        // console.log("This is Search Results")
    }else if ($('#contactPage').length) {
        fbq('track', 'Contact')
        // debugging
        // console.log("This is Contact Page")
    }
})

$('#realCall').click(function() {
    var id = $("#propertyId").html().split(' ')[1]
    fbq('track', 'Purchase', {currency: "USD", value: 3, content_ids: id});
    // debugging
    // console.log("#realcall function onclick has been called", id)
  });

$('#call').click(function() {
    var id = $("#propertyId").html().split(' ')[1]
    fbq('track', 'InitiateCheckout', {value: 2, content_ids: id});
    // debugging
    // console.log("#call function onclick has been called", id)
  });

$('#wapp').click(function() {
    var id = $("#propertyId").html().split(' ')[1]
    fbq('track', 'AddToCart', {currency: "USD", value: 1, content_ids: id});
    // debugging
    // console.log("#wapp function onclick has been called", id)
  });

