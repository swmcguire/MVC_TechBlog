const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


//----------------------  Get all Posts and Join with User Data
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User, 
                attributes: ['name'],
            },
        ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render ('homepage', {
            posts, 
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


//----------------------  Get Posts by ID and Join with User Data  ------------------
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    include: [User]
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// -------------------- Login Page 
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
})


// -------------------- User Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attrbiutes: { exclude: ['password']},
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user, 
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/dashboard/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ['name'], 
                },
            ],
        });

        const post = postData.get({ plain: true });

    
        res.render('post', {
            ...post, 
            logged_in: req.session.logged_in, 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/signup", async (req, res) => {
    res.render("signup");
  });
  

module.exports = router;