
/**
 * This class represents a species of creatures.  It primarily contains
 * the progrm code for the species.
 */
class Species {

    /**
     * Constructs a Species object from the given program code.
     * 
     * It should set the following properties:
     *    this.name -- the name of this species
     *    this.color -- the color of this species
     *    this.code  -- an array, containing the code for this species.  Each element of 
     *         this array should contain an object with the following two properties: 
     *         "opcode" and "address".  The "opcode" property is the name of the instruction,
     *         and "address" is the jump address (only needed for instructions that have a
     *         jump location).  For example: one possible entry in the array:
     *                { opcode: "ifenemy", address: 4 }
     * 
     * @param {string} code a string containing the program code for this Species. 
     */
    constructor( codes ) {
        // TODO : parse code and store in this.code as described above.  Also, store
        // the color for this species in this.color.   done
		let lines =codes[1].split(" ");
		var i;
		var val;
		this.name=lines[0];
		this.color=lines[1];
		val=[codes[2]];
		for (i=3;i<codes.length;i++)
		{
			if (codes[i]==="")
				break;
			val.push(codes[i]);
		}
		this.code=val
    }

    /**
     * Returns the code for instruction step.
     * 
     * @param {Number} step the instruction number.
     * @returns {Object} an object containing the instruction for example:  { opcode: "ifwall", address: 4 } 
     */
    programStep( step ) {
        //return this.code[step];
		//console.log(this.code[step]);
		let line=this.code[step];
		//console.log(line);
		let elem=line.split(" ");
		
		var output={opcode: elem[0], address: elem[1]};
		return output;
		
    }
}