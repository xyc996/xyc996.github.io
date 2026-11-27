t = (1, 2, 3)                    # 元组：创建后不能修改
print(t[0])                     # 1

d = {"name": "小明", "age": 16}  # 字典：键值对
d["city"] = "郑州"                # 添加"城市"
print(d["name"], d["age"])       # 小明 16
print(len(d))                    # 3