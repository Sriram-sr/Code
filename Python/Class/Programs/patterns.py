"""
Write a program to print the below pattern

*
**
***
****
*****

"""

starting_row = 1
number_of_rows = 5
for row in range(starting_row, number_of_rows + 1):
    for col in range(row):
        print('*', end='')
    print()
