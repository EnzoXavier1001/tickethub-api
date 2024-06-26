const { Router } = require("express")

const CustomersController = require("../controllers/CustomersController")

const customersRoutes = Router()

const customersController = new CustomersController()

customersRoutes.get("/", customersController.show)

module.exports = customersRoutes