def gcd(a, b):
    while b:               # b不等于0就继续除
        a, b = b, a % b
    return a

print(gcd(12, 18))         # 6