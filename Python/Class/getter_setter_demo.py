class Encapsulated:
    def __init__(self):
        self._post = 'Trending post'

    def get_post(self):
        print('Get post is called automatically')
        return self._post

    def set_post(self, content):
        print('Get post is called automatically')
        self._post = content

    post = property(get_post, set_post)


instance = Encapsulated()
print(instance.post)
