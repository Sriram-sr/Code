import re
from datetime import datetime


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

# Python program to interchange first and last elements in a list
original_list = [12, 35, 9, 56, 24]
first_value = original_list[0]
last_value = original_list[-1]
original_list[-1] = first_value
original_list[0] = last_value

# print(original_list)

# Shallow copy and Deep copy

copied_list = original_list.copy()
copied_list.append(1000)
# print(copied_list)

# Cafy timestamp obfl


timestamps = ['04/19/2024 15:10:53', '04/21/2024 15:10:53', '04/28/2024 15:09:53', '04/15/2024 15:10:53',
              '04/01/2024 23:10:51',
              '04/15/2024 15:10:50', '04/30/2024 15:10:42']

larger_timestamp = datetime.strptime(timestamps[0], '%m/%d/%Y %H:%M:%S')
for timestamp in timestamps:
    larger_timestamp = max(larger_timestamp, datetime.strptime(timestamp, '%m/%d/%Y %H:%M:%S'))

# print(larger_timestamp)

state = ''
optics_type = ''

pid = 'qsfp-100g-aoc3m'
if re.search(r'(?<!a)cu|glc-t|g-t-x|ac\d+m', pid) or re.search(r'cu', optics_type):  # should not pass None
    state = 'n/a'
else:
    state = 'on'


# print(state)


def assign_user(staff=None, role=None):
    if staff and role != 'admin' and role != 'staff':
        print('Raise Error')
    else:
        print('Can continue')


# assign_user(staff='_ab', role='customer')


# Getter setter demo

class Person:
    def __init__(self):
        self._age = 15

    @property
    def age(self):
        print('As expected...')
        return self._age

    @age.setter
    def age(self, value):
        if value > 18:
            raise ValueError('Age should not be above 18')
        self._age = value


instance = Person()
# print(instance.age)
# print(instance.age)


advanced = lambda a, b: a + b
# print(advanced(2, 8))


'''
1. last state should be sw_oper
2. only reset and sw_oper can occur multiple times
3. expected states irrespective of count, all of them should be present in all_state
'''


def verify_shelf_mgr_states(expected, actual):
    for state in expected:
        if state not in actual:
            raise ValueError(f'Expected state {state} not present in actual: {actual}')
    for idx in range(len(actual)):
        if actual[idx] in actual[:idx] or actual in actual[idx + 1:]:
            if actual[idx] in ('reset', 'sw_oper'):
                pass
            else:
                raise ValueError(f'Other state than reset or sw_oper is occured more than once {actual[idx]}')
    last_state = actual[-1]
    if last_state != 'sw_oper':
        raise ValueError('Expected last state is not sw_oper')


expected = ['reset', 'powered_off', 'powered_on', 'ok', 'reset', 'powered_off', 'powered_on', 'ok', 'sw_oper']
actual = ['reset', 'powered_off', 'powered_on', 'ok', 'reset', 'reset', 'sw_oper']
# verify_shelf_mgr_states(expected, actual)

name = 'DEFAULT'


def update_product(id, name=None, price=None):
    if name:
        print(f'Name is received in argument {name}')
    if price:
        print(f'Price is received in argument {price}')


# update_product(1, name='ER')


class ApData:
    topology_file = 'topo path'

    def __init__(self):
        self.test_input_file = 'Input file'


apdata = ApData()
print(apdata.topology_file)
print(apdata.test_input_file)

all_cases = ['fabmgr', 'fiarsp', 'fpd_agent', 'ema_server_sdr', 'fpdserv', 'processmgr', 'envmon_proxy', 'resmon',
             'fpd-serv', 'shelf_mgr', 'led_mgr', 'sdr_invmgr', 'ipv4_ma', 'ifmgr', 'vm_manager', 'calv_alarm_mgr',
             'i2c_server', 'invmgr_proxy', 'sdr_mgbl_proxy', 'ether_ctrl_msg_client', 'envmon_ui', 'esdma',
             'cfgmgr-rp', 'cfgmgr-lc']

not_supported_cases = ['fabmgr', 'fiarsp', 'fpd_agent', 'fpdserv', 'shelf_mgr', 'led_mgr', 'vm_manager', 'i2c_server',
                       'ether_ctrl_msg_client', 'envmon_ui', 'esdma', 'cfgmgr-lc']

supported_cases = []

for testcase in all_cases:
    if testcase not in not_supported_cases:
        supported_cases.append(testcase)

print(supported_cases)

failed_one = '2024-05-31 19:11:41'

# formatted = datetime.strptime('06/05/2024 18:39:29', '%m/%d/%Y %H:%M:%S')

formatted = datetime.strptime(failed_one, '%Y-%m-%d %H:%M:%S')
print(type(formatted))

'''
(Pdb) datetime.strptime(expected[-1].time, timestamp_format)
*** ValueError: time data '2024-05-31 19:11:41' does not match format '%m-%d-%Y %H:%M:%S'

(Pdb) timestamp_format                
'%m-%d-%Y %H:%M:%S'

(Pdb) expected[-1].time
'2024-05-31 19:11:41'
'''


