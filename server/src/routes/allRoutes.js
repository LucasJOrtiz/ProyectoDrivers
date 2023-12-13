const { Router } = require("express");
const router = Router();

const getRoutes = require ("./getRoutes")
const postRoutes = require ("./postRoutes")

router.use("/drivers", getRoutes);
console.log('Uploading GET routes');

router.use("/drivers", postRoutes);
console.log('Uploading POST routes');

module.exports = router;
