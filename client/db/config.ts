import { column, defineDb, defineTable, NOW } from 'astro:db'

// https://astro.build/db/config

const List = defineTable({
	columns: {
		id: column.number({ primaryKey: true, autoIncrement: true }),
		name: column.text(),
		total: column.number({ default: 0 }),
		createdAt: column.date({ default: NOW }),
		updatedAt: column.date({ default: NOW }),
	},
})

const Item = defineTable({
	columns: {
		id: column.number({ primaryKey: true, autoIncrement: true }),
		listId: column.number(),
		name: column.text(),
		price: column.number(),
		createdAt: column.date({ default: NOW }),
		updatedAt: column.date({ default: NOW }),
	},
	foreignKeys: [
		{
			columns: ['listId'],
			references: () => [List.columns.id],
		},
	],
})

export default defineDb({
	tables: { List, Item },
})
