import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Todo = sequelize.define(
	"Todo",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "todos",
		timestamps: true,
	}
);

export default Todo;
