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
print(first)
print(rest)
print(last)
