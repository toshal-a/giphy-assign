/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

// Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Output: 6
// Explanation: The contiguous subarray [4, -1, 2, 1] has the maximum sum (4 + (-1) + 2 + 1 = 6).


function continousSum(arr) {
    if (arr.length == 0) return 0;
    let currMax = arr[0], maxSum = arr[0] ;
    for (let i = 1; i < arr.length; i++) {
        currMax = Math.max(currMax + arr[i], arr[i]);
        maxSum = Math.max(maxSum, currMax);
    }

    return maxSum;
}

let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
console.log("TC 1: ", continousSum(arr))

arr = [-14, -2, -3, -8, -14]
console.log("TC 2:", continousSum(arr))
