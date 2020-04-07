const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
    Customer,
    validateCustomers
} = require('../modules/customer')

router.get("/", async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});
router.get("/:id", async (req, res) => {
    const customer = await Customer.find({
        id: req.params.id
    });
    if (!customer) {
        return res.status(404).send("item not found");
    }

    res.send(customer);
});

router.post("/", async (req, res) => {
    const result = validateCustomers(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    let customer = new Customer({
        name: req.body.name,
        photo: 3330,
        isGold: true
    });
    customer = await customer.save();
    res.send(customer);
});
router.put("/:id", async (req, res) => {
    const {
        error
    } = validateCustomers(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const customer = await new Customer.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            photo: 550,
            isGold: true
        }, {
            new: true
        }
    );

    if (!customer) {
        return res.status(404).send("item not found");
    }

    res.send(customer);
});

router.delete("/:id", async (req, res) => {
    const customer = await new Customer.findByIdAndRemove(req.params.id);

    if (!customer) {
        return res.status(404).send("item not found");
    }

    res.send(customer);
});

module.exports = router;