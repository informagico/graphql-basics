const Query = {
	users(parent, args, { db }, info) {
		if (!args.query) {
			return db.users
		}

		return db.users.filter((user) => {
			return user.name.toLowerCase().includes(args.query.toLowerCase())
		})
	},
	posts(parent, args, { db }, info) {
		if (!args.query) {
			return db.posts
		}

		return db.posts.filter((post) => {
			return (
				post.title.toLowerCase().includes(args.query.toLowerCase()) ||
				post.body.toLowerCase().includes(args.query.toLowerCase())
			)
		})
	},
	comments(parent, args, { db }, info) {
		return db.comments
	},
	me() {
		return {
			id: '11aabb22',
			name: 'Alessandro',
			email: 'alessandro@example.com',
		}
	},
	post() {
		return {
			id: 'aabbcc112233',
			title: 'Learn how to do things!',
			body: 'Quick and easy way to learn how to do things!',
			published: false,
		}
	},
}

export { Query as default }
