s = "Hello,Python"
print(s.upper())                  # HELLO,PYTHON 全部变大写
print(s.lower())                  # hello,python 全部变小写
print(s.replace("l", "L"))        # HeLLo,Python 替换字符
print("2024-06-18".split("-"))    # ['2024', '06', '18'] 按-分割
print("abc123".isalpha())         # False 是否全是字母
print("123".isdigit())            # True  是否全是数字
print("Python".find("th"))        # 2     查找位置