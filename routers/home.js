const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('hellow there , how are you');
})

module.exports = router;