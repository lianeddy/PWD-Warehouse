const { getDashboard } = require("../controllers/adminControllers");

const router = require("express").Router();

router.get("/dashboard", getDashboard);

module.exports = router;
