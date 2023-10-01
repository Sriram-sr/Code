exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This should be done..',
        imageUrl: 'images/mongoDb.png',
        creator: {
          name: 'Sriram'
        },
        createdAt: new Date()
      },
      {
        _id: '2',
        title: 'Second Post',
        content: 'This should be done..',
        imageUrl: 'images/mongoDb.png',
        creator: {
          name: 'Sriram-Looser'
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: 'Post created Sucessfully!',
    data: {
      title: title,
      content: content
    }
  });
};
