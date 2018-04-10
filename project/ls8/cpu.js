/**
 * LS-8 v2.0 emulator skeleton code
 */

const LDI = 10011001;
const PRN = 01000011;
const HLT = 00000001;

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {
  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7
    // Special-purpose registers
    this.reg.PC = 0; // Program Counter
  }

  /**
   * Store value in memory address, useful for program loading
   */
  poke(address, value) {
    this.ram.write(address, value);
  }

  /**
   * Starts the clock ticking on the CPU
   */
  startClock() {
    this.clock = setInterval(() => {
      this.tick();
    }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
  }

  /**
   * Stops the clock
   */
  stopClock() {
    clearInterval(this.clock);
  }

  /**
   * ALU functionality
   *
   * The ALU is responsible for math and comparisons.
   *
   * If you have an instruction that does math, i.e. MUL, the CPU would hand
   * it off to it's internal ALU component to do the actual work.
   *
   * op can be: ADD SUB MUL DIV INC DEC CMP
   */
  alu(op, regA, regB) {
    switch (op) {
      case "MUL":
        this.reg[regA] = regA * regB;
        break;
    }
  }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    // Load the instruction register (IR--can just be a local variable here)
    // from the memory address pointed to by the PC. (I.e. the PC holds the
    // index into memory of the instruction that's about to be executed
    // right now.)

    // !!! IMPLEMENT ME
    let IR = this.ram.read(this.reg.PC);

    // Debugging output
    //console.log(`${this.reg.PC}: ${this.reg.IR.toString(2)}`);

    // Get the two bytes in memory _after_ the PC in case the instruction
    // needs them.

    let byte1 = this.ram.read(this.reg.PC + 1);
    let byte2 = this.ram.read(this.reg.PC + 2);

    // !!! IMPLEMENT ME

    // Execute the instruction. Perform the actions for the instruction as
    // outlined in the LS-8 spec.

    // LDI
    const LDI = (byte1, byte2) => {
      this.reg[byte1] = byte2;
    };

    // PRN
    const PRN = (byte1) => {
        console.log(this.reg[byte1]);
    }
    
    // HLT
    const HLT = () => {
        this.stopClock();
    }

    switch(this.reg.IR) {
        case LDI:
        console.log("LDI hit");
        this.LDI();
        break;

        case PRN:
        console.log("PRN hit");
        this.PRN();
        break;

        case HLT:
        console.log("HLT hit");
        this.HLT();
        break;
    }
    

    // !!! IMPLEMENT ME

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.

    // !!! IMPLEMENT ME
    this.reg.PC++;
  }
}

module.exports = CPU;
