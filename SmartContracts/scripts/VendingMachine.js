class VendingMachine {
	// state variables = internal memory of the vending machine
	cupcakeBalances = {};
	cupcakeDistributionTimes = {};
  
	// Vend a cupcake to the caller
	giveCupcakeTo(userId) {
	  if (this.cupcakeDistributionTimes[userId] === undefined) {
		this.cupcakeBalances[userId] = 0;
		this.cupcakeDistributionTimes[userId] = 0;
	  }
  
	  // Rule 1: The vending machine will distribute a cupcake to anyone who hasn't recently received one.
	  const fiveSeconds = 5000;
	  const userCanReceiveCupcake = this.cupcakeDistributionTimes[userId] + fiveSeconds <= Date.now();
	  if (userCanReceiveCupcake) {
		this.cupcakeBalances[userId]++;
		this.cupcakeDistributionTimes[userId] = Date.now();
		console.log(`Enjoy your cupcake, ${userId}!`);
		return true;
	  } else {
		console.error(
		  'HTTP 429: Too Many Cupcakes (you must wait at least 5 seconds between cupcakes)',
		);
		return false;
	  }
	}
  
	getCupcakeBalanceFor(userId) {
	  return this.cupcakeBalances[userId];
	}
  }