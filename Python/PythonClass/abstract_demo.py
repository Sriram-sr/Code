import abc
class Feature:
    @abc.abstractmethod
    def get_method(self):
        print('Accidentally abstract method is called...')

class XRFeature(Feature):
    def get_method(self):
        print('XR feature implemented..')

class ThinXrFeature(Feature):
    def set_method(self):
        print('Only set method..')

xr_instance = XRFeature()
xr_instance.get_method()

# thinxr_instance = ThinXrFeature()
# thinxr_instance.get_method()