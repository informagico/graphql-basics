import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid'

const users = [{
	id: '1',
	name: 'Mago',
	email: 'mago@test.com',
},
{
	id: '2',
	name: 'Sarah',
	email: 'sarah@test.com',
	age: 24
},
{
	id: '3',
	name: 'Mike',
	email: 'mike@test.com',
}]

const posts = [{
	id: '10',
	title: 'GraphQL 101',
	body: 'This is how to use GraphQL...',
	published: false,
	author: '1'
},
{
	id: '11',
	title: 'GraphQL 201',
	body: 'Advanced features with GraphQL...',
	published: true,
	author: '1'
},
{
	id: '12',
	title: 'Programming music',
	body: '',
	published: false,
	author: '2'
}]

const comments = [{
	id: '100',
	text: 'This worked well for me. Thanks!',
	author: '1',
	post: '11'
},
{
	id: '101',
	text: 'Glad you enjoyed it!',
	author: '2',
	post: '11'
},
{
	id: '102',
	text: 'This not work!',
	author: '3',
	post: '11'
},
{
	id: '102',
	text: 'Oh, nevermind i solved!',
	author: '3',
	post: '11'
}]

// Type definitions (schema)
const typeDefs = `
	type Query {
		users(query: String): [User!]!
		posts(query: String): [Post!]!
		comments: [Comment!]!
		me: User!
		post: Post!
	}

	type Mutation {
		createUser(name: String!, email: String!, age: Int): User!
		createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
		createComment(text: String!, author: ID!, post: ID!): Comment!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
		posts: [Post!]!
		comments: [Comment!]!
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
		author: User!
		comments: [Comment!]!
	}

	type Comment {
		id: ID!
		text: String!
		author: User!
		post: Post!
	}
`
// Resolvers
const resolvers = {
	Query: {
		users(parent, args, ctx, info) {
			if (!args.query) {
				return users
			}

			return users.filter((user) => {
				return user.name.toLowerCase().includes(args.query.toLowerCase())
			})
		},
		posts(parent, args, ctx, info) {
			if (!args.query) {
				return posts
			}

			return posts.filter((post) => {
				return (post.title.toLowerCase().includes(args.query.toLowerCase()) ||
					post.body.toLowerCase().includes(args.query.toLowerCase()))
			})
		},
		comments(parent, args, ctx, info) {
			return comments;
		},
		me() {
			return {
				id: '11aabb22',
				name: 'Alessandro',
				email: 'alessandro@example.com'
			}
		},
		post() {
			return {
				id: 'aabbcc112233',
				title: 'Learn how to do things!',
				body: 'Quick and easy way to learn how to do things!',
				published: false
			}
		}
	},
	Mutation: {
		createUser(parent, args, ctx, info) {
			const emailTaken = users.some(user => user.email === args.email)

			if (emailTaken) {
				throw new Error('Email already taken')
			}

			const user = {
				id: uuidv4(),
				...args
			}

			users.push(user)

			return user
		},
		createPost(parent, args, ctx, info) {
			const userExists = users.some(user => user.id === args.author)

			if (!userExists) {
				throw new Error('User does not exists')
			}

			const post = {
				id: uuidv4(),
				...args
			}

			posts.push(post)

			return post
		},
		createComment(parent, args, ctx, info) {
			const userExists = users.some(user => user.id === args.author)

			if (!userExists) {
				throw new Error('User does not exists')
			}

			const post = posts.some(post => post.id === args.post && post.published)

			if (!post) {
				throw new Error('Post does not exists or it is not published')
			}

			const comment = {
				id: uuidv4(),
				...args
			}

			comments.push(comment)

			return comment
		}
	},
	Post: {
		author(parent, args, ctx, info) {
			return users.find(user => user.id === parent.author)
		},
		comments(parent, args, ctx, info) {
			return comments.filter(comment => comment.post === parent.id)
		}
	},
	User: {
		posts(parent, args, ctx, info) {
			return posts.filter(post => post.author === parent.id)
		},
		comments(parent, args, ctx, info) {
			return comments.filter(comment => comment.author === parent.id)
		}
	},
	Comment: {
		author(parent, args, ctx, info) {
			return users.find(user => user.id === parent.author)
		},
		post(parent, args, ctx, info) {
			return posts.find(post => post.id === parent.post)
		}
	}
}

const server = new GraphQLServer({
	typeDefs,
	resolvers
})
server.start(() => {
	console.log('The server is running')
})
