const { Thoughts } = require('../models');

const ThoughtsRoutes = {
    // get all thoughts
    getAllThouts(req, res) {
        Thoughts.find({})
            .populate({ path: 'reaction', select: '-__v' })
            .select('-__v')
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // get a thought by ID
    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found with this id!!!' });
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })

    },

    //Create a new Thought
    createThought({ body }, res) {
        Thoughts.createUser(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));

    },
    // find and delete a Thought
    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

}

module.exports = ThoughtsRoutes;