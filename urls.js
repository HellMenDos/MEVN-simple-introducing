var urls = function(app) {

app.get("/api", function(request, response){
    response.send("<h2>Привccfffет Express!</h2>");
});

}

module.exports = urls