for i in range(10):
    if i == 3:
        continue       # 跳过3，直接进入下一轮
    if i == 6:
        break          # 到6就结束整个循环
    print(i)           # 依次输出 0 1 2 4 5