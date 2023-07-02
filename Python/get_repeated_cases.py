with open('all_testcases.txt', 'r+') as all_tc_file:
    all_tcs = all_tc_file.readlines()
    
with open('expense_testcases.txt', 'r+') as extra_tc_file:
    all_extra_tcs = extra_tc_file.readlines()

dumm_tc_count = 0

for tc in all_tcs:
    if tc in all_extra_tcs:
        single_tc_count = all_extra_tcs.count(tc)
        print(single_tc_count)


# print(dumm_tc_count)