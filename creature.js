/**
 * A Creature object is a single creature in this simulation.
 */
class Creature {

    /**
     * Constructs a Creature object.
     * 
     * @param {Species} species The species of this creature. 
     * @param {Point} point The position of this creature 
     * @param {Number} direction The direction that this Creature is facing.
     *      One of the properties of the Direction object in geometry.js.
     * @param {World} world A reference to the world object for this simulation. 
     */
    constructor( species, point, direction, world ) {
        this.location = point;
        this.direction = direction;
        this.species = species;
        this.world = world;

        // The program counter (pc) for this creature.  This keeps track of the
        // current instruction in the creature's program.
        this.pc = 1;
    }

    getSpecies() {
        return this.species;
    }

    getDirection() {
        return this.direction;
    }

    getLocation() {
        return this.location;
    }

    /**
     * Executes this creature's program from the current instruction until one turn
     * is complete.  A turn is complete when one of the instructions:  hop, left,
     * right, or infect is executed.  Prior to that, the creature may execute one or
     * several instructions.
     * 
     * You can access the instructions for the species of this creature via: 
     * this.species.programStep() (see species.js).
     */
    takeOneTurn() {
        // TODO: Implement this function.
		// code {opcode,address}
		//console.log(this.species);
		//console.log(this.location);
		//console.log(this.direction);
		//console.log(this.pc);
		if (this.pc>=this.species.code.length){
			this.pc=0;
		}
		let turn=1;
		var point;
		var c;
		while(turn===1){
		let code=this.species.programStep(this.pc);
		//console.log(code);
		switch(code.opcode) {
			case ("hop"):
				//console.log("hop");
				point = Geometry.adjacentPoint(this.location,this.direction);
				//console.log("next");
				//console.log(this.location);
				//console.log(point);
				//console.log(this.world.inRange(point));
				if(this.world.inRange(point)){
					//console.log("in range");
					//console.log(this.world.getContents(point.row,point.col)===undefined);
					c= this.world.getContents(point.row,point.col);
					if(c===undefined){
						//console.log("empty");
						this.location=point;
						//console.log("locationupdated");
					}
				}
				this.location=this.location;
				turn=0;
				break;
			case ("left"):
				//console.log("left");
				this.direction=Geometry.leftFrom(this.direction);
				turn=0;
				break;
			case ("right"):
				//console.log("right");
				this.direction=Geometry.rightFrom(this.direction);
				turn=0;
				break;
			case ("infect"):
				//console.log("infect");
				point=Geometry.adjacentPoint(this.location,this.direction);
				if (this.world.inRange(point)){
					//console.log("killing!");
					c=this.world.getContents(point.row,point.col);
					this.world.creatures.filter(val=>val===c);
					c.species=this.species;
					this.world.addCreature(c);
					
				}
				turn=0;
				break;
			case ("go"):
				//console.log("go");
				this.pc=code.address-2;
				break;
			case ("ifwall"):
				//console.log("ifwall");
				//console.log(this.location);
				//console.log(this.direction);
				point=Geometry.adjacentPoint(this.location,this.direction);
				//console.log(point);
				let inMap=this.world.inRange(point);
				if (!inMap)
					this.pc=code.address-2;
				break;
			case ("ifenemy"):
				//console.log("ifenemy");
				point = Geometry.adjacentPoint(this.location,this.direction);
				if ((this.world.inRange(point))){
					var c=this.world.getContents(point.row,point.col);
					if (c!=undefined){
						if (c.species!=this.species){
							//console.log("Enemy!");
							this.pc=code.address-2;
						}
					}
				}
				break;
			case ("ifsame"):
				//console.log("ifsame");
				point=Geometry.adjacentPoint(this.location,this.direction);
				if (this.world.inRange(point)){
					var c=this.world.getContents(point.row,point.col);
					if(c!=undefined){
						if(c.species===this.species){
							//console.log("friend!");
							this.pc=code.address-2;
						}
					}
				}
				break;
			case ("ifrandom"):
				//console.log("ifrandom");
				let x=Math.floor(Math.random() * 2);
				if (x===1){
					this.pc=code.address-2;
				}
				break;
			
		}
		this.pc=this.pc+1;
		//console.log(this.species.code);
		
		}
    }
}