# Python program to interchange first and last elements in a list

def swap_first_last(array):
    # first_element = array[0]
    # last_element = array[-1]
    # array[-1] = first_element
    # array[0] = last_element

    # approach 2
    # array[0], array[-1] = array[-1], array[0]

    # approach 3
    get = array[-1], array[0]
    print(get)
    array[0], array[-1] = get

    return array


input_list = [12, 35, 9, 56, 24]
# print(swap_first_last(input_list))
first, *rest, last = input_list


# Python Program to Swap Two Elements in a List


def swap_elements(array, pos1, pos2):
    try:
        temp = array[pos1 - 1]
        array[pos1 - 1] = array[pos2 - 1]
        array[pos2 - 1] = temp
    except IndexError as err:
        print(err)
        return 'Enter valid positions'

    return array


input_list = [23, 65, 19, 90]
position_1 = 1
position_2 = 4


# print(swap_elements(input_list, position_1, position_2))

# Find Maximum of two numbers in Python

def get_max_number(num1, num2):
    try:
        if num1 > num2:
            return f'{num1} is greater'
        elif num2 > num1:
            return f'{num2} is greater'
        else:
            return 'Both numbers are equal'
    except TypeError as err:
        return 'Enter valid numbers'


# print(get_max_number(900, 900))


# Reversing a List in Python

def get_reversed_array(array):
    # reversed_array = array[::-1]

    # approach 2
    # reversed_array = []
    # for idx in range(len(array) - 1, -1, -1):
    #     reversed_array.append(array[idx])
    #
    # return reversed_array

    # approach 3
    first_idx = 0
    last_idx = len(array) - 1

    while first_idx < last_idx:
        temp = array[first_idx]
        array[first_idx] = array[last_idx]
        array[last_idx] = temp
        first_idx += 1
        last_idx -= 1

    return array


# print(get_reversed_array([1, 8, 5, 18, 12, 2]))

array = [15, 6, 7, 10, 12, 20, 10, 28, 10]
to_find = 10

count = len([ele for ele in array if ele == to_find])
print(count)


# Sum of number digits in List


def get_number_sum(test_list):
    # sum_list = [sum(int(char) for char in str(ele)) for ele in test_list]

    # approach 2
    sum_list = list(map(lambda ele: sum(int(char) for char in str(ele)), test_list))

    return sum_list


test_list = [12, 67, 98, 34]
print(get_number_sum(test_list))
