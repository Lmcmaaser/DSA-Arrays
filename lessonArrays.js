//exercise

// class Array v.1
class Array {
    // array starts with a length of 0 and a pointer to 0 blocks of memory
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    //push a new element to the end of the array.
    // increase the amount of memory which you have reserved to create space for the new item
      // resize the array so there is space for the new item, use _resize method
    // set the value of the final block to contain the new value.
    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    // allocate a new, larger chunk of memory
    // copy any existing values from the old to the new chunk
    // free the old chunk
    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }
}
Array.SIZE_RATIO = 3;

// class Array v.1 performs by:
  // copy each item of data to a new box each time you resize the array, so that's n copies: your resize operation has a worst, best, and average case of O(n).
  // push method resizes the array, then increases the length and sets a single memory address (both O(1) operations). So push is also O(n).


//class Array v.2
// Rather than resizing every time you push some data, you could allocate more space than you need. That way you would need to resize far less often.
class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    // if the length is greater than the capacity, resize according to the SIZE_RATIO
      // each time you go over the capacity, you triple the size of memory which is allocated
        // becomes O(1) operations at best/average, O(n) at worst still
    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }
}
Array.SIZE_RATIO = 3;

// class Array v.2 performs by:
  // length + a capacity(how many items you can hold without needing to resize)
  // tradeoff is wasting some memory when the capacity is greater than the length (as opposed to v.1)
