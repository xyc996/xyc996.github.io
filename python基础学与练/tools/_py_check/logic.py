print(3 < 5 and 5 < 3)          # False  and：两边都真才真
print(3 < 5 or 5 < 3)           # True   or：有一边真就真
print(not (3 < 5))              # False  not：取反
print(True or False and False)  # True   优先级：not > and > or
print("会" in "会考")            # True   in：判断包含关系