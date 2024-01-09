class Base:
    @staticmethod
    def normal_static_method(cls):
        print('This is a static method')

    @classmethod
    def class_method_demo(cls):
        print('This is a class method')


base_instance = Base()
# base_instance.normal_static_method()
Base.class_method_demo()
