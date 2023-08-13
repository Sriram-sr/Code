def get_user_inputs(question_str='', data_type=None, fields=None):
    user_data = dict()
    if fields:
        for field in fields:
            if fields.get(field) is not None:
                options_to_show = fields.get(field)
                field_input = input(f'Enter {field} {options_to_show}: ').lower()
            else:
                field_input = input(f'Enter {field}: ')
            user_data[field] = field_input
        return user_data
    if data_type == 'int':
        return int(input(question_str))
    return input(question_str)


def show_options(*options):
    print("Choose an option:")
    for i, option in enumerate(options, start=1):
        print(f"{i}. {option}")
    print()
