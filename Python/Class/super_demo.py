class Base:
    def __init__(self, name, age):
        print(f'Self in init is {self}')
        print('Parent initialised')
        self.name = name
        self.age = age + 12

    def display_child_provided_data(self):
        print(f'Name is {self.name} and age is {self.age}')


class Child(Base):
    def __init__(self, name, age, place):
        # super().__init__(name, age)
        Base.__init__(self, name, age)


child_instance = Child('Sriram', 23, 'TM')
child_instance.display_child_provided_data()
