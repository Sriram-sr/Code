def number_generator(n):
    i = 0
    while i < n:
        yield i
        i += 1

generator = number_generator(5)


# Retrieve the next value using next()
print(next(generator))  # Output: 0
print(next(generator))  # Output: 1
print(next(generator))  # Output: 2

# You can also use a loop with next()
for _ in range(2):
    print(next(generator))