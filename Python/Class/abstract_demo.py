import abc


class Feature(abc.ABC):
    @abc.abstractmethod
    def get_method(self):
        print('Accidentally abstract method is called...')


class XRFeature(Feature):
    def get_method(self):
        print('XR feature implemented..')


class ThinXrFeature(Feature):
    def set_method(self):
        print('Only set method..', self)

    def get_method(self):
        print('XR feature implemented..')


error_instance = Feature()  # Will throw error
xr_instance = XRFeature()
xr_instance.get_method()
