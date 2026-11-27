nums = [3, 7, 2, 9, 5]
mx = nums[0]
for x in nums:
    if x > mx:
        mx = x
print(mx)