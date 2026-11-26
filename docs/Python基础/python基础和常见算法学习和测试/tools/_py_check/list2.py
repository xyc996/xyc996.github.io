nums = [3, 1, 2]
new = sorted(nums)    # 生成新列表，原列表不变
print(new, nums)      # [1, 2, 3] [3, 1, 2]
print(nums[::-1])     # [2, 1, 3] 切片反转