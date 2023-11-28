const { Router } = require("express");
const router = Router();

const getRoutes = require ("./getRoutes")
const postRoutes = require ("./postRoutes")

router.use("/drivers", getRoutes);
router.use("/drivers", postRoutes);

module.exports = router;
