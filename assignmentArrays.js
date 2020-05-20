/*
1-3)
Implement an Array class from scratch.
Walk through each step of implementing an array.

After you've walked through it and you understand the code of the Array class, hide the sample code and try writing the Array class from scratch using the memory module (memory.js) for allocating memory.
*/

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }
  push(value) {
    if (this.length >= this._capacity) {
      this.resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length)
    memory.free(oldPtr);
    this._capacity = size;
  }
}
Array.SIZE_RATIO = 3;

// ---------------
/*
2)  Explore the push() method
Using the Array class you just created above, add an item to the array. Use the following function:

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push(3);

    console.log(arr);
}
*/
