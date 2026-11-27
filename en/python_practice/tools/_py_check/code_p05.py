n = int(input())
if n < 2:
    print("不是素数")
else:
    is_prime = True
    for i in range(2, n):
        if n % i == 0:
            is_prime = False
            break
    if is_prime:
        print("是素数")
    else:
        print("不是素数")