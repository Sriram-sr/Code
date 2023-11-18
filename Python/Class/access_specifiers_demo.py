# This can be used to explore encapsulation in Python practically

class Base:
    def __init__(self):
        self.public_variable = 'public variable'
        self._protected_variable = 'protected variable'
        self.__private_variable = 'private variable'

    def access_any_variable(self):
        print(f'Can access {self.public_variable}, {self._protected_variable} and {self.__private_variable}')

    def _protected_method(self):
        print('Protected Method from Base class')

    def __private_method(self):
        print('Private Method from Base class')


sample_instance = Base()
print(
    f'Printing from outside the class {sample_instance._protected_variable}')
# Can able to access only public and protected variables.


class Child(Base):
    def access_parent_properties(self):
        print(f'From the parent {self.public_variable}, {self._protected_variable}')

    def invoke_parent_methods(self):
        self.__private_method()


# child_instance = Child()
# child_instance.invoke_parent_methods()
