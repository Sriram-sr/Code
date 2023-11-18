class Addition:
    def dynamic_addition(self, num_one, num_two):
        return num_one + num_two

    def dynamic_addition(self, num_one, num_two, num_three):
        return num_one + num_two + num_three


# add_instance = Addition()
# print(add_instance.dynamic_addition(1, 2))
# print(add_instance.dynamic_addition(1, 2, 3)) # This is not possible i Python as methods cannot be overloaded instead you can use by using default arguments like below.


def add_numbers(num1, num2):
    return num1 + num2


def add_numbers(num1, num2, num3=0):
    return num1 + num2 + num3


print(add_numbers(1, 2))
print(add_numbers(1, 2, 3))




def add_dynamic(a,b,c=0):
    print(f'C here is {c}')
    return a+b+c
#
# addition_result = add_dynamic(1,2, 3)
# print(addition_result)
