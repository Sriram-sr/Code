# Palindrome Check

def is_palindrome(text):
    text = ''.join(char.lower() for char in text if char.isalnum())
    return text.lower() == text.lower()[::-1]


# print(is_palindrome("A man, a plan, a canal: Panama"))


# Fibonacci series

def get_nth_fibonacci_num(pos):
    first_fibbo_num = 0
    second_fibbo_num = 1
    fibbo_list = [first_fibbo_num, second_fibbo_num]

    if pos <= 2:
        return fibbo_list[pos - 1]

    for iter in range(pos - len(fibbo_list)):
        fibbo_num = first_fibbo_num + second_fibbo_num
        fibbo_list.append(fibbo_num)
        first_fibbo_num = second_fibbo_num
        second_fibbo_num = fibbo_num

    return fibbo_list[pos - 1]


def get_nth_fibonacci(pos):
    first_num, second_num = 0, 1

    if pos < 1:
        return 'Enter a valid position'

    if pos == 1:
        return first_num
    if pos == 2:
        return second_num

    for _ in range(3, pos + 1):
        first_num, second_num = second_num, first_num + second_num

    return second_num


# print(get_nth_fibonacci_num(40))
# print(get_nth_fibonacci(40))


# Prime number

def is_prime_number(num):
    if num == 0 or num == 1:
        return False
    for div in range(2, num):
        if num % div == 0:
            return False
    else:
        return True


# print(is_prime_number(2))


# Factorial

def find_factorial(num):
    factorial = 1
    for val in range(1, num + 1):
        factorial *= val

    return factorial


def get_recursive_factorial(num):
    return 1 if (num == 1) else num * get_recursive_factorial(num - 1)


# print(find_factorial(5))
print(get_recursive_factorial(5))


# Find Maximum Element in a List

def find_max_number(array):
    if len(array) == 0:
        return None

    max_num = array[0]
    for num in array:
        if num > max_num:
            max_num = num

    return max_num


# print(find_max_number([2, 6, 9, -1, 8, -10, 7]))


# sort without inbuilt methods

def bubble_sort_array(array):
    for i in range(len(array)):
        for j in range(0, len(array) - i - 1):
            if array[j] > array[j + 1]:
                array[j], array[j + 1] = array[j + 1], array[j]

    return array


# print(bubble_sort_array([5, 8, 1, 9, 11, 2, -3]))


# Check for Anagrams

def are_anagrams(str1, str2):
    str1 = str1.lower()
    str2 = str2.lower()
    for char in str1:
        if char in str2 and str2.count(char) >= str1.count(char):
            pass
        else:
            print(char)
            return False

    return True


# print(are_anagrams("Anagram", "Nag a Ram"))

# Sum of digits

def get_sum_of_digits(number):
    total = 0

    while number > 0:
        digit = number % 10
        total += digit
        number //= 10

    # Approach 2

    # for digit in str(number):
    #     total += int(digit)

    return total

    # Approach 3

    # return sum((int(char) for char in str(number)))


print(get_sum_of_digits(987))


def get_first_digit(number):
    first_digit = -1

    while number > 0:
        first_digit = number % 10
        number //= 10

    return first_digit

    # Approach 2

    # return int(str(number)[0])


input_val = 7173
print(get_first_digit(input_val))
