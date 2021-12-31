"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computer_vision_1 = require("./computer-vision");
// Car Class
class Car {
    constructor(props) {
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
    }
    respond(events) {
        if (!this.isRunning) {
            return console.log('The car is off');
        }
        let eventKeys = Object.keys(events);
        eventKeys.forEach((eventKey) => {
            if (!events[eventKey]) {
                return;
            }
            else if (eventKey === 'ObstacleLeft') {
                this.steeringControl.turn('right');
            }
            else if (eventKey === 'ObstacleRight') {
                this.steeringControl.turn('left');
            }
        });
    }
    ;
}
// Steering Class
class SteeringControl {
    execute(command) {
        console.log(`Executing: ${command}`);
    }
    turn(direction) {
        this.execute(`Turn ${direction}`);
    }
}
const steering = new SteeringControl();
const autonomousCar = new Car({ isRunning: true, steeringControl: steering });
// steering.turn('right');
// console.log(autonomousCar.isRunning);
autonomousCar.respond((0, computer_vision_1.getObstacleEvents)());
