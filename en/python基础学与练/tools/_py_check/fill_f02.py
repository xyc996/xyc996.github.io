score = int(input())
if score < 0 or score > 100:
    print("输入无效")
elif score >= 85:
    print("A等级")
elif score >= 70:
    print("B等级")
else:
    print("C等级")