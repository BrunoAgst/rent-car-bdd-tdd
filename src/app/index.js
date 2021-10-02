const { log } = require('console')
const carService = require('../service/carService')
const http = require('http')
const { join } = require('path')
const CarService = require('../service/carService')
const carDatabase = join(__dirname, './../../database', 'cars.json')

const routes = {
    "/car:post": async (request, response) => {
        for await (const data of request) {
            const { customer, carCategory, numberOfDays } = JSON.parse(data)
            
            const carService = new CarService({ cars: carDatabase })
            const car = JSON.stringify(
                await carService.rent(customer, carCategory, numberOfDays)
            )

            response.write(car)
            return response.end()
        }
    },

    default: (request, response) => {
        response.write('Não encontrado')
        return response.end()
    }
}

const handler = function (request, response) {
    const { url, method } = request
    const routeKey = `${url}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })

    return chosen(request, response)
}

const app = http.createServer(handler)
    .listen(3000, () => log('app running port', 3000))

module.exports = app