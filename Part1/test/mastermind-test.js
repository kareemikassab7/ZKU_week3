//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected

const CircomTester = require("circom_tester").wasm;
const PoseidonOpt = require("circomlibjs").buildPoseidonOpt;
const chai = require("chai");
const assert = chai.assert;



describe(" part 1 Q3 test", function () {
   
   
    this.timeout(100000000);
 

    before(async () => {
        PoseidonHasher = await PoseidonOpt();
    });

    it("checks that hash equals PoseidonHasher hash", async () => {
        const circuit = await CircomTester(
                   "/home/kareemikassab/ZKU/ZKU_week3/Part1/contracts/circuits/MastermindVariation.circom",
                    { reduceConstraints: false }
        );

   
        let hasherOutput = await  PoseidonHasher(["0","1", "2", "3"]);
        let StringifiedOut = await PoseidonHasher.F.toString(hasherOutput);
        let Witness = await circuit.calculateWitness({
        pubGuessA: 1,
        pubGuessB: 2,
        pubGuessC: 3,
        pubNumHit: 0,
        pubNumBlow: 0,
        pubSolnHash: StringifiedOut,
    // Private inputs
     privSolnA: 1,
     privSolnB: 2,
     privSolnC: 3,
     privSalt: 0

        });
// assertions 
        await circuit.checkConstraints(Witness);
        await circuit.assertOut(Witness, {solnHashOut:StringifiedOut }); // check the out is equal to the library's output


       
    });

   

})