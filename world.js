/**
 * An instance of World represents the simulation world.  
 */
class World {
    /**
     * Constructs a World object.
     * @param {Number} w the width of this World (number of columns) 
     * @param {Number} h the height of this World (number of rows)
     */
    constructor( w, h ) {
        this.rows = h;
        this.columns = w;
        // The array containing the Species objects
        this.species = [];
        // The array containing all of the Creatures in this simulation
        this.creatures = [];
        this.loadSpecies();
        this.populate();
    }

    /**
     * Load the programs for each species and create a Species object for each,
     * and add to this.species.
     */
    loadSpecies() {
        let speciesElements = document.activeElement.getElementsByClassName('species-data');
        var i;
        // TODO: iterate through each item in speciesElements (it is an "array-like" object), 
        //    create a Species object for each.  The contents of each element in the array
        //    is available vial speciesElements[i].text done?
		for(i=0;i<speciesElements.length;i++)
		{
			let elem= speciesElements[i].text;
			let codeLines=elem.split(/\r?\n/);
			let s=new Species(codeLines);
			this.species.push(s);
		}
    }

    /**
     * Create a random set of creatures with random positions and orientations.
     */
    populate() {
		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min)) + min; 
		}//function
		 /*
		let p = new Point(4,4);
		let c = new Creature(this.species[3],p,Geometry.randomDirection(),this);
		this.creatures.push(c);
		*/
		var x;
		var y;
		for (x=0;x<this.rows;x++) {
			for (y=0;y<this.columns;y++) {
				let rand=getRandomInt(0,this.species.length+9);
				if (this.species[rand]!=undefined){
					let p = new Point(x,y)
					let c =new Creature(this.species[rand],p,Geometry.randomDirection(),this);
					this.creatures.push(c);
				}
			}//for y
		}//for x
		// */
	}

    /**
     * Run one simulation step.  This is called from the main GUI.  It must iterate through
     * all creatures and execute takeOneTurn() for each.  For full credit, you must use the
     * forEach method:  this.creatures.forEach(..).
     */
    step() {
		this.creatures.forEach(c=>c.takeOneTurn());
		//console.log("step");
    }

    /**
     * Searches the creature list to find the creature that exists at (row, col).  If
     * no such creature exists, it returns undefined.  For full credit, you must use the
     * find method: this.creatures.find(...).
     * 
     * @param {Number} row the row number 
     * @param {Number} col the column number
     * @returns {Creature} the Creature at (row, col) or undefined if no creature exists
     *     at that location.
     */
    getContents( row, col ) {
        // TODO: implement this method done?
		//console.log(this.creatures);
		//console.log(this.creatures[1].getLocation());
		var c=this.creatures.find(function(val) {if(val.getLocation().row===row&&val.getLocation().col===col){return val}});
		//console.log(c);
		return c; 
    }

    getRows() { return this.rows; }
    getColumns() { return this.columns; }

    /**
     * Add a creature to this world.
     * @param {Creature} creature a Creature object.
     */
    addCreature( creature ) {
        this.creatures.push(creature);
    }

    /**
     * Returns whether or not point is in the valid range for this World.
     * 
     * @param {Point} point a point.
     * @return {Boolean} true if point is a valid location in this World.
     */
    inRange( point ) {
        // TODO: Implement this method. 
		//console.log(point.col);
		//console.log(this.columns);
		if(point.row<this.rows&&point.row>=0&&point.col<this.columns&&point.col>=0){
			//console.log("true");
			return true;
		}
		else
			return false;
    }
}