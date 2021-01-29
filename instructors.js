const fs = require('fs');
const data = require('./data.json');
const { age } = require('./utils');

// show
exports.show = function(request, response) {
    // request.params
    const { id } = request.params;

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    });

    if (!foundInstructor) {
        return response.send('Instructor not found');
    }


    const instructor = {
        // usando spread operator ( ... )
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    }

    return response.render("instructors/show", { instructor })
}

// create
exports.post = function(request, response) {

    /* armazendo os dados do formulario em um array, para percorrer com um laço de reptição validando se estiver vazio */
    const keys = Object.keys(request.body);

    for(key of keys) {
        if(request.body[key] == "") {
            return response.send('Por favor, preencha todos os campos.');
        }
    }

    let {avatar_url, birth, name, services, gender} = request.body;

    //manipulando datas
    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);
    
    

    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return response.send("Write file error!");
        }

        return response.redirect("/instructors");
    });

    //return response.send(request.body);
};
