export enum DispatchT {
  deposit,
  withdraw,
  en,
  jp,
  cn
}

var removeDuplicates = function(nums: number[]) {
  let pot = [];
  for (let i = 0; i < nums.length; i++) {
    if (i === nums.length - 1) {
      pot.push(nums[i]);
      return pot
    }
    if (nums[i] !== nums[i + 1]) {
      pot.push(nums);
    }
  }
};

removeDuplicates([1,1,2,2,3])
