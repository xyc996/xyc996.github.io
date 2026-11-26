for year in [2024, 1900, 2000]:
    if year % 4 == 0 and year % 100 != 0 or year % 400 == 0:
        print(year, "闰年")
    else:
        print(year, "平年")