const EventEmitter = require('events');

class Person extends EventEmitter {
    constructor (name) {
        super();
        this.name = name;
        this.on('speak', this.speakListener);
        this.once('born', this.bornListener);
    }
    speakListener(said) {
        console.log(`${this.name}: ${said}`);
        //console.log(this.name + ':' + said); // same as above
    }

    bornListener() {
        console.log('Hello World');
    }
}

let ben = new Person('Benjamin Franklin');
let curtis = new Person('Curtis Dalton');
ben.emit('born');
ben.emit('born');
ben.emit('speak','You may delay, but time will not.');
curtis.emit('speak', 'Hello');