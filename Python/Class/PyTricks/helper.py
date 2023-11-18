class Custom:
    class_attrib = 'Class Attribute'

    def __str__(self):
        return 'This will be printed when you try to print object'


custom_instance = Custom()
print(custom_instance)
