import re


def get_non_control_sensor():
    cli_output = '\nFri Sep 22 12:13:40.741 UTC\npd fake_temp unit 0\n\nNode: 0/RP0/CPU0\nInvalid params start=-1\n\
     sensor for NPU asic:\n  63 - NPU_T0\n  64 - NPU_T1\n  65 - NPU_T2\n  66 - NPU_T3\n  67 - NPU_T4'
    for line in cli_output.split('\n'):
        sensor = re.search('npu_.*', line.lower())
        if sensor:
            return sensor.group(0)


# print(get_non_control_sensor())

class Explore:
    def caller_method(self):
        print('Calling static from callable')
        self.callable_static()

    @staticmethod
    def callable_static():
        print('Static method called')


class Dependent:
    @staticmethod
    def cross_call_static(self):
        print('Calling from cross caller ')
        Explore.callable_static()


# explore_instance = Explore()
# dependent_instance = Dependent()
#
# explore_instance.callable_static()


def beautiful(ham: 'str', eggs: 'str' = 'eggs') -> 'str':
    print("Annotations:", beautiful.__annotations__)
    print("Arguments:", ham, eggs)
    return ham + ' and ' + eggs


# beautiful(ham='sri', eggs='ram')


def insert_in_position(array, pos, val):
    array.append(None)

    size = len(array)

    for idx in range(size - 1, pos - 1, -1):
        array[idx] = array[idx - 1]
    array[pos - 1] = val

    return array


numbers = [2, 3, 6, 1, 7, 9]
position = 3
value = 10

# print(insert_in_position(numbers, position, value))
