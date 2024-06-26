const { Router } = require("express")

const LevelsController = require("../controllers/LevelsController")

const levelsRoutes = Router()

const levelsController = new LevelsController()

levelsRoutes.get("/", levelsController.show)

module.exports = levelsRoutes