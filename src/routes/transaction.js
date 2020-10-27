const { Router } = require("express");
const router = Router();
const util = require("../services/util");
const transactionAPI = require("../controllers/transactionAPI");

const ensureToken = util.validatedToken;

router.get("/token", transactionAPI.getToken);
router.post("/deposit", ensureToken, transactionAPI.deposit);
router.post("/retirement", ensureToken, transactionAPI.retirement);
router.get("/List/:account_id", ensureToken, transactionAPI.listTransaction);

module.exports = router;
