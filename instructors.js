const fs = require('fs');

// create
exports.post = function(request, response) {

    /* armazendo os dados do formulario em um array, para percorrer com um laço de reptição validando se estiver vazio */
    const keys = Object.keys(request.body);

    for(key of keys) {
        if(request.body[key] == "") {
            return response.send('Por favor, preencha todos os campos.');
        }
    }

    fs.writeFile("data.json", JSON.stringify(request.body), function() {
        if(err) {
            return response.send("Write file error!");
        }

        return response.redirect("/instructors");
    });

    //return response.send(request.body);
};
