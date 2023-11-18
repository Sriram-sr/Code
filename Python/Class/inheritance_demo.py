class GrandFather:
    def __init__(self):
        print('Grandfather init called...')
        self.grandfather = 'grandfather'
    def greet(self):
        print('Greet from Grandpa....')
class Father(GrandFather):
    # def __init__(self):
    #     print('Father init called...')
    #     self.father = 'father'

    def single_father_method(self):
        print('To check constructor')

father_instance = Father()
father_instance.single_father_method()

class Mother:
    def __init__(self):
        print('Mother init called...')
        self.mother = 'mother'

class Children(Father, Mother):
    def __init__(self):
        print('Children init called...')
        self.children = 'children'

    def use_grandpa_attribute(self):
        print('self is ', self)
        self.greet()
        print('Trying to access grandfather class variable below')
        print(self.grandfather)

