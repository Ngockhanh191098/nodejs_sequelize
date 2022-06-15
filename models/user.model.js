
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING
            },
            pwd: {
                type: DataTypes.STRING
            }
        },
        {
            timestamp: true,
        }
    );

    return User;
}