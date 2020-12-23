const HashUtils = require("../utils/hashUtils");

module.exports.getUser = async (client, email, password) => {
    const results = await client.query(`
        SELECT * FROM "user" WHERE email = $1 LIMIT 1;
    `, [email]);

    const userRow = results.rows[0];

    if(userRow !== undefined && await HashUtils.compareHash(password, userRow.password)){
        return {userRole: userRow.role, value: userRow};
    } else {
        return {userRole: "unknown", value: null};
    }
}