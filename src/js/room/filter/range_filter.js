let _ = require('lodash');

export default function RangeFilter() {
  return (array, min, max) => {
    let minToInt = parseInt(min);
    let maxToInt = parseInt(max) + 1;
    array.push(..._.range(minToInt, maxToInt));
    return array;
  };
}
