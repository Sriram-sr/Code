import re

long_text = 'Learning Python at Mieupro'

# print(long_text.casefold())
# print(len(long_text))
# print(long_text.center(28, '#'))
# print(long_text.count('e'))
# print(long_text.find('e', 15))

int_type_var = 9
float_type_var = 2.5
mixtype_var = int_type_var + float_type_var

# print(mixtype_var)
# print(type(mixtype_var))

unordered_set = {5, 4, 3, 2, 1}


# print(unordered_set)


def manipulate_array(array):
    array.append(100)

    return array


robust_array = [1, 2, 4]
manipulate_array(robust_array)
# print(robust_array)

dynamic_list = [count for count in range(10)]
# print(dynamic_list)


outside_var = 100


def manipulate_outsider():
    global outside_var
    global insider
    insider = 1
    outside_var = 1000


manipulate_outsider()
# print(outside_var)
# print(insider)


text = 'srirampanneer90@gmail.com'
pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

# print(re.match(pattern, text))
# print(re.search(pattern, text))

# assert re.search(pattern, text)

print(re.search(r'hello', 'Say hello world!'))


def meta_func(func):
    def wrapper(*args, **kwargs):
        print('Before entering')
        func(*args, **kwargs)
        print('After entering')

    return wrapper


@meta_func
def logging(num):
    print(f'The number is {num}')


logging(8)

class Fish:
    pass

class GrandParant:
    def __init__(self):
        print('Grandparent class init')

    def describe_grandpa(self):
        print('Grandpa')

class Parent(GrandParant):
    def __init__(self):
        print('Parent class init')

    def describe_appa(self):
        print('Appa')

class Student(Parent):
    def __init__(self):
        print('Student class init')

    def describe_student(self):
        print('Student')

student = Student()
print(isinstance(student, Fish))
