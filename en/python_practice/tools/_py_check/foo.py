def foo(s):
    t = ""
    for i in range(len(s)):
        if i % 2 == 0:
            t += s[i].upper()
        else:
            t += s[i].lower()
    return t

print(foo("Information"))