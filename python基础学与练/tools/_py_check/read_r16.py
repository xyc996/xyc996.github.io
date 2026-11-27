for n in [7, 9]:
    is_prime = True
    for i in range(2, n):
        if n % i == 0:
            is_prime = False
            break
    print(n, "是素数" if is_prime else "不是素数")