class TestEnvmonToolTemperature:
    """
    Envmon temperature temp.

    """
    @staticmethod
    def get_value_to_test(sensor, sensor_obj, value_type):
        """

        :param sensor: sensor name
        :param sensor_obj: sensor object. - envmon
        :param value_type: majorhi, majorlow, minorhigh, minorlow.
        :return:
        """
        if 'major' in value_type:
            value_level = 'major'
        else:
            value_level = 'minor'

        if 'low' not in value_type:
            if 'hotspot' in sensor.lower() and value_level == 'minor':
                value_to_test = str(
                    int(eval('sensor_obj.' + value_type)) + 2)
            else:
                value_to_test = str(
                    int(eval('sensor_obj.' + value_type)) + 1)
        else:
            value_to_test = str(int(eval('sensor_obj.' + value_type)) - 1)

        return value_to_test

    def add_testcase_trigger(self, **kwargs):
        """
        Add trigger for changing the temperature sensor values.

        :return: None
        """
        # (location, sensor, sensor_obj, value_type) = kwargs.get('trigger_param', [])
        sensor = 'Jer2_ifmac_vim'
        sensor_obj = 'Object'
        value_type = 'high'
        value_to_test = self.get_value_to_test(sensor, sensor_obj, value_type)

        return None


temp_instance = TestEnvmonToolTemperature()
temp_instance.add_testcase_trigger()

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

import re

sh_int_output = """
HundredGigE0/0/0/2             unassigned      Shutdown        Down     default 
FourHundredGigE0/0/0/3         unassigned      Shutdown        Down     default 
FortyGigE0/0/0/4               unassigned      Shutdown        Down     default 
FourHundredGigE0/0/0/5         unassigned      Shutdown        Down     default 
FourHundredGigE0/0/0/6         unassigned      Shutdown        Down     default 
HundredGigE0/0/0/7             unassigned      Shutdown        Down     default 
HundredGigE0/0/0/10            unassigned      Shutdown        Down     default 
FourHundredGigE0/0/0/11        unassigned      Shutdown        Down     default 
FortyGigE0/0/0/13              unassigned      Shutdown        Down     default 
FourHundredGigE0/0/0/14        unassigned      Shutdown        Down     default 
HundredGigE0/0/0/15            unassigned      Shutdown        Down     default 
HundredGigE0/0/0/17            unassigned      Shutdown        Down     default 
FortyGigE0/0/0/21              unassigned      Shutdown        Down     default 
HundredGigE0/0/0/23            unassigned      Shutdown        Down     default 
HundredGigE0/0/0/24            unassigned      Shutdown        Down     default 
HundredGigE0/0/0/25            unassigned      Shutdown        Down     default 
FortyGigE0/0/0/29              unassigned      Shutdown        Down     default 
HundredGigE0/0/0/30            unassigned      Shutdown        Down     default 
HundredGigE0/0/0/31            unassigned      Shutdown        Down     default 
HundredGigE0/0/0/0/0           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/0/1           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/0/2           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/0/3           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/0/4           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/0/5           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/0/6           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/0/7           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/8/0           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/8/1           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/8/2           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/8/3           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/8/4           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/8/5           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/8/6           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/8/7           unassigned      Shutdown        Down     default 
HundredGigE0/0/0/12/0          unassigned      Shutdown        Down     default 
HundredGigE0/0/0/12/1          unassigned      Shutdown        Down     default 
HundredGigE0/0/0/16/0          unassigned      Shutdown        Down     default 
HundredGigE0/0/0/16/1          unassigned      Shutdown        Down     default 
HundredGigE0/0/0/16/2          unassigned      Shutdown        Down     default 
HundredGigE0/0/0/16/3          unassigned      Shutdown        Down     default 
FourHundredGigE0/0/0/18/0      unassigned      Shutdown        Down     default 
FourHundredGigE0/0/0/18/1      unassigned      Shutdown        Down     default 
HundredGigE0/0/0/20/0          unassigned      Shutdown        Down     default 
HundredGigE0/0/0/20/1          unassigned      Shutdown        Down     default 
HundredGigE0/0/0/20/2          unassigned      Shutdown        Down     default 
HundredGigE0/0/0/22/0          unassigned      Shutdown        Down     default 
HundredGigE0/0/0/22/1          unassigned      Shutdown        Down     default 
FourHundredGigE0/0/0/26/0      unassigned      Shutdown        Down     default 
FourHundredGigE0/0/0/26/1      unassigned      Shutdown        Down     default 
HundredGigE0/0/0/28/0          unassigned      Shutdown        Down     default 
HundredGigE0/0/0/28/1          unassigned      Shutdown        Down     default 
HundredGigE0/0/0/28/2          unassigned      Shutdown        Down     default 
MgmtEth0/RP0/CPU0/0            55.28.22.14     Up              Up       default
"""

all_interfaces = re.findall(r'[A-Za-z]+\d\/\d\/\d/\d+\/?\d?', sh_int_output)

for intf in all_interfaces:
    print(f'int {intf}')
    print('no shut')
print('commit')
