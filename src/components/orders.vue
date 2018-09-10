<template>
  <section class="orders-container">
    <header class="orders-tab">
      <ul>
        <li>ALL BETS</li>
      </ul>
    </header>
    <table class="orders-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Bettor</th>
          <th>Roll Under</th>
          <th>Bet</th>
          <th>Roll</th>
          <th>Payout</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          :key="index"
          v-for="(order, index) in orders">
          <td>{{dateFormat(order.time)}}</td> 
          <td>{{order.player}}</td> 
          <td>{{order.roll_under}}</td> 
          <td>{{order.eos}}</td> 
          <td>{{order.random_roll}}</td>
          <td class="payout">{{order.payout && Number(order.payout).toFixed(4) || ''}}</td> 
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import fetch from '@/utils/api';

  export default {
    mounted() {
      setInterval(this.fetchOrders, 1000);
    },

    data() {
      return {
        orders: []
      };
    },

    methods: {
      fetchOrders() {
        fetch('//api.dapp.pub/dice/bets').then(({ bets }) => this.orders = bets);
      },

      dateFormat(raw) {
        const date = new Date(raw);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
    
        if (hours < 10) hours = '0' + hours; 
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        
        return `${hours}:${minutes}:${seconds}`;
      }
    }
  };
</script>

<style scoped>
  .orders-container {
    background-color: #191919;
    padding: 20px;
  }   

  .orders-tab {
    color: #fff;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .orders-tab ul {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #bbb;
  }

  .orders-tab ul li {
    cursor: pointer;
    padding: 7px 35px;
    display: inline-block;
    text-align: center;
    color: #bbb; 
    letter-spacing: .5px;
    font-weight: 600;
  } 

  .orders-table {
    width: 90%;
    color: #fff;
    font-weight: 900;
    letter-spacing: .5px;
    border-collapse: collapse;
    margin: 0 auto;
  }

  .orders-table tbody tr {
    border-radius: 5px;
  }

  .orders-table tbody tr:nth-child(even) {
    background-color: #292929;
  }

  .orders-table td {
    font-size: 16px;
    padding: 20px 0;
    text-align: center;
  }

  .payout {
    color: #02f292;
    text-shadow: 0 0 5px #02f292;
  }
</style>

