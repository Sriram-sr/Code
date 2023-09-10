from texttable import Texttable
import pyfiglet


def get_user_inputs(question_str='', data_type=None, fields=None):
    """
    Get user inputs based on specified data type and fields.

    :param question_str: The prompt/question to display to the user.
    :param data_type: The expected data type of the input ('int', 'str', etc.).
    :param fields: A dictionary containing field names and optional options.

    :return: Collected input data, either as a dictionary of fields or a single value.
    """
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


def show_options(message=None, options=None):
    """
    Prints options with numbers.

    :param message: A String optional for question to be displayed before showing options.
    :param options: A list of options to display.

    :return: None
    """
    if message:
        print(f'{message}: ')
    for i, option in enumerate(options, start=1):
        print(f"{i}. {option}")
    print()


def log_banner(message):
    """
    Displays Banner like text.

    :param message: A Message string to display.

    :return: None
    """
    table = Texttable()
    table.add_row([message])
    table.set_deco(Texttable.BORDER | Texttable.HEADER)
    table.set_cols_align(['c'])
    table.set_cols_width([80])
    enter_new_line()
    print(table.draw())
    enter_new_line()


def display_welcome_msg():
    """
    Displays welcome message when app starts up.

    :return: None
    """
    result = pyfiglet.figlet_format('Student Management System', font='5lineoblique')
    print(result)


def enter_new_line():
    """
    Only prints a new line.

    :return:
    """
    print()


def display_in_console(data):
    """
    Prints data onto console.

    :param data:
    :return:
    """
    print(data)
