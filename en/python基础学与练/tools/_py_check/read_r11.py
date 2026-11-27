s = "ab12cd3"
alpha = digit = 0
for ch in s:
    if ch.isalpha():
        alpha += 1
    elif ch.isdigit():
        digit += 1
print(alpha, digit)