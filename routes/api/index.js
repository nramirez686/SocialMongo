const router = require("express").Router();
const reactionsRoutes = require("./reactionsRoutes");
const thoughtsRoutes = require("./thoughtsRoutes");
const usersRoutes = require("./usersRoutes");

router.use("/reactions", reactionsRoutes);
router.use("/thoughts", thoughtsRoutes);
router.use("/users", usersRoutes);

module.exports = router;
