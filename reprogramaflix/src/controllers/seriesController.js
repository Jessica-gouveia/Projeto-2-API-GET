const app = require("../app")
const series = require("../models/series.json")

const home = (request,response) => {
    response.status(200).send(
        {
            "message":"Bem Vinde ao Reprogramaflix!! Divirta-se!!"
        }
    )
}

const getAll = (request,response) => {
    response.status(200).send(series)
}

const getById = (request,response) => {
    const requestedId = request.params.id
    const filteredId = series.find(serie => serie.id == requestedId)
    response.status(200).send(filteredId)
}

const getByTitle = (request,response) => {
    const requestedTitle = request.query.title.toLowerCase()
    const filteredTitle = series.find(serie => serie.title.toLowerCase().includes(requestedTitle))

    if(requestedTitle === "" || filteredTitle === undefined) {
        response.status(404).send(
            {
                "message": "Por favor, insira um título válido"
            }
        )
    } else{
        response.status(200).send(filteredTitle)
    }
}

const getByGenre = (request,response) => {
    const requestedGenre = request.query.genre
    let serieList = []
    
    series.forEach(serie => {
        let genreList = series.genre.split(",")
        

        for( const genre of genreList) {
            if (genre.includes(requestedGenre)) {
                serieList.push(serie)
            }
        }
    })
    response.status(200).send(serieList)
}







module.exports = {home, getAll, getById, getByTitle, getByGenre}

