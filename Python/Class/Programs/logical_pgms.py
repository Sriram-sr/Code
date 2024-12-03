# Palindrome Check

def is_palindrome(text):
    text = ''.join(char.lower() for char in text if char.isalnum())
    print(text)
    return text.lower() == text.lower()[::-1]

print(is_palindrome("A man, a plan, a canal: Panama"))