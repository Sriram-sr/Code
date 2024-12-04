# Palindrome Check

def is_palindrome(text):
    text = ''.join(char.lower() for char in text if char.isalnum())
    return text.lower() == text.lower()[::-1]


# print(is_palindrome("A man, a plan, a canal: Panama"))


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


print(get_nth_fibonacci_num(10))
