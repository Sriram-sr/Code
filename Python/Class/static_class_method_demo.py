class Base:
    single_key = 'SecureKey'

    @staticmethod
    def normal_static_method():
        print('This is a static method')

    @classmethod
    def class_method_demo(cls):
        print(f'Accessing class variable {cls.single_key}')


class User(Base):
    pass


base_instance = Base()
# base_instance.normal_static_method()
Base.class_method_demo()

print('Accessing parent class\'s \"class attribute\"...')
print(User.single_key)
