module.exports.getUsers = async (client) => {
    return await client.query(`SELECT email, lastname, firstname, to_char(birthday, 'DD-MM-YYYY') as birthday FROM "user"`);
}

module.exports.deleteUser = async (client, id) => {
    return await client.query(`DELETE FROM "user" WHERE email = $1`, [id]);
}

module.exports.userExist = async (client, email) => {
    const results = await client.query(`SELECT email FROM "user" WHERE email=$1`, [email]);
    return results.rows.length > 0;
}

