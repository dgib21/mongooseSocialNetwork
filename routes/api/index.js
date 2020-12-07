//prefixing route endpoints 
const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// add prefix of users route
router.use("/users", userRoutes);


module.exports = router;