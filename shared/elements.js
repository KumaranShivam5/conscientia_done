function open_loader() {
    console.log("inside open_loader");
    $(".loader-wrapper").css("height", "100vh");
}
function close_loader() {
    console.log("inside close loader");
    $(".loader-wrapper").css("height", "0vh");
}