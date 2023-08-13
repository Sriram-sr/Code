class Parent:
    def __init__(self):
        self.parent_property = 'parent property'
class Child(Parent):
    def __init__(self):
        Parent.__init__(self)
        self.child_property = 'child property'
    def access_parent_attribute(self):
        print(self)
        print(f'I can access {self.parent_property}')

child_instance = Child()
child_instance.access_parent_attribute()