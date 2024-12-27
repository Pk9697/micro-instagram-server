import User from './user.model.js'
import Post from './post.model.js'

User.hasMany(Post, { foreignKey: 'userId' })
Post.belongsTo(User, { foreignKey: 'userId', as: 'userDetails' })

export { User, Post }
