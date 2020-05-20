// RETRIEVING VALUES

//code snippet
get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }

//similar to push method (when pushing you can find the correct memory address by simply adding the index to the start position)
  // add an index offset and get the value stored at a memory address.
    // Retrieving values from any point in an array has best, worst, and average-case performance of O(1).



// POPPING values
// Rather than resize the array, you just leave an extra space which will be filled at the next push

//code snippet
...
    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }
    ...
// O(1) operation (just some pointer arithmetic and memory access)


// INSERTING VALUES
// if you want to insert a value into any point in an array:
  // shift all of the values after the new value back 1 position
  // Then you put the new value in its correct place

// code snippet
...
insert(index, value) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
        this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
}
...
// Best case performance = O(1): you are inserting the value at the back of the array: it's just the same as pushing

// worst case performance = O(n): you are inserting the value at the start of the array.
  // requires every value to be shifted 1 memory address later; that's n copies

// average case performance = O(n): you are inserting a value into the middle of the array
  // would need to shift half of the values along (n/2 copies)
  // you ignore the constant factor of 1/2


// REMOVING VALUES
// similar to inserting values
// you are copying the values backward to fill the space where you removed the value

// code snippet
...
remove(index) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
}
...

// same performance logic as for instertion
// best-case performance = O(1).
// average and worst cases performance = O(n).
