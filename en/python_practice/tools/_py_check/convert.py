age = int(input("请输入年龄："))    # input得到文字，int转成数字
print("明年你", age + 1, "岁")

print(int(3.9))        # 3   小数转整数：截断，不是四舍五入
print(int("12"))       # 12  纯数字字符串可以转
print(float("3.5"))    # 3.5
print(str(100))        # 100  数字转成字符串