<script>
export default {
  data() {
    return {
      interval: null,
      stocks: [
        { name: "BMW", price: 61.05, previousPrice: 0, currency: "€" },
        { name: "Caterpillar", price: 146.49, previousPrice: 0, currency: "$" },
        { name: "AMD", price: 76.5, previousPrice: 0, currency: "$" },
        { name: "Gazprom", price: 4.583, previousPrice: 0, currency: "$" },
      ],
    };
  },
  mounted() {
    // save the interval so we can clean it up on unmount
    this.interval = setInterval(() => {
      this.randomizePrices();
    }, 1000);
  },
  beforeUnmount() {
    // clean up the interval we created
    clearInterval(this.interval);
  },
  methods: {
    randomizePrices() {
      this.stocks = this.stocks.map((stock) => {
        let newPrice = stock.price + Math.random() * 2 - 1;
        if (newPrice < 0) {
          newPrice = 0;
        }
        return {
          ...stock,
          previousPrice: stock.price,
          price: newPrice,
        };
      });
    },
  },
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Stock Name</th>
        <th>Price</th>
        <th>Previous Price</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(stock, index) in stocks"
        :key="index"
        :class="{
          'price-increase': stock.price >= stock.previousPrice,
          'price-decrease': stock.price < stock.previousPrice,
        }"
      >
        <td>{{ stock.name }}</td>
        <td>{{ stock.currency }}{{ stock.price.toFixed(2) }}</td>
        <td>{{ stock.currency }}{{ stock.previousPrice.toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
  <button @click="randomizePrices">Randomize Prices</button>
</template>

<style lang="css" scoped>
.price-increase {
  color: green;
}
.price-decrease {
  color: red;
}
</style>
