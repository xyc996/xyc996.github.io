n = int(input("请输入n："))
if n < 2:
    print(n, "不是素数")
else:
    is_prime = True
    for i in range(2, n):
        if n % i == 0:
            is_prime = False
            break
    if is_prime:
        print(n, "是素数")
    else:
        print(n, "不是素数")