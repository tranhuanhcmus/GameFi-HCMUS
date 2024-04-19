const Genetic = require('genetic-js')
const { BearFactory, Bear } = require("./bears")

let solution = new Bear(1, 1, 1, 1)

var genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

genetic.seed = function() {
    const factory = new BearFactory()
    return factory.getRandomBear()
};
genetic.mutate = function(entity) {
    const factory = new BearFactory()

    return factory.getMutateBear(entity).mutateBear
};

genetic.crossover = function(mother, father) {

    let son = new Bear()
    let daughter = new Bear()

    function crossOver(attr) {
        son[attr] = father[attr]
        daughter[attr] = mother[attr]

        let random = Math.random()

        if (random < 0.5) {
            // swap
            let temp = son[attr]
            son[attr] = daughter[attr]
            daughter[attr] = temp
        }
    }

    for (let attr of new Bear().getAttrs()) {
        crossOver(attr);
    }

    return [son, daughter];
};
genetic.fitness = function(entity) {
    var fitness = 0;
    console.log("e",entity);
    // for (let attr of entity.getAttrs()) {
    // 	// increase fitness for each character that matches

    // 	let dif=Math.abs(this.userData["solution"][attr] - entity[attr])	
    // 	console.log("dif",dif);

    // 	// if (entity[i] == this.userData["solution"][i])
    // 	// 	fitness += 1;

    // 	// award fractions of a point as we get warmer
    // 	fitness += (100-dif)
    // }
    console.log("fitness", fitness);
    return fitness;
};
genetic.generation = function(pop, generation, stats) {
    // stop running once we've reached the solution
    return pop[0].entity != this.userData["solution"];
};

genetic.notification = function(pop, generation, stats, isFinished) {

    var value = pop[0].entity;
    this.last = this.last || value;

    if (pop != 0 && value == this.last)
        return;

    this.last = value;
    // console.log("solution:",value);
};

var config = {
    "iterations": 10,
    "size": 250,
    "crossover": 0.3,
    "mutation": 0.3,
    "skip": 20
};

var userData = {
    "solution": solution
};

// genetic.evolve(config, userData);
// const seed=genetic.seed()
// const mutate=genetic.mutate(seed)

// console.log(seed,mutate);

const father=genetic.seed()
const mother=genetic.seed()

console.log("father",father);
console.log("mother",mother);
console.log(genetic.crossover(father,mother));