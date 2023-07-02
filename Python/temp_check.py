def check_tolerance(e_val, o_val, tolerance):
    small_value = float(e_val) if float(o_val) > float(e_val) else float(o_val)
    if (abs(float(e_val) - float(o_val)))/small_value > tolerance:
        print('Failure')
    else:
        print('Success') 

check_tolerance(66,67,0.5)           