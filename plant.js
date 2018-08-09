const EventEmitter = require('events');

class Plant extends EventEmitter {
    constructor() {
        super();
        this.size = 0;
        this.hasBeenPlanted = false;
        this.addEventListeners();

        // Original code order before addEventListeners() was added
        // this.once('plantSeed', this.plantSeed);
        // this.on('water', this.water);
        // this.on('harvest', this.harvest);
        // this.on('error', () => {
        //     console.log('You have to plant the seed first');
        // })
    }

    addEventListeners(){
        this.once('plantSeed', this.plantSeed);
        this.on('water', this.water);
        this.on('harvest', this.harvest);
        this.on('bugAttack', this.bugAttack);
        this.on('error', () => {
            console.log('You have to plant the seed first');
        });
    }

    plantSeed(){
        this.size = 1;
        this.hasBeenPlanted = true;
        console.log('A seed has been planted');
        }

    water(){
        if(this.hasBeenPlanted) {
            this.size++;
            console.log(`This Plant is now ${this.size} units in size`);
        } else {
            this.emit('error');
        }
    }

    bugAttack(){
        if(this.hasBeenPlanted){
           this.size--;
            console.log(`This Plant is now ${this.size} units in size`);
        } else {
            this.emit('error');
        }
    }

    harvest(){
        if(this.hasBeenPlanted){
            console.log(`Final size: ${this.size}`);
            // this.off('water', this.water);
            // this.off('bugAttack', this.bugAttack);
            // this.off('harvest', this.harvest);
            this.removeAllListeners(); // Work's with addEventListeners()
        } else {
            this.emit('error');
        }

    }
}

let myPlant = new Plant;
myPlant.emit('harvest');
myPlant.emit('bugAttack');
myPlant.emit('plantSeed');
myPlant.emit('water');
myPlant.emit('bugAttack');
myPlant.emit('error', new Error('whoops!'));
myPlant.emit('water');
myPlant.emit('water');
myPlant.emit('water');
myPlant.emit('plantSeed');
myPlant.emit('harvest');
myPlant.emit('water');
myPlant.emit('bugAttack');
myPlant.emit('bugAttack');

