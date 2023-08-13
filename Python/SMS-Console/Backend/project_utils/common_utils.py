def get_user_input(question_str='', data_type=None):
    if data_type == 'int':
        return int(input(question_str))
    return input(question_str)
