// server/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3100;

app.use(cors());

app.get("/api/orderbook", (req, res) => {
    setTimeout(() => {
        const getRandomOrders = (type) => {
            const numOrders = Math.floor(Math.random() * 6) + 3;
            const orders = [];

            for (let i = 0; i < numOrders; i++) {
                const priceBase = type === "bid" ? 950 : 1000;
                const priceRange = type === "bid" ? 50 : 50;
                const price =
                    priceBase +
                    (type === "bid" ? Math.random() * priceRange : Math.random() * priceRange);

                const amount = (Math.random() * 5 + 1).toFixed(2);

                orders.push({
                    price: Number(price.toFixed(2)),
                    amount: Number(amount),
                });
            }

            return orders.sort((a, b) =>
                type === "bid" ? b.price - a.price : a.price - b.price
            );
        };

        res.json({
            bids: getRandomOrders("bid"),
            asks: getRandomOrders("ask"),
        });
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
