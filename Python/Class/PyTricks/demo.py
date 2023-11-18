# Will collect all Python

def get_numbers_added(nums):
    added_numbers = map(lambda n: n + n, nums)
    print(tuple(added_numbers))


numbers = [2, 3, 5, 6]


def create_nested_list(list_of_strings):
    nested_list = list(map(list, list_of_strings))

    return nested_list


str_list = ['cat', 'bat', 'mat']


def ref_value_check(array):
    copied_array = array.copy()
    copied_array[-1] = 0

    return copied_array


sample_array = [3, 2, 11, 8, 10, 9]
copied_array_returned = ref_value_check(sample_array)

# Scope explore

outer_var = 'Outer variable'


def scoping_method():
    global outer_var  # Need to tell like this if needed to use the variable before reinitialising.
    inner_var = 'Inner variable'
    print('Outer variable before manipulate => ', outer_var)
    outer_var = 'Changed inside method'
    print('Outer variable before manipulate => ', outer_var)


def decorator_method():
    pass


# print('Outside the function ', common)


# Function calls

# print(create_nested_list(str_list))
# get_numbers_added(numbers)
# print(copied_array_returned)
# print(sample_array)
# scoping_method()
