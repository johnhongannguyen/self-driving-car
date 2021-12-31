import { getObstacleEvents } from './computer-vision';

// declare types
interface AutonomousCar {
  isRunning ?: boolean;
  respond: (events:Events)=>void
}
interface AutonomousCarProps {
    isRunning ?: boolean;
    steeringControl:Steering
}
interface Events {
  [obstacle:string]:boolean;
}
interface Control {
  execute:(command:string)=>void;
}
interface Steering extends Control{
  turn:(direction:string)=>void;
 
}
// Car Class
class Car implements AutonomousCar{
     isRunning;
     steeringControl;
     constructor(props:AutonomousCarProps){
       this.isRunning = props.isRunning;
       this.steeringControl = props.steeringControl;
     }
     respond(events:Events){
          if(!this.isRunning){
         return console.log('The car is off');
       }
       let eventKeys = Object.keys(events);
        eventKeys.forEach((eventKey) =>{
          if(!events[eventKey]){
            return ;
          }else if(eventKey === 'ObstacleLeft'){
            this.steeringControl.turn('right');
          }else if(eventKey === 'ObstacleRight'){
            this.steeringControl.turn('left');
          }
        })
    
     };
}


// Steering Class
class SteeringControl implements Steering{
  execute(command:string){
    console.log(`Executing: ${command}`);
  }
  turn(direction:string){
    this.execute(`Turn ${direction}`);
  }
}
const steering = new SteeringControl();
const autonomousCar = new Car({isRunning:true,steeringControl:steering});

// steering.turn('right');

// console.log(autonomousCar.isRunning);
autonomousCar.respond(getObstacleEvents());


