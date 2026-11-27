nums = [3, 1, 4, 1, 5]
print(nums[0])        # 3   第一个元素
nums.append(9)        # 在末尾添加9
nums.insert(0, 7)     # 在开头插入7
nums.pop()            # 删除最后一个元素
nums.remove(1)        # 删除第一个1
nums.sort()           # 升序排序
print(nums)           # [3, 4, 7, 9]
print(len(nums), sum(nums), max(nums), min(nums))