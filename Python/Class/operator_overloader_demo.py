class ComplexNumber:
    def __init__(self, real, imaginary):
        self.real = real
        self.imaginary = imaginary

    def __add__(self, other):
        new_real = self.real + other.real
        new_imaginary = self.imaginary + other.imaginary
        return ComplexNumber(new_real, new_imaginary)

    def __str__(self):
        return f"{self.real} + {self.imaginary}i"


# Creating instances of the ComplexNumber class
c1 = ComplexNumber(3, 4)
c2 = ComplexNumber(2, 6)

# Using the overloaded addition operator
result = c1 + c2

print(result)  # Output: 5 + 10i
