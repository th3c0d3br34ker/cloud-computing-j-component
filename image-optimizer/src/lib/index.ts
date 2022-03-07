// transform a buffer into a string
export function arrayBufferToString(buffer: Buffer) {
  // transform the buffer into a Typed array
  const bufferArray = new Uint16Array(buffer);
  // transform bufferArray into an number[] array to be able to send it to String.fromCharCode.apply(null, number[])
  var bufferNumbers: number[] = Array.from(bufferArray);
  // lenght of the ArrayBuffer
  var length = bufferArray.length;
  // string that will contain all the data of the image in base64
  var result = '';
  // size of the chunks that you will get from the array
  var addition = Math.pow(2, 16) - 1;
  // loop through bufferNumbers to get the bytes by chunks
  // the reason why this is needed is becasuse if you use String.fromCharCode.apply(null, number[]) in a file that is too large it will crash
  for (var i = 0; i < length; i += addition) {
    if (i + addition > length) {
      addition = length - i;
    }
    // get a chunk of the array and convert it to a string
    result += String.fromCharCode.apply(null, bufferNumbers.slice(i, i + addition));
  }
  // return the final string
  return result;
}
