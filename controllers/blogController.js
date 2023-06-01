const Blog = require('../models/blog')

const blog_create_get = (req,res) =>{
    res.render('create', {title: 'Create new blog'})
}

const blog_create = (req, res) =>{
    const blog = new Blog(req.body)
  blog.save() // lưu vào csdl
    .then((result)=>{
      res.redirect('/blogs')
    })
    .catch((err)=>{
      console.log(err)
    })
}

const blog_index = (req, res) =>{
    Blog.find()
    .then((result)=>{// gửi dữ liệu cho views hiển thị
      res.render('index',{title: 'All blogs', blogs: result})
    })
    .catch((err)=>{
      console.log(err)
    })
}

const blog_details = (req, res) =>{
    const id=req.params.id   // param lấy dl trên url
  Blog.findById(id)
    .then(result =>{
      res.render('details', { blog: result, title: 'Blog Details'})
    })
    .catch(err =>{
      console.log(err)
    })
}

const blog_delete = (req, res) =>{
  const id = req.params.id;
  console.log(id, "dây nè")
  Blog.findByIdAndDelete(id)
    .then((result)=>{
      res.json({redirect: '/blogs'})  // à nó gửi phản hồi này dưới dạng json   
    })
    .catch(err => console.log(err))
}

const blog_update_get = (req,res)=>{
  const id = req.params.id
  // Phải sử dụng promise thì nó mới lắng nghe sự kiện đc
  Blog.findById(id)
  .then((result)=>{
    res.render('update', { blog: result, title: 'Blog update'})
  })
  .catch((err)=>{
    console.log(err)
  })
}

const blog_update = (req, res) => {
  const id = req.params.id;
  const updatedBlog = req.body;
  console.log(updatedBlog.body, "híhshsshshshh")
  Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
    .then((result) => {
      // res.json({ redirect: `/${id}` });
      res.redirect(`/blogs/${id}`)
    })
    .catch(err => console.log(err));
}

module.exports = {
    blog_index,
    blog_create,
    blog_details,
    blog_delete,
    blog_create_get,
    blog_update_get,
    blog_update
}